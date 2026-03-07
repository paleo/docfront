# AI Agent Instructions

Always ignore the `.plans` directory when searching the codebase.

## Ticket ID

_Ticket ID_: Format is numeric. Use the ticket ID if explicitly provided. Otherwise, deduce it from the current branch name (no confirmation needed). If the branch name is unavailable, get it via `git branch --show-current`. Only ask the user as a last resort.

In commit messages, always prefix the ticket ID with a `#` sign, e.g., `#123`.

## Local Dev Environment

| Command | Purpose |
| --- | --- |
| `npm run build` | Compile TypeScript (`src/` → `dist/`) |
| `npm test` | Run the test suite with Vitest |
| `npm run lint` | Run Biome linter for code quality checks |
| `npm run lint:fix` | Run Biome linter and automatically fix issues |
| `npm run check` | Run lint, build, and test checks |
| `node bin/docfront.mjs [options]` | Run the CLI from local source |

## CLI Reference

All examples below use the local invocation (`node bin/docfront.mjs`).

```bash
# List root-level documents
node bin/docfront.mjs

# List subdirectories
node bin/docfront.mjs --dir topic-a --dir topic-b

# Walk the entire tree recursively
node bin/docfront.mjs --recursive

# Walk sub-directories recursively
node bin/docfront.mjs --recursive --dir topic-a --dir topic-b

# Read one or more documents (frontmatter stripped)
node bin/docfront.mjs --read docs/topic-a/doc-1.md --read docs/topic-b/doc-2.md

# Use a custom docs root instead of docs/
node bin/docfront.mjs --rootDir path/to/docs
```

### Options

| Option | Description |
| --- | --- |
| `--dir <subdir>` | List documents in a subdirectory. Repeatable. |
| `--recursive` | Walk the entire tree. Combinable with `--dir`. |
| `--read <file>` | Print document contents (frontmatter stripped). Repeatable. Cannot combine with `--dir` or `--recursive`. |
| `--rootDir <path>` | Use a custom directory as the docs root instead of `docs/`. |

## Documentation

Read our architecture: `docs/architecture.md`.

If you need to work on our skill, then read first the Agent Skills specification here: https://agentskills.io/specification.md
