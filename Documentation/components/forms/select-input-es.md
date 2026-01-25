# SelectInput (`cat-select-input`)

Componente de lista desplegable personalizable con soporte para opciones de texto o números.

### Importación

```typescript
import { SelectInput } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { SelectInput } from 'catarina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  imports: [SelectInput, FormsModule],
  template: `
    <cat-select-input 
      [options]="options" 
      placeholder="Selecciona una opción"
      [(ngModel)]="selected">
    </cat-select-input>
  `
})
export class ExampleComponent {
  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  selected = '';
}
```

### Propiedades (Inputs)

| Propiedad | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `options` | `string[]?` | `undefined` | Array de opciones disponibles |
| `placeholder` | `string` | `''` | Texto placeholder del input |
| `type` | `'string' \| 'number'` | `'string'` | Tipo de valor (afecta el tipo de las opciones) |
| `variant` | `'surface' \| 'elevated' \| 'outlined'` | `'surface'` | Variante visual del panel de opciones |
| `scrolleable` | `boolean` | `false` | Permite scroll en el panel de opciones si hay muchas |
| `customClass` | `string` | `''` | Clase CSS personalizada |
| `transform` | `string?` | `undefined` | Transformación CSS para posicionar el panel de opciones |

### Características

- **ControlValueAccessor**: Compatible con formularios reactivos y template-driven
- **Cierre automático**: Se cierra al hacer clic fuera del componente
- **Accesibilidad**: Usa roles ARIA apropiados (`listbox`, `option`)
- **Posicionamiento flexible**: Permite posicionar el panel de opciones con `transform`

### Ejemplos

#### Lista básica

```typescript
<cat-select-input 
  [options]="['Rojo', 'Verde', 'Azul']" 
  placeholder="Elige un color"
  [(ngModel)]="color">
</cat-select-input>
```

#### Con scroll

```typescript
<cat-select-input 
  [options]="manyOptions" 
  [scrolleable]="true"
  placeholder="Selecciona..."
  [(ngModel)]="selected">
</cat-select-input>
```

#### Con posicionamiento personalizado

```typescript
<cat-select-input 
  [options]="options" 
  transform="translateX(-50%)"
  placeholder="Opciones"
  [(ngModel)]="value">
</cat-select-input>
```

#### Con formulario reactivo

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
    <cat-select-input 
      [options]="options"
      [formControl]="selectControl">
    </cat-select-input>
  `,
  imports: [SelectInput, ReactiveFormsModule]
})
export class ExampleComponent {
  options = ['A', 'B', 'C'];
  selectControl = new FormControl('');
}
```
