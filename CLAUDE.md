# Portfolio Refactoring Plan: SCSS to Tailwind CSS v4

## Overview
This document outlines the comprehensive plan to modernize the portfolio website by migrating from SCSS to Tailwind CSS v4, incorporating modern UI enhancements inspired by the reference design while maintaining the core visual identity.

## Current State Analysis

### Project Structure
- **Monorepo**: Using Turborepo for managing multiple apps
- **Package Manager**: PNPM (v8.15.6)
- **Node Version**: >=20
- **Apps**:
  - `apps/web`: Main portfolio website (Next.js)
  - `apps/cms`: Firebase CMS (Vite + React)
- **Packages**: Shared packages directory

### Technology Stack
- **Framework**: Next.js with TypeScript
- **Build Tool**: Turborepo
- **Package Manager**: PNPM
- **Styling**: SCSS modules with CSS variables
- **Animation**: AOS (Animate On Scroll) library
- **Carousel**: Flickity
- **Responsive**: Custom media query mixins

### Design System
- **Primary Color**: `#8a693b` (brown/gold)
- **Font**: Sans-serif system font
- **Background**: Light gray (`#f5f5f5`) with white cards
- **Dark Mode**: Supported via CSS variables
- **Spacing**: Custom padding/margin system
- **Typography**: Large hero text (90px), responsive scaling

### Key UI Components
1. **Navigation**: Minimal header with logo and menu
2. **Hero Section**: Full-height with background image, animated tech stack icons
3. **Skills Section**: Grid-based cards with service logos
4. **Works Section**: Project cards with hover effects, Flickity carousel on desktop
5. **Footer**: Social links and contact information

## Migration Goals

### Primary Objectives
1. **Modernize Build Pipeline**: Replace SCSS with Tailwind CSS v4
2. **Improve Performance**: Leverage Tailwind's JIT compilation
3. **Enhance Developer Experience**: Use utility-first approach
4. **Maintain Visual Identity**: Preserve existing design language
5. **Add Modern Touches**: Incorporate elements from reference design

### Reference Design Inspirations
- Dark theme with purple/pink accents
- Glass morphism effects
- Modern typography with gradient text
- Smooth animations and transitions
- Card-based layout with depth
- Tech stack presentation style

## Technical Implementation Plan

### Phase 1: Setup and Configuration

#### 1.1 Install Tailwind CSS v4
```bash
# Run from the web app directory
cd apps/web
pnpm add -D tailwindcss@next @tailwindcss/postcss@next
```

#### 1.2 Configure PostCSS
Update `postcss.config.mjs`:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

#### 1.3 Create Main CSS File
Replace `globals.scss` with `globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Custom theme variables */
}
```

### Phase 2: Theme Configuration

#### 2.1 Design Tokens Migration
Convert SCSS variables to Tailwind CSS v4 theme:
```css
@theme {
  /* Colors */
  --color-primary: #8a693b;
  --color-neutral-0: #ffffff;
  --color-neutral-1: #f5f5f5;
  --color-neutral-9: #222222;
  
  /* Typography */
  --font-display: system-ui, -apple-system, sans-serif;
  
  /* Spacing */
  --spacing-section: 7.5rem;
  
  /* Breakpoints */
  --breakpoint-3xl: 1920px;
  
  /* Animations */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### 2.2 Utility Extensions
Define custom utilities for complex patterns:
```css
@utility container-custom {
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1rem;
}

