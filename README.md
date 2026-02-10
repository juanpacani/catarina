## Library Workspace – Monorepo Angular para librerías UI

Este workspace Angular agrupa librerías enfocadas en UI y manejo de iconos:

- **`catarina`**: Design system de componentes UI para Angular 20 con utilidades de iconos integradas.
- **`playground`**: Aplicación Angular de ejemplo que consume la librería.

La librería está pensada para proyectos Angular 20.3.x y declara como _peerDependencies_:

- **`@angular/core`**: `^20.3.0`
- **`@angular/common`**: `^20.3.0`

---

## Instalación desde npm

Una vez publicada, la librería puede instalarse en un proyecto Angular:

```bash
npm install catarina
```

También es posible usar `pnpm` o `yarn` con el mismo nombre de paquete.

---

## Uso básico en una aplicación Angular

En un proyecto Angular 20, después de instalar la dependencia, se puede configurar el proveedor de iconos usando las utilidades exportadas por `catarina`:

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

Con esta configuración, los componentes de `catarina` que dependen de `ICON_PROVIDER` resuelven las rutas de iconos usando las utilidades integradas en `catarina`.

---

## Consumo de los componentes

Una vez configurado el proveedor, se pueden importar los componentes directamente desde `catarina`:

```ts
// Ejemplo de componente de aplicación
import { Component } from '@angular/core';
import { Button, Icon, iconList } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <cat-button variant="primary" iconLeft="home">
      Botón Catarina
    </cat-button>

    <cat-icon name="sun" size="32px"></cat-icon>
  `
})
export class AppComponent {
  // iconList está disponible para autocompletado y validación
  availableIcons = iconList;
}
```

Los nombres de icono (`"home"`, `"sun"`, etc.) deben corresponder a las entradas exportadas en la lista `iconList` de `catarina`.

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

Los artefactos de compilación se generan en el directorio `dist/` con una carpeta por librería (por ejemplo, `dist/catarina`).

---

## Publicación de las librerías

Cada librería del workspace puede publicarse por separado en el registro de npm. Un flujo general para publicar una librería es:

```bash
ng build <nombre-libreria>
cd dist/<nombre-libreria>
npm publish
```

El nombre de librería válido en este workspace es:

- `catarina`

---

## Idioma / Language

Esta documentación está disponible en español. Para la versión en inglés, consulta [README.en.md](./README.en.md).

This documentation is available in Spanish. For the English version, see [README.en.md](./README.en.md).

---