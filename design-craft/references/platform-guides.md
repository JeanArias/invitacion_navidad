# Platform design guide

Use the platform's normal input, navigation, layout, and system capabilities. These are decision prompts, not reasons to override the product's existing conventions.

## Responsive websites and mobile web

- Start with content order and task priority; let layout adapt rather than merely compress. Define useful narrow and wide layouts around content needs, not a device-name checklist.
- Keep navigation understandable at every width. Preserve access to primary tasks when changing or collapsing navigation.
- Use fluid sizing where useful, readable line lengths, and layouts that tolerate zoom, localization, and variable content. Avoid horizontal scrolling unless it is intrinsic to the content and is made discoverable.
- Use semantic HTML and browser-native behavior for links, forms, focus, and history where applicable.
- Make touch controls comfortably targetable and separated enough to reduce accidental activation. Do not make a hover state the only way to discover or operate an action.
- Check a narrow viewport, a typical laptop/desktop viewport, and any additional breakpoint where the composition meaningfully changes.

## Native phone and tablet applications

- Design for touch, variable screen sizes, safe areas, system bars, keyboard appearance, and interruptions. Ensure key controls remain reachable when content scrolls or the keyboard is open.
- Put high-frequency actions within comfortable reach where the platform and task allow; avoid placing critical controls against screen edges or under system gestures.
- Use native navigation, pickers, permissions, sharing, and platform controls where they reduce friction and meet the product's needs. Do not request permissions before the feature needs them; explain the value in context.
- Support dynamic text sizing and localization without clipping. Preserve back navigation and clearly distinguish navigation from actions.
- Test portrait and landscape when supported, smaller and larger displays, and relevant system appearance or input modes.

## Desktop applications

- Design for keyboard and pointer input, window resizing, and workflows that may involve repeated use. Expose shortcuts only as an enhancement; keep actions discoverable and usable without them.
- Use screen space deliberately: support density and persistent navigation/panels where they help the task, while retaining clear hierarchy and adequate target size.
- Define predictable focus order, visible focus, shortcuts, menus, dialog behavior, and window-level states. Avoid trapping focus or making pointer precision mandatory.
- Account for small or resized windows, multi-window workflows if relevant, and platform conventions for title bars, menus, dialogs, and system feedback.

## Cross-platform products

- Share brand, semantic tokens, content language, and interaction principles. Adapt navigation, controls, and input behavior to each platform rather than forcing one identical layout everywhere.
- Specify which behavior is invariant and which is platform-specific. Validate the primary journey independently on each target platform.
- Reuse components only when their behavior and accessibility remain appropriate on every target.
