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
    const a = 1;
    const b = 2;
    const c = 3;
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
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: a,
              },
            },
          },
          {
            type: "list",
            title: "02/06/2022",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: b,
              },
            },
          },
          {
            type: "list",
            title: "03/06/2022",
            event: {
              name: "meeting_date",
              languageCode: "",
              parameters: {
                value: c,
              },
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

  function getMeetingDate(agent) {
    agent.add("Alright, you already choose this selected date:");
    console.log(request.body.queryResult.outputContexts);

    infoContext = agent.context.get("meeting_date");
    console.log(infoContext);
    choice = infoContext.parameters.value;

    if (choice == 1) {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Final Meeting Confirmation",
              subtitle:
                "Please confirm are you sure want to arrange a meeting with the Academic Director?",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Yes, I'm sure",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "No, I want to reschedule",
                },
              ],
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
    } else if (choose == 2) {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Final Meeting Confirmation",
              subtitle:
                "Please confirm are you sure want to arrange a meeting with the Academic Director?",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Yes, I'm sure",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "No, I want to reschedule",
                },
              ],
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
    } else {
      var payloadData = {
        richContent: [
          [
            {
              type: "info",
              title: "Final Meeting Confirmation",
              subtitle:
                "Please confirm are you sure want to arrange a meeting with the Academic Director?",
            },
            {
              type: "divider",
            },
            {
              type: "chips",
              options: [
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/succes_icon.png",
                    },
                  },
                  text: "Yes, I'm sure",
                },
                {
                  image: {
                    src: {
                      rawUrl:
                        "https://raw.githubusercontent.com/algonacci/Free-CDN/main/fail_icon.png",
                    },
                  },
                  text: "No, I want to reschedule",
                },
              ],
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
  }

  var intentMap = new Map();

  intentMap.set("Demo", demo);
  intentMap.set("A06_ArrangeMeeting", arrangeMeeting);
  intentMap.set("A06_ArrangeMeeting - custom", getMeetingDate);

  agent.handleRequest(intentMap);
});
