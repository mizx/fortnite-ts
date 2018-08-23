import { Auth } from './auth';
import { EPIC_USERNAME, EPIC_PASSWORD } from './config';

async function run() {
  if (!EPIC_USERNAME) {
    throw Error('EPIC_USERNAME environment variable is not set');
  }

  if (!EPIC_PASSWORD) {
    throw Error('EPIC_PASSWORD environment variable is not set');
  }

  const auth = await Auth.login(EPIC_USERNAME, EPIC_PASSWORD);

  console.log(`access token: ${auth.getToken()}`);

  auth.close();
}

run();
