export const services = [
  {
    id: "express",
    name: "The Great Unknown Express",
    port: 3000,
    prod: "https://gkrane.online/",
    dev: "https://bawell.online",
    dependencies: {
      "mime-types": "^3.0.2",
    },
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
    port: 6500,
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
    port: 6600,
    prod: "https://gkrane.online/api/v1/domains",
    dev: "https://bawell.online/api/v1/domains",
  },
  {
    id: "auth",
    name: "Authentication",
    port: 3030,
    prod: "https://gkrane.online/api/v1/accounts",
    dev: "https://bawell.online/api/v1/accounts",
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
    port: 8100,
    prod: "https://gkrane.online/api/v1/maserati",
    dev: "https://bawell.online/api/v1/maserati",
  },
  {
    id: "browsers",
    name: "Chromium Service",
    port: 9100,
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

export const modules = [
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
];
