import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'querystring';




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
const accessToken = 'JGzV_TF-2lAjp67CRqYhOj0xtrLliMWK0WQoy7G5x58';

postToMastodon(textToPost, accessToken);





// Replace 'YOUR_BEARER_TOKEN' with your actual Bearer token obtained from Twitter Developer Portal
const bearerToken = 'AAAAAAAAAAAAAAAAAAAAALqZrgEAAAAA8LDyGMp27KVyt3TYz9s8fnusR6M%3DVhuy6ITmAqYfDzfsSQc8ySQrPutZUuvgK8syEyMa1q27fq0OSh';

// The URL for the Twitter API endpoint to create a tweet
const twitterApiUrl = 'https://api.twitter.com/2/tweets';

// The message you want to post
const message = 'test';

// Set up the request headers
const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json'
};

// The data for the tweet
const postData = {
  text: message
};

// Function to post a tweet
async function postTweet() {
  try {
    const response = await axios.post(twitterApiUrl, postData, { headers: headers });
    console.log('Tweet posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

// Call the function to post the tweet
postTweet();
