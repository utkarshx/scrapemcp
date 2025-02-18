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

  const finalData = []
  const SubData = []

  for (const category of pagelinks) {
    if (!category.pageUrls || !Array.isArray(category.pageUrls)) {
      console.error(`Invalid urls format for category ${category.pageUrls}. Expected an array.`);
      continue;
    }
    

    for (const pageurl of category.pageUrls) {


      const targetLink = await findMcpServerLink(pageurl.href);
      console.log(targetLink);
     
    SubData.push({pageurl, targetLink: targetLink});
      

    }
    console.log(SubData);
  }



})();
