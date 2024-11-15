require("dotenv").config();
const pg = require('pg');

// module.exports = {
//   development: {
//     username: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "root",
//     database: process.env.DB_NAME || "minishop",
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//     port: process.env.DB_PORT || 3306,
//   },
//   test: {
//     username: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "root",
//     database: process.env.DB_NAME || "minishop",
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//     port: process.env.DB_PORT || 3306,
//   },
//   production: {
//     username: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "root",
//     database: process.env.DB_NAME || "minishop",
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//     port: process.env.DB_PORT || 3306,
//   },
// };

module.exports = {
  development: {
    username: process.env.DB_USER || "default",
    password: process.env.DB_PASSWORD || "KrLC4ofiOj3m",
    database: process.env.DB_NAME || "verceldb",
    host: process.env.DB_HOST || "ep-polished-river-a4k46f5i.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectModule: pg,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Para evitar problemas con SSL en conexiones remotas.
      },
    },
    redis: process.env.REDIS_URL,
  },
  test: {
    username: process.env.DB_USER || "default",
    password: process.env.DB_PASSWORD || "KrLC4ofiOj3m",
    database: process.env.DB_NAME || "verceldb",
    host: process.env.DB_HOST || "ep-polished-river-a4k46f5i.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectModule: pg,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.POSTGRES_USER || "default",
    password: process.env.POSTGRES_PASSWORD || "KrLC4ofiOj3m",
    database: process.env.POSTGRES_DATABASE || "verceldb",
    host: process.env.POSTGRES_HOST || "ep-polished-river-a4k46f5i.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectModule: pg,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};



