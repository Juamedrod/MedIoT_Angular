export enum msgType { error, success, info };

export interface Message {
    message: string;
    messageType: msgType;
    iat?: Date;
}