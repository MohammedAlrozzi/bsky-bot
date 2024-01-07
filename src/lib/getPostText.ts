import axios from 'axios';
import Twitter from 'twitter-lite';

export default async function getPostText() {
  const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

  const response = await axios.get(url);
  const htmlContent = response.data;

  const startIndex = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
  const endIndex = htmlContent.indexOf(' Palestinians', startIndex);

  if (startIndex < 4 || endIndex === -1) {
    throw new Error('Could not find the target string in the HTML content');
  }

  const extractedText = htmlContent.slice(startIndex, endIndex);

  const finalText = `Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.`;

  const client = new Twitter({
    consumer_key: 'zmEna2xd5pwakykKhJvMGWujc',
    consumer_secret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
    access_token_key: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
    access_token_secret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO',
  });

  const tweet = await client.post('statuses/update', { status: finalText });

  return finalText;
}
// import axios from 'axios';

// export default async function getPostText() {
//   const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

//   const response = await axios.get(url);
//   const htmlContent = response.data;

//   const startIndex = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
//   const endIndex = htmlContent.indexOf(' Palestinians', startIndex);

//   if (startIndex < 4 || endIndex === -1) {
//     throw new Error('Could not find the target string in the HTML content');
//   }

//   const extractedText = htmlContent.slice(startIndex, endIndex);

//   const finalText = `Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.`;


//   return finalText;
// }
// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }