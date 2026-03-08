# Docfront

A lightweight documentation system for AI agents and humans. Keep project docs in a `docs/` folder with YAML frontmatter, browse and read them from the terminal.

Docfront is both an **npm package** (the CLI that lists, reads, and validates docs) and an **agent skill** (conventions and workflows that teach AI agents how to write, organize, and migrate documentation). You need both: the package provides the tooling, the skill provides the knowledge.

_Inspired by the [OpenClaw](https://github.com/openclaw/openclaw/) docs system, which uses [Mintlify](https://www.mintlify.com/). This project doesn't depend on Mintlify._

## Installation

Start by installing the skill:

```bash
npx skills add paleo/docfront --skill docfront
```

> **Note:** We recommend installing the docfront skill locally in each project. The skill will also install the npm package as a dev dependency for faster execution.

Then, ask your agent to do its magic:

```text
Use your docfront skill. Install docfront CLI in this project.
```

## How It Works

1. Uses a `docs/` directory at your project root.
2. All files and directories are preferably named in **kebab-case**.
3. Every `.md` file starts with YAML frontmatter:

```markdown
---
title: Your Title Here
summary: A one-sentence description of what this document covers.
read_when:
  - first situation when this document is useful
  - second situation
---

# Your Title Here

...
```

| Field | Required | Description |
| --- | --- | --- |
| `title` | Yes | Display name shown in listings. |
| `summary` | Recommended | One-sentence description. |
| `read_when` | Recommended | When to consult this document. |

## CLI

```bash
# List root-level documents
npx docfront

# List a subdirectory
npx docfront --dir topic-a

# List multiple subdirectories
npx docfront --dir topic-a --dir topic-b

# List everything recursively
npx docfront --recursive

# Read one or more documents (frontmatter stripped)
npx docfront --read docs/topic-a/doc-1.md
npx docfront --read docs/topic-a/doc-1.md --read docs/topic-b/doc-2.md

# Validate all files (names, frontmatter)
npx docfront --check

# Use a custom docs root instead of docs/
npx docfront --root path/to/docs
```

### Options

| Option | Description |
| --- | --- |
| `--dir <subdir>` | List documents in a subdirectory. Repeatable. |
| `--recursive` | Walk the entire tree. Combinable with `--dir`. |
| `--read <file>` | Print document contents (frontmatter stripped). Repeatable. |
| `--check` | Validate all files and directories. Reports name and frontmatter issues. |
| `--root <path>` | Use a custom directory as the docs root instead of `docs/`. |

## Contribute / Set up a local development environment

```sh
cp .vscode/settings.example.json .vscode/settings.json
mkdir .plans

npm i
npm run build
npm test
```

## License

MIT
