// packages/theme/config/filterIndexMdx.ts

/**
 * Remove automatically‑generated sidebar items that point to `index.mdx` files.
 * Works on the simple heuristic that an item whose id is exactly `index` or
 * ends with `/index` should be hidden.
 *
 * We use `any` here instead of importing the SidebarItem type directly to avoid
 * tight coupling with Docusaurus’ internal typings (which sometimes shift
 * between minor versions).
 */
export default function filterIndexMdx<Item extends { type?: string; id?: string }>(
  items: Item[],
): Item[] {
  return items.filter(
    (i) => !(i.type === 'doc' && (i.id === 'index' || i.id?.endsWith('/index'))),
  );
}
