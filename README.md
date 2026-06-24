# Multi-Step Discovery Wizard Flow

A highly optimized, accessible multi-step wizard form built with **Next.js**, **React**, and **Tailwind CSS**.

## Features

* **BFF Endpoint Fetching:** * Separately fetches dynamic questions workflow layouts.
    * Dynamically fetches configurations for the price/value range slider sliders.
    * Handles immediate data mutations directly on the backend helper service layer.
* **Zero Dependencies (No Form/UI Libraries):** Built entirely with native React and Tailwind primitives, keeping the bundle size minimal without heavy third-party UI or validation engines.
* **State Machine:** Uses `useSyncExternalStore` for predictable state tracking with persistent session storage.
* **Recursive Sanitization:** Automatically drops stale downstream answers when branching dependencies change.
* **Full Accessibility (WAI-ARIA):**
    * Implements `aria-live="polite"` for dynamic step updates.
    * Uses a custom `useHeadingFocus` hook (`requestAnimationFrame`) to handle focus transitions on step switches.
    * Native keyboard interaction for all inputs (Radio groups via arrow keys, checkboxes via Spacebar).

## Directory Structure

```
├── components/
│   ├── CheckboxInput.tsx       # Accessible multi-select fields
│   ├── RadioInput.tsx          # Accessible mutual exclusion choices
│   ├── RangeSliderInput.tsx     # Accessible custom double range slider bounds
│   ├── TextInput.tsx           # Accessible textarea fields
│   ├── WizardError.tsx         # Accessible error alerts
│   ├── WizardLoader.tsx        # Accessible loading indicators
│   ├── WizardResults.tsx       # Final payload JSON display
│   └── WizardStep.tsx          # Main step structure coordinator
├── hooks/
│   ├── useFetchQuestions.ts    # Questions data and range config fetch engine
│   ├── useHeadingFocus.ts      # Core focus tracking transition hook
│   └── useWizardFlow.ts        # Core state machine engine
├── mocks/
│   └── handlers.ts             # Mock API configuration boundaries for layout responses
├── types/
│   └── index.ts                # Unified TypeScript type definitions
└── pages/
    └── index.tsx               # Orchestration index entry view
```
## Getting started
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```