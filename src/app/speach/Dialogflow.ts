import dialogflow from 'dialogflow';
import {injectable} from 'inversify';
import {Answer} from './Answer';

@injectable()
export class Dialogflow {

  public async ask(question: string): Promise<Answer> {
    const projectId = 'demo2-c3d45'; // https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const query = question;
    const languageCode = 'en-US';

    try {
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode,
          },
        },
      };

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      console.log(result);
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log('  No intent matched.');
      }
      return new Answer(result.fulfillmentText, result.intent.name);
    } catch (e) {
      console.log(e);
      return new Answer(e.message, 'Detecting intent failed');
    }
  }
}
