## Library Workspace – Angular Monorepo for UI Libraries

This Angular workspace groups several libraries focused on UI and icon management:

- **`catarina`**: UI component design system for Angular 20.
- **`safirial`**: Lightweight UI component set based on icons.
- **`safirial-icons`**: SVG icon package and utilities for resolving icon paths.
- **`playground`**: Example Angular application that consumes the above libraries.

All libraries are designed for Angular 20.3.x projects and declare as _peerDependencies_:

- **`@angular/core`**: `^20.3.0`
- **`@angular/common`**: `^20.3.0`

---

## Installation from npm

Once published, the libraries can be installed independently in an Angular project:

```bash
npm install catarina
npm install safirial
npm install safirial-icons
```

Or in a single line:

```bash
npm install catarina safirial safirial-icons
```

You can also use `pnpm` or `yarn` with the same package names.

---

## Basic usage in an Angular application

In an Angular 20 project, after installing the dependencies, you can configure icon providers using the utilities exported by `safirial-icons`:

```ts
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ICON_PROVIDER as SAFIRIAL_ICON_PROVIDER } from 'safirial';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER } from 'catarina';
import { getIconPath } from 'safirial-icons';

const iconProviderConfig = {
  getPath: getIconPath
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: SAFIRIAL_ICON_PROVIDER, useValue: iconProviderConfig },
    { provide: CATARINA_ICON_PROVIDER, useValue: iconProviderConfig }
  ]
};
```

With this configuration, `catarina` and `safirial` components that depend on `ICON_PROVIDER` resolve icon paths using the `safirial-icons` package.

---

## Consuming components

Once providers are configured, components can be imported directly from each library:

```ts
// Example application component
import { Component } from '@angular/core';
import { Button as CatarinaButton, Icon as CatarinaIcon } from 'catarina';
import { Button as SafirialButton, Icon as SafirialIcon } from 'safirial';

@Component({
  selector: 'app-root',
  imports: [CatarinaButton, CatarinaIcon, SafirialButton, SafirialIcon],
  template: `
    <cat-button variant="primary" iconLeft="home">
      Catarina Button
    </cat-button>

    <saf-button variant="secondary" iconLeft="sun">
      Safirial Button
    </saf-button>
  `
})
export class AppComponent {}
```

Icon names (`"home"`, `"sun"`, etc.) must correspond to entries exported in the `iconList` from the `safirial-icons` package.

---

## Local workspace development

Within the workspace, you can run standard Angular CLI commands:

- **Serve the test application (`playground`)**:

  ```bash
  npm run start
  # or
  ng serve
  ```

- **Build all configured libraries**:

  ```bash
  npm run build
  # or
  ng build
  ```

Build artifacts are generated in the `dist/` directory with a folder per library (e.g., `dist/catarina`, `dist/safirial`, `dist/safirial-icons`).

---

## Publishing libraries

Each library in the workspace can be published separately to the npm registry. A general workflow to publish a library is:

```bash
ng build <library-name>
cd dist/<library-name>
npm publish
```

Valid library names in this workspace are:

- `catarina`
- `safirial`
- `safirial-icons`

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
