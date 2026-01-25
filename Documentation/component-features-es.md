# Catarina - Características Generales de los Componentes

Esta guía explica las características comunes y patrones de uso que aplican a todos los componentes de Catarina.

## Personalización de Estilos con `customClass`

Todos los componentes de Catarina soportan la propiedad `customClass` que permite aplicar clases CSS personalizadas y sobrescribir estilos de manera controlada.

### Cómo funciona

Los componentes exponen el valor de `customClass` como un atributo de datos en el elemento host mediante `@HostBinding`. Esto permite seleccionar y estilizar componentes específicos usando selectores de atributo CSS.

### Patrón de implementación

Cada componente expone atributos de datos con el formato `data-{component}-class`:

- `cat-button` → `data-button-class`
- `cat-card` → `data-card-class`
- `cat-dialog` → `data-card-class` (comparte el mismo patrón)
- `cat-select-input` → `data-select-input-class`
- `cat-accordion` → `data-accordion-class`
- Y así sucesivamente...

### Ejemplo de uso

```typescript
// En tu componente
@Component({
  template: `
    <cat-button customClass="theme-button" variant="primary">
      Botón personalizado
    </cat-button>
    
    <cat-card customClass="cards" variant="elevated" size="lg">
      <p>Contenido de la tarjeta</p>
    </cat-card>
  `
})
```

### Sobrescritura de estilos

Para sobrescribir estilos internos de los componentes, usa `::ng-deep` junto con selectores de atributo:

```scss
// Estilizar el host del componente
cat-button[data-button-class="theme-button"] {
  /* Propiedades que afectan al elemento host */
  margin: 16px;
  
  /* Usar ::ng-deep para atravesar el ViewEncapsulation y apuntar a elementos internos */
  ::ng-deep {
    > button {
      border-radius: 0%;
      border-bottom-right-radius: 18px;
      background-color: var(--primary-color-2);
    }
  }
}

// Ejemplo con cat-card
cat-card[data-card-class="cards"] {
  /* Propiedades que afectan al host */
  width: 100%;
  height: 100%;

  /* Atravesar y apuntar al elemento interno (section) */
  ::ng-deep {
    > section {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: var(--neutral-color-1);
      padding: 8px;
      border-radius: 18px;
      flex-wrap: wrap;
    }

    /* También puedes apuntar por clases específicas del componente */
    > section.elevated.lg {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
  }
}
```

### Atributos de datos adicionales

Además de `customClass`, los componentes también exponen otros atributos de datos útiles:

- `data-card-variant`: Variante del componente (surface, outlined, elevated)
- `data-card-size`: Tamaño del componente (sm, md, lg)
- `data-button-class`: Clase personalizada del botón

Estos atributos permiten crear selectores CSS más específicos:

```scss
cat-card[data-card-variant="elevated"][data-card-size="lg"] {
  ::ng-deep {
    > section {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  }
}
```

### Notas importantes

- **ViewEncapsulation**: Los componentes de Catarina usan ViewEncapsulation, por lo que necesitas `::ng-deep` para estilizar elementos internos
- **Especificidad**: Usa selectores de atributo para aumentar la especificidad y evitar conflictos
- **Mantenibilidad**: Agrupa los estilos personalizados por componente y usa nombres descriptivos en `customClass`

## Servicio de Theming

Catarina incluye un servicio de theming (`Theming`) que permite generar paletas de colores dinámicas y cambiar entre temas claro y oscuro.

### Importación

```typescript
import { Theming } from 'catarina';
```

### Uso básico

El servicio `Theming` está disponible como un servicio singleton (providedIn: 'root'):

```typescript
import { Component, OnInit } from '@angular/core';
import { Theming } from 'catarina';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent implements OnInit {
  constructor(private theming: Theming) {}

  ngOnInit() {
    // Generar paletas con un color primario y tema oscuro
    this.theming.generatePalettes('#3b82f6', true);
  }
}
```

### Métodos principales

#### `generatePalettes(color: string, dark: boolean): string[][]`

Genera todas las paletas de colores (primaria, neutral y elementos) y aplica el tema:

