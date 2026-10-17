# Motion guidelines

Motion should earn its place by helping people understand cause and effect, changes in state, spatial relationships, or deliberate brand expression. The product's context and interaction frequency determine how restrained or expressive it should be.

## Design decisions

- Ask what becomes harder to understand if the animation is removed. If the answer is "nothing," omit it.
- Give state changes consistent entry and exit behavior. Keep feedback close to the action and avoid delaying completion of frequent tasks.
- Use restrained movement for utility and productivity work. Reserve more expressive motion for contexts where play, storytelling, or exploration is part of the product.
- Avoid blanket hover scaling, constant pulsing, gratuitous stagger, identical entrance fades, and motion that runs without a user-relevant state change.
- Make motion supplementary: the resulting state must still be understandable without seeing the animation.

## Accessibility and performance

- Honor `prefers-reduced-motion` on the web and the equivalent system accessibility setting on native platforms. Replace large movement and parallax with a reduced or static transition rather than hiding essential information.
- Avoid flashing and rapid repetitive motion. Do not make animation the only carrier of status or feedback.
- Prefer animating properties that can be composited efficiently. Avoid repeated layout- or paint-heavy animation on large areas, and stop work when the animated state is no longer visible or relevant.
- Keep timing appropriate to the task: rapid feedback for direct manipulation, and enough time for meaningful transitions without making controls feel sluggish. Treat duration as a design decision, not a universal constant.

## Build or audit

For new motion, identify the trigger, start and end states, purpose, interruption behavior, reduced-motion alternative, and performance implications before implementing. Use the project's existing animation tools and patterns.

For an audit, inspect transitions around conditional content, dialogs, menus, notifications, navigation, and loading or success feedback. Look both for missing transitions that make state changes confusing and for unnecessary motion that slows or distracts. Report the element, trigger, observed behavior, user impact, and a specific adjustment.
