import * as appSettings from '../appSettings.json';
import { OAuth2Client } from 'google-auth-library';

export default class GoogleAuth {
  static client = new OAuth2Client(appSettings.Google.ClientID);
  
  static async authorize(token) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: appSettings.Google.ClientID
    });
    const payload = ticket.getPayload();
  
    console.log(`User ${payload.name} verified`);
  
    const { sub, email, name, picture } = payload;
    const userId = sub;
    return {
      userId, email, fullName: name, photoUrl: picture
    };
  }
}