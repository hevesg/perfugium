---
name: angular-component
description: Create or modify Angular components/pages/services in the star-wars-2e project, following this repo's conventions (standalone pages vs NgModule-declared feature components, signal inputs/outputs, OnPush, CDK Dialog modals). Use whenever adding a new component, page, service, or modal, or when the placement/wiring of one is unclear.
---

# Component conventions for star-wars-2e

## Where does it go?

- **New route-level screen** → `src/pages/<name>/<name>.page.ts`, loaded lazily in `src/app/app.routes.ts` via `loadComponent`. Pages are `standalone: true` and import whatever feature modules/components they need.
- **New feature-area component** (belongs to `perfugium`, `d6`, or `swiper`) → add it under that feature's `components/` directory, then declare **and** export it in the feature's `NgModule` (`perfugium-module.ts`, `d6-module.ts`, `swiper-module.ts`). Feature components are `standalone: false` — do not mark them standalone.
- New feature areas that don't fit an existing module should get their own `NgModule`, following the same declare/export shape as the existing ones.

## Component selector prefixes (by area — not globally enforced by `angular.json`, but consistently followed)

| Area | Prefix | Example |
|---|---|---|
| `pages/` | `sw2e-` | `sw2e-character-list` |
| `components/` (shared) | `sw2e-` | `sw2e-general-data` |
| `features/perfugium/` | `prf-` | `prf-navbar` |
| `features/swiper/` | `prf-` | `prf-swipe-item` |
| `features/d6/` | `app-` | `app-d6-attribute` |
| app root | `app-root` | — |

Match the prefix already used in the feature area you're adding to.

## Component class shape

```typescript
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'prf-example',
  standalone: false, // true only for pages/
  templateUrl: './example.component.html', // or inline `template` for small components
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ExampleComponent {
  readonly value = input.required<string>();
  readonly selected = output<string>();

  private readonly router = inject(Router); // inject(), not constructor injection
}
```

- Use the signal-based `input()` / `input.required()` / `output()` APIs, not `@Input()`/`@Output()` decorators.
- Use `inject()` for dependencies, not constructor parameters.
- Prefer `ChangeDetectionStrategy.OnPush` (the codebase runs zoneless in tests, and OnPush is used throughout).
- Use the `@for` / `@if` control-flow syntax in templates, not `*ngFor`/`*ngIf`.
- `:host { display: block; }` is a common default in `styles` for block-level components.

## Modals

Modals are opened through `ModalService` (`features/perfugium/services/modal.service.ts`), which wraps `@angular/cdk/dialog`. A modal component:

```typescript
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

export interface ExampleModalData {
  title: string;
  value: SomeType;
}

@Component({
  selector: 'app-example-modal',
  standalone: false,
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleModalComponent {
  protected readonly data: ExampleModalData = inject(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef);

  onConfirm(result: SomeType): void {
    this.dialogRef.close(result);
  }
}
```

Reusable modal chrome (title, confirm button, form wiring) lives in `prf-confirm-modal` (`features/perfugium/components/confirm-modal`) — wrap modal content in it rather than rebuilding header/footer/button markup. To open a modal, call `modalService.open(ExampleModalComponent, data)` and subscribe to the returned `Observable<R | undefined>`.

## Forms

Reactive forms (`FormGroup`/`FormArray`/`FormControl` from `@angular/forms`), not template-driven forms. `ReactiveFormsModule` is imported at the feature-module level (see `d6-module.ts`).

## Services

Feature-scoped services (like `CharacterService`) are provided in their `NgModule`'s `providers` array. App-wide singletons (like `ModalService`) use `@Injectable({ providedIn: 'root' })`. `CharacterService` reads/writes `localStorage` directly — there is no HTTP backend in this app.

## After creating a component

Write a co-located `*.spec.ts` — see the `unit-testing` skill for this repo's Jest/TestBed conventions.
