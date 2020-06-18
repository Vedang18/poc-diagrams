import React from 'react';
import { DefaultLinkFactory, RightAngleLinkFactory } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "./AdvancedLinkModel";
import { AdvancedLinkWidget } from "./CustomLinkArrowWidget";

export class AdvancedLinkFactory extends RightAngleLinkFactory {
    // constructor() {
    //     super();
    // }

    generateModel(): AdvancedLinkModel {
        return new AdvancedLinkModel();
    }

    generateReactWidget(event: any): JSX.Element {
        return <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />;
    }
}