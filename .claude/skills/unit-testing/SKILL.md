---
name: unit-testing
description: Write or edit Jest/TestBed unit tests (*.spec.ts) in this Angular workspace, following this repo's conventions for structure, mocking, and naming. Use whenever adding a spec file, adding test cases to an existing spec, or reviewing test code in projects/star-wars-2e.
---

# Unit testing conventions

This project uses **Jest** with **Angular `TestBed`**, run zoneless (`setupZonelessTestEnv()` in `setup-jest.ts`).

## File naming & location

- Co-locate test files with the source file they cover.
- Use a `.spec.ts` suffix (e.g. `modal.service.spec.ts`).

## Structure

### Imports

```typescript
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
// Import the unit under test
// Import dependencies that need mocking
```

### Describe blocks

Nest `describe` blocks: name the outer one after the class under test, inner ones after the method or feature being tested.

```typescript
describe('ModalService', () => {
  describe('open', () => {
    it('does something specific', () => {});
  });
});
```

### Setup

Use `beforeEach` to build mocks and configure `TestBed`:

```typescript
let service: MyService;
let mockDependency: { someMethod: jest.Mock };

beforeEach(() => {
  mockDependency = { someMethod: jest.fn() };

  TestBed.configureTestingModule({
    providers: [{ provide: Dependency, useValue: mockDependency }],
  });
  service = TestBed.inject(MyService);
});
```

## Mocking patterns

### Observable-returning dependencies

Use an RxJS `Subject` when a mock needs to emit on the test's schedule (dialogs, sockets, anything async):

```typescript
let mockDialogRef: { closed: Subject<unknown> };

beforeEach(() => {
  mockDialogRef = { closed: new Subject() };
  mockDialog = { open: jest.fn().mockReturnValue(mockDialogRef) };
});

it('emits result', (done) => {
  service.open(Component, {}).subscribe((result) => {
    expect(result).toEqual(expectedResult);
    done();
  });
  mockDialogRef.closed.next(expectedResult);
});
```

### Angular CDK Dialog

Modals go through `ModalService`, which wraps `@angular/cdk/dialog`. When testing a component opened as a dialog, mock `DIALOG_DATA` and `DialogRef`:

```typescript
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

let mockDialogRef: { close: jest.Mock };

beforeEach(() => {
  mockDialogRef = { close: jest.fn() };

  TestBed.configureTestingModule({
    providers: [
      { provide: DIALOG_DATA, useValue: mockData },
      { provide: DialogRef, useValue: mockDialogRef },
    ],
  });
});
```

When testing `ModalService` itself, mock `Dialog` (not `DialogRef`) — see `modal.service.spec.ts` for the full pattern.

### Router

```typescript
import { Router } from '@angular/router';

let mockRouter: { navigate: jest.Mock };

beforeEach(() => {
  mockRouter = { navigate: jest.fn() };

  TestBed.configureTestingModule({
    providers: [{ provide: Router, useValue: mockRouter }],
  });
});
```

### CharacterService

`setup-jest.ts` (at the repo root) exports a ready-made mock:

```typescript
import { MOCK_CHARACTER_SERVICE } from '../../../../../setup-jest'; // relative depth varies by file location
```

Reuse it instead of hand-rolling a `CharacterService` mock — see `character-list.page.spec.ts` for a full example.

## Assertions

```typescript
expect(mockDialog.open).toHaveBeenCalledWith(Component, expect.any(Object));
expect(mockDialog.open).toHaveBeenCalledWith(
  Component,
  expect.objectContaining({ data: testData })
);
```

Async tests with a `done` callback:

```typescript
it('emits value', (done) => {
  observable$.subscribe((value) => {
    expect(value).toBe(expected);
    done();
  });
  // trigger the emission
});
```

## Component testing

### Fake timers (animations/delays)

```typescript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('renders after delay', () => {
  jest.advanceTimersByTime(25);
  fixture.detectChanges();
  // assertions
});
```

### Querying the DOM

Query elements by a `data-qa` attribute, not CSS classes or tag selectors — classes are for styling and change independently of test intent, and tag selectors are too broad. Add a `data-qa="..."` attribute to any element a test needs to select in the template, using a short, descriptive, kebab-case value (e.g. `data-qa="character-name"`, `data-qa="navbar-brand"`):

```html
<h3 data-qa="character-name">{{ character.name }}</h3>
```

```typescript
import { By } from '@angular/platform-browser';

const element = fixture.debugElement.query(By.css('[data-qa="character-name"]'));
const elements = fixture.debugElement.queryAll(By.css('[data-qa="character-name"]'));
expect(element.nativeElement.textContent).toBe('expected');
```

Because tests run zoneless, don't rely on zone.js-driven auto change detection — call `fixture.detectChanges()` explicitly after state changes.

## Test naming

Start with a verb describing the behavior; be specific about what's under test:

- `calls Dialog.open with the component`
- `passes data to dialog config`
- `emits result when dialog closes`
- `initializes form with attribute value`

## Do NOT

- Don't test that a service/component "should be created" — redundant.
- Don't test implementation details; test behavior.
- Don't use `any` in tests when a concrete or mock type will do.

## Running tests

```bash
npm run test:star-wars-2e          # full suite
npx jest path/to/file.spec.ts      # single file
npx jest -t "test name"            # by name
```
