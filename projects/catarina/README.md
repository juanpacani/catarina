## Catarina – Design System para Angular

**Catarina** es una librería de componentes UI para Angular 20.3.x.  
Incluye botones, iconos, controles de formulario, paneles y utilidades relacionadas con _theming_ e iconos.

La librería está publicada con el nombre:

- **Paquete npm**: `catarina`
- **Versión**: `1.0.1`

---

## Requisitos

`catarina` declara las siguientes _peerDependencies_:

- `@angular/core`: `^20.3.0`
- `@angular/common`: `^20.3.0`

Y depende de:

- `tslib`: `^2.3.0`

---

## Instalación

En un proyecto Angular 20:

```bash
npm install catarina
```

También se puede instalar con `pnpm` o `yarn` usando el mismo nombre de paquete.

---

## API pública

El archivo `public-api.ts` expone los principales elementos del design system:

- **Componentes de diseño**:
  - `Icon` (`cat-icon`)
  - `Button` (`cat-button`)
  - Paneles (`card`, `accordion`, `accordion-group`)
- **Componentes de formulario**:
  - `cat-input`, `color-input`, `select-input`, `date-input`, `file-input`,
    `password-input`, `range-input`, `text-area-input`, `time-input`
- **Overlays**:
  - `dialog`
- **Servicios y directivas**:
  - Directiva de arrastre (`drag`)
  - Utilidades de _theming_
- **Tokens**:
  - `ICON_PROVIDER`

Todos estos símbolos se importan directamente desde el paquete `catarina`.

---

## Configuración de iconos con `safirial-icons`

`catarina` utiliza el token `ICON_PROVIDER` para resolver las rutas de los iconos.  
Este token se puede configurar usando las utilidades del paquete `safirial-icons`:

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

Con esta configuración, los componentes de `catarina` que usan iconos resuelven las rutas desde `safirial-icons`.

### Configuración de assets en `angular.json`

Además de configurar el `ICON_PROVIDER`, es necesario añadir la siguiente entrada en la sección `assets` de `angular.json` para que los archivos SVG de `safirial-icons` se copien al directorio de salida:

```json
{
  "projects": {
    "tu-proyecto": {
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

Esta configuración copia todos los archivos SVG desde `node_modules/safirial-icons/assets` a la carpeta `safirial-icons` en el directorio de salida de la aplicación.

---

## Uso básico de componentes

Ejemplo de uso de `cat-button` e `Icon` dentro de un componente de aplicación:

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Button as CatarinaButton, Icon as CatarinaIcon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [CatarinaButton, CatarinaIcon],
  template: `
    <cat-button variant="primary" size="md" iconLeft="home">
      Botón Catarina
    </cat-button>

    <cat-icon name="sun" [size]="'32px'"></cat-icon>
  `
})
export class AppComponent {}
```

Los valores de `name` de los iconos deben coincidir con los nombres definidos en `iconList` del paquete `safirial-icons`.

---

## Construcción y publicación

Para compilar la librería desde el workspace:

```bash
ng build catarina
```

El resultado se genera en:

```bash
dist/catarina
```

Para publicar en npm (desde el workspace):

```bash
ng build catarina
cd dist/catarina
npm publish
```

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
