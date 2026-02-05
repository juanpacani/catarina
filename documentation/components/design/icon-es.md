# Icon (`cat-icon`)

El componente `Icon` carga y muestra iconos SVG de forma dinámica, con soporte para SSR y validación de contenido. Los iconos solo se renderizan cuando se cargan correctamente, optimizando el rendimiento.

### Importación

```typescript
import { Icon } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Icon } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Icon],
  template: `
    <cat-icon name="home"></cat-icon>
  `
})
export class ExampleComponent {}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `name` | `string` | - | Nombre del icono (se resuelve mediante `ICON_PROVIDER`) |
| `src` | `string` | - | Ruta directa al archivo SVG (alternativa a `name`) |
| `size` | `string` | `'1em'` | Tamaño del icono (puede ser cualquier unidad CSS) |
| `color` | `string` | `'currentColor'` | Color del icono |

### Características

- **Carga dinámica**: Los iconos se cargan mediante `fetch` cuando se proporciona un `name` o `src`
- **Validación estricta**: Valida que el contenido sea un SVG válido antes de renderizarlo
- **SSR compatible**: Funciona correctamente en Server-Side Rendering
- **Renderizado condicional**: Solo muestra el icono cuando se carga correctamente (no muestra placeholder)
- **Procesamiento automático**: Procesa los SVG para usar `currentColor` y asegurar escalado correcto
- **Cancelación de peticiones**: Cancela automáticamente peticiones anteriores cuando cambia el icono

### Ejemplos

#### Icono por nombre

```typescript
<cat-icon name="sun" [size]="'32px'"></cat-icon>
```

#### Icono con ruta directa

```typescript
<cat-icon src="/assets/icons/custom-icon.svg" [size]="'24px'"></cat-icon>
```

#### Icono con color personalizado

```typescript
<cat-icon name="moon" [size]="'2em'" color="#3b82f6"></cat-icon>
```

#### Icono con tamaño relativo

```typescript
<cat-icon name="home" size="1.5em"></cat-icon>
```

### Procesamiento de SVG

El componente procesa automáticamente los SVG cargados:

- Elimina atributos `width` y `height` para permitir escalado flexible
- Cambia `fill` y `stroke` a `currentColor` (si no son `none`) para permitir coloreado
- Añade `viewBox="0 0 24 24"` si no existe para asegurar escalado correcto

### Manejo de errores

Si un icono no se puede cargar:

1. El componente no renderiza nada (optimización de rendimiento)
2. Se registra un error en la consola del navegador
3. El componente continúa funcionando sin romper la aplicación

### Configuración con paquetes de iconos externos

Para sincronizar el componente con paquetes de iconos externos (como `safirial-icons`), necesitas configurar dos cosas:

#### 1. Configuración de assets en `angular.json`

Agrega la siguiente entrada en la sección `assets` de tu proyecto para que los archivos SVG se copien al directorio de salida:

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

#### 2. Configuración del proveedor en `app.config.ts`

Configura el `ICON_PROVIDER` usando las utilidades integradas en `catarina`:

```typescript
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

Con esta configuración, puedes usar cualquier icono de la lista exportada en `iconList` desde `catarina`:

```typescript
import { iconList, IconName } from 'catarina';

// iconList contiene todos los nombres de iconos disponibles
// IconName es el tipo TypeScript para autocompletado
```

### Uso con iconos personalizados

Si prefieres usar iconos personalizados sin un paquete externo, puedes usar la propiedad `src`:

```typescript
<cat-icon src="/assets/icons/mi-icono.svg" size="24px"></cat-icon>
```

### Notas

- El componente requiere que `ICON_PROVIDER` esté configurado para usar `name`
- Si usas `src`, proporciona una ruta absoluta o relativa al archivo SVG
- Los iconos se validan estrictamente para asegurar que sean SVG válidos
- El tamaño máximo de un archivo SVG es 100KB (se muestra una advertencia si es mayor)
- En SSR, el componente no renderiza nada hasta que se carga en el cliente
- El componente cancela automáticamente peticiones de carga cuando cambia el `name` o `src`
