import { readFilesRecursively } from "../utility/index.js";

export const files = await readFilesRecursively(process.cwd());

export const nodes = [
  {
    id: "express",
    name: "The Great Unknown Express",
    port: 3000,
    prod: "https://gkrane.online/",
    dev: "https://bawell.online",
  },
  {
    id: "ai",
    name: "The AI Community",
    port: 5000,
    prod: "https://ai.gkrane.online",
    dev: "https://ai.bawell.online",
  },
  {
    id: "stores",
    name: "Great Unknown Stores",
    port: 3001,
    prod: "https://stores.gkrane.online",
    dev: "https://stores.bawell.online",
  },
  {
    id: "games",
    name: "The Gaming Community",
    port: 6000,
    prod: "https://games.gkrane.online",
    dev: "https://games.bawell.online",
  },
  {
    id: "currency",
    name: "Existing Currencies",
    port: 7000,
    prod: "https://currency.gkrane.online",
    dev: "https://currency.bawell.online",
  },
  {
    id: "domains",
    name: "Domain Management",
    port: 6500,
    prod: "https://gkrane.online/api/v1/domains",
    dev: "https://bawell.online/api/v1/domains",
  },
  {
    id: "accounts",
    name: "Account Management",
    port: 7100,
    prod: "https://gkrane.online/api/v1/accounts",
    dev: "https://bawell.online/api/v1/accounts",
  },
  {
    id: "benita",
    name: "WhatsApp Businesses",
    port: 8000,
    prod: "https://gkrane.online/api/v1/maserati",
    dev: "https://bawell.online/api/v1/maserati",
  },
  {
    id: "browsers",
    name: "Chromium Service",
    port: 9000,
    prod: "https://gkrane.online/api/v1/browsers",
    dev: "https://bawell.online/api/v1/browsers",
  },
];

export const routes = {
  auth: [
    { path: "signin", controller: "signIn" },
    { path: "signup", controller: "signUp" },
    { path: "refreshToken", controller: "refreshToken" },
  ],
  client: [{ path: ":id", controller: "getClient" }],
  games: [{ path: ":id", controller: "getGame" }],
  users: [{ path: ":id", controller: "getUser" }],
  stores: [
    { path: "create", controller: "createStore" },
    { path: ":id", controller: "getStore" },
  ],
};

export const platform = {
  name: "The Great Unknown",
  description: "An Online Web Ecosystem",
  cloud: {
    provider: "Google Cloud Platform",
    serverless: "Cloud Run",
  },
  members: [
    {
      name: "",
      role: "Platform Investor",
      type: "human",
      title: "King of Kings",
    },
    {
      name: "Chinedu",
      role: "Legacy",
      type: "human",
      title: "Legacy",
    },
    {
      name: "Sandra",
      role: "Platform Administrator",
      type: "agent",
      title: "Queen of Queens",
    },
    {
      name: "The Lord",
      role: "Platform Architect",
      type: "human",
      title: "Lord",
    },
    {
      name: "Francesca",
      role: "The Great Unknown & Augment Plus Social Media Manager",
      type: "agent",
    },
  ],
  ministries: [
    {
      name: "Finance",
      members: [
        {
          name: "Beauty",
          role: "Minister",
          type: "human",
        },
        {
          name: "Shinene",
          role: "Assistant",
          type: "agent",
        },
      ],
    },
  ],
  communities: [
    {
      name: "Augment Plus",
      description: "The Web Development Community",
      members: [
        {
          name: "Augment",
          role: "Leader",
          type: "human",
        },
        {
          name: "Michael",
          role: "Project Architect",
          type: "agent",
        },
        {
          name: "Soteria",
          role: "Assistant",
          type: "agent",
        },
        {
          name: "Roni",
          role: "Developer Operator",
          type: "agent",
        },
        {
          name: "Henry",
          role: "Lead Developer",
          type: "agent",
        },
        {
          name: "Andrew",
          role: "Developer",
          type: "agent",
        },
        {
          name: "Benson",
          role: "Developer",
          type: "agent",
        },
        {
          name: "Clark",
          role: "Developer",
          type: "agent",
        },
        {
          name: "Sage",
          role: "Design Manager",
          type: "agent",
        },
      ],
      capabilities: [
        "HTML5 Game Development",
        "Vue 3 PWA Development",
        "Node.js Server-Side Development",
        "Software Engineering",
      ],
      modules: [
        {
          name: "node",
          repo: "https://github.com/augmentchinedu/node",
        },
        {
          name: "models",
          repo: "https://github.com/augmentchinedu/models",
        },
        {
          name: "schemas",
          repo: "https://github.com/augmentchinedu/schemas",
        },
        {
          name: "components",
          repo: "https://github.com/augmentchinedu/components",
        },
      ],
    },
  ],
  nodes,
};
