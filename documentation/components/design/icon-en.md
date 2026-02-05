# Icon (`cat-icon`)

The `Icon` component dynamically loads and displays SVG icons, with SSR support and content validation. Icons are only rendered when successfully loaded, optimizing performance.

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
- **Strict validation**: Validates that content is a valid SVG before rendering
- **SSR compatible**: Works correctly in Server-Side Rendering
- **Conditional rendering**: Only shows the icon when successfully loaded (no placeholder shown)
- **Automatic processing**: Processes SVGs to use `currentColor` and ensure correct scaling
- **Request cancellation**: Automatically cancels previous requests when the icon changes

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

1. The component renders nothing (performance optimization)
2. An error is logged to the browser console
3. The component continues to work without breaking the application

### Configuration with external icon packages

To synchronize the component with external icon packages (such as `safirial-icons`), you need to configure two things:

#### 1. Assets configuration in `angular.json`

Add the following entry in the `assets` section of your project so that SVG files are copied to the output directory:

```json
{
  "projects": {
    "your-project": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*.svg",
                "input": "node_modules/safirial-icons/assets",
                "output": "safirial-icons"
              }
            ]
          }
        }
      }
    }
  }
}
```

This configuration copies all SVG files from `node_modules/safirial-icons/assets` to the `safirial-icons` folder in the application's output directory.

#### 2. Provider configuration in `app.config.ts`

Configure the `ICON_PROVIDER` using the integrated utilities in `catarina`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER, getIconPath } from 'catarina';

const iconProviderConfig = {
  getPath: getIconPath
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: CATARINA_ICON_PROVIDER, useValue: iconProviderConfig }
  ]
};
```

With this configuration, you can use any icon from the list exported in `iconList` from `catarina`:

```typescript
import { iconList, IconName } from 'catarina';

// iconList contains all available icon names
// IconName is the TypeScript type for autocomplete
```

### Using custom icons

If you prefer to use custom icons without an external package, you can use the `src` property:

```typescript
<cat-icon src="/assets/icons/my-icon.svg" size="24px"></cat-icon>
```

### Notes

- The component requires `ICON_PROVIDER` to be configured to use `name`
- If using `src`, provide an absolute or relative path to the SVG file
- Icons are strictly validated to ensure they are valid SVGs
- Maximum SVG file size is 100KB (a warning is shown if larger)
- In SSR, the component renders nothing until it loads on the client
- The component automatically cancels load requests when `name` or `src` changes
