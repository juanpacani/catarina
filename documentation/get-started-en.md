# Catarina - Get Started Guide

This guide will help you install and configure Catarina in your Angular 20.3.x project.

## Installation

Catarina can be installed in two ways: from npm (recommended for production) or directly from the GitHub repository (useful for development or when you need the latest version).

### Option 1: Installation from npm (Recommended)

The easiest way to install Catarina is using npm:

```bash
npm install catarina
```

You can also use other package managers:

```bash
# With pnpm
pnpm install catarina

# With yarn
yarn add catarina
```

### Option 2: Installation from GitHub

If you prefer to install Catarina directly from the GitHub repository, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/Hydenaky/library-workspace.git
cd library-workspace
```

2. **Install workspace dependencies**:

```bash
npm install
```

3. **Build the Catarina library**:

```bash
ng build catarina
```

This command will generate the compiled files in the `dist/catarina` directory.

4. **Package the library**:

```bash
cd dist/catarina
npm pack
```

This command will create a `.tgz` file (e.g., `catarina-1.1.0.tgz`) that you can install in your project.

5. **Install in your Angular project**:

From the root directory of your Angular project, run:

```bash
npm install /full/path/to/library-workspace/dist/catarina/catarina-1.1.0.tgz
```

Or if you're in the same parent directory:

```bash
npm install ../library-workspace/dist/catarina/catarina-1.1.0.tgz
```

**Note**: Replace `1.1.0` with the current version that was generated.

## Icon Configuration

Catarina uses a token-based icon system. For components to work correctly with icons, you need to configure the `ICON_PROVIDER`. The easiest way is to use the `safirial-icons` package.

### 1. Install safirial-icons

```bash
npm install safirial-icons
```

### 2. Configure the icon provider

In your `app.config.ts` file (or `main.ts` depending on your configuration), add the provider configuration:

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

### 3. Configure assets in angular.json

For SVG icon files to be copied correctly to the output directory, add the following configuration in your `angular.json`:

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

This configuration copies all SVG files from `node_modules/safirial-icons/assets` to the `safirial-icons` folder in your application's output directory.

## First Usage

Once installed and configured, you can start using Catarina components in your application.

### Basic Example

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { Button, Icon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <cat-button variant="primary" size="md" iconLeft="home">
      Catarina Button
    </cat-button>

    <cat-icon name="sun" [size]="'32px'"></cat-icon>
  `
})
export class AppComponent {}
```

### Available Components

Catarina exports the following main components:

#### Design Components
- `Button` - `cat-button`
- `Icon` - `cat-icon`
- `Card` - `cat-card`
- `Accordion` - `cat-accordion`
- `AccordionGroup` - `cat-accordion-group`

#### Form Components
- `CatInput` - `cat-input`
- `ColorInput` - `cat-color-input`
- `SelectInput` - `cat-select-input`
- `DateInput` - `cat-date-input`
- `FileInput` - `cat-file-input`
- `PasswordInput` - `cat-password-input`
- `RangeInput` - `cat-range-input`
- `TextAreaInput` - `cat-text-area-input`
- `TimeInput` - `cat-time-input`

#### Overlays
- `Dialog` - `cat-dialog`
- `Drawer` - `cat-drawer`
- `Menu` - `cat-menu`

#### Utilities
- `Drag` - Directive for drag and drop
- Theming utilities

## Installation Verification

To verify that Catarina has been installed correctly, you can:

1. **Check in package.json**:

```json
{
  "dependencies": {
    "catarina": "^1.1.0"
  }
}
```

2. **Import a component in your application**:

If you can import and use a component without errors, the installation was successful.

## Troubleshooting

### Error: "Cannot find module 'catarina'"

- Make sure you ran `npm install` after adding Catarina to your `package.json`
- Verify that you're using Angular 20.3.0 or higher
- If you installed from GitHub, verify that the `.tgz` file was generated correctly

### Icons are not showing

- Verify that `safirial-icons` is installed
- Confirm that `ICON_PROVIDER` is configured in `app.config.ts`
- Make sure the assets configuration in `angular.json` is correct
- Verify that the icon name exists in the `safirial-icons` icon list

### Compilation errors

- Verify that all peer dependencies are installed:
  ```bash
  npm install @angular/core@^20.3.0 @angular/common@^20.3.0
  ```

## Next Steps

Now that you have Catarina installed and configured, you can:

- Explore the different available components
- Consult the documentation for each component
- View the [live preview](https://jpcn-portfolio.vercel.app/catarina-preview) for visual examples
- Review the source code on [GitHub](https://github.com/Hydenaky/library-workspace)

## Additional Resources

- **Complete documentation**: Check out the [introduction](./introduction-en.md) for more information about Catarina
- **Repository**: [GitHub](https://github.com/Hydenaky/library-workspace)
- **Issues**: [Report issues](https://github.com/Hydenaky/library-workspace/issues)
