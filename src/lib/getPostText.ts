import axios from 'axios';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import * as crypto from 'crypto';




export default async function getPostText() {
  const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

  const response = await axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const htmlContent = response.data;
  const $ = cheerio.load(htmlContent);
  const updateTimeElement = $('.date-updated__date');
  const updateTimeText = updateTimeElement.text();
  
  const startIndex = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
  const endIndex = htmlContent.indexOf(' Palestinians', startIndex);

  if (startIndex < 4 || endIndex === -1) {
    throw new Error('Could not find the target string in the HTML content');
  }

  const extractedText = htmlContent.slice(startIndex, endIndex);

  const date = new Date();
  const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
  // const diffTime = Math.abs(date.getTime() - endDate.getTime());
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert milliseconds to days

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
  const diffTime = Math.abs(now.getTime() - endDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)+1); // convert milliseconds to days

  const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${extractedText} Palestinians, in the last ${diffDays} days alone.\n\nThis data was last updated: ${updateTimeText}.`;

  return finalText;
}

// posting to Mastodon
async function postToMastodon(text: string, accessToken: string) {
    try {
        const instanceUrl = 'https://mastodon.social/api/v1';
        const endpoint = '/statuses';

        const data = {
            status: text,
        };

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(`${instanceUrl}${endpoint}`, data, { headers });

        console.log('Post successful:', response.data);
    } catch (error: any) {
      console.error('Error posting to Mastodon:', error.response.data);
    }
}


const finalText = await getPostText();
const textToPost = finalText;
const accessToken_Mast = 'JGzV_TF-2lAjp67CRqYhOj0xtrLliMWK0WQoy7G5x58';

postToMastodon(textToPost, accessToken_Mast);







// Set up client credentials
const clientId = 'QnFnNFBVd29xU1JINkk2UFZwdkk6MTpjaQ';
const clientSecret = '1QzJfIeJFI5aDXpRGBbU758QKyO1ZvBTes4f3ZlOUneHIwkpXj';
const redirectUri = 'https://alruzzi.info';
const scope = 'tweet.write';

// Step 1: Construct an Authorize URL
const codeVerifier = crypto.randomBytes(64).toString('hex');
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64');
const state = crypto.randomBytes(16).toString('hex');
const authorizeUrl = `https://api.twitter.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&code_challenge=${codeChallenge}&state=${state}`;

// Step 2: Obtain an Authorization Code
// Handle the redirect and extract the auth_code and state

// Step 3: Exchange Authorization Code for Access Token
const authCode = 'AAAAAAAAAAAAAAAAAAAAALqZrgEAAAAAW6%2BZTByIk54LCAiyIZhaqKt%2FpQQ%3DvCTWqVkBz6DaKYCP30OJFDdJxIzVtf1LlRvtYYE9EjUGlRxcVo'; // Replace 'YOUR_AUTHORIZATION_CODE' with the actual authorization code
const tokenParams = new URLSearchParams({
  client_id: clientId,
  client_secret: clientSecret,
  redirect_uri: redirectUri,
  code: authCode,
  code_verifier: codeVerifier,
  grant_type: 'authorization_code'
});

const tokenResponse = await fetch('https://api.twitter.com/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: tokenParams
});
const { access_token, refresh_token } = await tokenResponse.json();

// Step 4: Create the Tweet
const tweetText = 'Hello, this is my first Tweet!';
const tweetResponse = await fetch('https://api.twitter.com/2/tweets', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: tweetText })
});
const createdTweet = await tweetResponse.json();
console.log(createdTweet);