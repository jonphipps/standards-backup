// React 19 compatibility fixes
declare module '@docusaurus/Link' {
  import { ComponentType } from 'react';
  
  interface Props {
    to: string;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    [key: string]: any;
  }
  
  const Link: ComponentType<Props>;
  export default Link;
}

declare module '@theme/TabItem' {
  import { ComponentType } from 'react';
  
  interface Props {
    value: string;
    label?: string;
    default?: boolean;
    children?: React.ReactNode;
  }
  
  const TabItem: ComponentType<Props>;
  export default TabItem;
}

declare module '@theme/CodeBlock' {
  import { ComponentType } from 'react';
  
  interface Props {
    language?: string;
    children?: React.ReactNode;
    className?: string;
  }
  
  const CodeBlock: ComponentType<Props>;
  export default CodeBlock;
}