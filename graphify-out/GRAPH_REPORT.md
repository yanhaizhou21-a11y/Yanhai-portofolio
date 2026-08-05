# Graph Report - portofolio  (2026-08-05)

## Corpus Check
- 42 files · ~87,297 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 167 nodes · 236 edges · 24 communities (19 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65bf4afc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- App.jsx
- dependencies
- AuthContext.jsx
- AdminPage.jsx
- package.json
- PortfolioContext.jsx
- useGsap.js
- ImageTrail.jsx
- FlipbookImage.jsx
- vercel.json
- React + Vite
- Preloader.jsx
- LiquidMetalButton.jsx
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `usePortfolio()` - 17 edges
2. `useAuth()` - 9 edges
3. `prefersReducedMotion()` - 8 edges
4. `AdminPage()` - 7 edges
5. `Footer()` - 6 edges
6. `scripts` - 5 edges
7. `useTheme()` - 5 edges
8. `AnimatedNavFramer()` - 4 edges
9. `ImageTrail()` - 4 edges
10. `ProtectedRoute()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/AuthContext.jsx
- `AdminPage()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/PortfolioContext.jsx
- `AnimatedNavFramer()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/components/AnimatedNavFramer.jsx → src/context/PortfolioContext.jsx
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/LoginPage.jsx → src/context/AuthContext.jsx
- `AdminPage()` --calls--> `useTheme()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/hooks/useTheme.js

## Import Cycles
- None detected.

## Communities (24 total, 5 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.09
Nodes (23): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+15 more)

### Community 1 - "App.jsx"
Cohesion: 0.15
Nodes (14): pageTransition, pageVariants, buildCells(), Footer(), FooterCanvas(), FlowingMenu(), ScrollFloat(), usePortfolio() (+6 more)

### Community 2 - "dependencies"
Cohesion: 0.11
Nodes (19): firebase, framer-motion, gsap, lenis, ogl, dependencies, firebase, framer-motion (+11 more)

### Community 3 - "AuthContext.jsx"
Cohesion: 0.27
Nodes (7): App(), ProtectedRoute(), AuthContext, AuthProvider(), useAuth(), AdminLogin(), LoginPage()

### Community 4 - "AdminPage.jsx"
Cohesion: 0.20
Nodes (10): AdminPage(), buildEmpty(), cardVariants, compressImage(), s, sectionConfig, AnimatedNavFramer(), navLinks (+2 more)

### Community 5 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 6 - "PortfolioContext.jsx"
Cohesion: 0.21
Nodes (10): PortfolioContext, PortfolioProvider(), defaultPortfolioData, app, auth, db, firebaseConfig, storage (+2 more)

### Community 7 - "useGsap.js"
Cohesion: 0.42
Nodes (8): prefersReducedMotion(), useImageReveal(), useLineReveal(), useMaskReveal(), usePageTransition(), useParallax(), useScrollReveal(), useStaggerReveal()

### Community 8 - "ImageTrail.jsx"
Cohesion: 0.70
Nodes (4): getLocalPointerPos(), getMouseDistance(), ImageTrail(), lerp()

### Community 19 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **48 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `App.jsx` to `AdminPage.jsx`, `PortfolioContext.jsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._