# Portfolio

A modern, minimal, and recruiter-focused portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **TypeScript** - Full type safety throughout
- **Environment-Driven Content** - All personal data controlled via environment variables
- **Modern Architecture** - Clean separation of concerns with organized folder structure
- **Dark Theme** - Premium dark-first design with subtle gradients
- **Responsive** - Mobile-first, fully responsive design
- **Performance** - Optimized build with lazy loading ready
- **Accessibility** - Semantic HTML and ARIA labels

## Tech Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 3
- ESLint + Prettier

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, Badge, Icon)
│   └── layout/       # Layout components (Container, Section, Header, Footer)
├── sections/         # Page sections (Hero, Experience, Projects, Skills, etc.)
├── config/
│   ├── env.ts        # Environment variable validation
│   └── site.ts       # Site configuration
├── data/             # Structured content data
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── education.ts
├── types/            # TypeScript interfaces
├── styles/           # Global CSS
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nishantxrana/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview  # Preview the build
```

## Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Personal Information
VITE_NAME="Your Name"
VITE_TITLE="Your Title"
VITE_SUBTITLE="Your Subtitle"
VITE_EMAIL="your@email.com"
VITE_PHONE="+1234567890"
VITE_LOCATION="City, Country"

# Social Links
VITE_GITHUB_URL="https://github.com/username"
VITE_LINKEDIN_URL="https://linkedin.com/in/username"
VITE_TWITTER_URL=""

# Resume
VITE_RESUME_URL="https://drive.google.com/..."

# Section Visibility (true/false)
VITE_SHOW_EXPERIENCE="true"
VITE_SHOW_PROJECTS="true"
VITE_SHOW_SKILLS="true"
VITE_SHOW_EDUCATION="true"
VITE_SHOW_CERTIFICATIONS="true"

# Analytics (optional)
VITE_CLARITY_ID=""
VITE_GA_ID=""
```

## Updating Content

### Personal Information
Update via environment variables or edit `src/config/site.ts`

### Experience, Projects, Skills, Education
Edit the corresponding files in `src/data/`:
- `experience.ts` - Work history
- `projects.ts` - Portfolio projects
- `skills.ts` - Technical skills
- `education.ts` - Education & certifications

### Adding New Sections
1. Create component in `src/sections/`
2. Export from `src/sections/index.ts`
3. Add to `src/App.tsx`
4. Optionally add visibility toggle in `env.ts`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm run type-check` | Check TypeScript types |

## CI/CD Integration

This portfolio is designed for easy CI/CD integration:

1. **Environment Variables**: All personal content can be injected at build time
2. **Section Toggles**: Enable/disable sections via env vars
3. **No Code Changes**: Update content without touching source code

Example GitHub Actions workflow:

```yaml
env:
  VITE_NAME: ${{ vars.PORTFOLIO_NAME }}
  VITE_EMAIL: ${{ vars.PORTFOLIO_EMAIL }}
  # ... other variables
```

## Customization

### Colors
Edit CSS custom properties in `src/styles/index.css`:

```css
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 95%;
  --accent: 160 84% 39%;  /* Emerald accent */
  /* ... */
}
```

### Typography
Fonts are loaded from Google Fonts in `index.html`. Update `tailwind.config.ts` for font stack.

### Components
All UI components are in `src/components/ui/` - easily extendable and customizable.

## License

MIT License - feel free to use this template for your own portfolio.

## Author

Nishant Rana - [GitHub](https://github.com/nishantxrana) | [LinkedIn](https://linkedin.com/in/nishantxrana)
