// https://mcp.so/categories

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yaml = require('js-yaml');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Load links from links.yaml
const linksFile = 'links2.yaml';
const baseUrl = 'https://mcp.so';
const outputDir = 'mcpso';
const pageLinksFile = 'pagelinks3.yaml';

async function fetchServerLinks(url) {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const doc = dom.window.document;

        const serverData = [];
        const container = doc.querySelector('.mb-8'); // Select the main container

        if (container) {
            const aTags = container.querySelectorAll('a[href^="/server"]'); // Select all <a> tags with href starting with /server

            aTags.forEach(a => {
                const href = a.href.trim();
                const titleElement = a.querySelector('p.font-semibold'); // Title inside <p class="text-base font-semibold">
                const title = titleElement ? titleElement.textContent.trim() : "Unknown";

                const descriptionElement = a.querySelector('p.line-clamp-3'); // Description inside <p class="text-sm text-[#636262] line-clamp-3">
                const description = descriptionElement ? descriptionElement.textContent.trim() : "";

                // const imgElement = a.querySelector('img.mr-4 inline-block h-16 w-16 object-cover rounded-full'); // Avatar image inside <img>
                // const imgUrl = imgElement ? imgElement.src : "";

                serverData.push({ title, href, description });
            });
        }
        return serverData;
    } catch (error) {
        console.error(`Error fetching links from ${url}:`, error);
        return [];
    }
}

async function findMcpServerLink(pageurl) {
    try {
      const response = await axios.get(`${baseUrl}${pageurl}`);
      const dom = new JSDOM(response.data);
      const linkElements = dom.window.document.querySelectorAll('a');
      
      for (const linkElement of linkElements) {
        if( linkElement.classList.contains('flex') &&
            linkElement.classList.contains('items-center') &&
            linkElement.classList.contains('gap-2') &&
            linkElement.classList.contains('rounded-md') &&
            linkElement.classList.contains('border') &&
            linkElement.classList.contains('border-solid') &&
            linkElement.classList.contains('bg-primary') &&
            linkElement.classList.contains('text-white') &&
            linkElement.classList.contains('px-6') &&
            linkElement.classList.contains('py-3') &&
            linkElement.classList.contains('truncate')) {
          return linkElement.href;
        }
      }
    } catch (error) {
      console.error(`Error fetching ${pageurl}:`, error);
    }
    return null;
}

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

async function main() {
    try {
        const fileContents = fs.readFileSync(linksFile, 'utf8');
        const data = yaml.load(fileContents);
        const links = data.categories;
        const pageLinks = [];

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        for (const link of links) {
            const url = `${baseUrl}${link.href}`;
            const pageUrls = await fetchServerLinks(url);
            // console.log("pageUrls--",pageUrls);

            const updatedPageUrls = [];
            for (const page of pageUrls) {
                const githubUrl = await findMcpServerLink(page.href);
                const readmeContent = await fetchReadmeContent(githubUrl);
                let fileName = null;
                    if (readmeContent) {
                        const dir = 'Myreadme2';
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        fileName = path.join(dir, `${page.href.replace('/server/', '')}_README.md`);
                        fs.writeFileSync(fileName, readmeContent, 'utf8');
                    }
                    updatedPageUrls.push({ ...page, githubUrl, readmeFile: fileName });
                console.log("githubUrl--",githubUrl)
                console.log("githubUrl--",githubUrl)
                updatedPageUrls.push({ ...page, githubUrl, readmeFile: fileName });
            }
            pageLinks.push({category: link.title, pageurl: link.href,pageDetails: updatedPageUrls});
        }
        // console.log(pageLinks);

        const yamlPageLinks = yaml.dump({ links: pageLinks });
        fs.writeFileSync(pageLinksFile, yamlPageLinks, 'utf8');
        console.log(`Saved page links to ${pageLinksFile}`);
    } catch (error) {
        console.error('Error processing links:', error);
    }
}

main();
