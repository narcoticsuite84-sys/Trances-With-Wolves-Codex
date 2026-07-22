# Trances with Wolves Codex
## Project Manifest

This repository is the live production version of the Trances with Wolves Codex.

The repository is the canonical implementation.

Do not rely on previous conversations. Every update must be based only on:

1. The current repository.
2. The approved manuscript.
3. The approved artwork.

---

# Development Philosophy

This project is NOT rewritten each release.

Each release is a migration into the existing repository.

Only inject the newly approved content.

Everything else remains untouched.

---

# Canonical Sources

Repository
Defines:

- implementation
- IDs
- JavaScript structure
- relationships
- rendering
- asset references

Manuscript

Defines:

- all approved written content

Artwork

Defines:

- all approved images

---

# Repository Rules

Never rewrite approved manuscript text.

Never redesign the repository.

Never rename IDs unless instructed.

Never reorder existing entries unless instructed.

Never replace artwork unless instructed.

Modify only files required for the update.

Preserve backwards compatibility.

---

# Development Workflow

Every release follows this order.

Step 1

Read the repository.

Understand the current implementation.

Step 2

Read the approved manuscript.

Treat it as the source of all written content.

Step 3

Read the approved artwork.

Associate each image with its correct entity.

Step 4

Perform the migration.

Inject only the new content.

Step 5

Verify:

- JavaScript syntax
- IDs
- image references
- relationships
- duplicate IDs
- parent-child links

Step 6

Package the updated files.

---

# Data Structure

Settlement

- Overview
- Influence
- Artwork
- Locations
- Residents

Location

- Overview
- Influence
- Artwork (supports multiple images)
- Residents

Resident

- Portrait (optional)
- Subtitle
- Quote
- Overview
- Influence (optional)
- Additional Sections (optional)

---

# Asset Rules

Artwork should not be guessed.

Missing artwork is acceptable.

Shared portraits are acceptable.

Multiple images for a location are supported.

Artwork filenames should remain consistent with repository conventions.

---

# Migration Goal

The objective is to update the repository while making the smallest possible set of changes.

If a file does not need to change, leave it untouched.

---

# Verification Checklist

Before delivering an update verify:

✓ JavaScript syntax

✓ Duplicate IDs

✓ Missing assets

✓ Broken references

✓ Parent-child links

✓ Settlement relationships

✓ Location relationships

✓ Resident relationships

✓ New assets referenced correctly

---

# Current Release

Current Version

v1.7

Completed

- Village of Barovia
- Tser Pool
- Vallaki (Arrival)
- Saint Andral's Church
- Coffin Maker's Shop
- Player-facing History chronicle

Next Release

To be confirmed