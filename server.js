const express = require("express");
const bodyParser = require("body-parser");
const { WebhookClient, Payload } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.post("/", express.json(), (request, response) => {
  const agent = new WebhookClient({ request, response });

  function demo(agent) {
    agent.add("Sending response from Webhook server as Bilip v.3.0.0!");
  }

  var intentMap = new Map();
  
  intentMap.set("Demo", demo);

  agent.handleRequest(intentMap);
});
