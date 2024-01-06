// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }
import { TwitterApi } from 'twitter-api-v2';

export default async function getPostText() {
  const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine"];
  const randomIndex = Math.floor(Math.random() * options.length);

  const client = new TwitterApi({
    appKey: 'zmEna2xd5pwakykKhJvMGWujc',
    appSecret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
    accessToken: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
    accessSecret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO',
  });

  
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const tweets = await client.v1.search('from:your_username', { until: thirtyMinutesAgo.toISOString() });

  const retweetsAndQuotes = tweets.statuses.filter(tweet => tweet.is_quote_status || 'retweeted_status' in tweet);
  const tweetUrls = retweetsAndQuotes.map(tweet => `https://twitter.com/mohammedalrozzi/status/${tweet.id_str}`);

  return tweetUrls.length > 0 ? tweetUrls[0] : options[randomIndex];
}