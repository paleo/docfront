# Migrate Skills to Docfront Documentation

Move internal project documentation from agent skills into `docs/` with proper YAML frontmatter, while keeping genuinely reusable skills in place.

## Prerequisites

If this is a git repository, verify the working tree is clean. Do not proceed with uncommitted changes.

## Phase 1 — Detect Skills Directory

Search for existing `skills/` directories in the repository root:

- `.claude/skills/`
- `.codex/skills/`
- `.github/skills/`
- `.cursor/skills/`
- `.gemini/skills/`
- `.agent/skills/`

**Important**: Ignore directories inside dependencies (`node_modules/`, `vendor/`, `venv/`, `.venv/`, `target/`, `build/`, `dist/`, etc.).

**Decision:**

- **If none exists**: Stop and tell the user there are no skills to migrate.
- **If exactly one exists**: Use that directory.
- **If multiple exist**: Ask the user which one to migrate.

Set **SKILLS_DIR** to the chosen directory.

## Phase 2 — Explore

1. List all directories in SKILLS_DIR.
2. For each skill directory, list its contents recursively to discover all files (do **not** read any file yet).
   - References are typically in a `references/` subdirectory or as sibling `.md` files alongside `SKILL.md`.
3. Read only the **frontmatter** of each `SKILL.md` (i.e. the opening lines up to the closing `---`). The `name` and `description` fields are sufficient to classify each skill.

**Do not read the body of `SKILL.md` or any reference files.** The filesystem listing reveals all candidate files; content will be handled one file at a time during migration.

## Phase 3 — Discuss

This is a collaborative discussion, not a rubber-stamp. Present your findings and proposed approach, then work with the user to refine it.

### Classify Skills

For each skill, determine whether it is:

- **Internal documentation**: Project-specific knowledge that belongs in `docs/`.
- **Reusable skill**: Generic methodology or protocol that should stay as a skill.

### Propose `docs/` Layout

Rules for the layout:

- Every file and directory name is **lowercase with dashes**.
- Every `.md` file has YAML frontmatter with `title`, `summary`, and `read_when`.
- `read_when` is a YAML list of short action-oriented hints telling the agent when to read the document.
- Reference files from skills become standalone documents with their own frontmatter.
- Propose subdirectories based on content domains (e.g., `docs/backend/`, `docs/frontend/`).

Present both the classification and the proposed layout together. Ask clarifying questions. Let the user reshape the plan before proceeding.

## Phase 4 — Migrate

**Core principle**: Always **move and rename** files first, then **edit** them in place. Never read a file's full content just to reproduce it in a new file — this wastes context and risks altering markdown syntax.

Process each skill being converted to documentation as follows:

1. **Move and rename** every file to its target path in `docs/` using `mv`.
   - `SKILL.md` and each reference file both become standalone documents with their own frontmatter.
   - Apply the naming rules (lowercase with dashes) in the `mv` command itself.
2. **Edit** each moved file in place to:
   - Add or replace YAML frontmatter (`title`, `summary`, `read_when`).
   - Strip old skill-specific frontmatter.
   - Make any targeted content edits needed for clarity.
3. After **all** files for a skill have been moved and edited, remove the (now empty) original skill directory.

## Phase 5 — Update Project Configuration

### AGENTS.md (or equivalent)

If `AGENTS.md` (or an equivalent top-level agent instructions file) exists, add or replace the documentation discovery section with the following.

_**Note**: Adapt the commands to the project's package manager (see the [installation reference](installation.md) for the full command table)._

> ## Discover and Read Documentation
>
> ALWAYS consider using both the **documentation** and the **skills** before anything else.
>
> **Documentation**: Run `npm run docfront` to browse available project documentation in `docs/`. Then list the subdirectories you need (`npm run docfront -- --dir topic-a --dir topic-b/sub-topic-c`) or list everything (`npm run docfront -- --recursive`).

Remove any references to the deleted skill directories.

### package.json

If a root `package.json` exists and does not already have a `docfront` script, add it:

```json
"docfront": "docfront"
```

### Agent Configuration Files

If any agent configuration file (e.g., `CLAUDE.md`, `.claude/settings.json`, `.cursor/rules/`, `.github/copilot-instructions.md`) references the removed skills, update those references to point to the new `docs/` files instead.

## Phase 6 — Verify

Run `docfront --recursive` and show the output to the user. Confirm all migrated documents appear with correct metadata.
