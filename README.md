# FocusVector: Data-Driven Productivity Optimization Loop

FocusVector is a production-grade analytics and productivity-tracking dashboard engineered to treat focus as a measurable engineering variable. Designed to eliminate productivity leakage and cognitive task-switching overhead , the system combines a highly responsive React frontend with a lightweight, local-first Node.js/Express backend to deliver a quantitative behavioral feedback mirror.

> 
> **Project Status:** Live Prototype / Early Alpha. Mathematical modeling and dual-theme dashboard interfaces are fully functional.
> 
> 

---

## 🛠 Unified Tech Stack & Ecosystem

### Frontend Architecture

* **Framework:** React 18 (Component-based architecture utilizing React hooks for state management).
* **Data Visualization:** Recharts (Animated line charts, stacked timelines, and daily bar graphs).
* **Iconography:** Lucide React.
* **Typography:** Syne (Display/Headings) and DM Sans (Body text).
* **Theming:** Full Dark Theme + Light Theme toggle via a native CSS variable design token system.
### Backend & Data Layers

* **Runtime & Framework:** Node.js + Express.js REST API.
* **Database Engine:** Relational SQLite (Local MVP instance) structured for structured logging and session persistence.
* **Authentication:** Stateless JSON Web Tokens (JWT) with persistent user profiles.
* **Automation Engine:** `node-cron` internal task scheduler for asynchronous midnight analytical aggregations.
---
## 📁 Repository File Structure

```text
FocusVector-workspace/
├── FocusVector-frontend/          # React Single Page Application (SPA)
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx  # Left navigation sidebar (Dashboard, Sessions, Insights)
│   │   │   │   └── Topbar.jsx   # Top header bar with active live session timer
│   │   │   └── dashboard/
│   │   │       ├── Dashboard.jsx         # Main grid layout & responsive responsive wrapper
│   │   │       ├── FocusScoreCard.jsx    # Circular score ring widget with SVG stroke animations
│   │   │       ├── MiniStatCard.jsx      # Small top-row core metric display blocks
│   │   │       ├── SessionTimeline.jsx   # Stacked bar chart tracking Focus vs. Distraction vs. Idle
│   │   │       ├── TopDistractions.jsx   # App distraction breakdown progress bars
│   │   │       ├── TasksCard.jsx         # Interactive session task checklist & progress indicators
│   │   │       ├── FocusScoreTrend.jsx   # Weekly tracking line chart component
│   │   │       ├── FocusHoursChart.jsx   # Daily hourly allocation column chart
│   │   │       ├── ProductivityHeatmap.jsx # GitHub-style calendar intensity heat grid
│   │   │       └── InsightsPanel.jsx     # Auto-detected peak windows & pattern cards
│   │   ├── data/
│   │   │   └── mockData.js      # Static frontend data fallback layer
│   │   ├── App.jsx              # Application root and layout router
│   │   └── index.css            # Global design tokens and styling overrides
│   
├── FocusVector-backend/           # Node.js REST API
│   ├── config/
│   │   └── database.js          # SQLite connection and migration management
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT parsing and endpoint authorization guards
│   │   │   └── errorHandler.js  # Centralized Express exception interceptor
│   │   ├── controllers/
│   │   │   ├── session.controller.js   # Session lifecycle and active tracking states
│   │   │   ├── task.controller.js      # Checklist state modifications & CRUD actions
│   │   │   └── analytics.controller.js # Metric processing engine computations
│   │   ├── routes/
│   │   │   ├── session.routes.js       # /api/session/* tracking endpoints
│   │   │   ├── task.routes.js          # /api/tasks/* task management paths
│   │   │   └── analytics.routes.js     # /api/analytics/* historical graph datasets
│   │   └── app.js               # Express application layer assembly
│   └── server.js                # High-performance server entry point

```

---

## ⚡ Metric Processing Engine: The Focus Score Formula

To bridge the gap between time spent at a desk and genuine cognitive output , the application implements a proprietary **Focus Score** calculated upon the termination of a tracking state or via an automated midnight batch routine:

$$\text{Focus Score} = \Big( (0.5 \times FT_{\text{ratio}}) + (0.3 \times TC) + \big(0.2 \times (1 - DT_{\text{ratio}})\big) \Big) \times 100$$

### Parameter Matrix Definitions:

* **$FT_{\text{ratio}}$ (Focus Time Ratio):** The ratio of strictly engaged/active time to total elapsed session time.
* **$TC$ (Task Completion Rate):** The percentage of explicitly defined sub-tasks successfully completed during that tracking block.
* **$DT_{\text{ratio}}$ (Distraction Time Ratio):** The ratio of distraction events (such as jumping into blocked application window handles or active idle intervals) to total session time.
Concrete Execution Example:

For a single **4-hour session** (`14,400 seconds`) where a user maintains a **78% focus ratio**, hits an **85% task completion rate**, and registers a **12% distraction footprint**:

$$\text{Score} = \Big( (0.5 \times 0.78) + (0.3 \times 0.85) + \big(0.2 \times (1 - 0.12)\big) \Big) \times 100$$

$$\text{Score} = (0.39 + 0.255 + 0.176) \times 100 = 82.1 \implies \mathbf{82/100}$$

---
## 🔌 API Contract Specifications

### 1. Active Session Core Overview

* **Endpoint:** `GET /api/session/current`
* **Target UI Components:** `Topbar.jsx` Live Clock, `MiniStatCard.jsx` wrappers.
* **Payload Structure:**
```json
{
  "status": "success",
  "data": {
    "isSessionActive": true,
    "currentSessionSeconds": 5076, 
    "todayStats": {
      "totalFocusHours": 3.29,
      "focusScore": 82,
      "completedTasksCount": 17,
      "totalTasksCount": 20
    }
  }
}

```

### 2. Time-Series Stacked Sequence

* **Endpoint:** `GET /api/sessions/timeline`
* **Target UI Component:** `SessionTimeline.jsx` (Stacked multi-color Recharts sequence).
* **Payload Structure:**

```json
{
  "status": "success",
  "data": [
    { "timeWindow": "08:00 AM", "focus": 110, "distraction": 10, "idle": 0 },
    { "timeWindow": "10:00 AM", "focus": 88, "distraction": 24, "idle": 8 },
    { "timeWindow": "12:00 PM", "focus": 0, "distraction": 60, "idle": 60 }
  ]
}

```

### 3. Categorized Application Distraction Distribution

* **Endpoint:** `GET /api/distractions`
* **Target UI Component:** `TopDistractions.jsx` list ranking.
* **Payload Structure:**

```json
{
  "status": "success",
  "data": [
    { "app": "Instagram", "durationMinutes": 28, "percentage": 52 },
    { "app": "YouTube", "durationMinutes": 16, "percentage": 29 },
    { "app": "WhatsApp", "durationMinutes": 6, "percentage": 11 },
    { "app": "App Switches", "durationMinutes": 4, "percentage": 8 }
  ]
}

```

---

## 🎨 Global Design Tokens (`src/index.css`)

The user interface maintains exact design fidelity utilizing CSS Custom Properties injected into layout wrappers:

```css
:root {
  /* UI Colors */
  --green-primary: #22C55E;     /* Primary Focus Accent Glow */
  --red-distraction: #EF4444;   /* Interruption Warning Metrics */
  --purple-tasks: #A855F7;      /* Milestone Complete Bars */
  --bg-dashboard: #0F1115;      /* Base Dark Canvas background */
  --bg-card: #181C22;           /* Floating Card Layout Container */
  
  /* Typography Signatures */
  --font-display: 'Syne', sans-serif;   /* Headers, Numbers, Component Widget Hero Indicators */
  --font-body: 'DM Sans', sans-serif;    /* Microcopy, Analytics Data Summaries, Item Labels */
}

```

---

## 🚀 Environment Setup & Deployment Pipelines

### Local Frontend Execution

1. Navigate to the application root directory:
```bash
cd FocusVector-frontend

```


2. Pull required node modules:
```bash
npm install

```


3. Boot the development webpack server:
```bash
npm start

```


4. Access the reactive dashboard UI locally via port-forward loops at `http://localhost:3000`.



### Local Backend Service Lifecycle

1. Navigate to the api directory:
```bash
cd FocusVector-backend

```


2. Build local node configurations:
```bash
npm install

```


3. Initialize the SQL structure and start up the server engine listener loops:
```bash
npm run dev

```



### Production Compilation Steps

To package and bundle optimized static build bundles for deployment infrastructure setups (e.g., Vercel, Netlify, or AWS Amplify):

```bash
npm run build

```
