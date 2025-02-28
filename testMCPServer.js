import { createClient } from '@modelcontextprotocol/sdk';
import { config } from 'dotenv';

// Load Environment Variables
config();

async function main() {
    // Check for the presence of the environment variable
    if (!process.env.OPENROUTER_API_KEY) {
        console.error("Missing API key. Make sure your .env file contains OPENROUTER_API_KEY.");
        return;
    }

    // Create a client instance to connect to your server
    const client = createClient({
        transport: 'stdio',
        command: 'node build/index.js'
    });

    try {
        // Make a request using the client instance
        const response = await client.request('mcp_request', {
            // Assuming your SDK uses:
            // { container: { server_name, tool_name, arguments } }
            container: {
                server_name: "deepseek-claude",
                tool_name: "generate_response",
                arguments: { prompt: "What is 2+2?" }
            }
        });

        console.log("Response:", response.result?.content);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
