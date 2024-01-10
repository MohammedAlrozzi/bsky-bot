// import axios from 'axios';
// import cheerio from 'cheerio';


// export default async function getPostText() {
//   const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

//   const response = await axios.get(url, {
//     headers: {
//       'Cache-Control': 'no-cache'
//     }
//   });
//   const htmlContent = response.data;
//   const $ = cheerio.load(htmlContent);
//   const updateTimeElement = $('.date-updated__date');
//   const updateTimeText = updateTimeElement.text();
  
//   const startIndex = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
//   const endIndex = htmlContent.indexOf(' Palestinians', startIndex);

//   if (startIndex < 4 || endIndex === -1) {
//     throw new Error('Could not find the target string in the HTML content');
//   }

//   const extractedText = htmlContent.slice(startIndex, endIndex);

//   const date = new Date();
//   const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
//   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

//   const finalText = `${formattedDate} (Gaza time):\n••• Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.\n\nThis data was last updated: ${updateTimeText}.`;

//   return finalText;
// }
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

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
  const filePath = path.resolve(__dirname, 'lastExtractedText.txt');

let lastExtractedText = '';
if (fs.existsSync(filePath)) {
  lastExtractedText = fs.readFileSync(filePath, 'utf-8');
}

if (extractedText !== lastExtractedText) {
  fs.writeFileSync(filePath, extractedText);

  const date = new Date();
  const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  const finalText = `${formattedDate} (Gaza time):\n••• Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.\n\nThis data was last updated: ${updateTimeText}.`;

  return finalText;
} else {
  return 'Palestine will be free.';
}
  // const date = new Date();
  // const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // const finalText = `${formattedDate} (Gaza time):\n••• Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.\n\nThis data was last updated: ${updateTimeText}.`;

  // return finalText;
}