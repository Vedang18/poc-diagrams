import createEngine, {
    DiagramModel,
    DefaultNodeModel,
    DefaultPortModel,
    DefaultLinkFactory,
    DefaultLinkPointWidget,
    DefaultLinkModel,
    DefaultLinkWidget,
    PortModelAlignment,
    PathFindingLinkFactory,
    DefaultLabelModel
} from '@projectstorm/react-diagrams';
import { DiagramEngine, LinkWidget, PointModel } from '@projectstorm/react-diagrams-core';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

export class AdvancedLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: 'advanced',
            width: 2
        });
    }
}

export class AdvancedPortModel extends DefaultPortModel {
    createLinkModel(): AdvancedLinkModel {
        return new AdvancedLinkModel();
    }
}

const CustomLinkArrowWidget = (props: any) => {
    const { point, previousPoint } = props;

    const angle =
        90 +
        (Math.atan2(
            point.getPosition().y - previousPoint.getPosition().y,
            point.getPosition().x - previousPoint.getPosition().x
        ) *
            180) /
        Math.PI;

    //translate(50, -10),
    return (
        <g className="arrow" transform={'translate(' + point.getPosition().x + ', ' + point.getPosition().y + ')'}>
            <g style={{ transform: 'rotate(' + angle + 'deg)' }}>
                <g transform={'translate(0, -3)'}>
                    <polygon
                        points="0,10 8,25 -8,25"
                        fill={props.color}
                        // onMouseLeave={() => {
                        // 	this.setState({ selected: false });
                        // }}
                        // onMouseEnter={() => {
                        // 	this.setState({ selected: true });
                        // }}
                        data-id={point.getID()}
                        data-linkid={point.getLink().getID()}></polygon>
                </g>
            </g>
        </g>
    );
};

export class AdvancedLinkWidget extends DefaultLinkWidget {
    generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
        return (
            <CustomLinkArrowWidget
                key={point.getID()}
                point={point as any}
                previousPoint={previousPoint as any}
                colorSelected={this.props.link.getOptions().selectedColor}
                color={this.props.link.getOptions().color}
            />
        );
    }

    render() {
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        this.refPaths = [];

        //draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(
                this.generateLink(
                    LinkWidget.generateLinePath(points[j], points[j + 1]),
                    {
                        'data-linkid': this.props.link.getID(),
                        'data-point': j,
                        onMouseDown: (event: any) => {
                            this.addPointToLink(event, j + 1);
                        }
                    },
                    j
                )
            );
        }

        //render the circles
        for (let i = 1; i < points.length - 1; i++) {
            paths.push(this.generatePoint(points[i]));
        }

        if (this.props.link.getTargetPort() !== null) {
            paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
        } else {
            paths.push(this.generatePoint(points[points.length - 1]));
        }

        return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
    }
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('advanced');
    }

    generateModel(): AdvancedLinkModel {
        return new AdvancedLinkModel();
    }

    generateReactWidget(event: any): JSX.Element {
        return <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />;
    }
}
/**
 *
 * Simple link styling demo
 *
 * @Author kfrajtak
 */
export default () => {
    //1) setup the diagram engine
    var engine = createEngine();
    //@ts-ignore
    engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
    //@ts-ignore
    const pathfinding = engine.getLinkFactories().getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);


    // create some nodes
    var node1 = new DefaultNodeModel('Phase 1', 'rgb(0,192,255)');
    let port1 = node1.addPort(new AdvancedPortModel(false, 'in'));
    
    node1.setPosition(100, 100);
    node1.registerListener({
        eventDidFire: (e: any) => {
            const isSelected = e && e.isSelected
            // selectionChanged
            if (isSelected === true && e.function === 'selectionChanged') {
                // setIsPanel(true)
                const item = node1.getOptions()
                alert(item.name);
                // item.options = {...item.options, rawData: {
                //     type: data.name
                // }}
                // console.log(item)
            }
            if (isSelected === false) {
                // setIsPanel(false)
                console.log(e);
            }
        }
    });

    var node2 = new DefaultNodeModel('Phase 2', 'rgb(192,255,0)');
    var port2 = node2.addPort(new AdvancedPortModel(true, 'in'));
    node2.setPosition(200, 100);

    var node3 = new DefaultNodeModel('Phase 3', 'rgb(192,0,255)');
    let port3 = node3.addPort(new AdvancedPortModel(true, 'in'));
    
    node3.setPosition(300, 100);

    var node4 = new DefaultNodeModel('Phase 4', 'rgb(255,0,192)');
    var port4 = node4.addPort(new AdvancedPortModel(true, 'in'));
    node4.setPosition(400, 100);

    var model = new DiagramModel();
    var link2 = port4.link(port1,pathfinding);

     link2.point(120, 80);
     link2.point(420, 80);
     link2.addLabel(
		new DefaultLabelModel({
			label: 'Link Label !',
            offsetY: 0,
            offsetX:0
		})
	);
    model.addAll(port1.link(port2), port2.link(port3), port3.link(port4), link2);

    // add everything else
    model.addAll(node1, node2, node3, node4);
    model.setLocked(true);
    //@ts-ignore
    // load model into engine
    engine.setModel(model);


    // render the diagram!
    return (
        <CanvasWidget className="canvas" engine={engine} />
    );
};
