export interface Chat {
    _id?: string;
    userId: string;
    userName: string
    topic: string;
    messages: [{ userId: string, userName: string, message: string }];
}