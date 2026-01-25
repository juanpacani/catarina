# Catarina - General Component Features

This guide explains the common features and usage patterns that apply to all Catarina components.

## Style Customization with `customClass`

All Catarina components support the `customClass` property, which allows you to apply custom CSS classes and override styles in a controlled manner.

### How it works

Components expose the `customClass` value as a data attribute on the host element via `@HostBinding`. This allows you to select and style specific components using CSS attribute selectors.

### Implementation pattern

Each component exposes data attributes in the format `data-{component}-class`:

- `cat-button` → `data-button-class`
- `cat-card` → `data-card-class`
- `cat-dialog` → `data-card-class` (shares the same pattern)
- `cat-select-input` → `data-select-input-class`
- `cat-accordion` → `data-accordion-class`
- And so on...

### Usage example

```typescript
// In your component
@Component({
  template: `
    <cat-button customClass="theme-button" variant="primary">
      Custom Button
    </cat-button>
    
    <cat-card customClass="cards" variant="elevated" size="lg">
      <p>Card content</p>
    </cat-card>
  `
})
```

### Style overrides

To override internal component styles, use `::ng-deep` along with attribute selectors:

```scss
// Style the component host
cat-button[data-button-class="theme-button"] {
  /* Properties that affect the host element */
  margin: 16px;
  
  /* Use ::ng-deep to pierce ViewEncapsulation and target internal elements */
  ::ng-deep {
    > button {
      border-radius: 0%;
      border-bottom-right-radius: 18px;
      background-color: var(--primary-color-2);
    }
  }
}

// Example with cat-card
cat-card[data-card-class="cards"] {
  /* Properties that affect the host */
  width: 100%;
  height: 100%;

  /* Pierce and target internal element (section) */
  ::ng-deep {
    > section {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: var(--neutral-color-1);
      padding: 8px;
      border-radius: 18px;
      flex-wrap: wrap;
    }

    /* You can also target by specific component classes */
    > section.elevated.lg {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
  }
}
```

### Additional data attributes

In addition to `customClass`, components also expose other useful data attributes:

- `data-card-variant`: Component variant (surface, outlined, elevated)
- `data-card-size`: Component size (sm, md, lg)
- `data-button-class`: Custom button class

These attributes allow you to create more specific CSS selectors:

```scss
cat-card[data-card-variant="elevated"][data-card-size="lg"] {
  ::ng-deep {
    > section {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }
}
```

### Important notes

- **ViewEncapsulation**: Catarina components use ViewEncapsulation, so you need `::ng-deep` to style internal elements
- **Specificity**: Use attribute selectors to increase specificity and avoid conflicts
- **Maintainability**: Group custom styles by component and use descriptive names in `customClass`

## Theming Service

Catarina includes a theming service (`Theming`) that allows you to generate dynamic color palettes and switch between light and dark themes.

### Import

```typescript
import { Theming } from 'catarina';
```

### Basic usage

The `Theming` service is available as a singleton service (providedIn: 'root'):

```typescript
import { Component, OnInit } from '@angular/core';
import { Theming } from 'catarina';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent implements OnInit {
  constructor(private theming: Theming) {}

  ngOnInit() {
    // Generate palettes with a primary color and dark theme
    this.theming.generatePalettes('#3b82f6', true);
  }
}
```

### Main methods

#### `generatePalettes(color: string, dark: boolean): string[][]`

Generates all color palettes (primary, neutral, and elements) and applies the theme:

```typescript
// Dark theme with blue primary color
this.theming.generatePalettes('#3b82f6', true);

// Light theme with green primary color
this.theming.generatePalettes('#10b981', false);
```

#### `calculatePrimaryColor(color: string): string[]`

Calculates only the primary color palette without changing the theme:

```typescript
// Change only the primary color while keeping the current theme
this.theming.calculatePrimaryColor('#ef4444');
```

#### `calculateDynamicPalettes(dark: boolean): { neutral: string[], elements: string[] }`

Calculates dynamic palettes (neutral and elements) based on the theme:

```typescript
// Switch to dark theme
const palettes = this.theming.calculateDynamicPalettes(true);

// Switch to light theme
const palettes = this.theming.calculateDynamicPalettes(false);
```

### Observables

The service exposes observables to react to theme changes:

```typescript
import { Component, OnInit } from '@angular/core';
import { Theming } from 'catarina';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent implements OnInit {
  isDarkTheme = false;
  allPalettes: string[][] = [];

  constructor(private theming: Theming) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.theming.activeTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
      console.log('Current theme:', isDark ? 'Dark' : 'Light');
    });

    // Subscribe to palette changes
    this.theming.allPalettes$.subscribe(palettes => {
      this.allPalettes = palettes;
      console.log('Palettes updated:', palettes);
    });

    // Initialize theme
    this.theming.generatePalettes('#3b82f6', false);
  }
}
```

### Generated CSS variables

The service automatically applies CSS variables to the `:root` element:

- `--primary-color-0` to `--primary-color-4`: Primary color palette
- `--neutral-color-0` to `--neutral-color-8`: Neutral color palette
- `--element-color-0` to `--element-color-4`: Element color palette

