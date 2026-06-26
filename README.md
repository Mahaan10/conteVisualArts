# Conte Visual Arts School

Frontend for **Conte Visual Arts School** — an online platform for visual arts education. Students can browse courses, enroll, view their profile and payment history, and submit works. Instructors manage content through an admin panel.

**Live site:** [conteschool.ir](https://conteschool.ir)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | JavaScript |
| Styling | Tailwind CSS v4 · Flowbite React |
| State / Data | TanStack React Query v5 |
| Forms | React Hook Form · Yup |
| Routing | React Router v7 |
| Maps | Leaflet / React Leaflet |
| HTTP | Axios |

## Pages

**Public**
- **Home** — hero, highlights, featured courses
- **Courses** — course listing with detail view
- **Student Works** — gallery of submitted student artwork
- **News** — blog / announcements with detail view
- **About · Contact · FAQ · Terms of Services**

**Authenticated (Student)**
- Profile · My Courses · My Payments

**Admin**
- Dashboard · Courses · Student Works · News · Users · Reviews · Payments

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/Mahaan10/conteVisualArts.git
cd conteVisualArts
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The dev server proxies API requests to `https://conteschool.ir`.

### Production Build

```bash
npm run build
npm run preview
```

## API

All API calls go through `src/services/httpService.js`. The base URL is set to `https://conteschool.ir/api/v1`.

Authentication uses a JWT token stored in cookies (`token`).

## Project Structure

```
src/
├── pages/          # Route-level page components
├── features/       # Feature modules (student, admin)
│   ├── student/
│   └── admin/
├── services/       # Axios service modules per resource
├── hooks/          # Custom React hooks
├── context/        # React context providers
├── ui/             # Shared layout and UI components
└── utils/          # Utility functions
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE).
