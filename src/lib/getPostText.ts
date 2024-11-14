
import axios from "axios";
import { DateTime } from "luxon";

interface Report {
  report_date: string;
  ext_killed_cum: number;
}

export default async function getPostText(): Promise<string> {
  const url =
    "https://data.techforpalestine.org/api/v2/casualties_daily.min.json";

  const response = await axios.get<Report[]>(url, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const jsonData = response.data;

  const dateCountMap: Record<string, number> = {};
  jsonData.forEach((report: Report) => {
    const date = report.report_date;
    dateCountMap[date] = (dateCountMap[date] || 0) + 1;
  });

  const mostReportedDate = Object.keys(dateCountMap).reduce((a, b) =>
    dateCountMap[a] > dateCountMap[b] ? a : b,
  );
  const mostReportedReport = jsonData.find(
    (report: Report) => report.report_date === mostReportedDate,
  );

  if (!mostReportedReport) {
    return "No report found for the most reported date.";
  }

  const gazaKilled = mostReportedReport.ext_killed_cum;

  // Get current date and time in Gaza
  const currentGazaTime = DateTime.now().setZone("Asia/Gaza");
  const formattedDate = currentGazaTime.toFormat("MMMM d, yyyy, h:mm a");

  // Calculate diffDays based on mostReportedReport.report_date
  const endDate = DateTime.fromObject({ year: 2023, month: 10, day: 7 }); // October 7, 2023
  const reportDate = DateTime.fromISO(mostReportedReport.report_date).startOf(
    "day",
  );
  const diffDays = Math.ceil(reportDate.diff(endDate, "days").days + 1);

  const finalText = `- ${formattedDate} (Gaza time):\nDay ${diffDays} of the Gaza Genocide:\nIsrael killed more than ${gazaKilled} Palestinians in Gaza, in the last ${diffDays} days.\n\nThis data was last updated: ${mostReportedReport.report_date}.(Read more about the figures here: https://arabcenterdc.org/resource/the-lancet-and-genocide-by-slow-death-in-gaza/)`;

  return finalText;
}

// posting to Mastodon
async function postToMastodon(text: string, accessToken: string) {
  try {
    const instanceUrl = "https://mastodon.social/api/v1";
    const endpoint = "/statuses";

    const data = {
      status: text,
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(`${instanceUrl}${endpoint}`, data, {
      headers,
    });

    console.log("Post successful:", response.data);
  } catch (error: any) {
    console.error("Error posting to Mastodon:", error.response.data);
  }
}

const finalText = await getPostText();
const textToPost = finalText;
const accessToken_Mast = "JGzV_TF-2lAjp67CRqYhOj0xtrLliMWK0WQoy7G5x58";

postToMastodon(textToPost, accessToken_Mast);

