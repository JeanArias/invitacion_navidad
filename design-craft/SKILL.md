---
name: design-craft
description: Design, implement, critique, or improve polished user interfaces for websites, desktop applications, and mobile applications. Use for UX flows, visual systems, responsive layouts, interaction and motion, design audits, or cross-platform design decisions.
---

# Design Craft

Create interfaces that are useful, coherent, accessible, distinctive, and appropriate to their platform. Treat product goals and user needs as the foundation; visual style and motion should make the experience clearer, not distract from it.

## Choose a mode

- **Design/build:** Plan a new screen, flow, design system, or interaction and implement it when asked.
- **Improve:** Refine an existing interface while preserving its working behavior, product intent, and established conventions unless the request says otherwise.
- **Audit:** Inspect an existing design or implementation, report prioritized issues with evidence, and suggest actionable fixes. Do not modify code unless asked.

If the requested outcome is clear, proceed without a discovery interview. Ask one focused question only when a missing product or platform decision would materially change the solution. Otherwise state a sensible assumption and continue.

## Workflow

1. **Understand the product and task.** Identify the audience, their primary goal, the context of use, the screen or flow in scope, and constraints apparent from the request and repository. Separate durable product facts from visual preferences. Do not invent product behavior, brand facts, metrics, or content.
2. **Inspect before designing.** For existing projects, inspect the relevant screens, components, styles, routes, state, assets, package setup, and design documentation. Follow the project's framework, conventions, existing tokens, and dependency choices. Reuse and extend before replacing.
3. **Choose the platform and surface.** Determine whether the work is for a responsive website, mobile web, native phone/tablet, desktop, or a combination. Apply the relevant guidance in `references/platform-guides.md`; do not simply shrink a desktop layout to fit a phone.
4. **Shape the experience.** Define the key user journey, information hierarchy, primary action, navigation, and meaningful states before implementation. Keep the simplest path obvious, and give secondary actions appropriate weight.
5. **Set or follow visual direction.** Prefer an existing `DESIGN.md` or in-code design system when present. If none exists and the work spans multiple screens or needs consistency, create a compact, project-specific visual system before building: rationale, semantic color roles, typography, spacing, shape, elevation, and component rules. Keep token values and the reason for them together. Do not introduce a token document for a one-off change unless it helps future work.
6. **Design complete states.** Account for loading, empty, success, error, disabled, validation, focus, and destructive/confirmation states that the task can encounter. Make labels and feedback specific and actionable.
7. **Implement and iterate.** Build the smallest coherent end-to-end experience. Use the project's available preview/browser tooling when possible to inspect actual output at representative viewport sizes and states, then correct visible issues. Do not claim a visual check that was not performed.
8. **Validate and report.** Apply `references/quality-gates.md`. For audits, lead with the most impactful evidence-backed findings. For implementation, summarize what changed and identify checks actually run.

## Visual and interaction direction

- Make a deliberate visual choice from the product's audience, brand, content, and environment. Avoid defaulting to generic SaaS layouts, interchangeable typography, gratuitous gradients, excessive cards, or decorative icon tiles.
- Establish hierarchy using typography, spacing, alignment, contrast, and grouping. Use color semantically and consistently; do not rely on color alone to communicate state.
- Use real product-relevant content and assets when available. If placeholders are unavoidable, make them plausible, consistent, and clearly non-final where appropriate. Use the project's icon set; do not use emoji as interface icons.
- Build semantic, reusable components around repeated behavior and visual rules—not abstractions that obscure simple one-off UI.
- Make interactive elements recognizable, keyboard-operable where relevant, and clear in their hover, focus, pressed, selected, disabled, and loading states.
- Follow platform conventions where they improve usability. A cross-platform product may share tokens and brand expression without forcing identical navigation or interaction patterns everywhere.

## Motion

Use motion to clarify a state change, preserve spatial context, give feedback, or support a clearly intentional expressive moment. Skip animation when it adds no user value. Calibrate duration and emphasis to interaction frequency and product tone; utility actions should generally feel immediate. Cover entry and exit states consistently, avoid animating every element on mount or hover, and respect reduced-motion preferences. Consult `references/motion-guidelines.md` when creating or auditing motion.

## Deliverables

Match the output to the request:

- For a design proposal: state the user goal, flow/hierarchy, platform assumptions, visual direction, and important interaction states.
- For implementation: make the requested changes in the existing project and validate them.
- For a multi-screen design system: record reusable decisions in an appropriate project artifact such as `DESIGN.md`, without confusing brand/product facts with visual choices.
- For an audit: order findings by impact; include the affected screen or component, observed evidence, user impact, and a specific recommendation.

Do not silently expand scope, add dependencies for appearance alone, or rewrite unrelated product behavior.

## Reference guides

- `references/platform-guides.md` — web, mobile, desktop, and cross-platform considerations.
- `references/motion-guidelines.md` — purposeful motion, reduced motion, implementation and audit cues.
- `references/quality-gates.md` — UX, visual, accessibility, responsive, and implementation checks.

## Sources and attribution

This original workflow synthesizes general design practices informed by the following public projects; it does not reproduce their databases, command implementations, example designs, or source text, and is not endorsed by their authors:

- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — design-system thinking and platform-aware UI/UX guidance.
- [Awesome Claude Design](https://github.com/VoltAgent/awesome-claude-design) — the use of a concise design brief that keeps tokens, rules, and rationale together.
- [Design Motion Principles](https://github.com/kylezantos/design-motion-principles) — context-sensitive motion creation and audit, including accessibility and performance.
- [Impeccable](https://github.com/pbakaus/impeccable) — separate product context from visual direction, iterative critique, and practical quality checks.
