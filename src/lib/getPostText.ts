import axios from 'axios';

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


  const startIndex2 = htmlContent.indexOf('Here are the latest casualty figures as of ') + 43; // 4 is the length of ' at '
  const endIndex2 = htmlContent.indexOf(' in Gaza (', startIndex2);

  if (startIndex2 < 43 || endIndex2 === -1) {
    throw new Error('Could not find the target string in the HTML content');
  }

  const extractedText2 = htmlContent.slice(startIndex2, endIndex2);



  const date = new Date();
  const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  const finalText = `-- ${formattedDate} (Gaza time):\nIsrael killed more than ${extractedText} Palestinians, in the last 3 months alone.\n\nThis data was last updated on ${extractedText2} Gaza time.`;

  return finalText;
}