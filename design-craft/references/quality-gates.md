# Design quality gates

Use the checks that apply to the requested surface and scope. Report failures honestly; do not claim a check passed without verifying it.

## UX and content

- Is the primary user goal apparent, and is the main action easy to find?
- Does navigation reflect the task and information hierarchy?
- Are labels specific, concise, and understandable without relying on visual context alone?
- Are forms, validation, confirmation, errors, empty states, loading, and success feedback covered where relevant?
- Can users recover from mistakes and understand destructive or irreversible actions before committing?

## Visual coherence

- Is hierarchy clear through type, spacing, grouping, alignment, and contrast?
- Are colors, type, spacing, shape, elevation, and component states coherent with the existing system or documented design intent?
- Does each visual effect support meaning or emphasis, rather than filling space?
- Do real content length and available assets work without clipping or awkward empty regions?

## Accessibility

- Prefer semantic controls and landmarks. Provide accessible names, labels, and status announcements where needed.
- Ensure keyboard access and a visible focus indicator for interactive web and desktop controls; preserve logical focus order and manage focus in dialogs.
- Check text and non-text contrast against applicable accessibility criteria. Do not convey meaning through color alone.
- Support zoom, text resizing, reflow, and assistive technology without obscured content or lost functionality.
- Provide text alternatives for meaningful images and avoid unnecessary alternatives on decorative imagery.
- Verify target size, reduced motion, and input alternatives against the target platform's accessibility requirements.

## Responsive and platform behavior

- Verify the actual layout at representative sizes and orientation/input modes for the target platform.
- Check wrapping, overflow, sticky/fixed elements, safe areas, keyboard overlap, and long or localized content where applicable.
- Confirm primary tasks remain discoverable and operable without hover, precise pointer movement, or a single input modality.

## Implementation and finish

- Reuse the project's components, tokens, and dependencies where appropriate; avoid unrelated refactors and new dependencies that only add decoration.
- Check interactive, focus, selected, disabled, loading, error, and reduced-motion states that the change affects.
- Use available project checks and visual preview tools. For audits, separate verified issues from hypotheses and order recommendations by user impact and reach.
