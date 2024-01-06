// export default async function getPostText() {
//   // Generate the text for your post here. You can return a string or a promise that resolves to a string
//   return "Palestine will be free";
// }
export default async function getPostText() {
  const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine"]; // Add your options here
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}