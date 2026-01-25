# ColorInput (`cat-color-input`)

Componente para seleccionar colores con soporte para iconos y `ControlValueAccessor`.

### Importación

```typescript
import { ColorInput } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { ColorInput } from 'catarina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  imports: [ColorInput, FormsModule],
  template: `
    <cat-color-input [(ngModel)]="color"></cat-color-input>
  `
})
export class ExampleComponent {
  color = '#3b82f6';
}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `icon` | `boolean` | `false` | Muestra un icono de paleta sobre el selector de color |
| `size` | `string` | `'2em'` | Tamaño del componente (debe mantener aspect-ratio 1:1) |

### Características

- **ControlValueAccessor**: Compatible con formularios reactivos y template-driven
- **Icono opcional**: Puede mostrar un icono de paleta sobre el selector
- **Aspect ratio**: Mantiene proporción 1:1 automáticamente

### Ejemplos

#### Selector básico

```typescript
<cat-color-input [(ngModel)]="primaryColor"></cat-color-input>
```

#### Con icono

```typescript
<cat-color-input [icon]="true" [size]="'3em'" [(ngModel)]="accentColor"></cat-color-input>
```

#### Con formulario reactivo

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <cat-color-input [formControl]="colorControl"></cat-color-input>
  `,
  imports: [ColorInput, ReactiveFormsModule]
})
export class ExampleComponent {
  colorControl = new FormControl('#10b981');
}
```
