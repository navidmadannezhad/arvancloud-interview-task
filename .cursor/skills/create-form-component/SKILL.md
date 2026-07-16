# Skill: `create-form-component`

## Purpose
Create a reusable React Hook Form field component that wraps an existing UI primitive from `src/components/ui`, following the project's two-layer form architecture.
---

## Instructions
When asked to create a form component:
1. Identify the UI primitive in `src/components/ui` that matches the field type (e.g. `Input`, `Select`, `Checkbox`).
2. Inspect `raw-input.tsx` as the primary reference for architecture and patterns.
3. Implement **two exports** from the same file:
   - `SimpleRawX` — standalone field with optional label (no form context required)
   - `FormRawX` — connected field for use inside `FormProvider`
4. Reuse `InputWrapper` for label layout unless the field needs a different wrapper.
5. Wire validation errors to the UI primitive's `variant` prop when supported.
6. Export the new components from `src/components/major/form/index.ts`.
7. Do **not** reimplement UI styling — delegate to the UI primitive.
---

## File Location
Put form field components in:
src/components/major/form/

Example:
src/components/major/form/raw-select.tsx
---

## Two-Layer Architecture
Every form field follows this split:
| Layer | Component | Responsibility |
|---|---|---|
| UI | `src/components/ui/*` | Visual styling, variants, Base UI behavior |
| Form | `src/components/major/form/raw-*` | Label, RHF binding, error display |
The form layer must **not** duplicate UI styles. It composes the UI component.
---

## Component Structure
You can check /components/major/form/raw-input.tsx for inspiration.

