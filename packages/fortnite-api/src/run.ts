import { Auth } from './auth';
import { EPIC_USERNAME, EPIC_PASSWORD } from './config';

if (!EPIC_USERNAME || !EPIC_PASSWORD) {
  throw Error('Authentication environment variables not set');
}

Auth.login(EPIC_USERNAME, EPIC_PASSWORD);
