import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, config } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
      transparentMode: 'top',
    },
    githubUrl: `https://github.com/${config.git_user}/${config.repo}`,
  };
}
