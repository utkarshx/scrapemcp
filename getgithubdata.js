const axios = require('axios');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

async function fetchReadmeContent(repoUrl) {
    const rawUrl = repoUrl.replace('github.com', 'raw.githubusercontent.com') + '/refs/heads/main/README.md';
    try {
        const response = await axios.get(rawUrl);
        return response.data;
    } catch (error) {
        // console.error(`Error fetching README from ${rawUrl}:`, error.message);
        console.log(`Failed to fetch README for repo: ${repoUrl}`);
        return null;
    }
}



async function processLinks() {
    try {
        const fileContent = fs.readFileSync('found_links.yaml', 'utf8');
        const links = yaml.load(fileContent);

        if (!fs.existsSync('Myreadme')) {
            fs.mkdirSync('Myreadme');
        }

        for (const link of links) {
            const readmeContent = await fetchReadmeContent(link.targetLink);
            if (readmeContent) {
                const fileName = path.join('Myreadme', `${link.pageurl.replace('/server/', '')}_README.md`);
                fs.writeFileSync(fileName, readmeContent, 'utf8');
            }
        }
    } catch (error) {
        console.error('Error processing links:', error.message);
    }
}

processLinks();
