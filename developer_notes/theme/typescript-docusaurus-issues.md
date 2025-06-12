# TypeScript Issues with Docusaurus Theme Components

## TabItem Component Missing Children Prop

### Issue
When building the theme package, TypeScript errors occur when using `@theme/TabItem` with children:

```
error TS2322: Type '{ children: Element; value: string; label: string; "data-testid": string; }' is not assignable to type 'IntrinsicAttributes & Props'.
Property 'children' does not exist on type 'IntrinsicAttributes & Props'.
```

### Solution
Add a module declaration to extend the TabItem props interface:

```typescript
// Type augmentation for TabItem to include children prop
declare module '@theme/TabItem' {
  interface Props {
    children?: React.ReactNode;
    value: string;
    label?: string;
    'data-testid'?: string;
  }
}
```

### Location
- Fixed in: `packages/theme/src/components/ElementReference/index.tsx`
- Issue occurs when using TabItem components with content inside them

### Related Code
- TabItem mock in tests: `packages/theme/src/tests/__mocks__/TabItem.tsx`
- The mock shows the expected API but TypeScript doesn't recognize it in the actual component

### Developer Notes
- This is likely due to incomplete type definitions in the Docusaurus theme
- The module declaration approach allows us to extend the existing types without modifying external dependencies
- If this issue occurs in other components using TabItem, apply the same module declaration pattern