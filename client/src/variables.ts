export let token: string | null = null;
export let token_expiringDate: number = 3;

export const getToken = (): string | null => {
    return token;
}

export const setToken = (newToken: string) => {
    token = newToken;
}

export const getExpiringDate = (): number => {
    return token_expiringDate
}

export const setExpiringToken = (newTime: number) => {
    token_expiringDate = newTime
}

