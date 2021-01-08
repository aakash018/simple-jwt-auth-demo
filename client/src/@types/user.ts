export interface Refresh_token {
    token: string,
    expiringTime: number,
    username: string,
    id: string,
    email: string
}

export interface UserTypes {
    username: string,
    password?: string,
    id: string,
    email: string
}
