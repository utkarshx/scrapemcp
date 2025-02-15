const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Added axios import

const folderPath = path.join(__dirname, 'Myreadme');
const files = fs.readdirSync(folderPath);

async function askFromLLM(readmeContent, fileName) {
    const url = 'http://localhost:1234/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json'
    };
    const data = {
        model: 'phi-3-mini-4k-instruct',
        messages: [
            { role: 'system', content: 'Find the MCP settings in the provided README content. The MCP Setting would be something like {\"mcpServers\": {}}. There could be multiple Settings for docker or uv or npx or npm or any other format. Please Reply only with the asnwer in yaml format with name of type and the mcp config. send it under mcps key in yaml' },
            { role: 'user', content: readmeContent }
        ],
        temperature: 0.7,
        max_tokens: 8000,
        stream: false
    };

    try {
        const response = await axios.post(url, data, { headers });
        let mcpSetting = response.data.choices[0].message.content;
        console.log('MCP Setting:', mcpSetting);

        // Remove ```yaml and ``` from the beginning and end if present
        mcpSetting = mcpSetting.replace(/^```yaml\s*|```$/g, '').trim();

        if (!fs.existsSync('finalmcpdata')) {
            fs.mkdirSync('finalmcpdata');
        }

        const filePath = path.join('finalmcpdata', `${fileName}_mcp.yaml`);
        fs.writeFileSync(filePath, mcpSetting, 'utf8');
    } catch (error) {
        console.error('Error connecting to LM Studio:', error.message);
    }
}

async function processReadmeFiles() {
    for (const file of files) {
        console.log("Starting file:" + file);
        const filePath = path.join(folderPath, file);
        const readmeContent = fs.readFileSync(filePath, 'utf8');
        await askFromLLM(readmeContent, path.parse(file).name);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Add a delay of 20 seconds
    }
}

processReadmeFiles()
