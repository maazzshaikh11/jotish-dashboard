# Employee Insights Dashboard

A high-performance React dashboard built with premium glassmorphic design, custom virtualization, and native hardware integration.

## 🚀 Key Features
- **Secure Auth**: Persistent authentication with redirect guards and synchronous state recovery.
- **Custom Virtualization**: Hand-rolled virtualization math for 1000+ rows, optimizing DOM footprint.
- **Identity Verification**: Native Camera API integration with HTML5 Canvas signature overlay.
- **Data Viz**: Raw SVG charts and Geospatial mapping (Leaflet with Dark Matter theme).

## 🛠 Engineering Constraints

### 1. Custom Virtualization Math
The virtualization logic is implemented in `src/utils/virtualization.js` and consumed by `VirtualTable.jsx`.
- **Row Indexing**: `startIndex = Math.floor(scrollTop / rowHeight)`.
- **Viewport Math**: `visibleCount = Math.ceil(containerHeight / rowHeight)`.
- **Smoothness**: A buffer of 5 rows is maintained above and below the visible area to prevent "white gaps" during fast scrolling.
- **Layout**: Uses absolute positioning via `translateY(${offsetY}px)` to keep rows in the correct position without rendering thousands of elements.

### 2. Intentional Bug: Stale Closure
- **Location**: `src/pages/Details.jsx` -> `handleMerge` callback.
- **Logic**: The `handleMerge` function is wrapped in `useCallback` but has an empty dependency array `[]`.
- **Details**: This creates a **stale closure** where the function "captures" the initial `null` values of the `photo` and `signature` state variables. 
- **Effect**: Even after capturing a photo and signing, the "Generate Identity Token" button will continue to see `photo` and `signature` as `null`, preventing the merge operation.
- **Why**: This demonstrates mastery of React's hook mechanics and the importance of dependency management in asynchronous/callback-driven logic.

## 📦 Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Standard CSS with CSS Variables (Modern Design System)
- **Navigation**: React Router 7
- **Mapping**: React-Leaflet (OpenStreetMap + CARTO Dark)