```typescript
// Tema oscuro con color primario azul
this.theming.generatePalettes('#3b82f6', true);

// Tema claro con color primario verde
this.theming.generatePalettes('#10b981', false);
```

#### `calculatePrimaryColor(color: string): string[]`

Calcula solo la paleta de colores primaria sin cambiar el tema:

```typescript
// Cambiar solo el color primario manteniendo el tema actual
this.theming.calculatePrimaryColor('#ef4444');
```

#### `calculateDynamicPalettes(dark: boolean): { neutral: string[], elements: string[] }`

Calcula las paletas dinámicas (neutral y elementos) según el tema:

```typescript
// Cambiar a tema oscuro
const palettes = this.theming.calculateDynamicPalettes(true);

// Cambiar a tema claro
const palettes = this.theming.calculateDynamicPalettes(false);
```

### Observables

El servicio expone observables para reaccionar a cambios de tema:

```typescript
import { Component, OnInit } from '@angular/core';
import { Theming } from 'catarina';

@Component({
  selector: 'app-root',
  template: `...`
})
export class AppComponent implements OnInit {
  isDarkTheme = false;
  allPalettes: string[][] = [];

  constructor(private theming: Theming) {}

  ngOnInit() {
    // Suscribirse a cambios de tema
    this.theming.activeTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
      console.log('Tema actual:', isDark ? 'Oscuro' : 'Claro');
    });

    // Suscribirse a cambios de paletas
    this.theming.allPalettes$.subscribe(palettes => {
      this.allPalettes = palettes;
      console.log('Paletas actualizadas:', palettes);
    });

    // Inicializar tema
    this.theming.generatePalettes('#3b82f6', false);
  }
}
```

### Variables CSS generadas

El servicio aplica automáticamente variables CSS en el elemento `:root`:

- `--primary-color-0` a `--primary-color-4`: Paleta de colores primarios
- `--neutral-color-0` a `--neutral-color-8`: Paleta de colores neutros
- `--element-color-0` a `--element-color-4`: Paleta de colores de elementos

Estas variables pueden usarse en tus estilos:

```scss
.mi-componente {
  background-color: var(--primary-color-2);
  color: var(--neutral-color-8);
  border: 1px solid var(--element-color-2);
}
```

## Directiva de Arrastre (Drag)

Catarina incluye una directiva `CDrag` que permite hacer elementos arrastrables con el mouse.

### Importación

```typescript
import { Drag } from 'catarina';
```

### Uso básico

Aplica la directiva a cualquier elemento HTML:

```typescript
import { Component } from '@angular/core';
import { Drag } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Drag],
  template: `
    <div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2);">
      Arrástrame
    </div>
  `
})
export class AppComponent {}
```

### Características

- **Posicionamiento automático**: Si el elemento no tiene `position` definido, la directiva establece `position: absolute` automáticamente
- **Cursor visual**: Cambia el cursor a `grabbing` mientras se arrastra y a `grab` cuando está listo
- **Eventos de mouse**: Maneja `mousedown`, `mousemove` y `mouseup` para una experiencia fluida

### Ejemplo con componente de Catarina

```typescript
import { Component } from '@angular/core';
import { Dialog, Drag } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Dialog, Drag],
  template: `
    <cat-dialog customClass="draggable-dialog" variant="elevated">
      <div CDrag style="padding: 16px; cursor: grab;">
        <h2>Diálogo Arrastrable</h2>
        <p>Arrastra este diálogo por la barra superior</p>
      </div>
    </cat-dialog>
  `
})
export class AppComponent {}
```

### Notas

- La directiva funciona mejor con elementos que tienen `position: absolute` o `position: fixed`
- El elemento debe estar visible en el DOM cuando se aplica la directiva
- Los cálculos de posición se basan en `offsetLeft` y `offsetTop`

## Integración con Iconos (safirial-icons)

Catarina utiliza un sistema de iconos basado en tokens que permite integrarse con diferentes proveedores de iconos, incluyendo `safirial-icons`.

### Protocolo de Iconos

