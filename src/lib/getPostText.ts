// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }
import { TwitterApi, TweetV1 } from 'twitter-api-v2';

export default async function getPostText() {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const randomIndex = Math.floor(Math.random() * options.length);

  const client = new TwitterApi({
    appKey: 'zmEna2xd5pwakykKhJvMGWujc',
    appSecret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
    accessToken: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
    accessSecret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO',
  });

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const paginator = await client.v1.userTimeline('your_username');

  let tweetUrls = [];
  for (const page of paginator.pages) {
    for (const tweet of page) {
      const tweetDate = new Date(tweet.created_at);
      if (tweetDate > thirtyMinutesAgo && (tweet.is_quote_status || 'retweeted_status' in tweet)) {
        tweetUrls.push(`https://twitter.com/mohammedalrozzi/status/${tweet.id_str}`);
      }
    }
  }

  return tweetUrls.length > 0 ? tweetUrls[0] : options[randomIndex];
}