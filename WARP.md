# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Frontend Mentor challenge for a coffee subscription website built with vanilla JavaScript, Sass, and Parcel bundler. The site uses MVC architecture with a Publisher-Subscriber pattern for state management.

## Commands

### Development
```bash
npm start
```
Starts Parcel dev server at `localhost:1234` with hot module reloading.

### Build
```bash
npm run build
```
Builds production-ready files to `./dist` directory.

## Architecture

### MVC Pattern
The codebase follows a strict Model-View-Controller architecture:

- **Model** (`src/js/model.js`): Central state management with `state` object containing:
  - `cards[]`: Array of subscription choice cards
  - `slideTittle[]`: Array of preference section titles  
  - `previewText`: Object with preview element and option texts
  - `choices[]`: Array of user-selected options (created at runtime)

- **Views** (`src/js/views/`): UI rendering and DOM manipulation classes
  - `mobileMenuView.js`: Handles responsive mobile menu toggle (breakpoint: 700px)
  - `planView.js`: Manages subscription plan UI including:
    - Accordion/slide sections
    - Active choice selection
    - Price calculations based on quantity
    - Order preview updates
    - Modal rendering
    - Grind section enable/disable logic (disabled when "Capsule" is selected)

- **Controllers** (`src/js/*Controller.js`): Business logic and event handling
  - `homePageController.js`: Mobile menu control for home page
  - `planPagecontroller.js`: Subscription workflow orchestration:
    - Slide choice toggling
    - Card selection with active state management
    - Order preview text updates
    - Price updates based on quantity (250g/500g/1000g)
    - "Create Plan" button activation (disabled until all choices made)
    - Modal with checkout price calculation

### Publisher-Subscriber Pattern
Controllers subscribe to view events and update the model, which triggers view re-renders. Views never directly communicate with each other.

### Configuration
`src/js/config.js` contains:
- `BREAK_POINT`: 700px for responsive mobile menu
- Subscription pricing constants for all quantity/frequency combinations
- Quantity constants (250g, 500g, 1000g)

### Helper Functions
`src/js/helper.js` contains utility functions like `menuState()` for responsive menu behavior.

### Styling Structure
Sass files are organized by page and component:
- `src/sass/global/`: Shared styles (_variables.scss, _global.scss, _header.scss, _footer.scss)
- `src/sass/home/`: Home page sections (_hero.scss, _collection.scss, _why.scss, _how.scss)
- `src/sass/about/`: About page sections
- `src/sass/plan/`: Plan page sections (_plan-hero.scss, _plan-pref.scss, _plan-process.scss, _modal.scss)
- Page entry files: `home.scss`, `about.scss`, `plan.scss`

### Page Structure
Three main HTML pages with separate controllers:
- `index.html` → `homePageController.js` → `home.scss`
- `about.html` → (no controller, only mobile menu)
- `plan.html` → `planPagecontroller.js` → `plan.scss`

### Key Workflow: Subscription Plan Selection
1. User clicks preference title → `slideChoiceControl()` toggles accordion section
2. User selects card → `subscriptionChoiceControl()`:
   - Updates active card state
   - Pushes selected choice to `state.choices[]`
   - Updates order preview text with selection
   - Recalculates prices based on quantity
   - Enables/disables grind section if Capsule selected
   - Activates "Create Plan" button when all choices made
3. User clicks "Create Plan" → `btnPlanControl()`:
   - Renders preview text to modal
   - Calculates final checkout price (weekly × 4, biweekly × 2, or monthly × 1)
   - Opens modal overlay

## Important Notes

- All modules use core-js and regenerator-runtime for polyfills
- Assets are in `src/assets/` organized by page (home/about/plan) and device (mobile/tablet/desktop)
- State initialization happens in `model.js` init function, called immediately on module load
- Views are exported as singleton instances (e.g., `export default new MobileMenuView()`)
- Controllers also initialize immediately via `init()` function calls at module end
