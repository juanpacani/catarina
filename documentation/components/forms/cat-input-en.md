# CatInput (Directive)

The `catInput` directive applies consistent styles to native HTML `<input>` elements.

### Import

```typescript
import { CatInput } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { CatInput } from 'catarina';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  imports: [CatInput, FormsModule],
  template: `
    <input catInput type="text" placeholder="Enter your name" [(ngModel)]="name">
  `
})
export class ExampleComponent {
  name = '';
}
```

### Features

- **Automatic styles**: Automatically injects CSS styles (only once)
- **Form integration**: Automatically detects validation state when used with `NgControl`
- **Visual states**: Automatically shows `valid`, `invalid`, and `touched` states
- **Sizes**: Supports `sm`, `md` (default), and `lg` classes

### Validation states

The directive automatically adds classes based on control state:

- `.invalid`: When the control is invalid and has been touched
- `.ng-invalid.ng-touched`: Angular Forms classes
- `.ng-valid.ng-touched`: Angular Forms class for valid state

### Notes

- Only works with native `<input>` elements
- Styles are automatically injected the first time the directive is used
- SSR compatible (does not inject styles on the server)
