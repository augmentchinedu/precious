// core/agentsLoader.js
import { platform } from "../../data/index.js";
import { Agent } from "../../class/agent.js";

export function loadAgents(sessionLogFile) {
  const agents = [];

  // 1️⃣ Load platform-level agents
  if (platform.members) {
    const platformAgents = platform.members.filter(
      (member) => member.type === "agent"
    );

    agents.push(
      ...platformAgents.map((member) => new Agent(member, sessionLogFile))
    );
  }

  // 2️⃣ Load ministry agents
  if (platform.ministries) {
    platform.ministries.forEach((ministry) => {
      if (ministry.members) {
        const ministryAgents = ministry.members.filter(
          (member) => member.type === "agent"
        );

        agents.push(
          ...ministryAgents.map(
            (member) =>
              new Agent(
                {
                  ...member,
                  ministry: ministry.name, // optional context tagging
                },
                sessionLogFile
              )
          )
        );
      }
    });
  }

  // 3️⃣ Load community agents
  if (platform.communities) {
    platform.communities.forEach((community) => {
      const communityAgents = community.members.filter(
        (member) => member.type === "agent"
      );

      agents.push(
        ...communityAgents.map(
          (member) =>
            new Agent(
              {
                ...member,
                community: community.name, // optional context tagging
              },
              sessionLogFile
            )
        )
      );
    });
  }

  return agents;
}
