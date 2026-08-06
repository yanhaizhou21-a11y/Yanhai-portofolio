# Graph Report - portofolio  (2026-08-06)

## Corpus Check
- 50 files · ~92,386 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 206 nodes · 293 edges · 25 communities (22 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b63a7e6f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- usePortfolio
- dependencies
- App.jsx
- hero-scroll-animation.jsx
- package.json
- PortfolioContext.jsx
- useGsap.js
- ImageTrail.jsx
- FlipbookImage.jsx
- vercel.json
- React + Vite
- CLAUDE.md
- Q: Where should the expanding-card and hero visual fixes be implemented?

## God Nodes (most connected - your core abstractions)
1. `usePortfolio()` - 16 edges
2. `useTheme()` - 11 edges
3. `useAuth()` - 9 edges
4. `prefersReducedMotion()` - 8 edges
5. `AdminPage()` - 7 edges
6. `Footer()` - 6 edges
7. `AnimatedFooter()` - 6 edges
8. `scripts` - 5 edges
9. `AnimatedNavFramer()` - 4 edges
10. `LiquidMetalButton` - 4 edges

## Surprising Connections (you probably didn't know these)
- `AdminPage()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/PortfolioContext.jsx
- `AdminPage()` --calls--> `useTheme()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/hooks/useTheme.js
- `AnimatedNavFramer()` --calls--> `usePortfolio()`  [EXTRACTED]
  src/components/AnimatedNavFramer.jsx → src/context/PortfolioContext.jsx
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/pages/LoginPage.jsx → src/context/AuthContext.jsx
- `AdminPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/admin/AdminPage.jsx → src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (25 total, 3 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.09
Nodes (23): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+15 more)

### Community 1 - "usePortfolio"
Cohesion: 0.21
Nodes (9): Footer(), FlowingMenu(), ScrollFloat(), usePortfolio(), About(), defaultServices, Contact(), ProjectDetail() (+1 more)

### Community 2 - "dependencies"
Cohesion: 0.06
Nodes (33): clsx, firebase, framer-motion, gsap, lenis, lucide-react, motion, next-themes (+25 more)

### Community 3 - "App.jsx"
Cohesion: 0.12
Nodes (18): AdminPage(), buildEmpty(), cardVariants, compressImage(), s, sectionConfig, App(), pageTransition (+10 more)

### Community 4 - "hero-scroll-animation.jsx"
Cohesion: 0.12
Nodes (16): AnimatedNavFramer(), navLinks, LiquidMetal, LiquidMetalButton, AnimatedFooter(), buildHandCells(), getScrollParent(), highlightCluster() (+8 more)

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

### Community 24 - "Q: Where should the expanding-card and hero visual fixes be implemented?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Where should the expanding-card and hero visual fixes be implemented?, Source Nodes

## Knowledge Gaps
- **58 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `usePortfolio()` connect `usePortfolio` to `App.jsx`, `hero-scroll-animation.jsx`, `PortfolioContext.jsx`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1206896551724138 - nodes in this community are weakly interconnected._