export default async function getPostText() {
  const options = ["From the river to the sea", "Palestine will be free", "Justice will be served", "Free Free Palestine", "what do we want? - Justice. When do we want it? - Now"]; // Add your options here
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}