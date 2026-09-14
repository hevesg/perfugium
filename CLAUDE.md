# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Perfugium is an Angular 21 workspace (single project: `star-wars-2e`, a character sheet app for the Star Wars D6 2nd Edition RPG). It's deployed as a static site to GitHub Pages via `.github/workflows/deploy.yml` (build-only, no CI lint/test gate).

## Commands

```bash
npm run start:star-wars-2e        # dev server (ng serve)
npm run build:star-wars-2e        # production build
npm run test:star-wars-2e         # run all tests (Jest)
npx jest path/to/file.spec.ts     # run a single test file
npx jest -t "test name"           # run tests matching a name
npm run lint                      # eslint --fix
npm run lint:check                # eslint, no autofix
npm run format                    # prettier --write
npm run format:check              # prettier --check
```

Package manager is npm (`package-lock.json`, `packageManager: npm@11.6.2`).

## Architecture

### Workspace layout

Single Angular CLI app under `projects/star-wars-2e/src/`:

- `app/` — root standalone `App` component, routes, config.
- `pages/` — route-level standalone components (`*.page.ts`), each loaded via `loadComponent` in `app/app.routes.ts`. Pages compose feature modules/components and own routing concerns (e.g. `character-sheet.resolver.ts`).
- `features/` — self-contained feature areas, each typically exposing an `NgModule` that declares/exports its components:
  - `perfugium/` — app-agnostic UI shell and character CRUD: navbar, character list, confirm modal, `CharacterService` (persists to `localStorage`, not a backend), `ModalService` (wraps `@angular/cdk/dialog`), `FormModalDirective`.
  - `d6/` — Star Wars D6 rules-specific UI: attributes, skills, equipment, weapons, pip (die code) stepper/modal.
  - `swiper/` — a custom-built swipe-gesture component set (`prf-swipe-*`); **not** the third-party `swiper` npm library — there is no such dependency.
  - `model/` (top-level `src/model/`) holds the concrete `Sw2eCharacter` type; `features/perfugium/model` and `features/d6/model` hold the generic `Character` base and D6-specific pieces respectively. `CharacterService<T extends Character>` is generic over the character type.
- `components/` — shared, non-feature-specific UI (`general-data`, `general-data-modal`).
- `styles/` — SCSS partials (`_bootstrap.scss`, `_variables.scss`, `_utilities.scss`) imported by `styles.scss`; Bootstrap 5 is used for base styling on top of these.
- `__mock__/` — JSON fixtures (e.g. `adi-gallia.json`) used both as sample data seeded into `localStorage` and as test fixtures.

### Component conventions

- **Pages are standalone** (`standalone: true`) and import the feature modules/components they need directly.
- **Feature components are declared in `NgModule`s** (`standalone: false`), not standalone — e.g. `PerfugiumModule`, `D6Module`. When adding a component to an existing feature, add it to that feature's module `declarations`/`exports` rather than making it standalone.
- Inputs/outputs use the signal-based APIs (`input()`, `input.required()`, `output()`), not decorators.
- Tests run in **zoneless** mode (`setupZonelessTestEnv()` in `setup-jest.ts`) — don't rely on zone.js-driven change detection assumptions in tests.
- Modals go through `ModalService` (CDK Dialog wrapper), not ad-hoc component creation.
- `CharacterService` is a stateless localStorage-backed store, not an HTTP client — there is no backend.

### Testing conventions (from prior `.cursorrules`)

- Jest + Angular `TestBed`, tests co-located with source as `*.spec.ts`.
- Nest `describe` blocks: outer named after the class, inner after the method/feature being tested.
- Mock dependencies with `jest.fn()`, provided via `TestBed.configureTestingModule({ providers: [{ provide: X, useValue: mockX }] })`.
- Mock observable-returning dependencies (dialogs, etc.) with an RxJS `Subject` so tests can control emission timing.
- Do not write "should be created" tests — they're redundant.
- Test behavior, not implementation details; avoid `any` in tests.
- Test names start with a verb describing the behavior (e.g. `emits result when dialog closes`).

## Path aliases

`tsconfig.json` declares path aliases `core`, `dice6`, `perfugium` pointing at `./dist/*` — these are for consuming built library output, not currently backed by real packages in this workspace (there's a single app project, no libraries built yet).
