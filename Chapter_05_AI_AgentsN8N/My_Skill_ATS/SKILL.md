---
name: resume-tailoring
description: "Use this skill whenever a user wants to tailor, optimise, or ATS-check a resume against a specific job description. Triggers include: a user pasting or attaching a job description (JD) alongside a resume; mentions of 'ATS', 'applicant tracking system', 'Jobalytics', 'keyword match', 'tailor my resume', 'optimise my CV for this role', or 'why am I not getting shortlisted'; or a request to score/review a resume against a posting. Produces an ATS-style review and a rebuilt, keyword-aligned resume in two Word files (clean + highlighted). Do NOT use for generic resume writing with no target JD, or for cover-letter-only requests (offer the cover letter as a follow-up instead)."
license: Proprietary.
---

# Resume Tailoring

## Overview

This skill tailors a candidate's resume to a specific job description (JD):
it extracts the JD's keywords, runs an ATS-style review of the current
resume, confirms with the candidate which missing keywords they genuinely
possess, weaves only those in truthfully, and rebuilds the resume in a
clean, ATS-parseable Word layout — delivered as a clean copy plus a
highlighted copy showing every change.

## Inputs to collect

1. **Job description** — the full text (responsibilities, must-have skills, tools).
2. **Current resume** — a `.docx` or `.pdf` attachment.
3. **Candidate name / target role** — usually inferable from the resume and JD.

If the resume is attached but its content is not in context, read it first
(`extract-text` for `.docx`; the `pdf-reading` skill for `.pdf`). If the JD
or resume is missing, ask for it before proceeding.

## Core principle — honesty is non-negotiable

Never fabricate experience, skills, or tools the candidate has not confirmed.
Fabricated keywords pass the ATS but fail the interview and damage
credibility. When a keyword's applicability is uncertain, **ask the candidate
before adding it.** Genuine gaps are flagged honestly, with a transferable-skills
cover letter offered as the alternative — never papered over.

## Workflow

### Step 1 — Extract JD keywords
Pull every essential skill, responsibility, tool, and repeated keyword from the
JD. Separate hard **must-have** requirements from **nice-to-have** items and
soft **culture** language (the latter is handled lightly, not as a skill claim).

### Step 2 — ATS-style review of the current resume
Cross-reference the JD keywords against the resume and produce a review in this
exact format, each scored out of 10, using ✅ for strengths and 🙈 for gaps:

1. **Overall Result:** [score/10]
2. **Effectivity:** [score/10] — how well it presents the candidate's skills.
3. **Layout and Design:** [score/10] — visual appeal, organisation, ATS-parseability.
4. **Content Relevance:** [score/10] — relevance/adequacy vs the JD.
5. **Grammar and Syntax:** [score/10] — language quality and readability.
6. **Impact:** [score/10] — how well it stands out.

Include a keyword-match table (present / partial / missing) and an approximate
overall match percentage. Flag ATS-breaking layout issues — especially **nested
tables and multi-column cells**, which parsers read out of order or drop.

### Step 3 — Map keywords to real experience
For each missing keyword, identify the place in the candidate's genuine
experience (summary, skills, a specific bullet) where it could honestly belong.

### Step 4 — Ask the candidate what they know
Before adding any uncertain keyword, ask which ones the candidate genuinely has
experience with and which they do not. Use a quick multiple-choice question with
concrete examples per keyword (e.g., "Risk Analysis — risk-based test
prioritisation, impact assessment?"). Only confirmed items are added.

### Step 5 — Weave keywords in naturally
Insert confirmed keywords into the summary, skills, and experience bullets so
they read as real accomplishments — never keyword-stuffed. Simultaneously: fix
grammar, remove duplication, align the title and summary to the JD's language,
and add `[X]` placeholders where real metrics (coverage %, defects, cycle-time)
belong. Leave a clearly-bracketed note for any genuine gap the candidate must
fill or delete.

### Step 6 — Rebuild in a clean, ATS-safe layout
Produce a single-column, parser-friendly design with clear section headers and
consistent formatting. Use the `docx` skill to generate the file (read its
SKILL.md first). Validate and visually check the rendered output.

### Step 7 — Deliver two files + summary
Output a **clean** resume (to submit) and a **highlighted** resume (same content,
JD-tailored runs marked in yellow via `highlight: "yellow"` on the relevant
`TextRun`s). Then give a short written summary of what changed and where each
keyword landed, and offer a transferable-skills cover letter for any uncovered
requirement.

## Building the documents (docx)

Generate with `docx-js` (see the `docx` skill for full setup, page-size, and
table rules). Key points specific to resumes:

- **Single column only.** No nested tables for layout — they break ATS parsing.
  Use flush-right tab stops for dates, not table cells.
- **Highlighted copy:** drive highlighting with an env flag so both copies come
  from one script, e.g. `const hl = process.env.HL === "1" ? "yellow" : undefined;`
  then pass `highlight: hl` on tailored runs. Generate clean (`HL=0`) and
  highlighted (`HL=1`) from the same source.
- **Validate** every file with the docx skill's `validate.py`, then convert to
  PDF/JPEG and visually inspect before presenting.
- Place final files in `/mnt/user-data/outputs/` and present both, clean copy first.

## Candidate's pre-submit checklist (include in the summary)

- Replace every `[X]` placeholder with a real number.
- Confirm every highlighted keyword reflects true experience.
- Fill or delete any bracketed `[add ...]` notes in the summary.
- Add graduation year and contact details.
- Re-run the ATS / Jobalytics scan and confirm the match score improved.

## Reusable prompt (give to the user on request)

> Act as an analytical ATS and resume expert. Using the attached job description
> and my current resume: (1) extract the essential skills, requirements, and most
> frequent keywords from the JD; (2) cross-reference them against my resume and
> run an ATS-style review (Overall, Effectivity, Layout & Design, Content
> Relevance, Grammar & Syntax, Impact — each /10, with ✅ and 🙈); (3) show me
> which keywords are missing and ask which I genuinely have before adding
> anything; (4) weave only the confirmed keywords into my real experience —
> coherent, professional, never fabricated; (5) give me a clean Word resume to
> submit and a second copy with all changes highlighted.

## Edge cases

- **Domain/tool gap that can't be filled honestly** (e.g., a hardware/firmware
  role for a software-QA candidate): say so plainly, maximise transferable
  content, and offer a cover letter — do not invent the missing experience.
- **Wrong file referenced** (prompt names a resume that isn't attached): use the
  resume actually provided and note the discrepancy.
- **Resume already strong on a keyword:** don't duplicate it; reinforce once.
