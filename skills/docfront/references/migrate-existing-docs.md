# Migrate Existing Documents to Docfront Conventions

Bring an existing folder of Markdown documents into compliance with docfront conventions: kebab-case naming and YAML frontmatter on every file. The migration happens **in place** by default unless the user specifies a different target directory.

## Prerequisites

If this is a git repository, verify the working tree is clean. Do not proceed with uncommitted changes.

## Phase 1 — Explore

1. Recursively list all files and subdirectories in the target folder.
2. For each `.md` file, check:
   - **Naming**: Is the file name kebab-case and shell-safe? Same for its parent directories.
   - **Frontmatter**: Does the file have a YAML frontmatter block? If so, which fields are present (`title`, `summary`, `read_when`)?
3. Build a summary of what needs to change:
   - Files or directories that need renaming.
   - Files that need frontmatter added or augmented.
   - Files that are already compliant.

**Special files**: Skip `CHANGELOG.md` and `CHANGELOG*.md` files — do not add or modify their frontmatter.

## Phase 2 — Discuss

Present findings to the user:

- Total file count and how many need changes.
- List of proposed renames (old name -> new name).
- List of files needing frontmatter additions or augmentation.
- Any ambiguities or decisions that need user input (e.g., unclear titles, questionable directory structure).

Get explicit approval before proceeding. Let the user adjust the plan.

## Phase 3 — Execute

### Rename files and directories

Apply kebab-case renaming to all non-compliant files and directories. Rename directories before files to avoid broken paths.

### Add or augment frontmatter

For each `.md` file (except `CHANGELOG*.md`):

- **No frontmatter exists**: Add a complete frontmatter block with `title`, `summary`, and `read_when`. Read the file to derive appropriate values.
- **Partial frontmatter exists**: Merge missing fields into the existing frontmatter. Preserve all existing properties — do not remove or overwrite them. Only add `title`, `summary`, or `read_when` if they are absent.
- **Complete frontmatter exists**: Leave it unchanged.

### Scaling strategy

- **Small number of files** (roughly fits in context): The main agent handles everything directly.
- **Large number of files**: Split the work by subdirectory and delegate to subagents (the Task tool) running in parallel. Each subagent handles one subdirectory and its contents. The main agent provides each subagent with:
  - The subdirectory path and its file listing
  - The list of renames and frontmatter changes for that subdirectory
  - The docfront frontmatter conventions

## Phase 4 — Verify

Run `docfront --check` on the migrated directory and show the output to the user. Confirm all files pass validation.
