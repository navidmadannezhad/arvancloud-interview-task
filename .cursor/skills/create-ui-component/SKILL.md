# Skill: `create-ui-component`

## Purpose

Create a reusable React UI component using **Base UI** as the underlying primitive while following the project's component conventions.

---

## Instructions

When asked to create a component:

1. Carefully inspect the provided design.
2. Identify the most appropriate Base UI primitive.
3. Use the Base UI implementation as the starting point.
4. Rewrite the implementation to match the project's component architecture and conventions.
5. Adapt styling, composition, variants, and behavior to match the provided design.
6. Keep the Base UI accessibility and behavior intact whenever possible.
7. Put the component in src/components/ui path.

---

## Base UI Reference

Always use the implementation patterns from:

https://base-ui.com/react/overview/quick-start

If the requested component exists in the Base UI documentation, use its example implementation as the starting point before adapting it.

---

## Component Structure

Always define components using this pattern:

```tsx
interface ComponentNameProps extends ComponentPropsFromLibrary {}

const ComponentName: FC<ComponentNameProps> = ({
  // explicitly destructure any custom props here
  ...rest
}) => {
  // implementation
}
```

---

## Props

If Base UI exports a props type, extend it:

```tsx
interface ButtonProps extends BaseButtonProps {}
```

If the library does **not** export a props type, use:

```tsx
interface ButtonProps extends ComponentProps<typeof RawButton> {}
```

---

## Rest Props

Only explicitly destructure props introduced by your component.

Everything inherited from Base UI should remain inside `...rest` and be forwarded directly to the underlying Base UI component.

Example:

```tsx
const Button: FC<ButtonProps> = ({
  variant,
  size,
  children,
  ...rest
}) => (
  <RawButton {...rest}>
    {children}
  </RawButton>
);
```

---

## Import Naming

If importing a Base UI component would conflict with the wrapper component name, import it using the `Raw` prefix.

Example:

```tsx
import { Button as RawButton } from "@base-ui/react/button";
```

Never shadow component names.

---

## Component Style

The wrapper component should:

* be fully typed
* use `FC`
* forward all inherited props
* preserve Base UI accessibility
* only add project-specific API
* follow existing project conventions

---

## Existing Components

Before implementing a new component, inspect:

```
./button.tsx
```

Use it as the primary reference for:

* architecture
* file organization
* typing
* styling approach
* variants
* composition
* helper utilities

The new component should feel consistent with the existing component library.

---

## Implementation Priority

When creating a component, follow this order:

1. Match the provided design.
2. Preserve Base UI behavior.
3. Match the project's existing component architecture.
4. Keep the API minimal and strongly typed.

---

## Output

Produce a complete production-ready component including:

* imports
* props interface
* component implementation
* exports

Do not explain the code unless explicitly asked.