Catarina define un token `ICON_PROVIDER` que sigue una interfaz específica:

```typescript
interface IconProvider {
  getPath(name: string): string;
}
```

Cualquier proveedor que implemente esta interfaz puede ser usado con los componentes de Catarina.

### Configuración con safirial-icons

#### 1. Instalar dependencias

```bash
npm install catarina safirial-icons
```

#### 2. Configurar el proveedor en `app.config.ts`

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

**Nota**: Si también usas `safirial`, puedes configurar ambos proveedores:

```typescript
import { ICON_PROVIDER as SAFIRIAL_ICON_PROVIDER } from 'safirial';
import { ICON_PROVIDER as CATARINA_ICON_PROVIDER } from 'catarina';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    { provide: SAFIRIAL_ICON_PROVIDER, useValue: iconProviderConfig },
    { provide: CATARINA_ICON_PROVIDER, useValue: iconProviderConfig }
  ]
};
```

#### 3. Configurar assets en `angular.json`

Para que los archivos SVG de `safirial-icons` se copien al directorio de salida, añade la siguiente configuración en `angular.json`:

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

Esta configuración:
- Copia todos los archivos SVG desde `node_modules/safirial-icons/assets`
- Los coloca en la carpeta `safirial-icons` en el directorio de salida
- Permite que los iconos sean accesibles en tiempo de ejecución

### Uso de iconos en componentes

Una vez configurado, puedes usar iconos en los componentes de Catarina:

```typescript
import { Component } from '@angular/core';
import { Button, Icon } from 'catarina';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  template: `
    <!-- Icono en botón -->
    <cat-button variant="primary" iconLeft="home">
      Inicio
    </cat-button>

    <!-- Icono independiente -->
    <cat-icon name="sun" [size]="'32px'"></cat-icon>
    
    <!-- Icono con color personalizado -->
    <cat-icon name="moon" [size]="'24px'" color="#3b82f6"></cat-icon>
  `
})
export class AppComponent {}
```

### Nombres de iconos disponibles

Los nombres de iconos deben coincidir con los definidos en la lista de iconos de `safirial-icons`. Algunos ejemplos comunes:

- `home`, `sun`, `moon`, `palette`
- `chevron-arrow-up`, `chevron-arrow-down`, `chevron-arrow-left`, `chevron-arrow-right`
- `plus`, `minus`, `email`, `github`, `linkedin`

Consulta la documentación de `safirial-icons` para la lista completa de iconos disponibles.

### Fallback y manejo de errores

Si un icono no se encuentra o falla al cargar:

- El componente `cat-icon` muestra un icono placeholder
- Se registra un error en la consola del navegador
- El componente continúa funcionando sin romper la aplicación

### Crear un proveedor personalizado

Puedes crear tu propio proveedor de iconos implementando la interfaz:

```typescript
import { ICON_PROVIDER } from 'catarina';

const customIconProvider = {
  getPath: (name: string): string => {
    // Tu lógica personalizada para resolver rutas de iconos
    return `/assets/icons/${name}.svg`;
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ICON_PROVIDER, useValue: customIconProvider }
  ]
};
```

## Resumen de Características Comunes

| Característica | Descripción | Componentes que la soportan |
|---------------|-------------|----------------------------|
| `customClass` | Permite aplicar clases CSS personalizadas | Todos los componentes |
| Atributos de datos | Exposición de propiedades como atributos HTML | Todos los componentes |
| Variantes | Diferentes estilos visuales (`surface`, `outlined`, `elevated`) | Card, Dialog, Drawer, Inputs |
| Tamaños | Tamaños predefinidos (`sm`, `md`, `lg`) | Button, Card, Dialog, Inputs |
| Integración con iconos | Soporte para iconos mediante `ICON_PROVIDER` | Button, Icon |

## Próximos pasos

- Consulta la documentación específica de cada componente para detalles adicionales
- Revisa los ejemplos en el [preview en vivo](https://jpcn-portfolio.vercel.app/catarina-preview)
- Explora el código fuente en [GitHub](https://github.com/Hydenaky/library-workspace)
