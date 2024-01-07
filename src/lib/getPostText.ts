// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }
import Twitter from 'twitter-lite';

export default async function getPostText() {
  const client = new Twitter({
    consumer_key: 'zmEna2xd5pwakykKhJvMGWujc',
    consumer_secret: 'UtByzhHArs0bR0j5QqxZ3bA3JSqmzG2SyT43LRtXLL2eeAyPy4',
    access_token_key: '243448555-PfPPClWzgU2raJdu5DJgzMAjTgpDGzyO0ZLPropk',
    access_token_secret: 'bQNa0osgnLPhOEtPPn60XGT8dgab2u5S63SL8SfkmhixO',
  });

  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

  const tweets = await client.get('statuses/user_timeline', { screen_name: 'your_username', count: 200 });

  const recentTweets = tweets.filter((tweet: any) => {
    const tweetDate = new Date(tweet.created_at);
    return tweetDate > threeHoursAgo;
  });

  const tweetUrls = recentTweets.map((tweet: any) => `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);

  return tweetUrls;
}