// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }
import Twit from 'twit';

export default async function getPostText() {
  const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"];
  const randomIndex = Math.floor(Math.random() * options.length);

  const T = new Twit({
    consumer_key: 'zmEna2xd5pwakykKhJvMGWujc',
    consumer_secret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
    access_token: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
    access_token_secret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO',
  });

  const tweets = await T.get('statuses/user_timeline', { screen_name: 'your_username', count: 200 });
  
  const tweetUrls = tweets.data.map((tweet: any) => `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);

  return tweetUrls.length > 0 ? tweetUrls : options[randomIndex];
}