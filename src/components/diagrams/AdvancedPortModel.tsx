import {
    DefaultPortModel, DefaultPortModelOptions, LinkModel,
} from '@projectstorm/react-diagrams';
import { AdvancedLinkModel } from './AdvancedLinkModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core/dist/@types';

export interface PortModelOptions extends DefaultPortModelOptions {
    portId?: string;
}

export class AdvancedPortModel extends DefaultPortModel {
    portId:string|undefined;
    constructor(props: PortModelOptions,factory?: AbstractModelFactory<LinkModel>) {
        super(props);
        this.portId=props.portId;
    }
    createLinkModel(): AdvancedLinkModel {
        return new AdvancedLinkModel();
    }
    getPortId(): string {
        return this.portId? this.portId : '';
    }
}