@utility hero-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-neutral-9) 100%);
}
```

### Phase 3: Component Migration Strategy

#### 3.1 Layout Components
- **Container**: `max-w-[1100px] mx-auto px-4`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Card**: `bg-white/90 backdrop-blur border border-neutral-200 rounded p-8 transition-all hover:border-primary/50`

#### 3.2 Navigation
- Convert fixed positioning and z-index
- Use Tailwind's built-in responsive utilities
- Implement hover states with `hover:` variants

#### 3.3 Hero Section
- Background image with overlay using `before:` pseudo-element
- Animated icons using CSS transforms and custom JavaScript
- Responsive typography with `text-[90px] md:text-[60px]`

#### 3.4 Skills & Works Sections
- Grid layout with responsive columns
- Card hover effects with `group` utilities
- Maintain Flickity for carousel (evaluate alternatives later)

### Phase 4: Modern UI Enhancements

#### 4.1 Visual Improvements
1. **Glass Morphism Cards**:
   ```css
   bg-white/10 backdrop-blur-lg border border-white/20
   ```

2. **Gradient Accents**:
   ```css
   bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent
   ```

3. **Smooth Shadows**:
   ```css
   shadow-xl shadow-neutral-900/10
   ```

4. **Modern Borders**:
   ```css
   border border-neutral-200/50 hover:border-primary/50
   ```

#### 4.2 Animation Enhancements
- Replace AOS with Tailwind CSS animations
- Add micro-interactions on hover
- Implement smooth page transitions
- CSS-only parallax effects

#### 4.3 Dark Mode
- Implement using CSS variables and Tailwind's dark mode
- Smooth transitions between themes
- Respect system preferences

### Phase 5: Performance Optimization

1. **Remove Dependencies**:
   - Replace Flickity with CSS Scroll Snap or Embla
   - Replace AOS with Intersection Observer + Tailwind
   - Remove jQuery if present

2. **Optimize Assets**:
   - Use next/image for all images
   - Implement lazy loading
   - Optimize SVG icons

3. **Bundle Size**:
   - Tree-shake unused utilities
   - Minimize JavaScript footprint
   - Use CSS-only solutions where possible

## Implementation Timeline

### Week 1: Foundation
- [x] Analyze current structure
- [x] Setup Tailwind CSS v4 - ✅ Installed `tailwindcss@4.0.0` and `@tailwindcss/postcss@4.0.0`
- [x] Configure PostCSS - ✅ Updated `postcss.config.mjs` to use `@tailwindcss/postcss`
- [ ] Create theme configuration
- [ ] Convert base styles

## Progress Log

### Phase 1: Setup and Configuration
**Status: In Progress**

#### Completed:
- ✅ Installed Tailwind CSS v4 and PostCSS plugin using PNPM
- ✅ Updated PostCSS configuration to use `@tailwindcss/postcss`

#### Next Steps:
- Create new `globals.css` with Tailwind imports
- Define custom theme variables based on existing SCSS variables
- Test build process

### Week 2: Core Components
- [ ] Migrate layout components
- [ ] Convert navigation
- [ ] Refactor hero section
- [ ] Update typography system

### Week 3: Feature Sections
- [ ] Skills section migration
- [ ] Works/Projects section
- [ ] Contact section
- [ ] Footer component

### Week 4: Enhancements
- [ ] Add modern UI touches
- [ ] Implement dark mode
- [ ] Performance optimization
- [ ] Testing and refinement

## Success Metrics

1. **Performance**:
   - Lighthouse score > 95
   - First Contentful Paint < 1.5s
   - Cumulative Layout Shift < 0.1

2. **Developer Experience**:
   - Reduced CSS bundle size by 50%
   - Faster build times
   - Easier maintenance

3. **User Experience**:
   - Smooth animations
   - Responsive on all devices
   - Accessible (WCAG 2.1 AA)

## Risks and Mitigation

1. **Breaking Changes**:
   - Create feature branches
   - Test each component thoroughly
   - Keep SCSS as fallback during migration

2. **Browser Compatibility**:
   - Test on major browsers
   - Use PostCSS for vendor prefixes
   - Provide fallbacks for modern CSS features

3. **Design Consistency**:
   - Document all design decisions
   - Create visual regression tests
   - Regular design reviews

## Next Steps

1. Begin with Tailwind CSS v4 installation
2. Create a feature branch for the migration
3. Start with the simplest components first
4. Test continuously during development
5. Get feedback on each major section

## Notes

- Keep the existing color scheme but add modern accent colors
- Maintain the current layout structure while improving spacing
- Focus on subtle animations that enhance UX
- Ensure all interactive elements have proper hover/focus states
- Consider adding a "scroll to top" button
- Implement proper loading states for dynamic content

## References

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Next.js App Directory](https://nextjs.org/docs/app)
- Original reference design screenshot for inspiration
- Current production site for comparison