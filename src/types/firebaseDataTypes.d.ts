import { DialogStatus } from './types';

declare global {
    type DataMessage = {
        timestamp: number;
        writtenBy: string;

        content?: string;
        image: string;
    };

    type DataDialog = {
        dialogId: string;
        messages: DataMessage[];
        operatorId: number;
        saved: boolean;
        status: DialogStatus;
        userName: string;

        rating?: number;
    };
}

export { };
