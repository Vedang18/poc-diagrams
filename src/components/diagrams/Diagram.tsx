import createEngine, {
    DefaultNodeModel,
    PathFindingLinkFactory,
    DefaultLabelModel,
    DiagramModel,
    PortModelAlignment
} from '@projectstorm/react-diagrams';
import React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { AdvancedPortModel, PortModelOptions } from './AdvancedPortModel';
import { AdvancedLinkFactory } from './AdvancedLinkFactory';
import elements from '../../resource/elements';
import { AdvancedLinkModel } from './AdvancedLinkModel';

const colors= ['rgb(192,0,255)','rgb(255,0,192)','rgb(192,255,0)',
            'rgb(0,255,192)','rgb(0,192,255)','rgb(255,192,0)'];
function createModelRenders(pathfinding: any) {
    const inputElements = elements();
    let models: any[] = [];
    let links: any[] = [];
    let nodes: any[] = [];
    let ports: any[] = [];
    let nodesmap: Map<string, any> = new Map();

    // Create nodes & out ports
    inputElements.forEach(e => {
        let node = new DefaultNodeModel(e.DisplayName, colors[e.StateIndex]);
        if (e.Actions.length > 0) {
            for (let a = 0; a < e.Actions.length; a++) {
                //Add out port for all
                let options: PortModelOptions = {
                    in: false,
                    name: 'o',
                    portId: e.Actions[a].Id,
                    alignment: PortModelAlignment.BOTTOM
                }
                node.addPort(new AdvancedPortModel(options));
                // To add in port & link
                ports.push({ ...e.Actions[a], 'nodeId': e.Id });
                nodes.push(node);
            }
        }
        //nodes.push();
        nodesmap.set(e.Id, { 'element': e, 'node': node });
    });

    // Create in ports & link
    ports.forEach(l => {
        let tNode = nodesmap.get(l.TargetStateId);
        if (tNode && tNode.node) {
            //Add in port for all
            let options: PortModelOptions = {
                in: true,
                name: 'i',
                portId: l.Id,
                alignment: PortModelAlignment.BOTTOM
            }
            let dPort = tNode.node.addPort(new AdvancedPortModel(options));
            let sNode = nodesmap.get(l.nodeId);
            if (sNode && sNode.node) {
                let link = sNode.node.getOutPorts()[0].link(dPort, pathfinding);
                link.addLabel(
                    new DefaultLabelModel({
                        label: l.Name,
                        offsetY: -20,
                        offsetX: 0
                    })
                );
                if (sNode.element.StateIndex > tNode.element.StateIndex) {
                    link.setIsRev();
                }
                links.push(link);
            }
        }
    })

    models.push(...nodes);
    models.push(...links);
    return models;

}

export default function DiagramUI() {
    //1) setup the diagram engine
    var engine = createEngine();
    //@ts-ignore
    engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
    //@ts-ignore
    const pathfinding = engine.getLinkFactories().getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME);

    // create some nodes
    let nodes = createModelRenders(pathfinding);

    // node1.registerListener({
    //     eventDidFire: (e: any) => {
    //         const isSelected = e && e.isSelected
    //         // selectionChanged
    //         if (isSelected === true && e.function === 'selectionChanged') {
    //             // setIsPanel(true)
    //             const item = node1.getOptions()
    //             alert(item.name);
    //             // item.options = {...item.options, rawData: {
    //             //     type: data.name
    //             // }}
    //             // console.log(item)
    //         }
    //         if (isSelected === false) {
    //             // setIsPanel(false)
    //             console.log(e);
    //         }
    //     }
    // });

    const sw = window.innerWidth;
    const partf = sw / (nodes.length-1);
    nodes.forEach((n, i) => {
        if (n instanceof DefaultNodeModel) {
            n.setPosition(((i + 1) * partf), 50);
        }
        else if (n instanceof AdvancedLinkModel) {
            let l: AdvancedLinkModel = n;
            if (l.IsRev()) {
                let tx = l.getTargetPort().getPosition().x;
                let x = l.getSourcePort().getPosition().x;
                let y = l.getSourcePort().getPosition().y;
                //@ts-ignore
                l.getLabels()[0].getOptions().offsetY = 0;
                l.point(tx + 20, y + 70);
                l.point(x + 40, y + 70);

            }

        }

    });

    var model = new DiagramModel();


    model.addAll(...nodes);
    model.setLocked(true);
    //@ts-ignore
    // load model into engine
    engine.setModel(model);


    // render the diagram!
    return (
        <CanvasWidget className="canvas" engine={engine} />
    );
};
