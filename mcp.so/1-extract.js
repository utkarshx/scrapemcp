//Awesome mcpserver https://mcpservers.org

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const yaml = require('js-yaml');
const { title } = require("process");

async function getLinks(htmlFile) {
    try {
      const response = await fetch(htmlFile);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
  
      const dom = new JSDOM(html);
      const doc = dom.window.document;
  
      const linksWithTitles = [];
      const container = doc.querySelector('.grid.grid-cols-1'); // Target the container div
      
      if (container) {
          const aTags = container.querySelectorAll('a'); // Get all <a> tags inside

          aTags.forEach(a => {
              const href = a.href.trim();
              const titleElement = a.querySelector('span.text-lg'); // Get the title from <span class="text-lg">
              const title = titleElement ? titleElement.textContent.trim() : "Unknown";

              if (href.startsWith('/category')) {
                  linksWithTitles.push({ title, href });
              }
          });
      }

      // Convert links array to YAML format
      const yamlLinks = yaml.dump({ categories: linksWithTitles });
     

      // Save the YAML to a file
      fs.writeFileSync('links2.yaml', yamlLinks, 'utf8');

      return yamlLinks;
    } catch (error) {
      console.error("Error fetching or parsing HTML:", error);
      return []; // Return an empty array in case of error
    }
  }
  
  // Example usage:
  getLinks('https://mcp.so/categories') // Relative path to HTML file
    .then(links => console.log(links));

