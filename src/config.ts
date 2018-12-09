export const MongoUri: string = process.env.STOR_MONGO_URI || "mongodb://localhost:27017/icy";
export const PortNumber: number = Number(process.env.STOR_PORT) || 8080;
export const AuthToken: string = process.env.STOR_PASSWORD || "password";
export const Cors: { enabled: boolean, whitelist?: string[] } = { enabled: Number(process.env.STOR_CORS_ENABLED) == 0 ? false : true, whitelist: process.env.STOR_CORS_WHITELIST ? process.env.STOR_CORS_WHITELIST.split(",") : [] };