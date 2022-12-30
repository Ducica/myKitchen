// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import express from "express";
// import http from "http";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { TasksResolver } from "./resolvers/tasks";
// import { buildSchema } from "type-graphql";
// import config from './mikro-orm.config'
// import { MikroORM } from "@mikro-orm/core";
// // const main = async () => {
// //     // const server = new ApolloServer({
// //     //     typeDefs,
// //     //     resolvers,
// //     // });

// //         const server = new ApolloServer({
// //         schema: await buildSchema({
// //             resolvers: [TasksResolver],
// //             validate: false,
// //         }),

// //     });

// //     const { url } = await startStandaloneServer(server, {
// //         listen: { port: 4000 },
// //     });

// //     console.log(`🚀  Server ready at: ${url}`);
// // };
// // main();
// console.log("synchronous code");
// interface MyContext {
//     token?: string;
// }

// const main = async () => {
//     const orm = await MikroORM.init(config);

//   const migrator = orm.getMigrator();
//   await migrator.createMigration(); // creates file Migration20191019195930.ts
//   await migrator.up(); // runs migrations up to the latest
//     const app = express();
//     const httpServer = http.createServer(app);
//     const server = new ApolloServer<MyContext>({
//         schema: await buildSchema({
//             resolvers: [TasksResolver],
//             validate: false,
//         }),
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//     });

//     await server.start();

//     // Set up our Express middleware to handle CORS, body parsing,
//     // and our expressMiddleware function.
//     app.use(
//         "/",
//         cors<cors.CorsRequest>(),
//         bodyParser.json(),
//         // expressMiddleware accepts the same arguments:
//         // an Apollo Server instance and optional configuration options
//         expressMiddleware(server, {
//             context: async ({ req }) => ({ token: req.headers.token }),
//         })
//     );

//     // Modified server startup
//     await new Promise<void>((resolve) =>
//         httpServer.listen({ port: 4000 }, resolve)
//     );
//     console.log(`🚀 Server ready at http://localhost:4000/`);
// };

// main();
import express from 'express'
import fs from 'fs';
import path from 'path';
import cors from 'cors'
console.log(__dirname)
const rawdata = fs.readFileSync(path.join(__dirname, './recipedata.json'), "utf8");
const recipeData = JSON.parse(rawdata);
const app = express()
const port = 4000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/recipes', (req, res) => {
  res.send({"data":recipeData})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