These variables can be used in your styles:

```scss
.my-component {
  background-color: var(--primary-color-2);
  color: var(--neutral-color-8);
  border: 1px solid var(--element-color-2);
}
```

## Drag Directive

Catarina includes a `CDrag` directive that allows you to make elements draggable with the mouse.

### Import

```typescript
import { Drag } from 'catarina';
```

### Basic usage

Apply the directive to any HTML element:

```typescript
import { Component } from '@angular/core';
import { Drag } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Drag],
  template: `
    <div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2);">
      Drag me
    </div>
  `
})
export class AppComponent {}
```

### Features

- **Automatic positioning**: If the element doesn't have `position` defined, the directive sets `position: absolute` automatically
- **Visual cursor**: Changes cursor to `grabbing` while dragging and `grab` when ready
- **Mouse events**: Handles `mousedown`, `mousemove`, and `mouseup` for a smooth experience

### Example with Catarina component

```typescript
import { Component } from '@angular/core';
import { Dialog, Drag } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Dialog, Drag],
  template: `
    <cat-dialog customClass="draggable-dialog" variant="elevated">
      <div CDrag style="padding: 16px; cursor: grab;">
        <h2>Draggable Dialog</h2>
        <p>Drag this dialog by the top bar</p>
      </div>
    </cat-dialog>
  `
})
export class AppComponent {}
```

### Notes

- The directive works best with elements that have `position: absolute` or `position: fixed`
- The element must be visible in the DOM when the directive is applied
- Position calculations are based on `offsetLeft` and `offsetTop`

## Icon Integration (safirial-icons)

Catarina uses a token-based icon system that allows integration with different icon providers, including `safirial-icons`.

### Icon Protocol

Catarina defines an `ICON_PROVIDER` token that follows a specific interface:

```typescript
interface IconProvider {
  getPath(name: string): string;
}
```

Any provider that implements this interface can be used with Catarina components.

### Configuration with safirial-icons

#### 1. Install dependencies

```bash
npm install catarina safirial-icons
```

#### 2. Configure the provider in `app.config.ts`

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER } from 'catarina';
import { getIconPath } from 'safirial-icons';

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

**Note**: If you also use `safirial`, you can configure both providers:

```typescript
import { ICON_PROVIDER as SAFIRIAL_ICON_PROVIDER } from 'safirial';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER } from 'catarina';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    { provide: SAFIRIAL_ICON_PROVIDER, useValue: iconProviderConfig },
    { provide: CATARINA_ICON_PROVIDER, useValue: iconProviderConfig }
  ]
};
```

#### 3. Configure assets in `angular.json`

For `safirial-icons` SVG files to be copied to the output directory, add the following configuration in `angular.json`:

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

This configuration:
- Copies all SVG files from `node_modules/safirial-icons/assets`
- Places them in the `safirial-icons` folder in the output directory
- Allows icons to be accessible at runtime

### Using icons in components

Once configured, you can use icons in Catarina components:

```typescript
import { Component } from '@angular/core';
import { Button, Icon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <!-- Icon in button -->
    <cat-button variant="primary" iconLeft="home">
      Home
    </cat-button>

    <!-- Standalone icon -->
    <cat-icon name="sun" [size]="'32px'"></cat-icon>
    
    <!-- Icon with custom color -->
    <cat-icon name="moon" [size]="'24px'" color="#3b82f6"></cat-icon>
  `
})
export class AppComponent {}
```

### Available icon names

Icon names must match those defined in the `safirial-icons` icon list. Some common examples:

- `home`, `sun`, `moon`, `palette`
- `chevron-arrow-up`, `chevron-arrow-down`, `chevron-arrow-left`, `chevron-arrow-right`
- `plus`, `minus`, `email`, `github`, `linkedin`

Check the `safirial-icons` documentation for the complete list of available icons.

### Fallback and error handling

If an icon is not found or fails to load:

- The `cat-icon` component displays a placeholder icon
- An error is logged to the browser console
- The component continues to work without breaking the application

### Create a custom provider

You can create your own icon provider by implementing the interface:

```typescript
import { ICON_PROVIDER } from 'catarina';

const customIconProvider = {
  getPath: (name: string): string => {
    // Your custom logic to resolve icon paths
    return `/assets/icons/${name}.svg`;
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ICON_PROVIDER, useValue: customIconProvider }
  ]
};
```

## Common Features Summary

| Feature | Description | Components that support it |
|---------|-------------|---------------------------|
| `customClass` | Allows applying custom CSS classes | All components |
| Data attributes | Exposure of properties as HTML attributes | All components |
| Variants | Different visual styles (`surface`, `outlined`, `elevated`) | Card, Dialog, Drawer, Inputs |
| Sizes | Predefined sizes (`sm`, `md`, `lg`) | Button, Card, Dialog, Inputs |
| Icon integration | Support for icons via `ICON_PROVIDER` | Button, Icon |

## Next Steps

- Check the specific documentation for each component for additional details
- Review examples in the [live preview](https://jpcn-portfolio.vercel.app/catarina-preview)
- Explore the source code on [GitHub](https://github.com/Hydenaky/library-workspace)
