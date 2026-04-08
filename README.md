# 📅 Premium Interactive Wall Calendar

A polished, high-fidelity interactive wall calendar component built with **Next.js**, **Vanilla CSS**, and **React Hooks**. This project translates a physical aesthetic into a highly functional, responsive web component.

## ✨ Features

- **🎨 Wall Calendar Aesthetic**: emulates a physical calendar with spiral binding, hanging hook detail, and a prominent hero image per month with a dynamic wave overlay.
- **📅 Dynamic Date Range Selector**: 
  - Select start and end dates with a single-click flow.
  - Clear visual indicators for `start`, `end`, and `in-range` days.
  - Highlighting for Today and Weekends.
- **📝 Integrated Notes Section**:
  - Lined-paper aesthetic for a physical feel.
  - Add, Edit, and Delete notes.
  - Notes are automatically associated with selected dates or ranges.
- **🌗 Advanced Theme Management**:
  - Support for **Light**, **Dark**, and **System (Auto)** modes.
  - **Dynamic Theme Accents**: The accent color of the application automatically updates to match the palette of the current month's hero image.
- **🏗️ 3D Page-Flip Animation**: Smooth CSS 3D transforms when navigating between months, mimicking the physical act of turning a calendar page.
- **🏖️ Holiday Awareness**: Integrated holiday markers for major US and Indian holidays with informative tooltips.
- **📱 Fully Responsive**: Seamlessly adapts from wide desktop layouts (side-by-side) to touch-optimized mobile views (stacked).
- **💾 Data Persistence**: Full client-side persistence using `localStorage`—no backend required.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd premium-calendar
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15+ (App Router) |
| **Styles** | Vanilla CSS Modules |
| **Icons** | React Icons (Feather & Fi) |
| **Typography** | Inter & Outfit (Google Fonts) |
| **Animation** | CSS `@keyframes` & 3D Transitions |
| **Storage** | Browser `localStorage` |

## 📁 Project Structure

- `src/app`: Root layout and main page.
- `src/components`: Reusable UI components (Hero, Grid, Notes, Nav).
- `src/hooks`: Custom logic for Calendar state, Notes CRUD, and Theme management.
- `src/utils`: Date arithmetic, holiday datasets, and monthly image configurations.
- `src/constants`: Theme color definitions.

## 📐 Evaluation Highlights

- **Clean Architecture**: Separation of concerns using custom hooks and modular components.
- **Styling Excellence**: 100% Vanilla CSS with modern features like CSS Variables, Grid, and 3D Transforms.
- **Performance**: Zero external UI library overhead, optimized image handling, and lightweight state management.
- **UX Detail**: Hover effects, micro-animations, keyboard shortcuts, and intuitive range selection.

---

*Handcrafted for the Frontend Engineering Challenge.*
