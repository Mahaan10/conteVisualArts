# Contributing

## Setup

```bash
git clone https://github.com/Mahaan10/conteVisualArts.git
cd conteVisualArts
npm install
npm run dev
```

## Workflow

1. Create a branch: `git checkout -b feat/your-feature` or `fix/your-bug`
2. Make changes
3. Run `npm run lint` and `npm run build` — both must pass
4. Open a Pull Request against `master`

## Commit Style

Use conventional commits:

```
feat: add course enrollment flow
fix: correct payment status display
chore: update dependencies
docs: update README
```

## Code Style

- Page components in `src/pages/`
- Feature-specific components in `src/features/<feature>/`
- API calls only through `src/services/`
- Shared UI in `src/ui/`
