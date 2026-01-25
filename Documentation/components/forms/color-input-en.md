# ColorInput (`cat-color-input`)

Component for color selection with icon support and `ControlValueAccessor`.

### Import

```typescript
import { ColorInput } from 'catarina';
```

### Basic usage

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

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `icon` | `boolean` | `false` | Shows a palette icon over the color picker |
| `size` | `string` | `'2em'` | Component size (must maintain 1:1 aspect ratio) |

### Features

- **ControlValueAccessor**: Compatible with reactive and template-driven forms
- **Optional icon**: Can display a palette icon over the picker
- **Aspect ratio**: Automatically maintains 1:1 proportion

### Examples

#### Basic picker

```typescript
<cat-color-input [(ngModel)]="primaryColor"></cat-color-input>
```

#### With icon

```typescript
<cat-color-input [icon]="true" [size]="'3em'" [(ngModel)]="accentColor"></cat-color-input>
```

#### With reactive form

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
