## Catarina – Design System for Angular

**Catarina** is a UI component library for Angular 20.3.x.  
It includes buttons, icons, form controls, panels, and utilities related to _theming_ and icons.

The library is published under the name:

- **npm package**: `catarina`
- **Version**: `1.0.1`

---

## Requirements

`catarina` declares the following _peerDependencies_:

- `@angular/core`: `^20.3.0`
- `@angular/common`: `^20.3.0`

And depends on:

- `tslib`: `^2.3.0`

---

## Installation

In an Angular 20 project:

```bash
npm install catarina
```

It can also be installed with `pnpm` or `yarn` using the same package name.

---

## Public API

The `public-api.ts` file exposes the main elements of the design system:

- **Design components**:
  - `Icon` (`cat-icon`)
  - `Button` (`cat-button`)
  - Panels (`card`, `accordion`, `accordion-group`)
- **Form components**:
  - `cat-input`, `color-input`, `select-input`, `date-input`, `file-input`,
    `password-input`, `range-input`, `text-area-input`, `time-input`
- **Overlays**:
  - `dialog`
- **Services and directives**:
  - Drag directive (`drag`)
  - Theming utilities
- **Tokens**:
  - `ICON_PROVIDER`

All these symbols are imported directly from the `catarina` package.

---

## Icon configuration with `safirial-icons`

`catarina` uses the `ICON_PROVIDER` token to resolve icon paths.  
This token can be configured using utilities from the `safirial-icons` package:

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER } from 'catarina';
import { getIconPath } from 'safirial-icons';

const iconProviderConfig = {
  getPath: getIconPath
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: CATARINA_ICON_PROVIDER, useValue: iconProviderConfig }
  ]
};
```

With this configuration, `catarina` components that use icons resolve paths from `safirial-icons`.

### Assets configuration in `angular.json`

In addition to configuring `ICON_PROVIDER`, you need to add the following entry in the `assets` section of `angular.json` so that `safirial-icons` SVG files are copied to the output directory:

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

---

## Basic component usage

Example usage of `cat-button` and `Icon` within an application component:

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Button as CatarinaButton, Icon as CatarinaIcon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [CatarinaButton, CatarinaIcon],
  template: `
    <cat-button variant="primary" size="md" iconLeft="home">
      Catarina Button
    </cat-button>

    <cat-icon name="sun" [size]="'32px'"></cat-icon>
  `
})
export class AppComponent {}
```

Icon `name` values must match the names defined in the `iconList` from the `safirial-icons` package.

---

## Building and publishing

To compile the library from the workspace:

```bash
ng build catarina
```

The output is generated in:

```bash
dist/catarina
```

To publish to npm (from the workspace):

```bash
ng build catarina
cd dist/catarina
npm publish
```

---

## Language / Idioma

This documentation is available in English. For the Spanish version, see [README.md](./README.md).

Esta documentación está disponible en inglés. Para la versión en español, consulta [README.md](./README.md).

---

## Documentation note

This documentation was generated using **Cursor** with the following parameters:

- **Tool**: Cursor IDE
- **Model**: Auto (Cursor agent router)
- **Language**: English
- **Instructions**: Analyze all workspace projects and update documentation for consumption, without including errors, improvements, or suggestions, only factual information about installation, configuration, and usage of the libraries.
