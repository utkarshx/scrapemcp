// https://mcp.so/categories

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yaml = require('js-yaml');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Load links from links.yaml
const linksFile = 'links.yaml';
const baseUrl = 'https://mcp.so';
const outputDir = 'mcpso';
const pageLinksFile = 'pagelinks.yaml';

async function fetchPageLinks(url) {
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const doc = dom.window.document;
        const aTags = doc.querySelectorAll('a');
        const urls = Array.from(aTags)
            .map(a => a.href)
            .filter(href => href.startsWith('/server')); // Filter URLs starting with /server
        return urls;
    } catch (error) {
        console.error(`Error fetching links from ${url}:`, error);
        return [];
    }
}

async function main() {
    try {
        const fileContents = fs.readFileSync(linksFile, 'utf8');
        const data = yaml.load(fileContents);
        const links = data.links;
        const pageLinks = [];

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        for (const link of links) {
            const url = `${baseUrl}${link}`;
            const outputPath = path.join(outputDir, `${link.replace(/\//g, '_')}.html`);
            const pageUrls = await fetchPageLinks(url);
            pageLinks.push({ pageurl: link, urls: pageUrls });
        }

        const yamlPageLinks = yaml.dump({ links: pageLinks });
        fs.writeFileSync(pageLinksFile, yamlPageLinks, 'utf8');
        console.log(`Saved page links to ${pageLinksFile}`);
    } catch (error) {
        console.error('Error processing links:', error);
    }
}

main();
