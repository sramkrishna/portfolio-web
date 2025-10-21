# Portfolio Website Project Plan

## Overview
Create a portfolio website inspired by [devsuite.app](https://devsuite.app/) using the GNOME branding color palette. The site will showcase active projects instead of applications.

## Design Goals
- Clean, minimalist design focused on projects
- Dark theme with GNOME branding color palette
- Responsive layout
- Professional, developer-focused aesthetic

## Color Palette (GNOME Brand - Dark Theme)

### Background Colors
- **Quite Black**: `#241F31` (primary background)
- **Dark Grey**: `#3d3846` (secondary background, cards)
- **Grey**: `#77767B` (tertiary/borders)

### Accent Colors
- **Blue**: `#3584e4` (primary accents, links)
- **Yellow/Gold**: `#f9f06b` or `#f6d32d` (highlights, important elements)
- **Orange**: `#FF7800` (secondary accents, call-to-action)
- **Red**: `#E01B24` (sporadic use, alerts, emphasis)

### Text Colors
- **Primary Text**: `#FFFFFF` or `#F6F5F4`
- **Secondary Text**: `#C0BFBC` or `#77767B`

## Site Structure

```
Homepage
├── Hero Section (introduction)
├── Projects Section (active projects showcase)
│   ├── Project cards with icons
│   ├── Screenshots (light/dark variants)
│   └── Feature lists
├── About Section
└── Footer
```

## Pages to Build
1. **Homepage** (`content/_index.md`)
   - Hero with name/title
   - Active projects showcase
   - About section

2. **Individual Project Pages** (`content/projects/`)
   - Detailed project information
   - Screenshots
   - Tech stack
   - Links (demo, source code)

## Theme Components

### Layouts
- [x] `baseof.html` - Base template with header/footer
- [ ] `index.html` - Homepage layout
- [ ] `single.html` - Individual project page
- [ ] `list.html` - Projects list page

### Partials
- [ ] `header.html` - Navigation
- [ ] `footer.html` - Footer with links
- [ ] `project-card.html` - Reusable project card component

### Assets
- [ ] `main.css` - Core styles with GNOME dark palette
- [ ] CSS variables for color scheme
- [ ] Minimal JavaScript if needed

## Features to Implement

### Phase 1: Foundation
- [ ] Remove blog functionality
- [ ] Set up GNOME color palette CSS variables
- [ ] Create base layout with header/footer
- [ ] Implement responsive grid system

### Phase 2: Core Features
- [ ] Build homepage hero section
- [ ] Create project showcase section
- [ ] Design project card components
- [ ] Add about section

### Phase 3: Enhancements
- [ ] Add smooth transitions and animations
- [ ] Optimize for mobile devices
- [ ] Add project detail pages

### Phase 4: Polish
- [ ] Icon system for projects
- [ ] Image optimization
- [ ] Accessibility improvements
- [ ] Performance optimization

## Content Structure

### Project Frontmatter
```toml
+++
title = "Project Name"
description = "Brief description"
date = 2025-10-20
tags = ["tag1", "tag2", "tag3"]

[[links]]
name = "Learn More"
url = "https://..."
external = true

[[links]]
name = "GitHub"
url = "https://github.com/..."
external = true
+++
```

**Note**: Projects can be anything - coding projects, community management, design work, etc. Links are flexible and optional.

## Development Phases

### Current Phase: Phase 1 - Foundation
**Goal**: Set up the basic structure and styling system

**Tasks**:
1. Clean up blog-related files
2. Create CSS architecture with GNOME colors
3. Build base templates
4. Set up project content type

### Next Phases
- Phase 2: Build core homepage and project showcases
- Phase 3: Add interactivity and theme switching
- Phase 4: Polish and optimize

## Technical Decisions
- **Framework**: Hugo static site generator
- **Styling**: Custom CSS with CSS variables
- **Theme**: Dark only with GNOME colors
- **JavaScript**: Minimal or none
- **Deployment**: GitHub Pages via GitHub Actions
- **Theme**: Custom "portfolio" theme

## Success Criteria
- [ ] Clean, professional design matching devsuite.app aesthetic
- [ ] GNOME dark color palette properly implemented (blues, yellows, orange, sporadic red)
- [ ] Fully responsive on all devices
- [ ] Easy to add new projects
- [ ] Fast loading times
- [ ] Accessible (WCAG 2.1 AA)

## Notes
- Focus on showcasing active projects, not blog posts
- Keep design minimal and content-focused
- Prioritize performance and accessibility
- Make it easy to update and maintain
