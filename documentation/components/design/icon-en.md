# Icon (`cat-icon`)

The `Icon` component dynamically loads and displays SVG icons, with SSR support and content validation.

### Import

```typescript
import { Icon } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Icon } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Icon],
  template: `
    <cat-icon name="home"></cat-icon>
  `
})
export class ExampleComponent {}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | - | Icon name (resolved through `ICON_PROVIDER`) |
| `src` | `string` | - | Direct path to SVG file (alternative to `name`) |
| `size` | `string` | `'1em'` | Icon size (can be any CSS unit) |
| `color` | `string` | `'currentColor'` | Icon color |

### Features

- **Dynamic loading**: Icons are loaded via `fetch` when a `name` or `src` is provided
- **Validation**: Validates that content is a valid SVG before rendering
- **SSR compatible**: Works correctly in Server-Side Rendering
- **Placeholder**: Shows a placeholder icon if the icon is not found or fails to load
- **Automatic processing**: Processes SVGs to use `currentColor` and ensure correct scaling

### Examples

#### Icon by name

```typescript
<cat-icon name="sun" [size]="'32px'"></cat-icon>
```

#### Icon with direct path

```typescript
<cat-icon src="/assets/icons/custom-icon.svg" [size]="'24px'"></cat-icon>
```

#### Icon with custom color

```typescript
<cat-icon name="moon" [size]="'2em'" color="#3b82f6"></cat-icon>
```

#### Icon with relative size

```typescript
<cat-icon name="home" size="1.5em"></cat-icon>
```

### SVG Processing

The component automatically processes loaded SVGs:

- Removes `width` and `height` attributes to allow flexible scaling
- Changes `fill` and `stroke` to `currentColor` (if not `none`) to allow coloring
- Adds `viewBox="0 0 24 24"` if it doesn't exist to ensure correct scaling

### Error Handling

If an icon cannot be loaded:

1. A placeholder icon is shown
2. An error is logged to the browser console
3. The component continues to work without breaking the application

### Notes

- The component requires `ICON_PROVIDER` to be configured to use `name`
- If using `src`, provide an absolute or relative path to the SVG file
- Icons are strictly validated to ensure they are valid SVGs
- Maximum SVG file size is 100KB (a warning is shown if larger)
- In SSR, a placeholder is shown until the icon loads on the client

### Integration with safirial-icons

To use icons from `safirial-icons`, configure the `ICON_PROVIDER`:

```typescript
// app.config.ts
import { ICON_PROVIDER } from 'catarina';
import { getIconPath } from 'safirial-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ICON_PROVIDER, useValue: { getPath: getIconPath } }
  ]
};
```

Then you can use any icon from the `safirial-icons` list:

```typescript
<cat-icon name="home"></cat-icon>
<cat-icon name="sun"></cat-icon>
<cat-icon name="moon"></cat-icon>
```
