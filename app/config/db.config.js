export default {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "SergeWeber2303",
    DB: process.env.DB_NAME || "testdb",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,      
    pool: {
        max: 5,                 // Nombre maximum de connexions dans le pool
        min: 0,                 // Nombre minimum de connexions dans le pool
        acquire: 30000,         // Temps max en ms pour tenter une connexion
        idle: 10000,            // Temps max d’inactivité avant de libérer une connexion
    },
};
