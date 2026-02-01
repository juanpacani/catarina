# Accordion (`cat-accordion`)

El componente `Accordion` permite mostrar/ocultar contenido de forma colapsable con un botón.

### Importación

```typescript
import { Accordion } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { Accordion } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Accordion],
  template: `
    <cat-accordion label="Sección 1" [status]="false">
      <p>Contenido colapsable aquí</p>
    </cat-accordion>
  `
})
export class ExampleComponent {}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `accordionId` | `string?` | `undefined` | ID único del accordion (requerido para AccordionGroup) |
| `status` | `boolean` | `false` | Estado inicial (true = abierto, false = cerrado) |
| `label` | `string` | `'Accordion Name'` | Texto del botón del accordion |
| `disabled` | `boolean` | `false` | Deshabilita el accordion |
| `customClass` | `string` | `''` | Clase CSS personalizada |
| `width` | `string` | `'auto'` | Ancho del accordion |
| `buttonVariant` | `'primary' \| 'secondary' \| 'contrast' \| 'outline' \| 'ghost'` | `'secondary'` | Variante del botón |
| `buttonSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `iconLeft` | `boolean` | `false` | Muestra icono a la izquierda |
| `iconCenter` | `boolean` | `false` | Muestra icono en el centro |
| `iconRight` | `boolean` | `true` | Muestra icono a la derecha (por defecto) |
| `scrolleable` | `boolean` | `false` | Permite scroll en el panel de contenido |
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Variante del panel de contenido |

### Eventos (Outputs)

| Evento | Tipo | Descripción |
|--------|------|-------------|
| `updateAccordionGroupStatusOutput` | `EventEmitter<string>` | Emite el `accordionId` cuando cambia el estado (usado por AccordionGroup) |

### Métodos públicos

| Método | Descripción |
|--------|-------------|
| `forceStatus(newStatus: boolean): void` | Fuerza un estado específico (usado por AccordionGroup) |

### Iconos

El accordion muestra automáticamente iconos `plus`/`minus` según el estado:
- **Cerrado**: Muestra `plus`
- **Abierto**: Muestra `minus`

La posición del icono se controla con `iconLeft`, `iconCenter` e `iconRight`.

### Ejemplos

#### Accordion básico

```typescript
<cat-accordion label="Pregunta 1">
  <p>Respuesta a la pregunta 1</p>
</cat-accordion>
```

#### Accordion abierto por defecto

```typescript
<cat-accordion label="Sección Abierta" [status]="true">
  <p>Este accordion inicia abierto</p>
</cat-accordion>
```

#### Accordion con icono a la izquierda

```typescript
<cat-accordion 
  label="Con Icono Izquierdo" 
  [iconLeft]="true"
  [iconRight]="false">
  <p>Contenido</p>
</cat-accordion>
```

#### Accordion con scroll

```typescript
<cat-accordion 
  label="Contenido Largo" 
  [scrolleable]="true"
  variant="elevated">
  <div style="height: 300px;">
    <p>Contenido largo que requiere scroll</p>
  </div>
</cat-accordion>
```
