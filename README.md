# Vite+ Monorepo Starter

A starter for creating a Vite+ monorepo.

## Development

- Check everything is ready:

```bash
vp run ready
```

- Build the monorepo:

```bash
vp run -r build
```

- Run both development servers (website + API):

```bash
vp run dev
```

- Run only the website:

```bash
vp run dev:website
```

- Run only the API:

```bash
vp run dev:api
```

The website uses Vite's default port (`5173`); the API uses `3000` (configurable in `apps/api/.env`).
