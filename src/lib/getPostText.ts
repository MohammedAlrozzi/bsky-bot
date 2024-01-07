import axios from 'axios';
import cheerio from 'cheerio';

export default async function getPostText() {
  const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // Replace the selector with the actual selector for the number you want to extract
  const number = $('your_selector').text();

  return number;
}

// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }