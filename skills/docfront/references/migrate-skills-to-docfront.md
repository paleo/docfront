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
2. For each skill directory, read `SKILL.md` and note any reference files it mentions.
3. Read all referenced files too.

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

If `docs/README.md` does not already exist, create it with:

```markdown
# Project Documentation

Internal project documentation. Each `.md` file has a YAML frontmatter with:

- **title**: Display name
- **summary**: One-line description
- **read_when**: List of hints for when to read this document

Run `docfront` to browse, or `docfront --recursive` to see everything.
```

For each skill being converted to documentation:

1. Create the target file in `docs/` with YAML frontmatter (`title`, `summary`, `read_when`) and content.
   - Strip old skill frontmatter. Rewrite content if needed for clarity.
   - Reference files become standalone documents in the appropriate subdirectory, each with their own frontmatter.
   - **Important**: Prefer moving files (using `mv`) over reproducing their content, since markdown syntax can be altered during reproduction.
2. After **all** files for a skill are created, remove the original skill directory.

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
