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




// Set up your Twitter API credentials
const twitterConfig = {
  consumer_key: 'G3FiLP9lewiNTjULJ3mAiiZ0j',
  consumer_secret: 'uMP0Dt70ItL6nHg8Lh0EvSf0mvJ8NHlShuM24MXjrZK5EEJewk',
};

// Function to get a bearer token
const getBearerToken = async () => {
  const credentials = Buffer.from(`${twitterConfig.consumer_key}:${twitterConfig.consumer_secret}`).toString('base64');

  const response = await axios.post(
    'https://api.twitter.com/oauth2/token',
    qs.stringify({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  );

  return response.data.access_token;
};

// Function to get tweets
const getTweets = async (bearerToken: string, query: string) => {
  const response = await axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${query}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  console.log(response.data);
};

// Usage example
const run = async () => {
  const bearerToken = await getBearerToken();
  await getTweets(bearerToken, 'twitter');
};

run();

