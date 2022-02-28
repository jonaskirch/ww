import fs from 'fs';
import { ClientSession } from 'whatsapp-web.js';

const SESSION_FILE_PATH = './src/data/sessionData.json';

function saveSession(session: ClientSession | undefined) {
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
    if (err) {
      console.error(err);
    }
  });
}

function getSession(): ClientSession | undefined {
  let sessionData = '';
  try {
    sessionData = fs.readFileSync(SESSION_FILE_PATH).toString();
  } catch (e) {
    console.log('Session data file not load');
  }
  if (sessionData) {
    const session: ClientSession = JSON.parse(sessionData);
    return session;
  }
  return undefined;
}

export { saveSession, getSession };
