export default async function getPostText() {
  const url = 'https://www.aljazeera.com/news/longform/2023/10/9/israel-hamas-war-in-maps-and-charts-live-tracker?text=<at>123</Palestinians>';
  const startTag = '<at>';
  const endTag = '</Palestinians>';
  
  const startIndex = url.indexOf(startTag) + startTag.length;
  const endIndex = url.indexOf(endTag);
  
  const number = url.substring(startIndex, endIndex);
  return number
// console.log(number); // 123
}

// export default async function getPostText() {
//   const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
//   const randomIndex = Math.floor(Math.random() * options.length);
//   return options[randomIndex];
// }