# Icon (`cat-icon`)

El componente `Icon` carga y muestra iconos SVG de forma dinámica, con soporte para SSR y validación de contenido.

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
- **Validación**: Valida que el contenido sea un SVG válido antes de renderizarlo
- **SSR compatible**: Funciona correctamente en Server-Side Rendering
- **Placeholder**: Muestra un icono placeholder si el icono no se encuentra o falla al cargar
- **Procesamiento automático**: Procesa los SVG para usar `currentColor` y asegurar escalado correcto

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

1. Se muestra un icono placeholder
2. Se registra un error en la consola del navegador
3. El componente continúa funcionando sin romper la aplicación

### Notas

- El componente requiere que `ICON_PROVIDER` esté configurado para usar `name`
- Si usas `src`, proporciona una ruta absoluta o relativa al archivo SVG
- Los iconos se validan estrictamente para asegurar que sean SVG válidos
- El tamaño máximo de un archivo SVG es 100KB (se muestra una advertencia si es mayor)
- En SSR, se muestra un placeholder hasta que el icono se carga en el cliente

### Integración con safirial-icons

Para usar iconos de `safirial-icons`, configura el `ICON_PROVIDER`:

```typescript
// app.config.ts
import { ICON_PROVIDER } from 'catarina';
import { getIconPath } from 'safirial-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ICON_PROVIDER, useValue: { getPath: getIconPath } }
  ]
};
```

Luego puedes usar cualquier icono de la lista de `safirial-icons`:

```typescript
<cat-icon name="home"></cat-icon>
<cat-icon name="sun"></cat-icon>
<cat-icon name="moon"></cat-icon>
```
