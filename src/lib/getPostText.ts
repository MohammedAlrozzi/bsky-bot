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

//   // Extract the number of killed people in Gaza
//   const gazaKilledMatch = htmlContent.match(/Killed:\s*at\s*least\s*([\d,]+)\s*people\s*,/);
//   const gazaKilled = gazaKilledMatch ? gazaKilledMatch[1] : null;

//   // Extract the number of killed people in the West Bank
//   const westBankKilledMatch = htmlContent.match(/Occupied West Bank[\s\S]*?Killed:\s*at\s*least\s*([\d,]+)\s*people/);
//   const westBankKilled = westBankKilledMatch ? westBankKilledMatch[1] : null;

//   if (!gazaKilled || !westBankKilled) {
//     throw new Error('Could not find the target numbers in the HTML content');
//   }

//   const date = new Date();
//   const options: Intl.DateTimeFormatOptions = { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric', 
//     hour: 'numeric', 
//     minute: 'numeric', 
//     timeZone: 'Asia/Jerusalem' 
//   };
//   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

//   const now = new Date();
//   now.setHours(0, 0, 0, 0);
//   const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
//   const diffTime = Math.abs(now.getTime() - endDate.getTime());
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1); // convert milliseconds to days
  

//   const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${gazaKilled} Palestinians in Gaza and ${westBankKilled} in the West Bank, in the last ${diffDays} days.\n\nThis data was last updated: ${updateTimeText}.`;

//   return finalText;
// }



// // import axios from 'axios';
// // import cheerio from 'cheerio';



// // export default async function getPostText() {
// //   const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker';

// //   const response = await axios.get(url, {
// //     headers: {
// //       'Cache-Control': 'no-cache'
// //     }
// //   });
// //   const htmlContent = response.data;
// //   const $ = cheerio.load(htmlContent);
// //   const updateTimeElement = $('.date-updated__date');
// //   const updateTimeText = updateTimeElement.text();
  
// //   const startIndex = htmlContent.indexOf(' at ') + 4; // 4 is the length of ' at '
// //   const endIndex = htmlContent.indexOf(' Palestinians', startIndex);

// //   if (startIndex < 4 || endIndex === -1) {
// //     throw new Error('Could not find the target string in the HTML content');
// //   }

// //   const extractedText = htmlContent.slice(startIndex, endIndex);

// //   const date = new Date();
// //   const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'Asia/Jerusalem' };
// //   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

// //   // const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
// //   // const diffTime = Math.abs(date.getTime() - endDate.getTime());
// //   // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert milliseconds to days

// //   const now = new Date();
// //   now.setHours(0, 0, 0, 0);
// //   const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
// //   const diffTime = Math.abs(now.getTime() - endDate.getTime());
// //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)+1); // convert milliseconds to days

// //   const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${extractedText} Palestinians, in the last ${diffDays} days.\n\nThis data was last updated: ${updateTimeText}.`;

// //   return finalText;
// // }
import axios from 'axios';

export default async function getPostText() {
  const url = 'https://data.techforpalestine.org/api/v2/casualties_daily.min.json'; // Replace with the actual URL of the JSON data

  const response = await axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const jsonData = response.data;

  // Create a map to count occurrences of each report date
  const dateCountMap = {};
  jsonData.forEach(report => {
    const date = report.report_date;
    dateCountMap[date] = (dateCountMap[date] || 0) + 1;
  });

  // Find the date with the maximum count
  const mostReportedDate = Object.keys(dateCountMap).reduce((a, b) => dateCountMap[a] > dateCountMap[b] ? a : b);

  // Find the report corresponding to the most reported date
  const mostReportedReport = jsonData.find(report => report.report_date === mostReportedDate);

  const reportDate = new Date(mostReportedReport.report_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

  // Compare report date with today's date
  if (reportDate.getTime() === today.getTime()) {
    const gazaKilled = mostReportedReport.ext_killed_cum;

    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      timeZone: 'Asia/Jerusalem' 
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

    const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
    const diffTime = Math.abs(today.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1); // convert milliseconds to days

    const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${gazaKilled} Palestinians in Gaza, in the last ${diffDays} days.\n\nThis data was last updated: ${mostReportedReport.report_date}.`;

    return finalText;
  } else {
    return "Free Palestine";
  }
}
// posting to Mastodon
async function postToMastodon(text: string, accessToken: string) {
    try {
        const instanceUrl = 'https://mastodon.social/api/v1';
        const endpoint = '/statuses';

        const data = {
            status: text,
        };

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(`${instanceUrl}${endpoint}`, data, { headers });

        console.log('Post successful:', response.data);
    } catch (error: any) {
      console.error('Error posting to Mastodon:', error.response.data);
    }
}


const finalText = await getPostText();
const textToPost = finalText;
const accessToken_Mast = 'JGzV_TF-2lAjp67CRqYhOj0xtrLliMWK0WQoy7G5x58';

postToMastodon(textToPost, accessToken_Mast);



// import axios from 'axios';

// export default async function getPostText() {
//   const url = 'https://data.techforpalestine.org/api/v2/casualties_daily.min.json'; // Replace with the actual URL of the JSON data

//   const response = await axios.get(url, {
//     headers: {
//       'Cache-Control': 'no-cache'
//     }
//   });
//   const jsonData = response.data;

//   // Define the specific date you want to check
//   const specificDate = new Date(2024, 7, 13); // August is month 7 in JavaScript (0-based)
//   specificDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

//   // Find the report for the specific date
//   const reportForSpecificDate = jsonData.find((report: any) => {
//     const reportDate = new Date(report.report_date);
//     reportDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
//     return reportDate.getTime() === specificDate.getTime();
//   });

//   if (reportForSpecificDate) {
//     const gazaKilled = reportForSpecificDate.ext_killed_cum;

//     const options: Intl.DateTimeFormatOptions = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric', 
//       hour: 'numeric', 
//       minute: 'numeric', 
//       timeZone: 'Asia/Jerusalem' 
//     };
//     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(specificDate);

//     const endDate = new Date(2023, 9, 7); // October is month 9 in JavaScript (0-based)
//     const diffTime = Math.abs(specificDate.getTime() - endDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1); // convert milliseconds to days

//     const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${gazaKilled} Palestinians in Gaza, in the last ${diffDays} days.\n\nThis data was last updated: ${reportForSpecificDate.report_date}.`;

//     return finalText;
//   } else {
//     return "No data available for the specified date.";
//   }
// }
