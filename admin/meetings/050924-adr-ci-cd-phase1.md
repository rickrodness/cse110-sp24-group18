# ADR and CI/CD Phase 1 Meeting
**Date:** May 09, 2024

**Time:** 6:20pm-7:30pm

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
Lead Designer: TBD (Min Kim)

### ADR (Decision Records)
- Formally writing down our plans and other decisions
  - Database no longer with SQL.
  - UI depends on lead designer.
  - Features: Phase 1-2 of the original plan
  - Our visions / product name: Unchanged
- Filling out the templates (Action Items)

### CI/CD Pipeline
- List of tasks to do (not everything required, but recommended to do all):
  - Linting and code style enforcement (Template used)
  - Code quality via tool  (Codacy used)
  - Code quality via human review (Pull Requests used)
  - Unit tests via automation (Jest used)
  - Documentation generation via automation (JSDocs used)
  - Other testing including e2e (end to end) and pixel testing is also possible so you may decide to use an environment that does numerous things. (Undetermined, waiting for TA's answer)
- Take pictures of the diagram of the pipeline (Action Items)
- Descriptions of the pipelines on the repo (Action Items)
- A no more than 2 min video demonstration of the pipeline (Action Items)

### Future Assignments
- Addressing the TA's other insights / concerns (All addressed)

## Action Items
Soft deadline: end of Friday
- CI/CD Diagram: Ryan
- Pipeline status report md: TBD after diagram
- Testing / demoing the pipelines (video): Michael
- Filling out ADR's: Ishika
