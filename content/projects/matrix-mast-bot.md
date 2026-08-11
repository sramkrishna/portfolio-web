+++
title = "Matrix-Mast-Bot (BoostBot)"
description = "A Matrix bot that boosts Mastodon posts with an emoji-based approval workflow, built for the GNOME community"
date = 2026-04-02
types = ["tech"]
tags = ["Matrix", "Mastodon", "Bots", "Fediverse", "Community", "Python"]

[[links]]
name = "Source"
url = "https://gitlab.gnome.org/sri/matrix-mast-bot"
external = true
+++

## Overview

A Matrix bot that boosts Mastodon posts based on the Mastodon credentials it's given — built to help the GNOME community amplify noteworthy posts directly from their Matrix rooms.

### How It Works

- **Request** — users trigger a boost with `!boost <mastodon-url>` in a Matrix room
- **Preview** — the bot locates the post and shows a preview in the room
- **Approval** — authorized users approve or reject via thumbs up/down emoji reactions
- **Boost** — after a 5-minute window, the post is boosted by the target account
- **Log** — a summary post records who asked, who approved, and when it was boosted

### Features

- Emoji-based approval workflow (thumbs up/down)
- 5-minute abort window with a 1-minute reminder
- Authorized-user-only approvals
- Cleanup of reminder posts after completion
- Full audit log of boost decisions

### Tech

Matrix bot joining the homeserver (gnome.org), no exposed ports — purely room-based interaction. Designed to run on GNOME infrastructure.

### Impact

**In daily use by the GNOME Engagement Team — multiple boosts per day.** The bot is a working part of how the GNOME community amplifies its members' posts across the fediverse.
