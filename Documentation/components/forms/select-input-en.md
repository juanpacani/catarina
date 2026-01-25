# SelectInput (`cat-select-input`)

Customizable dropdown list component with support for text or number options.

### Import

```typescript
import { SelectInput } from 'catarina';
```

### Basic usage

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
      placeholder="Select an option"
      [(ngModel)]="selected">
    </cat-select-input>
  `
})
export class ExampleComponent {
  options = ['Option 1', 'Option 2', 'Option 3'];
  selected = '';
}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `string[]?` | `undefined` | Array of available options |
| `placeholder` | `string` | `''` | Input placeholder text |
| `type` | `'string' \| 'number'` | `'string'` | Value type (affects option types) |
| `variant` | `'surface' \| 'elevated' \| 'outlined'` | `'surface'` | Visual variant of the options panel |
| `scrolleable` | `boolean` | `false` | Allows scrolling in the options panel if there are many |
| `customClass` | `string` | `''` | Custom CSS class |
| `transform` | `string?` | `undefined` | CSS transform to position the options panel |

### Features

- **ControlValueAccessor**: Compatible with reactive and template-driven forms
- **Auto-close**: Closes when clicking outside the component
- **Accessibility**: Uses appropriate ARIA roles (`listbox`, `option`)
- **Flexible positioning**: Allows positioning the options panel with `transform`

### Examples

#### Basic list

```typescript
<cat-select-input 
  [options]="['Red', 'Green', 'Blue']" 
  placeholder="Choose a color"
  [(ngModel)]="color">
</cat-select-input>
```

#### With scroll

```typescript
<cat-select-input 
  [options]="manyOptions" 
  [scrolleable]="true"
  placeholder="Select..."
  [(ngModel)]="selected">
</cat-select-input>
```

#### With custom positioning

```typescript
<cat-select-input 
  [options]="options" 
  transform="translateX(-50%)"
  placeholder="Options"
  [(ngModel)]="value">
</cat-select-input>
```

#### With reactive form

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
