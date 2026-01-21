## Safirial Icons – Paquete de iconos SVG para Angular

**Safirial Icons** es un paquete de iconos SVG pensado para aplicaciones Angular.  
Proporciona una lista de nombres de icono y una función para resolver rutas estáticas a los SVG.

Este paquete puede utilizarse de forma independiente o junto con los design systems `catarina` y `safirial`.

- **Paquete npm**: `safirial-icons`
- **Versión**: `0.1.0`

---

## API pública

El archivo `public-api.ts` expone los siguientes elementos:

- `ICON_BASE_PATH`: ruta base donde se sirven los SVG (`'safirial-icons'`).
- `iconList`: lista de nombres de icono disponibles (por ejemplo, `'home'`, `'sun'`, `'email'`, `'github'`, etc.).
- `IconName`: tipo TypeScript que representa cualquier nombre de icono válido.
- `getIconPath(name: IconName): string`: función que devuelve la ruta completa del SVG a partir del nombre.

Ejemplo de uso directo de `getIconPath`:

```ts
import { getIconPath, IconName } from 'safirial-icons';

const iconName: IconName = 'home';
const path = getIconPath(iconName); // 'safirial-icons/home.svg'
```

---

## Integración con `catarina` y `safirial`

Los design systems `catarina` y `safirial` utilizan un token de inyección `ICON_PROVIDER` para resolver iconos.  
`safirial-icons` se integra proporcionando la implementación de `getPath`:

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

Con esta configuración:

- Los componentes `cat-icon` y `saf-icon` usan `getIconPath` para resolver las rutas de los SVG.
- Los nombres de icono válidos son los incluidos en `iconList`.

---

## Instalación

En un proyecto Angular:

```bash
npm install safirial-icons
```

También puede instalarse usando `pnpm` o `yarn`:

```bash
pnpm add safirial-icons
yarn add safirial-icons
```

---

## Uso combinado con componentes

Ejemplo de integración completa junto a `catarina` y `safirial`:

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
      Botón Catarina
    </cat-button>

    <saf-button variant="secondary" iconLeft="github">
      Botón Safirial
    </saf-button>
  `
})
export class AppComponent {}
```

En este escenario, los valores `"home"` y `"github"` se resuelven a SVG servidos bajo la ruta base definida por `ICON_BASE_PATH`.

---

## Construcción y publicación

Para compilar la librería desde el workspace:

```bash
ng build safirial-icons
```

El resultado se genera en:

```bash
dist/safirial-icons
```

Para publicar en npm (desde el workspace):

```bash
ng build safirial-icons
cd dist/safirial-icons
npm publish
```

---

## Créditos y atribución

Los iconos SVG incluidos en este paquete provienen de las siguientes fuentes:

### Heroicons

Los iconos están basados en [Heroicons](https://heroicons.com/outline), creados por los desarrolladores de Tailwind CSS.

- **Sitio web**: [https://heroicons.com/outline](https://heroicons.com/outline)
- **Licencia**: MIT License
- **Versión**: v2.1.5

### SVG Repo

Algunos iconos adicionales provienen de [SVG Repo](https://www.svgrepo.com/), una colección de iconos SVG de código abierto.

- **Sitio web**: [https://www.svgrepo.com/](https://www.svgrepo.com/)
- **Licencias**: Varias (MIT, Apache 2.0, CC0)

Todos los iconos conservan sus licencias originales según corresponda. La atribución se mantiene de acuerdo con los términos de las respectivas licencias.

---

## Idioma / Language

Esta documentación está disponible en español. Para la versión en inglés, consulta [README.en.md](./README.en.md).

This documentation is available in Spanish. For the English version, see [README.en.md](./README.en.md).

---

## Nota sobre la documentación

Esta documentación fue generada usando **Cursor** con los siguientes parámetros:

- **Herramienta**: Cursor IDE
- **Modelo**: Auto (agente router de Cursor)
- **Idioma**: Español
- **Instrucciones**: Analizar todos los proyectos del workspace y actualizar la documentación para consumo, sin incluir errores, mejoras ni sugerencias, solo información factual sobre instalación, configuración y uso de las librerías.
