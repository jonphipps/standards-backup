# IFLA Theme Usage Guide

This guide provides detailed instructions for using the IFLA Theme in your Docusaurus sites.

## Table of Contents

1. [Installation](#installation)
2. [Site Setup](#site-setup)
3. [Component Usage](#component-usage)
4. [Styling](#styling)
5. [Configuration](#configuration)
6. [Migration from Existing Sites](#migration)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Docusaurus 3.x

### Install the Theme

```bash
pnpm add @ifla/theme
```

### Install Peer Dependencies

```bash
pnpm add docusaurus-plugin-sass @easyops-cn/docusaurus-search-local
```

## Site Setup

### 1. Configure Docusaurus

Replace your `docusaurus.config.ts` with:

```typescript
import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA My Standard',
  tagline: 'A comprehensive library standard',
  url: 'https://mystandard.iflastandards.info',
  baseUrl: '/',
  organizationName: 'iflastandards',
  projectName: 'my-standard',
  githubUrl: 'https://github.com/iflastandards/my-standard',
  vocabularyDefaults: VOCABULARY_DEFAULTS.GENERIC // or ISBDM, LRM, ISBD
});

export default config;
```

### 2. Update CSS

In `src/css/custom.css`:

```css
/* Import IFLA theme styles */
@import '@ifla/theme/styles';

/* Your site-specific overrides */
:root {
  /* Override IFLA colors if needed */
  --ifla-accent-color: #custom-color;
}

/* Custom styles for your site */
.my-custom-class {
  /* Your styles */
}
```

### 3. Configure Sidebar

In `sidebars.ts`:

```typescript
import { applySidebarLevels, generateElementItems } from '@ifla/theme/config';

const sidebars = {
  mainSidebar: applySidebarLevels([
    {
      type: 'doc',
      id: 'index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Elements',
      items: [
        {
          type: 'category',
          label: 'Statements',
          items: generateElementItems('statements', ['1001', '1002', '1003']),
        },
        // Add more categories as needed
      ],
    },
  ]),
};

export default sidebars;
```

## Component Usage

### ElementReference

Use in element documentation pages:

```mdx
---
id: 1001
title: "Title"
RDF:
  label: "Title"
  definition: "A name given to the resource"
  uri: "https://www.iflastandards.info/elements/P1001"
  type: "Property"
  domain: "Manifestation"
  range: "Literal"
---

import { ElementReference } from '@ifla/theme/components';

# Title

<ElementReference frontMatter={frontMatter} />

## Description

Additional information about this element...
```

### VocabularyTable

Use for displaying controlled vocabularies:

```mdx
import { VocabularyTable } from '@ifla/theme/components';

# Media Type Vocabulary

<VocabularyTable
  csvUrl="/vocabs/csv/media-type.csv"
  title="Media Type Terms"
  showFilter={true}
  showURIs={true}
  allowDownload={true}
  vocabularyUri="https://www.iflastandards.info/vocabs/media-type/"
  uriStyle="numeric"
  prefix="T"
  startCounter={1000}
/>
```

### Links

Use consistent linking throughout your documentation:

```mdx
import { InLink, OutLink } from '@ifla/theme/components';

See the <InLink href="/docs/elements/1002">Description</InLink> element for more details.

Refer to the <OutLink href="https://www.dublincore.org/specifications/dublin-core/dcmi-terms/">Dublin Core specification</OutLink> for background.
```

### Semantic Components

Highlight special content:

```mdx
import { SeeAlso, Mandatory, Unique } from '@ifla/theme/components';

<Mandatory>This element is required in all manifestation records.</Mandatory>

<Unique>Each manifestation can have only one title.</Unique>

<SeeAlso>
  Related elements: <InLink href="/docs/elements/1002">Description</InLink>, 
  <InLink href="/docs/elements/1003">Subject</InLink>
</SeeAlso>
```

### Example Blocks

Structure examples consistently:

```mdx
import { ExampleTable } from '@ifla/theme/components';

<ExampleTable title="Examples" defaultOpen={false}>

| Label | Value | Comment |
|-------|-------|---------|
| Book title | "The great Gatsby" | Main title |
| Subtitle | "a novel" | Additional title information |

</ExampleTable>
```

### Figures

Include images with proper captions:

```mdx
import { Figure } from '@ifla/theme/components';

<Figure
  src="/img/workflow-diagram.png"
  alt="IFLA workflow process"
  caption="Figure 1: Standard workflow for cataloging manifestations"
  width="100%"
/>
```

## Styling

### Using SCSS Variables

Create `src/css/custom.scss`:

```scss
@import '@ifla/theme/styles/variables';
@import '@ifla/theme/styles/mixins';

// Use IFLA colors
.my-header {
  background-color: $ifla-navy;
  color: white;
  padding: $ifla-spacing-lg;
}

// Use responsive mixins
.responsive-content {
  @include ifla-media-down(md) {
    padding: $ifla-spacing-sm;
  }
  
  @include ifla-media-up(lg) {
    padding: $ifla-spacing-xl;
  }
}

// Use component mixins
.my-button {
  @include ifla-button-primary;
}

.my-table {
  @include ifla-table-base;
}
```

### Utility Classes

Use pre-built utility classes:

```mdx
<div className="ifla-text-center ifla-mt-lg ifla-mb-xl">
  <h2>Centered heading with spacing</h2>
</div>

<section className="ifla-p-lg">
  <p>Content with large padding</p>
</section>
```

### Dark Mode Support

All IFLA components automatically support dark mode. To test:

```css
/* Custom dark mode styles */
[data-theme='dark'] .my-component {
  background-color: var(--ifm-background-surface-color);
  border-color: var(--ifm-color-emphasis-300);
}
```

## Configuration

### Vocabulary Defaults

Choose the appropriate vocabulary defaults for your standard:

```typescript
// For ISBDM
vocabularyDefaults: VOCABULARY_DEFAULTS.ISBDM

// For LRM
vocabularyDefaults: VOCABULARY_DEFAULTS.LRM

// For ISBD
vocabularyDefaults: VOCABULARY_DEFAULTS.ISBD

// For custom standard
vocabularyDefaults: {
  prefix: "mystandard",
  startCounter: 1000,
  uriStyle: "numeric",
  numberPrefix: "T",
  caseStyle: "kebab-case",
  showFilter: true,
  filterPlaceholder: "Filter terms...",
  showTitle: false,
  showURIs: true,
  profile: "vocabulary-profile.csv",
  profileShapeId: "Concept",
  RDF: {
    "rdf:type": ["skos:ConceptScheme"]
  },
  elementDefaults: {
    uri: "https://www.iflastandards.info/mystandard/elements",
    classPrefix: "C",
    propertyPrefix: "P",
    profile: "elements-profile.csv",
    profileShapeId: "Element"
  }
}
```

### Custom Navigation

Extend the default navigation:

```typescript
const config = createIFLAConfig({
  // ... base config
});

// Add custom navbar items
config.themeConfig.navbar.items.splice(1, 0, {
  type: 'dropdown',
  label: 'My Custom Menu',
  position: 'left',
  items: [
    { type: 'doc', docId: 'custom/overview', label: 'Overview' },
    { type: 'doc', docId: 'custom/guide', label: 'User Guide' },
  ],
});

export default config;
```

## Migration from Existing Sites

### From ISBDM Site

1. Install the theme: `pnpm add @ifla/theme`

2. Replace your docusaurus config:
```typescript
import { createIFLAConfig, VOCABULARY_DEFAULTS } from '@ifla/theme/config';

const config = createIFLAConfig({
  title: 'IFLA ISBDM',
  tagline: 'International Standard Bibliographic Description (Manifestation)',
  url: 'https://iflastandards.github.io',
  baseUrl: '/ISBDM/',
  organizationName: 'iflastandards',
  projectName: 'ISBDM',
  githubUrl: 'https://github.com/iflastandards/ISBDM',
  vocabularyDefaults: VOCABULARY_DEFAULTS.ISBDM
});
```

3. Update CSS imports:
```css
@import '@ifla/theme/styles';
```

4. Replace component imports:
```mdx
// Old
import ElementReference from '@site/src/components/global/ElementReference';

// New
import { ElementReference } from '@ifla/theme/components';
```

### From Scratch

1. Create new Docusaurus site:
```bash
npx create-docusaurus@latest my-standard classic --typescript
cd my-standard
pnpm add @ifla/theme
```

2. Follow the [Site Setup](#site-setup) instructions above.

## Best Practices

### Content Organization

```
docs/
├── index.mdx                 # Site homepage
├── intro/
│   ├── index.mdx            # Introduction overview
│   └── getting-started.mdx   # User guide
├── elements/
│   ├── index.mdx            # Elements overview
│   ├── statements/
│   │   ├── index.mdx
│   │   ├── 1001.mdx         # Individual elements
│   │   └── 1002.mdx
│   ├── attributes/
│   └── relationships/
├── vocabularies/
│   ├── index.mdx
│   └── media-type.mdx       # Individual vocabularies
└── examples/
    ├── index.mdx
    └── full-record.mdx
```

### Element Documentation

Use consistent frontmatter:

```mdx
---
id: 1001
title: "Title"
RDF:
  label: "Title"
  definition: "A name given to the resource"
  scopeNote: "This includes all forms of titles..."
  uri: "https://www.iflastandards.info/elements/P1001"
  type: "Property"
  domain: "Manifestation"
  range: "Literal"
  status: "Published"
  deprecated: false
---
```

### Vocabulary Documentation

Structure vocabulary pages consistently:

```mdx
---
title: "Media Type Vocabulary"
---

import { VocabularyTable } from '@ifla/theme/components';

# Media Type

This vocabulary defines terms for different types of media...

## Terms

<VocabularyTable
  csvUrl="/vocabs/csv/media-type.csv"
  vocabularyUri="https://www.iflastandards.info/vocabs/media-type/"
  showFilter={true}
  showURIs={true}
/>
```

### Performance Tips

1. **Lazy load large vocabularies**:
```mdx
<VocabularyTable
  csvUrl="/large-vocabulary.csv"
  maxRows={50}
  virtualScroll={true}
/>
```

2. **Use compact mode for mobile**:
```mdx
<VocabularyTable
  csvUrl="/vocabulary.csv"
  compactMode={true}
/>
```

3. **Optimize images**:
```mdx
<Figure
  src="/img/diagram.webp"
  alt="Diagram"
  width="800"
  height="600"
  loading="lazy"
/>
```

## Troubleshooting

### Common Issues

**1. "Module not found: Can't resolve '@ifla/theme'"**

Make sure you've installed the theme:
```bash
pnpm add @ifla/theme
```

**2. "Error: Cannot find module 'docusaurus-plugin-sass'"**

Install the required peer dependency:
```bash
pnpm add docusaurus-plugin-sass
```

**3. "Dark mode colors not working"**

Ensure you're importing the theme styles:
```css
@import '@ifla/theme/styles';
```

**4. "Sidebar levels not showing correctly"**

Make sure you're using `applySidebarLevels`:
```typescript
import { applySidebarLevels } from '@ifla/theme/config';

const sidebars = {
  mainSidebar: applySidebarLevels([
    // your sidebar items
  ])
};
```

### Debug Mode

Enable debug logging:

```typescript
import { initializeIFLATheme } from '@ifla/theme';

initializeIFLATheme({ debug: true });
```

### Getting Help

1. Check the [documentation](https://iflastandards.github.io/standards-dev/)
2. Search [existing issues](https://github.com/iflastandards/standards-dev/issues)
3. Create a [new issue](https://github.com/iflastandards/standards-dev/issues/new)
4. Join the [discussion](https://github.com/iflastandards/standards-dev/discussions)

---

For more detailed information, see the [README.md](./README.md) and browse the component documentation.