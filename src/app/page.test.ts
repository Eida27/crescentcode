import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readHomePageSource() {
  return readFileSync(path.join(process.cwd(), "src", "app", "page.tsx"), {
    encoding: "utf8",
  });
}

describe("homepage featured projects", () => {
  it("features Planly with live demo, repository, screenshot, and honest prototype scope", () => {
    const source = readHomePageSource();

    expect(source).toContain('{ label: "Projects", href: "#projects" }');
    expect(source).toContain('id="projects"');
    expect(source).toContain("Planly Command Center");
    expect(source).toContain(
      "Static SaaS dashboard prototype for content planning operations.",
    );
    expect(source).toContain(
      "https://eida27.github.io/L1011-Planly-Content-Planner",
    );
    expect(source).toContain(
      "https://github.com/Eida27/L1011-Planly-Content-Planner.git",
    );
    expect(source).toContain("/planly-command-center.png");
    expect(source).toContain("without a backend, database, or publishing integrations");
  });
});
