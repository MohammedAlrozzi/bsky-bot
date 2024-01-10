import axios from 'axios';
import cheerio from 'cheerio';

// Implementation of postWithPhoto from previous example
export function postWithPhoto(text) {
  const photoUrl = 'https://www.aljazeera.com/wp-content/uploads/2023/10/Interactive-Humanitarian-graphics-all_Jan9_2024-1704811524.jpg?w=770&quality=80';

  const post = {
    text: text, 
    attachments: [
      {
        type: 'photo',
        url: photoUrl
      }
    ]
  };

  blueskyPost(post); 
}

async function generateTextPost() {

  // Existing code to fetch page and extract text
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

  const finalText = `${formattedDate} (Gaza time):\n••• Israel killed more than ${extractedText} Palestinians, in the last 3 months alone.\n\nThis data was last updated: ${updateTimeText}.`;


  // Post with photo
  postWithPhoto(finalText);

}

generateTextPost();