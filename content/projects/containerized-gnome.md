+++
title = "Containerized GNOME"
description = "Build a completely containerized GNOME using GNOME OS"
date = 2025-10-16
types = ["tech"]
tags = ["Containers", "k8s", "Developer Tools", "Linux", "GNOME OS", "GNOME"]

[[links]]
name = "Learn More"
url = "https://gitlab.gnome.org/World/ShellExtensions/extensions-rebooted/-/tree/master/containers?ref_type=heads"
external = true
+++

## Project Overview

This project is currently not active as GNOME OS still needs some work
that will make this more interesting. But this is a technology preview
to see if we can run GNOME in a container under kubernetes and be able
to support wide scaling.

### Features

- Run GNOME OS in a container and deploy to thousands of instances.
- Run applicatons in a GNOME OS containers as a 'meta app container'.
- Q&A extensions in a robust manner using openQA.
- Be able to test all extensions based on a tag in GNOME Shell.

### Technology Stack

- Podman + systemd support 
- [GNOME OS](https://os.gnome.org)
    - systemd-sysupdate
    - systemd-homed
- [Buildstream](https://buildstream.build/index.html)

