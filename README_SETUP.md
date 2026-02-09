# Tachyon GenAI Studio Dashboard

A modern, dark-themed React dashboard UI built with **React**, **Tailwind CSS**, and **Lucide React** icons. This project showcases a responsive AI project management interface with sidebar navigation, real-time project tracking, and resource management.

## 📋 Overview

The dashboard displays:
- **Sticky Sidebar**: Navigation with icons for Home, Playground, Models, Agent Studio, Marketplace, Dashboard, Overwatch, Data, and Documentation
- **Header Bar**: Title, search, notifications, and settings
- **Project Stages**: Three distinct sections (Ideation, Build, Deployed) with counts and action buttons
- **Progress Tracking**: Cards for ideas, builds, and deployments showing status, timelines, and success rates
- **Resources**: Latest updates and documentation snippets with quick access links

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📁 Project Structure

```
ui-dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── HeaderBar.jsx       # Top header with search & settings
│   │   ├── Dashboard.jsx       # Main dashboard layout
│   │   ├── StageCard.jsx       # Project stage indicator cards
│   │   ├── ProgressCard.jsx    # Project progress cards
│   │   └── ResourceCard.jsx    # Resource/article cards
│   ├── App.jsx                 # Main app container
│   ├── index.css               # Tailwind directives
│   └── main.jsx                # Entry point
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS plugins
├── vite.config.js              # Vite configuration
└── package.json

```

## 🎨 Color Scheme

Custom Tailwind colors defined in `tailwind.config.js`:

| Color | Hex Code | Usage |
|-------|----------|-------|
| `panel-dark` | `#12121a` | Main background |
| `panel-muted` | `#181824` | Sidebar background |
| `panel-card` | `#1f1f2d` | Card backgrounds |
| `accent-green` | `#46f0a8` | Ideation stage, CTA buttons |
| `accent-blue` | `#4a9dff` | Build stage, links |
| `accent-purple` | `#b26bff` | Deployed stage |
| `accent-gold` | `#d9a56a` | Secondary accents |
| `text-subtle` | `#a2a2b2` | Muted text |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Navigate to the project:**
   ```bash
   cd ui-dashboard
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:** 
   Visit `http://localhost:5173` to view the dashboard

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` folder.

## 📦 Component Overview

### **Sidebar** (`Sidebar.jsx`)
- Sticky navigation with active state
- Icon + label for each nav item
- Hover effects and smooth transitions

### **HeaderBar** (`HeaderBar.jsx`)
- Workspace title and breadcrumb
- Search input, notifications, and settings buttons
- Responsive layout with flexbox

### **StageCard** (`StageCard.jsx`)
- Displays project stage name, count, and colored indicator
- Call-to-action button (dynamic text and color)
- Used in the main dashboard to show Ideation, Build, and Deployed counts

### **ProgressCard** (`ProgressCard.jsx`)
- Shows project title, status badge, and timeline
- Success percentage or uptime metric
- "Recommended Next Step" link
- Reused for Ideas, Builds, and Deployments

### **ResourceCard** (`ResourceCard.jsx`)
- Article/resource title, date, and description
- Icon button for action (e.g., open or download)
- Clean, minimal design

### **Dashboard** (`Dashboard.jsx`)
- Main layout orchestrating all sections
- Sample data for Ideas, Builds, Deployments, and Resources
- Responsive grid layout (mobile-first design)

## 🎯 Usage Example

To customize the dashboard data, modify the arrays in `Dashboard.jsx`:

```javascript
const stageData = [
  {
    title: 'IDEATION STAGE',
    count: 12,
    badgeColor: 'bg-accent-green',
    buttonLabel: 'Get started on a new idea',
    buttonClass: 'bg-accent-green hover:bg-accent-green/90',
  },
  // Add more stages...
]
```

Replace `ideasInProgress`, `buildsInProgress`, `activeDeployments`, and `resources` arrays with your own data.

## 🎨 Tailwind CSS Customization

To modify colors, spacing, or shadows, edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'custom-color': '#hexcode',
    },
    boxShadow: {
      'custom': '0 4px 6px rgba(0,0,0,0.1)',
    },
  },
}
```

## 📱 Responsive Design

The layout is responsive using Tailwind breakpoints:
- **sm** (640px): 2-column grid for stage cards
- **lg** (1024px): 3-column grid for stage cards
- Sidebar remains sticky on desktop; consider a mobile hamburger menu for optimal mobile UX

## 🔧 Development Tips

- **Hot Module Replacement (HMR)**: Changes to files auto-refresh in the browser
- **Icons**: Browse [Lucide React Icons](https://lucide.dev) for additional icons
- **Tailwind Classes**: Use Tailwind utilities for rapid styling without custom CSS
- **Component Reusability**: Generic prop-based components like `ProgressCard` can be reused across different contexts

## 📄 License

This project is provided as-is for educational and commercial use.

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**