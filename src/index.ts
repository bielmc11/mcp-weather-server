import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

//1 Creo el servidor
//Maneja la comunicacion entre el cliente y el servidor

const server = new McpServer({
  name: "server-01",
  port: 3000,
  version: "1.0.0",
});

//2 Definir herramientas
//el Lmm podra realizar acciones a través de tu servidor

server.registerTool(
  "add",
  {
    title: "Additional_tool ",
    description: "Add two numbers with two inputs",
    inputSchema: { a: z.number(), b: z.number() },
  },

  async ({ a, b }) => ({
    content: [
      {
        type: "text",
        text: `The sum of ${a} and ${b} is ${a + b}`,
      },
    ],
  })
);

server.registerTool(
  "weather",
  {
    title: "Weather Tool",
    description: "Get the weather for a given location",
    inputSchema: {
      city: z.string(),
    },
  },
  async ({ city }) => {
    try {
      const data = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      const res = await data.json();

      if (res.results.length === 0) throw new Error("City not found");

      const { latitude, longitude } = res.results[0];

      const dataCity = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation`
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(await dataCity.json(), null, 2),
          },
        ],
      };
    } catch (e) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting the weather for ${city}`,
          },
        ],
      };
    }
  }
);

//3 Escuchar las conexiones del cliente
//Lo utilizamos en local no en internet por eso queremos el estandar de entrada y salida de nuestra maquina

const transport = new StdioServerTransport();
await server.connect(transport);
