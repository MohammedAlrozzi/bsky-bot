import axios from 'axios';

async function postToMastodon(text: string, accessToken: string) {
    try {
        const instanceUrl = 'https://your-mastodon-instance.com/api/v1';
        const endpoint = '/statuses';

        const data = {
            status: text,
        };

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(`${instanceUrl}${endpoint}`, data, { headers });

        console.log('Post successful:', response.data);
    } catch (error) {
        console.error('Error posting to Mastodon:', error.response.data);
    }
}

// Usage example
const textToPost = 'Hello, Mastodon!';
const accessToken = 'JGzV_TF-2lAjp67CRqYhOj0xtrLliMWK0WQoy7G5x58';

postToMastodon(textToPost, accessToken);