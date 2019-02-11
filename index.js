const express = require("express");
const bodyParser = require("body-parser");
const graphQLHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "graphql",
  graphQLHttp({
    schema: buildSchema(
      `
         type RootQuery {
            events: [String!]!
         }

         type RootMutation {
          createEvent(name: String): String
         }

        schema: {
            query: RootQuery 

            mutation: RootMutation 
        }
        `
    ),

    rootValue: {
      events: () => {
        return ["First", "Second", "Third"];
      }
    }
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.listen(3000);
