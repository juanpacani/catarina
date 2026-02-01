# AccordionGroup (`cat-accordion-group`)

The `AccordionGroup` component groups multiple `Accordion` components and controls that only one is open at a time (optional).

### Import

```typescript
import { AccordionGroup } from 'catarina';
```

### Basic usage

```typescript
import { Component } from '@angular/core';
import { Accordion, AccordionGroup } from 'catarina';

@Component({
  selector: 'app-example',
  imports: [Accordion, AccordionGroup],
  template: `
    <cat-accordion-group [singleExpand]="true">
      <cat-accordion accordionId="1" label="Section 1">
        <p>Content 1</p>
      </cat-accordion>
      <cat-accordion accordionId="2" label="Section 2">
        <p>Content 2</p>
      </cat-accordion>
      <cat-accordion accordionId="3" label="Section 3">
        <p>Content 3</p>
      </cat-accordion>
    </cat-accordion-group>
  `
})
export class ExampleComponent {}
```

### Properties (Inputs)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `singleExpand` | `boolean` | `true` | If `true`, only one accordion can be open at a time |
| `customClass` | `string` | `''` | Custom CSS class |

### Features

- **Single expansion**: When `singleExpand` is `true`, opening an accordion automatically closes the previous one
- **Multiple open**: When `singleExpand` is `false`, multiple accordions can be open simultaneously
- **Automatic control**: Automatically manages the state of child accordions

### Requirements

- Each `Accordion` within the group must have a unique `accordionId`
- Accordions must be direct children of `AccordionGroup` (using `ContentChildren`)

### Examples

#### Group with single expansion (default)

```typescript
<cat-accordion-group>
  <cat-accordion accordionId="a1" label="Section A">
    <p>Content A</p>
  </cat-accordion>
  <cat-accordion accordionId="a2" label="Section B">
    <p>Content B</p>
  </cat-accordion>
</cat-accordion-group>
```

#### Group with multiple open

```typescript
<cat-accordion-group [singleExpand]="false">
  <cat-accordion accordionId="b1" label="Section 1">
    <p>Can be open together with others</p>
  </cat-accordion>
  <cat-accordion accordionId="b2" label="Section 2">
    <p>Multiple sections open</p>
  </cat-accordion>
</cat-accordion-group>
```

### Notes

- `AccordionGroup` uses `ContentChildren` to detect child accordions
- Communication between accordions and the group is done through events
- If an accordion is clicked when already open and `singleExpand` is `true`, it closes
