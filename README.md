# fergalgreenclean

React + Vite website for Fergal Green & Clean.

This project provides a React setup with Vite, HMR, and Oxlint.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs/)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled because of its impact on development and build performance. To add it, see the [React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment

The quote email API uses `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` environment variables.

## Oxlint

For production applications, consider TypeScript with type-aware lint rules enabled. See the [Vite React TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).
