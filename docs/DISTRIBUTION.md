# Distribution

The same canonical skills are packaged for several agent ecosystems. A native manifest makes direct installation possible; it does not imply endorsement or acceptance into a platform-operated directory.

| Surface | Package route | Publication model |
| --- | --- | --- |
| GitHub | `khadinakbarlabs/expo-mobile-app-builder` | Canonical open-source repository and release assets |
| skills.sh | GitHub-backed Agent Skills catalog | Indexed from Skills CLI installations |
| Agent Plugins 1.0 | Root `plugin.json` plus `skills/` | Vendor-neutral portable package; installation and permissions remain client-specific |
| Codex CLI | `.agents/plugins/marketplace.json` | Direct repository marketplace |
| Claude Code | `.claude-plugin/marketplace.json` | Direct repository marketplace; official directory is separately reviewed |
| Cursor | `.cursor-plugin/plugin.json` | Direct portable skill install; official marketplace is separately reviewed |
| ChatGPT plugin directory | Remote MCP at `https://app-builder.khadinakbar.dev/mcp` | The dashboard scans the live MCP tools and annotations; review and later publication are separate platform steps |

Official directory status can change independently of a GitHub release. Verify the live platform surface before describing a listing as approved or published.
