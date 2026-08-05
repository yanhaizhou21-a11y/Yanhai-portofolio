# Graph Report - c:/di/portofolio  (2026-08-05)

## Corpus Check
- Corpus is ~20,031 words - fits in a single context window. You may not need a graph.

## Summary
- 148 nodes · 212 edges · 19 communities (17 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Dev Dependencies
- Pages and Portfolio Data
- Dependencies
- Auth and Routing
- Admin UI and Navbar
- Package Scripts
- Firebase Integration
- GSAP Animations
- ImageTrail Component
- FlipbookImage Component
- Vercel Config

## God Nodes (most connected - your core abstractions)
1. `usePortfolio()` - 13 edges
2. `useAuth()` - 9 edges
3. `prefersReducedMotion()` - 8 edges
4. `AdminPage()` - 7 edges
5. `scripts` - 5 edges
6. `Footer()` - 5 edges
7. `ImageTrail()` - 5 edges
8. `useTheme()` - 5 edges
9. `Navbar()` - 3 edges
10. `ProtectedRoute()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/AuthContext.jsx
- `AdminPage()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/PortfolioContext.jsx
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/LoginPage.jsx → src/context/AuthContext.jsx
- `AdminPage()` --calls--> `useTheme()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/hooks/useTheme.js
- `Footer()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/components/Footer.jsx → src/context/PortfolioContext.jsx

## Import Cycles
- None detected.

## Communities (19 total, 2 thin omitted)

### Community 0 - "Dev Dependencies"
Cohesion: 0.09
Nodes (23): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+15 more)

### Community 1 - "Pages and Portfolio Data"
Cohesion: 0.18
Nodes (12): Footer(), FlowingMenu(), ScrollFloat(), PortfolioContext, PortfolioProvider(), usePortfolio(), useFirestore(), About() (+4 more)

### Community 2 - "Dependencies"
Cohesion: 0.11
Nodes (19): firebase, framer-motion, gsap, lenis, ogl, dependencies, firebase, framer-motion (+11 more)

### Community 3 - "Auth and Routing"
Cohesion: 0.20
Nodes (10): App(), pageTransition, pageVariants, Preloader(), ProtectedRoute(), AuthContext, AuthProvider(), useAuth() (+2 more)

### Community 4 - "Admin UI and Navbar"
Cohesion: 0.24
Nodes (9): AdminPage(), buildEmpty(), cardVariants, compressImage(), s, sectionConfig, DeleteModal(), Navbar() (+1 more)

### Community 5 - "Package Scripts"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 6 - "Firebase Integration"
Cohesion: 0.24
Nodes (7): defaultPortfolioData, app, auth, db, firebaseConfig, storage, DOC_REF

### Community 7 - "GSAP Animations"
Cohesion: 0.42
Nodes (8): prefersReducedMotion(), useImageReveal(), useLineReveal(), useMaskReveal(), usePageTransition(), useParallax(), useScrollReveal(), useStaggerReveal()

### Community 8 - "ImageTrail Component"
Cohesion: 0.70
Nodes (4): getLocalPointerPos(), getMouseDistance(), ImageTrail(), lerp()

## Knowledge Gaps
- **42 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `Pages and Portfolio Data` to `Admin UI and Navbar`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._