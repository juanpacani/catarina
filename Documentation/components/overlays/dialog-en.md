# Dialog (`cat-dialog`)

The `Dialog` component displays a draggable modal dialog box.

### Import

```typescript
import { Dialog } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Dialog } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Dialog],
  template: `
    <cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
      <h2>Dialog Title</h2>
      <p>Dialog content</p>
    </cat-dialog>
  `
})
export class ExampleComponent {
  showDialog = true;
}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'surface' \| 'outlined' \| 'elevated'` | `'surface'` | Visual style of the dialog |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dialog size |
| `customClass` | `string` | `''` | Custom CSS class |

### Events (Outputs)

| Event | Type | Description |
|-------|------|-------------|
| `closs` | `EventEmitter<boolean>` | Emitted when the dialog is closed (always emits `false`) |

### Features

- **Draggable**: The dialog includes the `CDrag` directive to make it draggable
- **Escape to close**: Automatically closes when pressing the `Escape` key
- **Dark background**: Shows a semi-transparent dark background (`dialog-shadow`) that also closes the dialog on click
- **Fixed positioning**: Positioned fixed on the screen

### Examples

#### Basic dialog

```typescript
<cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
  <h2>My Dialog</h2>
  <p>Content here</p>
</cat-dialog>
```

#### Dialog with variant

```typescript
<cat-dialog 
  *ngIf="showDialog" 
  variant="elevated" 
  size="lg"
  (closs)="showDialog = false">
  <h2>Elevated Dialog</h2>
  <p>With shadow and large size</p>
</cat-dialog>
```

#### Dialog with custom class

```typescript
<cat-dialog 
  *ngIf="showDialog" 
  customClass="my-dialog"
  (closs)="showDialog = false">
  <h2>Custom Dialog</h2>
  <p>With custom styles</p>
</cat-dialog>
```

### Notes

- The dialog must be controlled with `*ngIf` or similar to show/hide it
- The dark background (`dialog-shadow`) covers the entire screen and has `z-index: 999`
- The dialog has `z-index: 1000` to be above the background
- The dialog is draggable by default thanks to the `CDrag` directive
