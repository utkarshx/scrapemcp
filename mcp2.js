const fs = require('fs');
const yaml = require('js-yaml');
const axios = require('axios');
const { JSDOM } = require('jsdom');

// Load the YAML file
let pagelinks;
try {
  const fileContents = fs.readFileSync('pagelinks.yaml', 'utf8');
  pagelinks = yaml.load(fileContents).links;
} catch (error) {
  console.error('Error loading pagelinks.yaml:', error);
  pagelinks = [];
}

// Base URL
const baseurl = 'https://mcp.so';

// Function to find the link with the specified button
async function findMcpServerLink(pageurl) {
  try {
    const response = await axios.get(`${baseurl}${pageurl}`);
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

// Iterate through the pagelinks and find the target links
(async () => {
  if (!Array.isArray(pagelinks)) {
    console.error('Invalid pagelinks format. Expected an array.');
    return;
  }

  for (const category of pagelinks) {
    if (!category.urls || !Array.isArray(category.urls)) {
      console.error(`Invalid urls format for category ${category.pageurl}. Expected an array.`);
      continue;
    }

    for (const pageurl of category.urls) {
      const targetLink = await findMcpServerLink(pageurl);
      if (targetLink) {
        console.log(`Found the link for ${pageurl}:`, targetLink);
        const foundLinkYaml = yaml.dump([{ pageurl, targetLink }], { noRefs: true });
        
        // Save the found link to a file immediately
        try {
          fs.appendFileSync('found_links.yaml', foundLinkYaml, 'utf8');
          console.log(`Saved found link for ${pageurl} to found_links.yaml`);
        } catch (error) {
          console.error('Error saving found link:', error);
        }
      } else {
        console.log(`Link not found for ${pageurl}.`);
      }
    }
  }
})();
