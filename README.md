# Prodigy GCSE Biology

AQA 8461. 66 revision lessons, all ten required practicals, and four 100-mark / 105-minute practice papers.

Live site: https://biologygcse.prodigyai.uk/

## Edit and check

- Edit `course.json` for native lesson content and `papers.json` for original papers.
- Run `node scripts/build.cjs` to update deployable `course-data.js`.
- Run `node --test tests/course.test.cjs` before committing.
- Use `python -m http.server 8766` in this repository for a local preview.
- GitHub Pages serves the repository root from `main`; no package installation is needed.

`index.html` contains the existing corrected Prodigy lesson, marking, progress-report and optional account engine. `learning.js` adds data-driven Biology lessons, interactive models, papers, timers and tier selection. `topic-search.js` provides course-wide search and a last-lesson resume button. `print.html` provides question papers and mark schemes through the browser print / Save as PDF dialog.

Answers save on input. Final numerical checks do not automatically award all method marks. Practice scores have no official grade boundaries. All papers are original, unofficial Prodigy resources, not endorsed by AQA or OCR. Online practical revision does not award the OCR Practical Endorsement.

Progress keys are isolated by course, including on GitHub Pages project URLs. The existing Supabase project/config is reused for accounts. Authenticated teacher/class creation requires the existing database to accept the new site IDs (`gcse-biology`, `alevel-biology`, `gcse-combined`); no database schema was changed by this repository. Guest revision and device-local progress work independently of that backend.

Curriculum sources are listed in `course.json` and on the site. `provenance.json` records the reused framework and content sources.
