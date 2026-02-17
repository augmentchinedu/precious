import { readFilesRecursively } from "../utility/index.js";

export const files = readFilesRecursively(process.cwd());

export const platform = {
  name: "The Great Unknown",
  nodes: ["express", "store", "game", "currency"],
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
          name: "The Lord",
          role: "Platform Architect",
          type: "human",
        },
        {
          name: "Michael",
          role: "Project Architect",
          type: "agent",
        },
        {
          name: "Beauty",
          role: "Assistant",
          type: "agent",
        },
        {
          name: "Roni",
          role: "Developer Operator",
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
        {
          name: "Francesca",
          role: "Social Media Manager",
          type: "agent",
        },
        {
          name: "Sandra",
          role: "Community Administrator",
          type: "agent",
        },
      ],
      capabilities: [
        "HTML5 Game Development",
        "Vue 3 PWA Development",
        "Node.js Server-Side Development",
        "Software Engineering",
      ],
      services: ["games", "currency"],
      modules: [
        {
          name: node,
          repo: "https://github.com/augmentchinedu/node",
        },
        {
          name: models,
          repo: "https://github.com/augmentchinedu/models",
        },
        {
          name: schemas,
          repo: "https://github.com/augmentchinedu/schemas",
        },
        {
          name: components,
          repo: "https://github.com/augmentchinedu/components",
        },
      ],
    },
  ],
};
