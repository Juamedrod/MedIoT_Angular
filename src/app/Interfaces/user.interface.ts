export interface User {
    _id?: string;
    name: string;
    surname?: string;
    email?: string;
    avatar?: string,
    dni?: string;
    password?: string;
    createdAt?: Date
}