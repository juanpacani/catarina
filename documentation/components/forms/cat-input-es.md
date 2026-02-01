# CatInput (Directiva)

La directiva `catInput` aplica estilos consistentes a elementos `<input>` nativos de HTML.

### Importación

```typescript
import { CatInput } from 'catarina';
```

### Uso básico

```typescript
import { Component } from '@angular/core';
import { CatInput } from 'catarina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  imports: [CatInput, FormsModule],
  template: `
    <input catInput type="text" placeholder="Ingresa tu nombre" [(ngModel)]="name">
  `
})
export class ExampleComponent {
  name = '';
}
```

### Características

- **Estilos automáticos**: Inyecta estilos CSS automáticamente (solo una vez)
- **Integración con formularios**: Detecta automáticamente el estado de validación cuando se usa con `NgControl`
- **Estados visuales**: Muestra estados `valid`, `invalid` y `touched` automáticamente
- **Tamaños**: Soporta clases `sm`, `md` (por defecto) y `lg`

### Estados de validación

La directiva añade clases automáticamente basándose en el estado del control:

- `.invalid`: Cuando el control es inválido y ha sido tocado
- `.ng-invalid.ng-touched`: Clases de Angular Forms
- `.ng-valid.ng-touched`: Clase de Angular Forms para estado válido

### Notas

- Solo funciona con elementos `<input>` nativos
- Los estilos se inyectan automáticamente la primera vez que se usa la directiva
- Compatible con SSR (no inyecta estilos en el servidor)
