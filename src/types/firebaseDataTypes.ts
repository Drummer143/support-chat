import { DialogStatus } from './types';

export type DataMessage = {
    timestamp: number;
    writtenBy: string;

    content?: string;
    image: string;
};

export type DataDialog = {
    dialogId: number;
    messages: DataMessage[];
    operatorId: number;
    saved: boolean;
    status: DialogStatus;
    userName: string;

    rating?: number;
};
