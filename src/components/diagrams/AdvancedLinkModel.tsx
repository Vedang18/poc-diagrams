import {
    DefaultLinkModel, RightAngleLinkModel,
} from '@projectstorm/react-diagrams';

export class AdvancedLinkModel extends RightAngleLinkModel {
    private isRev : boolean;
    constructor() {
        super({
            //type: 'advanced',
            width: 2
        });
        this.isRev=false;
    }
    setIsRev() {
        this.isRev = true;
    }
    IsRev():boolean {
        return this.isRev;
    }
}
