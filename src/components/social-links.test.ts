import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const SOCIAL_LINKS_FILE = path.join(
  process.cwd(),
  "src",
  "components",
  "social-links.tsx",
);

function readSocialLinksSource() {
  return existsSync(SOCIAL_LINKS_FILE)
    ? readFileSync(SOCIAL_LINKS_FILE, { encoding: "utf8" })
    : "";
}

describe("SocialLinks", () => {
  it("renders the requested social media destinations as external links", () => {
    const source = readSocialLinksSource();

    [
      "https://x.com/EidaTempest",
      "https://www.facebook.com/share/191YvXv7c4",
      "https://www.linkedin.com/in/joshua-sumanghid-7a7135298",
      "https://github.com/Eida27",
    ].forEach((href) => {
      expect(source).toContain(`href: "${href}"`);
    });

    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noreferrer"');
  });

  it("uses accessible labels and inline SVG icons instead of PNG images", () => {
    const source = readSocialLinksSource();

    [
      "Visit X profile",
      "Visit Facebook profile",
      "Visit LinkedIn profile",
      "Visit GitHub profile",
    ].forEach((label) => {
      expect(source).toContain(label);
    });

    expect(source).toContain("<svg");
    expect(source).toContain('aria-hidden="true"');
    expect(source).not.toContain(".png");
  });
});
