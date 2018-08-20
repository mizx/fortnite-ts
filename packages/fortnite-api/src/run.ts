import { Auth } from './auth/auth';
import { EPIC_USERNAME, EPIC_PASSWORD } from './config';

if (!EPIC_USERNAME) {
  throw Error('EPIC_USERNAME environment variable is not set');
}

if (!EPIC_PASSWORD) {
  throw Error('EPIC_PASSWORD environment variable is not set');
}

Auth.login(EPIC_USERNAME, EPIC_PASSWORD);
