//Awesome mcpserver https://mcpservers.org

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const yaml = require('js-yaml');

async function getLinks(htmlFile) {
    try {
      const response = await fetch(htmlFile);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
  
      const dom = new JSDOM(html);
      const doc = dom.window.document;
  
      const links = [];
      const aTags = doc.querySelectorAll('a');
      aTags.forEach(a => {
        links.push(a.href);
      });

      // Convert links array to YAML format
      const yamlLinks = yaml.dump({ links: links });

      // Save the YAML to a file
      fs.writeFileSync('links.yaml', yamlLinks, 'utf8');

      return links;
    } catch (error) {
      console.error("Error fetching or parsing HTML:", error);
      return []; // Return an empty array in case of error
    }
  }
  
  // Example usage:
  getLinks('https://mcp.so/categories') // Relative path to HTML file
    .then(links => console.log(links));