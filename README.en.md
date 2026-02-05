## Library Workspace – Angular Monorepo for UI Libraries

This Angular workspace groups libraries focused on UI and icon management:

- **`catarina`**: UI component design system for Angular 20 with integrated icon utilities.
- **`playground`**: Example Angular application that consumes the library.

The library is designed for Angular 20.3.x projects and declares as _peerDependencies_:

- **`@angular/core`**: `^20.3.0`
- **`@angular/common`**: `^20.3.0`

---

## Installation from npm

Once published, the library can be installed in an Angular project:

```bash
npm install catarina
```

You can also use `pnpm` or `yarn` with the same package name.

---

## Basic usage in an Angular application

In an Angular 20 project, after installing the dependency, you can configure the icon provider using the utilities exported by `catarina`:

```ts
// app.config.ts
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

With this configuration, `catarina` components that depend on `ICON_PROVIDER` resolve icon paths using the integrated utilities in `catarina`.

---

## Consuming components

Once the provider is configured, components can be imported directly from `catarina`:

```ts
// Example application component
import { Component } from '@angular/core';
import { Button, Icon, iconList } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <cat-button variant="primary" iconLeft="home">
      Catarina Button
    </cat-button>

    <cat-icon name="sun" size="32px"></cat-icon>
  `
})
export class AppComponent {
  // iconList is available for autocomplete and validation
  availableIcons = iconList;
}
```

Icon names (`"home"`, `"sun"`, etc.) must correspond to entries exported in the `iconList` from `catarina`.

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

Build artifacts are generated in the `dist/` directory with a folder per library (e.g., `dist/catarina`).

---

## Publishing libraries

Each library in the workspace can be published separately to the npm registry. A general workflow to publish a library is:

```bash
ng build <library-name>
cd dist/<library-name>
npm publish
```

Valid library name in this workspace is:

- `catarina`

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
