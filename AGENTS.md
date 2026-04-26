<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Testing

- Tests use `node:test` + `node:assert/strict`, run via `npm test`
- Test imports MUST use explicit `.ts`/`.tsx` extensions (e.g., `import("../../components/Pill.tsx")`, not `import("../../components/Pill")`)
- Use `../../data/index.ts` instead of `../../data` for barrel re-exports
- tsx is a dev dependency for TypeScript test execution
