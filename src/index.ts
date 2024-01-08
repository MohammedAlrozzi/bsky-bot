import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

const text = await Bot.run(getPostText);

console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
// import Bot from "./lib/bot.js";
// import getPostText from "./lib/getPostText.js";

// async function main() {
//   const text = await Bot.run(getPostText);
//   console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
// }

// main().catch(error => {
//   console.error(error);
// });