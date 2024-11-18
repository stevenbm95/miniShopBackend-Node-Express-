const createClient = require('redis').createClient;

// export const connect = async () => {
//   const client = createClient({
//     url: process.env.REDIS_URL,
//     socket: {
//       reconnectStrategy: (retries) => {
//         console.log(`Intentando reconectar... intento #${retries}`);
//         return Math.min(retries * 100, 3000); // Reintento con tiempos progresivos (máximo 3 segundos)
//       },
//     },
//   });

//   client.on("error", (err) => console.error("Redis Client Error", err));
//   client.on("connect", () => console.log("Conectado a Redis"));
//   client.on("ready", () => console.log("Redis está listo para usarse"));

//   await client.connect();

//   return client;
// };

let redisClient;

const connectRedis  = async () =>{
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on("error", (err) =>
      console.error("Redis Client Error:", err)
    );
    redisClient.on("connect", () =>
      console.log("Redis conectado exitosamente.")
    );
    redisClient.on("ready", () =>
      console.log("Redis está listo para usarse.")
    );

    await redisClient.connect();
  }

  return redisClient;
}

module.exports = connectRedis ;
