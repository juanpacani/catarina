## Library Workspace – Monorepo Angular para librerías UI

Este workspace Angular agrupa varias librerías enfocadas en UI y en manejo de iconos:

- **`catarina`**: Design system de componentes UI para Angular 20.
- **`safirial`**: Conjunto de componentes UI ligeros basados en iconos.
- **`safirial-icons`**: Paquete de iconos SVG y utilidades para resolver rutas de iconos.
- **`playground`**: Aplicación Angular de ejemplo que consume las librerías anteriores.

Todas las librerías están pensadas para proyectos Angular 20.3.x y declaran como _peerDependencies_:

- **`@angular/core`**: `^20.3.0`
- **`@angular/common`**: `^20.3.0`

---

## Instalación desde npm

Una vez publicadas, las librerías pueden instalarse de forma independiente en un proyecto Angular:

```bash
npm install catarina
npm install safirial
npm install safirial-icons
```

O en una sola línea:

```bash
npm install catarina safirial safirial-icons
```

También es posible usar `pnpm` o `yarn` con los mismos nombres de paquete.

---

## Uso básico en una aplicación Angular

En un proyecto Angular 20, después de instalar las dependencias, se pueden configurar los proveedores de iconos usando las utilidades exportadas por `safirial-icons`:

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

Con esta configuración, los componentes de `catarina` y `safirial` que dependen de `ICON_PROVIDER` resuelven las rutas de iconos usando el paquete `safirial-icons`.

---

## Consumo de los componentes

Una vez configurados los proveedores, se pueden importar los componentes directamente desde cada librería:

```ts
// Ejemplo de componente de aplicación
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

    <saf-button variant="secondary" iconLeft="sun">
      Botón Safirial
    </saf-button>
  `
})
export class AppComponent {}
```

Los nombres de icono (`"home"`, `"sun"`, etc.) deben corresponder a las entradas exportadas en la lista `iconList` del paquete `safirial-icons`.

---

## Desarrollo local del workspace

Dentro del workspace, se pueden ejecutar los comandos estándar de Angular CLI:

- **Servir la aplicación de prueba (`playground`)**:

  ```bash
  npm run start
  # o
  ng serve
  ```

- **Construir todas las librerías configuradas**:

  ```bash
  npm run build
  # o
  ng build
  ```

Los artefactos de compilación se generan en el directorio `dist/` con una carpeta por librería (por ejemplo, `dist/catarina`, `dist/safirial`, `dist/safirial-icons`).

---

## Publicación de las librerías

Cada librería del workspace puede publicarse por separado en el registro de npm. Un flujo general para publicar una librería es:

```bash
ng build <nombre-libreria>
cd dist/<nombre-libreria>
npm publish
```

Los nombres de librería válidos en este workspace son:

- `catarina`
- `safirial`
- `safirial-icons`

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
