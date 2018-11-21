import App from './App';
import {container} from './di/inversify.config';
import {TYPES} from './di/types';

const app: App = container.get(TYPES.App);
const port = process.env.PORT || 3000;

app.app.listen(port, (err: Error) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});
