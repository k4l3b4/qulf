import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import QulfWordMark from "@/components/ui/qulf-wordmark";
import { config } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <QulfWordMark />,
      transparentMode: "top",
    },
    githubUrl: `https://github.com/${config.git_user}/${config.repo}`,
  };
}
