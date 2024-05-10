# ADR and CI/CD Phase 1 Meeting
**Date:** May 09, 2024 and May 10, 2024

**Time:** 6:20pm-7:30pm; 1-3pm

**Location:** Remote

## Attendance
- Bernico Jansen Chandra
- Ishika Agrawal
- Minsang Kim
- Michael Cheung
- Sam Hormozian
- Aritra Dutta
- Ryan Seidl
- Taiki Yoshino
- Rick Rodness
- Elijah Hosaka
- Sarena Pham

## Agenda
+ ADR (Decision Records)
+ CI/CD Pipeline

## Meeting Minutes
### Determining UI / Designer
Who should be the lead designer to make our UI look good?

### ADR (Decision Records)
- Formally writing down our plans and other decisions
  - Database used with SQL or not?
  - UI still minimalism? (TA suggests to focus on UI, maybe be creative on this part?)
  - Features? (The TA suggests going minimalistic on features)
  - Our visions / product name?
- Filling out the templates

### CI/CD Pipeline
- List of tasks to do (not everything required, but recommended to do all):
  - Linting and code style enforcement (may happen in pipeline and/or in editor)
  - Code quality via tool  (ex. Codeclimate, Codacy, etc.)
  - Code quality via human review (ex. Pull Requests)
  - Unit tests via automation (ex. Jest, Tape, Ava, Cypress, Mocha/Chai, etc.)
  - Documentation generation via automation (ex. JSDocs)
  - Other testing including e2e (end to end) and pixel testing is also possible so you may decide to use an environment that does numerous things.
- Take pictures of the diagram of the pipeline (?)
- Descriptions of the pipelines on the repo (template done)
- A no more than 2 min video demonstration of the pipeline

### Future Assignments
- Addressing the TA's other insights / concerns

## Action Items
Soft deadline: end of Friday
- CI/CD Diagram: Ryan
- Pipeline status report md: TBD after diagram
- Testing / demoing the pipelines (video): Michael
- Filling out ADR's: Ishika
