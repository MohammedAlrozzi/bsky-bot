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


//   const date = new Date();
//   const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
//   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

//   const finalText = `-- ${formattedDate} (Gaza time):\nIsrael killed more than ${extractedText} Palestinians, in the last 3 months alone.`;

//   return finalText;
// }
import axios from 'axios';
export default async function getPostText() {
  const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

  const response = await axios.get(url);
  const htmlContent = response.data;

  // First extraction
  const startIndex1 = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
  const endIndex1 = htmlContent.indexOf(' Palestinians', startIndex1);

  if (startIndex1 < 4 || endIndex1 === -1) {
    throw new Error('Could not find the target string in the HTML content');
  }

  const extractedText1 = htmlContent.slice(startIndex1, endIndex1);

  // Second extraction
  const startIndicator2 = "Updated: ";
  const endIndicator2 = " (GMT";
  const startIndex2 = htmlContent.indexOf(startIndicator2) + startIndicator2.length;
  const endIndex2 = htmlContent.indexOf(endIndicator2, startIndex2);

  if (startIndex2 < startIndicator2.length || endIndex2 === -1) {
    throw new Error('Could not find the target string in the HTML content');
  }

  const extractedText2 = htmlContent.slice(startIndex2, endIndex2);

  const date = new Date();
  const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  const finalText = `-- ${formattedDate} (Gaza time):\nIsrael killed more than ${extractedText1} Palestinians, in the last 3 months alone. ${extractedText2}`;

  return finalText;
  // Now you have both extractedText1 and extractedText2
}