---
name: liquid-neumorphic-ui
description: Build React or Next.js components in the same soft liquid-neumorphic style as the swipe-to-confirm reference: pale inset shells, white circular handles, green success states, glass highlights, and elastic micro-interactions.
---

# Liquid Neumorphic UI

Use this skill when creating or refining React/Next.js UI components that should match the provided swipe-confirm style.

## Visual Language

- Base surfaces use pale gray-green backgrounds around `#e0e4e2`.
- Controls feel tactile: inset container shadows plus raised white circular or pill controls.
- Success state is green, centered around `#4caf50`, with white text/icons.
- Add liquid glass depth through translucent white overlays, soft cyan/green highlights, and subtle backdrop blur.
- Keep border radii generous: pills for controls, 22-30px for cards, circles for icon handles.
- Typography should feel rounded and clear. Prefer `ui-rounded`, `SF Pro Rounded`, `PingFang SC`, and system rounded fonts.

## Interaction Rules

- Motion should be springy and physical. Use `cubic-bezier(0.68, -0.55, 0.27, 1.55)` for handle movement and pop states.
- Hover state raises the active part with stronger shadow and a light shimmer.
- Active/click states compress slightly with `scale(0.96)` or similar.
- Checked/success state should move the handle, fade old text, and pop in success feedback.
- Use CSS transitions/keyframes for simple states. Keep JS only for actual state, menus, counters, toggles, sliders, or pointer effects.
- Respect `prefers-reduced-motion` when adding large or continuous animations.

## Component Pattern

1. Define shared tokens first: colors, shadows, radii, and spring easing.
2. Build a shell with inset neumorphic shadow.
3. Place the main interactive affordance as a raised white circular or pill element.
4. Add a green success/active variant.
5. Verify responsive sizing, especially that text does not overflow in pills or compact cards.

## Useful Tokens

```ts
export const liquidTheme = {
  bgInitial: "#e0e4e2",
  bgRaised: "rgba(255, 255, 255, 0.56)",
  success: "#4caf50",
  ink: "#425053",
  muted: "rgba(66, 80, 83, 0.62)",
  pill: "999px",
  containerShadow:
    "inset 2px 2px 4px rgba(0, 0, 0, 0.08), inset -2px -2px 4px rgba(255, 255, 255, 0.82), 0 14px 34px rgba(56, 91, 96, 0.16)",
  raisedShadow:
    "7px 7px 18px rgba(63, 90, 93, 0.16), -7px -7px 18px rgba(255, 255, 255, 0.92)",
  insetShadow:
    "inset 5px 5px 11px rgba(65, 86, 88, 0.16), inset -5px -5px 11px rgba(255, 255, 255, 0.88)",
  spring: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
};
```

## Avoid

- Flat gray buttons without tactile raised/inset contrast.
- Purple-blue generic gradients.
- Long explanatory text inside the UI.
- Sharp square cards or tiny border radius unless the product already requires them.
- SVG decoration when real component structure, shadows, and state transitions can express the style.
