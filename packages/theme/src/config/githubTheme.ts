// packages/theme/src/config/githubTheme.ts
import type { PrismTheme } from 'prism-react-renderer';

const githubTheme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "#fff"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6a737d"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#032f62"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#24292e"
      }
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted"
      ],
      style: {
        color: "#005cc5"
      }
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#d73a49"
      }
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#6f42c1"
      }
    },
    {
      types: ["function-variable"],
      style: {
        color: "#e36209"
      }
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#22863a"
      }
    }
  ]
};

export default githubTheme;
