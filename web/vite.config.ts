import { defineConfig, loadEnv, type Plugin, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';

function createAnalyticsPlugin(measurementId: string): Plugin {
  const scriptSources = ['https://www.googletagmanager.com', 'https://www.google-analytics.com'];

  const augmentCsp = (content: string) => {
    const directives = content
      .split(';')
      .map((segment) => segment.trim())
      .filter(Boolean);

    const map = new Map<string, string[]>();
    for (const directive of directives) {
      const [name, ...values] = directive.split(/\s+/);
      map.set(name, values);
    }

    const ensure = (name: string, values: string[]) => {
      const existing = map.get(name);
      if (!existing) {
        map.set(name, values);
        return;
      }
      for (const value of values) {
        if (!existing.includes(value)) {
          existing.push(value);
        }
      }
    };

    ensure('script-src', scriptSources);
    ensure('connect-src', ['https://www.google-analytics.com']);

    const order = directives.map((directive) => directive.split(/\s+/)[0]);
    for (const name of map.keys()) {
      if (!order.includes(name)) {
        order.push(name);
      }
    }

    return order
      .map((name) => `${name} ${map.get(name)?.join(' ') ?? ''}`.trim())
      .join('; ');
  };

  return {
    name: 'wgquick-analytics-injector',
    transformIndexHtml(html) {
      const cspRegex = /(http-equiv="Content-Security-Policy"[^>]*content=")(.*?)(")/i;
      let updatedHtml = html;
      updatedHtml = updatedHtml.replace(cspRegex, (_, prefix: string, content: string, suffix: string) => {
        const nextContent = augmentCsp(content);
        return `${prefix}${nextContent}${suffix}`;
      });

      const anonymizeSnippet = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`;

      return {
        html: updatedHtml,
        tags: [
          {
            tag: 'script',
            attrs: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
            },
            injectTo: 'head',
          },
          {
            tag: 'script',
            children: anonymizeSnippet,
            injectTo: 'head',
          },
        ],
      };
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const measurementId = env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

  const plugins: PluginOption[] = [react()];
  if (measurementId) {
    plugins.push(createAnalyticsPlugin(measurementId));
  }

  return {
    plugins,
  };
});
