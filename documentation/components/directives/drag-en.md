# Drag (`CDrag`)

The `CDrag` directive allows making elements draggable with the mouse.

### Import

```typescript
import { Drag } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Drag } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Drag],
  template: `
    <div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2);">
      Drag me
    </div>
  `
})
export class ExampleComponent {}
```

### Features

- **Automatic positioning**: If the element doesn't have `position` defined, the directive sets `position: absolute` automatically
- **Visual cursor**: Changes cursor to `grabbing` while dragging and `grab` when ready
- **Mouse events**: Handles `mousedown`, `mousemove`, and `mouseup` for a smooth experience
- **Offset calculation**: Correctly calculates mouse offset relative to the element

### How it works

1. On `mousedown` on the element, drag mode is activated
2. Mouse offset relative to the top-left corner of the element is calculated
3. During `mousemove`, element position is updated based on mouse position minus offset
4. On release (`mouseup`), drag mode is deactivated

### Examples

#### Basic draggable element

```typescript
<div CDrag style="width: 200px; height: 100px; background: var(--primary-color-2); cursor: grab;">
  Drag me
</div>
```

#### Draggable dialog

```typescript
import { Dialog, Drag } from 'catarina';

@Component({
  template: `
    <cat-dialog *ngIf="showDialog" (closs)="showDialog = false">
      <div CDrag style="padding: 16px; cursor: grab;">
        <h2>Draggable Dialog</h2>
        <p>Drag this dialog</p>
      </div>
    </cat-dialog>
  `,
  imports: [Dialog, Drag]
})
export class ExampleComponent {
  showDialog = true;
}
```

#### Draggable card

```typescript
import { Card, Drag } from 'catarina';

@Component({
  template: `
    <cat-card customClass="draggable-card">
      <div CDrag style="cursor: grab;">
        <h3>Draggable Card</h3>
        <p>Drag by this title</p>
      </div>
      <p>Content that doesn't drag</p>
    </cat-card>
  `,
  imports: [Card, Drag]
})
export class ExampleComponent {}
```

### Notes

- The directive works best with elements that have `position: absolute` or `position: fixed`
- If the element has `position: static`, the directive automatically changes it to `absolute`
- The element must be visible in the DOM when the directive is applied
- Position calculations are based on `offsetLeft` and `offsetTop`
- The directive listens to events on the `document`, not just the element, to allow dragging outside element boundaries

### Limitations

- Only works with mouse events (does not support touch events for mobile devices)
- The element must have defined dimensions to correctly calculate offset
- If the element is inside a container with `overflow: hidden`, it may be hidden when dragged outside

### Common use cases

1. **Modal dialogs**: Make dialogs draggable to improve UX
2. **Floating panels**: Create panels that users can reposition
3. **Customizable UI elements**: Allow users to organize elements in the interface
4. **Design tools**: In design applications where visual element movement is needed
