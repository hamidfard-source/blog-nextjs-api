export interface SessionPayload {
    userId: string;
    role: 'owner' | 'admin' | 'user';
    expiresAt: number;
    [key: string]: any; // Adds compatibility with JWTPayload
}
