# LaunchDate Admin Panel

Admin panel for managing rocket launch data for launch-date.com. Built with React, TypeScript, and shadcn/ui.

## 🚀 Features

- **Dashboard** - Overview with statistics for all data entities
- **Rockets Management** - CRUD operations for rocket data
- **Launches Management** - Manage scheduled and past launches
- **News Management** - Create and edit news articles with markdown support
- **Launch Bases Management** - Manage launch facilities and locations
- **Companies Management** - Track space companies and organizations

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── Sidebar.tsx      # Navigation sidebar
├── pages/               # Page components with CRUD logic
│   ├── Dashboard.tsx
│   ├── Rockets.tsx
│   ├── Launches.tsx
│   ├── News.tsx
│   ├── LaunchBases.tsx
│   └── Companies.tsx
├── types/
│   └── index.ts         # TypeScript type definitions
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component with routing
└── main.tsx             # Application entry point
```

## 📊 Data Entities

### Rockets
- Name, description
- Physical specifications (height, diameter, mass)
- Company, active status
- Images

### Launches
- Name, date/time
- Associated rocket and launch base
- Status (scheduled, successful, failed, cancelled)
- Description

### News
- Title, summary, full content (markdown)
- Publication date
- External URL and images

### Launch Bases
- Name, location, country
- GPS coordinates (latitude, longitude)
- Description and images

### Companies
- Name, founder, founding year
- Headquarters location
- Employee count, website
- Images

## 🎨 UI Components

Built with shadcn/ui component library:
- Button
- Card
- Input
- Textarea
- Table
- Custom Sidebar navigation

## 🔧 Development

The application uses in-memory state management. To connect to the backend:

1. Create an API service layer in `src/services/`
2. Replace state management with API calls
3. Add error handling and loading states
4. Implement data caching if needed

## 📝 Related Projects

- **Frontend**: [launchdate-web](https://github.com/vamosdalian/launchdate-web)
- **Backend**: [launchdate-backend](https://github.com/vamosdalian/launchdate-backend)

## 📄 License

This project is part of the LaunchDate platform.
