---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Skeleton Codes
status: proposed {To be updated}
date: 2024-05-16

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
# date: {YYYY-MM-DD when the decision was last updated}
# deciders: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Skeleton Codes UI Designs

## Context and Problem Statement

There were different ways in order for the code to be able to pop up containers (the widgets). We decided to use the method of the buttons being the same classes, carrying varied data-targets which toggles the display of the containers to flex (the default being none).

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* The previous method of moving the container from a hidden place is prone to problems when the user zooms out a lot.

## Considered Options

* Creating a new container in the javascript function. This might be important when there are issues with resetting or animations, but because this is a lot more complex, it's not used as of now.

## Decision Outcome

Chosen option: "Using the display:none method for the widgets", because it's the most simplistic which doesn't have any issue right now.

