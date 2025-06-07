/**
 * Default sidebar configuration for IFLA standards sites
 * Provides a standard structure that can be extended by individual sites
 */

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Utility function to apply sidebar level classes for IFLA hierarchical styling
 */
export function applySidebarLevels(items: any[], level: number = 1): any[] {
  return items.map(item => {
    if (item.type === 'category') {
      return {
        ...item,
        className: `sidebar-level-${level}`,
        items: item.items ? applySidebarLevels(item.items, level + 1) : []
      };
    } else if (item.type === 'doc' || item.type === 'link') {
      return {
        ...item,
        className: `sidebar-level-${level}`,
      };
    }
    return item;
  });
}

/**
 * Default sidebar structure for IFLA standards
 * Sites can import this and customize as needed
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  defaultSidebar: applySidebarLevels([
    {
      type: 'doc',
      id: 'index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'intro/index',
        // Additional intro items can be added by sites
      ],
    },
    {
      type: 'category',
      label: 'Elements',
      items: [
        {
          type: 'category',
          label: 'Statements',
          items: [
            'statements/index',
            // Statement elements will be auto-generated
          ],
        },
        {
          type: 'category',
          label: 'Notes',
          items: [
            'notes/index',
            // Note elements will be auto-generated
          ],
        },
        {
          type: 'category',
          label: 'Attributes',
          items: [
            'attributes/index',
            // Attribute elements will be auto-generated
          ],
        },
        {
          type: 'category',
          label: 'Relationships',
          items: [
            'relationships/index',
            // Relationship elements will be auto-generated
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Values',
      items: [
        {
          type: 'category',
          label: 'Value Vocabularies',
          items: [
            'ves/index',
            // Value vocabularies will be auto-generated
          ],
        },
        {
          type: 'category',
          label: 'String Encoding Schemes',
          items: [
            'ses/index',
            // String encoding schemes will be auto-generated
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/index',
        // Examples will be auto-generated
      ],
    },
    {
      type: 'category',
      label: 'Assessment',
      items: [
        'assess/index',
        // Assessment items will be auto-generated
      ],
    },
    {
      type: 'category',
      label: 'About',
      items: [
        'about/index',
        'about/docusaurus-for-ifla',
      ],
    },
  ]),

  // Alternative sidebar for elements only
  elementsSidebar: applySidebarLevels([
    {
      type: 'doc',
      id: 'elements/index',
      label: 'All Elements',
    },
    {
      type: 'category',
      label: 'By Type',
      items: [
        {
          type: 'category',
          label: 'Statements',
          items: [
            'statements/index',
          ],
        },
        {
          type: 'category',
          label: 'Notes',
          items: [
            'notes/index',
          ],
        },
        {
          type: 'category',
          label: 'Attributes',
          items: [
            'attributes/index',
          ],
        },
        {
          type: 'category',
          label: 'Relationships',
          items: [
            'relationships/index',
          ],
        },
      ],
    },
  ]),

  // Values-only sidebar
  valuesSidebar: applySidebarLevels([
    {
      type: 'doc',
      id: 'values/index',
      label: 'All Values',
    },
    {
      type: 'category',
      label: 'Value Vocabularies',
      items: [
        'ves/index',
      ],
    },
    {
      type: 'category',
      label: 'String Encoding Schemes',
      items: [
        'ses/index',
      ],
    },
  ]),

  // Examples-only sidebar
  examplesSidebar: applySidebarLevels([
    {
      type: 'doc',
      id: 'examples/index',
      label: 'All Examples',
    },
    {
      type: 'category',
      label: 'Full Examples',
      items: [
        'fullex/index',
      ],
    },
    {
      type: 'category',
      label: 'Full Images',
      items: [
        'fullimages/index',
      ],
    },
  ]),
};

export default sidebars;

/**
 * Helper function to create a custom sidebar with IFLA styling applied
 */
export function createIFLASidebar(sidebarItems: any[]): any[] {
  return applySidebarLevels(sidebarItems);
}

/**
 * Helper function to merge multiple sidebar configurations
 */
export function mergeSidebars(...sidebarConfigs: SidebarsConfig[]): SidebarsConfig {
  return sidebarConfigs.reduce((merged, config) => ({
    ...merged,
    ...config,
  }), {});
}

/**
 * Generate element items for a specific category
 */
export function generateElementItems(category: string, elements: string[]): any[] {
  return elements.map(elementId => ({
    type: 'doc',
    id: `${category}/${elementId}`,
    className: `sidebar-level-${category === 'relationships' ? '3' : '2'}`,
  }));
}

/**
 * Generate relationship subcategory structure
 */
export function generateRelationshipStructure(structure: Record<string, string[]>): any[] {
  return Object.entries(structure).map(([subcategory, elements]) => ({
    type: 'category',
    label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
    className: 'sidebar-level-3',
    items: elements.map(elementId => ({
      type: 'doc',
      id: `relationships/${subcategory}/${elementId}`,
      className: 'sidebar-level-4',
    })),
  }));
}