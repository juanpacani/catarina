## Safirial Icons – SVG Icon Package for Angular

**Safirial Icons** is an SVG icon package designed for Angular applications.  
It provides a list of icon names and a function to resolve static paths to SVGs.

This package can be used standalone or alongside the `catarina` and `safirial` design systems.

- **npm package**: `safirial-icons`
- **Version**: `0.1.0`

---

## Public API

The `public-api.ts` file exposes the following elements:

- `ICON_BASE_PATH`: base path where SVGs are served (`'safirial-icons'`).
- `iconList`: list of available icon names (e.g., `'home'`, `'sun'`, `'email'`, `'github'`, etc.).
- `IconName`: TypeScript type representing any valid icon name.
- `getIconPath(name: IconName): string`: function that returns the complete SVG path from the name.

Example of direct usage of `getIconPath`:

```ts
import { getIconPath, IconName } from 'safirial-icons';

const iconName: IconName = 'home';
const path = getIconPath(iconName); // 'safirial-icons/home.svg'
```

---

## Integration with `catarina` and `safirial`

The `catarina` and `safirial` design systems use an `ICON_PROVIDER` injection token to resolve icons.  
`safirial-icons` integrates by providing the `getPath` implementation:

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

With this configuration:

- The `cat-icon` and `saf-icon` components use `getIconPath` to resolve SVG paths.
- Valid icon names are those included in `iconList`.

---

## Installation

In an Angular project:

```bash
npm install safirial-icons
```

It can also be installed using `pnpm` or `yarn`:

```bash
pnpm add safirial-icons
yarn add safirial-icons
```

---

## Usage combined with components

Example of complete integration alongside `catarina` and `safirial`:

```ts
// app.component.ts
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

    <saf-button variant="secondary" iconLeft="github">
      Safirial Button
    </saf-button>
  `
})
export class AppComponent {}
```

In this scenario, the `"home"` and `"github"` values resolve to SVGs served under the base path defined by `ICON_BASE_PATH`.

---

## Building and publishing

To compile the library from the workspace:

```bash
ng build safirial-icons
```

The output is generated in:

```bash
dist/safirial-icons
```

To publish to npm (from the workspace):

```bash
ng build safirial-icons
cd dist/safirial-icons
npm publish
```

---

## Credits and attribution

The SVG icons included in this package come from the following sources:

### Heroicons

Icons are based on [Heroicons](https://heroicons.com/outline), created by the developers of Tailwind CSS.

- **Website**: [https://heroicons.com/outline](https://heroicons.com/outline)
- **License**: MIT License
- **Version**: v2.1.5

### SVG Repo

Some additional icons come from [SVG Repo](https://www.svgrepo.com/), an open-source SVG icon collection.

- **Website**: [https://www.svgrepo.com/](https://www.svgrepo.com/)
- **Licenses**: Various (MIT, Apache 2.0, CC0)

All icons retain their original licenses as applicable. Attribution is maintained in accordance with the respective license terms.

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
