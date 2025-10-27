+++
title = "Gitlab Newcomer Bot"
description = "Gitlab bot to greet first time contributor"
date = 2025-10-27T15:26:14-07:00
types = ["tech"]  # Options: "projects", "tech", "events"
tags = ["gitlab", "webhook", "python", "community", "gnome"]
+++

## Project Overview

This is a greeter bot that we're testing in GNOME to welcome first time contributors and put them into a nurture path. The idea is that contributors who putting their first issue or even their merge/pull request will be required to acknowledge the GNOME Code of Conduct and then provide some helpful links. For MRs, we will also need to set expectation that while their code contribution is valuable that there maybe reasons that they will be rejcted. This will help reduce churn. There are still challenges of course, but having this service will really help provide a more welcoming experience. The project will be tested on the GNOME engagement team before we start convincing other project maintainers to incorporate the bot in their issue/code contributions.

### Tech stack

- Python
- Gitlab CI/CD
- web sockets

### Impact

- Provide a better contributor experience while also making sure that contributors understand that this is a safe space.
- A better focus on new contributors and be able to derive metrics to know how many new contributors were added and also track how well we retain them.
