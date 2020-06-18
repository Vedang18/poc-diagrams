import React from 'react';
import styled from 'styled-components'
import { cloneDeep, mapValues } from 'lodash'


//@ts-ignore
import { FlowChartWithState, IPortDefaultProps, LinkDefault } from "@mrblenny/react-flow-chart";

import * as actions from '@mrblenny/react-flow-chart/src/container/actions'
import { FlowChart, IChart, INodeInnerDefaultProps } from '@mrblenny/react-flow-chart/src';

const CanvasOuterCustom = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  cursor: not-allowed;
` as any


const Label = styled.div`
  position: absolute;
`

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  height: 15px;
  width: 15px;
  transform: translate(50%, -50%);
  background: red;
  color: white;
  border-radius: 50%;
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
`

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`

const PortDefaultOuter = styled.div`
  width: 10px;
  height: 10px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PortCustom = (props: IPortDefaultProps) => (
    <PortDefaultOuter>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          
        </svg>
    </PortDefaultOuter>
)


const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`

const Outer = styled.div`
  padding: 30px;
`

/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
    return (
        <div onClick={() => alert(JSON.stringify(node))} style={{border:'1px green solid'}}>
            <b>You may need to stop event</b>
            <br />
            <button
                onClick={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >Click me</button>

        </div>
    )

}

const chartSimple: IChart = {
    offset: {
        x: 0,
        y: 0
    },
    scale: 1,
    nodes: {
        node1: {
            id: "node1",
            type: "output-only",
            position: {
                x: 100,
                y: 100
            },
            ports: {
                port1: {
                    id: "port1",
                    type: "right",
                    properties: {
                        value: "yes"
                    }
                }
            }
        },
        node2: {
            id: "node2",
            type: "input-output",
            position: {
                x: 400,
                y: 100
            },
            ports: {
                port1: {
                    id: "port1",
                    type: "left"
                }
            }
        },
    },
    links: {
        link1: {
            id: "link1",
            from: {
                nodeId: "node1",
                portId: "port1"
            },
            properties: {
                label: 'link label',
            },
            to: {
                nodeId: "node2",
                portId: "port1"
            },
        },
    },
    selected: {},
    hovered: {}
};

export const FlowChartUI = () => {
    const [state, setState] = React.useState(cloneDeep(chartSimple));
    const chart = state
    const stateActions = mapValues(actions, (func: any) =>
        (...args: any[]) => setState(func(...args))) as typeof actions

    return (
        <div>
            <FlowChartWithState
                initialValue={chart}
                config={{
                    smartRouting: true,
                    readonly:true,
                    zoom:{
                        pan: {
                            disabled:true
                        },
                        wheel: {
                            disabled : true
                        }
                    }

                }}
                Components={{
                    Port: PortCustom,
                    CanvasOuter: CanvasOuterCustom,
                    NodeInner: NodeInnerCustom,
                    Link: (props: any) => {
                        const { startPos, endPos, onLinkClick, link } = props
                        const centerX = startPos.x + (endPos.x - startPos.x) / 2
                        const centerY = startPos.y + (endPos.y - startPos.y) / 2
                        return (
                            <>
                                <LinkDefault {...props} />
                                <Label style={{ left: centerX, top: centerY }}>
                                    {props.link.properties && props.link.properties.label && (
                                        <LabelContent>{props.link.properties && props.link.properties.label}</LabelContent>
                                    )}
                                </Label>
                            </>
                        )
                    },

                }}
            />
            {chart && chart.selected && chart.selected.type && alert(chart.selected.id)}
        </div>
    )
}