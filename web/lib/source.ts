import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { icons as lucideIcons } from "lucide-react";
import { createElement } from "react";
import icons from "@/components/icons";
import { docsContentRoute, docsImageRoute, docsRoute } from "./shared";

export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),

  icon(name) {
    if (!name) return;

    if (name in icons) {
      return createElement(icons[name as keyof typeof icons]);
    }

    if (name in lucideIcons) {
      return createElement(lucideIcons[name as keyof typeof lucideIcons]);
    }
  },
});
export function getPageImage(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join("/")}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join("/")}`,
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
