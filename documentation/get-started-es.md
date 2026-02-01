# Catarina - Guía de Inicio Rápido

Esta guía te ayudará a instalar y configurar Catarina en tu proyecto Angular 20.3.x.

## Instalación

Catarina puede instalarse de dos formas: desde npm (recomendado para producción) o directamente desde el repositorio de GitHub (útil para desarrollo o cuando necesitas la última versión).

### Opción 1: Instalación desde npm (Recomendado)

La forma más sencilla de instalar Catarina es usando npm:

```bash
npm install catarina
```

También puedes usar otros gestores de paquetes:

```bash
# Con pnpm
pnpm install catarina

# Con yarn
yarn add catarina
```

### Opción 2: Instalación desde GitHub

Si prefieres instalar Catarina directamente desde el repositorio de GitHub, sigue estos pasos:

1. **Clonar el repositorio**:

```bash
git clone https://github.com/Hydenaky/library-workspace.git
cd library-workspace
```

2. **Instalar dependencias del workspace**:

```bash
npm install
```

3. **Compilar la librería Catarina**:

```bash
ng build catarina
```

Este comando generará los archivos compilados en el directorio `dist/catarina`.

4. **Empaquetar la librería**:

```bash
cd dist/catarina
npm pack
```

Este comando creará un archivo `.tgz` (por ejemplo, `catarina-1.1.0.tgz`) que puedes instalar en tu proyecto.

5. **Instalar en tu proyecto Angular**:

Desde el directorio raíz de tu proyecto Angular, ejecuta:

```bash
npm install /ruta/completa/a/library-workspace/dist/catarina/catarina-1.1.0.tgz
```

O si estás en el mismo directorio padre:

```bash
npm install ../library-workspace/dist/catarina/catarina-1.1.0.tgz
```

**Nota**: Reemplaza `1.1.0` con la versión actual que se haya generado.

## Configuración de iconos

Catarina utiliza un sistema de iconos basado en tokens. Para que los componentes funcionen correctamente con iconos, necesitas configurar el `ICON_PROVIDER`. La forma más sencilla es usar el paquete `safirial-icons`.

### 1. Instalar safirial-icons

```bash
npm install safirial-icons
```

### 2. Configurar el proveedor de iconos

En tu archivo `app.config.ts` (o `main.ts` dependiendo de tu configuración), añade la configuración del proveedor:

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

### 3. Configurar assets en angular.json

Para que los archivos SVG de iconos se copien correctamente al directorio de salida, añade la siguiente configuración en tu `angular.json`:

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

Esta configuración copia todos los archivos SVG desde `node_modules/safirial-icons/assets` a la carpeta `safirial-icons` en el directorio de salida de tu aplicación.

## Primer uso

Una vez instalado y configurado, puedes comenzar a usar los componentes de Catarina en tu aplicación.

### Ejemplo básico

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { Button, Icon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <cat-button variant="primary" size="md" iconLeft="home">
      Botón Catarina
    </cat-button>

    <cat-icon name="sun" [size]="'32px'"></cat-icon>
  `
})
export class AppComponent {}
```

### Componentes disponibles

Catarina exporta los siguientes componentes principales:

#### Componentes de diseño
- `Button` - `cat-button`
- `Icon` - `cat-icon`
- `Card` - `cat-card`
- `Accordion` - `cat-accordion`
- `AccordionGroup` - `cat-accordion-group`

#### Componentes de formulario
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

#### Utilidades
- `Drag` - Directiva para arrastrar y soltar
- Utilidades de theming

## Verificación de la instalación

Para verificar que Catarina se ha instalado correctamente, puedes:

1. **Verificar en package.json**:

```json
{
  "dependencies": {
    "catarina": "^1.1.0"
  }
}
```

2. **Importar un componente en tu aplicación**:

Si puedes importar y usar un componente sin errores, la instalación fue exitosa.

## Solución de problemas

### Error: "Cannot find module 'catarina'"

- Asegúrate de haber ejecutado `npm install` después de añadir Catarina a tu `package.json`
- Verifica que estás usando Angular 20.3.0 o superior
- Si instalaste desde GitHub, verifica que el archivo `.tgz` se generó correctamente

### Los iconos no se muestran

- Verifica que `safirial-icons` está instalado
- Confirma que el `ICON_PROVIDER` está configurado en `app.config.ts`
- Asegúrate de que la configuración de assets en `angular.json` está correcta
- Verifica que el nombre del icono existe en la lista de iconos de `safirial-icons`

### Errores de compilación

- Verifica que todas las peer dependencies están instaladas:
  ```bash
  npm install @angular/core@^20.3.0 @angular/common@^20.3.0
  ```

## Próximos pasos

Ahora que tienes Catarina instalado y configurado, puedes:

- Explorar los diferentes componentes disponibles
- Consultar la documentación de cada componente
- Ver el [preview en vivo](https://jpcn-portfolio.vercel.app/catarina-preview) para ejemplos visuales
- Revisar el código fuente en [GitHub](https://github.com/Hydenaky/library-workspace)

## Recursos adicionales

- **Documentación completa**: Consulta la [introducción](./introduction-es.md) para más información sobre Catarina
- **Repositorio**: [GitHub](https://github.com/Hydenaky/library-workspace)
- **Issues**: [Reportar problemas](https://github.com/Hydenaky/library-workspace/issues)
