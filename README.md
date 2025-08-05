# Real-Time City Weather Server (MCP)

Editor Markdown es un editor online que se ejecuta en tu navegador y que funciona tanto con tus archivos locales como con varios servicios de almacenamiento cloud.

## Markdown
Developed a custom MCP server that fetches and broadcasts real-time weather data (temperature, precipitation, etc.) for any city. Designed to integrate seamlessly with Minecraft clients while pulling live weather APIs for accuracy.

## How to used it

First of all, you need to clone this repository and install the dependencies:

```
git clone https://github.com/claude-mcp/mcp-server-01.git
cd mcp-server-01
npm install
```

Then, you need to configure your server.

### Claude desktop
Settings -> Configurations -> Developer -> Edit configuration
Open the file and add:
```
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "C:/mcp/mcp-server-01/src/index.ts"  //Here you put the route of your cloned repoitory
      ]
    }
  }
}
```

### Visual Studio Code

1. Open mcp.json:
```
{
    "inputs": [],
    "servers": {
        "mcp-server-time": {
            "command": "npx",
            "args": [
                "-y",
                "tsx",
                "C:/mcp/mcp-server-01/src/index.ts" <-- Here type your repository route
            ],
            "env": {}
        }
    }
}
```

2. Open the terminal and run the command:
```
code --add-mcp '{"name":"mcp-server-time","command":"npx","args":["-y","tsx","C:/mcp/mcp-server-01/src/index.ts"],"env":{}}'
```