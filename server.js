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

  function arrangeMeeting(agent) {
    var payloadData = {
      richContent: [
        [
          {
            type: "info",
            title: "Available Dates",
            subtitle:
              "Your Academic Director is Available on these dates. Please choose one:",
          },
          {
            type: "divider",
          },
          {
            type: "list",
            title: "31/05/2022",
            event: {
              name: "",
              languageCode: "",
              parameters: {},
            },
          },
          {
            type: "list",
            title: "02/06/2022",
            event: {
              name: "",
              languageCode: "",
              parameters: {},
            },
          },
          {
            type: "list",
            title: "03/06/2022",
            event: {
              name: "",
              languageCode: "",
              parameters: {},
            },
          },
        ],
      ],
    };

    agent.add(
      new Payload(agent.UNSPECIFIED, payloadData, {
        sendAsMessage: true,
        rawPayload: true,
      })
    );
  }

  var intentMap = new Map();

  intentMap.set("Demo", demo);
  intentMap.set("A06_ArrangeMeeting", arrangeMeeting);

  agent.handleRequest(intentMap);
});
