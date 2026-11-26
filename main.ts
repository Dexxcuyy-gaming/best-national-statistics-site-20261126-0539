// DataNusa — a national statistics site for Indonesia, handed in as a make.fun entry.
//
// The site itself is plain static files in app/ (index.html, one stylesheet and four
// JavaScript files, no build step, nothing fetched from the network). This program
// copies app/ and screenshots/ next to this file into the output directory and
// writes dossier.json there with the vendored make.fun library, which is the
// summary the judge reads. vendor/makefun-frontend.ts must stay exactly as the
// kit shipped it: the scorer rebuilds the dossier with its own copy and compares.
//
// Run outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });
mkdirSync(join(outputDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outputDir, "screenshots"), { recursive: true });
}

// Caps from the gate (reference/gate.json): the dossier text is capped at 160 KiB,
// at most 4 screenshots of 256 KiB each, app/ at most 993 files and 16 MiB.
writeFileSync(
  join(outputDir, "dossier.json"),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
