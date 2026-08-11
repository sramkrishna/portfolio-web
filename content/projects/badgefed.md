+++
title = "BadgeFed — Federated Badging"
description = "Building BadgeFed, a federated open source badging system using ActivityPub to recognize and verify community contributions"
date = 2026-08-03
types = ["tech"]
tags = ["ActivityPub", "Federation", "Badging", "Community Recognition", "Open Source"]

[[links]]
name = "BadgeFed"
url = "https://badges.ramkrishna.me/"
external = true
+++

## Overview

Building **BadgeFed**, a federated badging platform that recognizes open source contributions through verifiable, decentralized badges. Using ActivityPub federation, badges are issued to contributors' social identities (Mastodon, Akkoma, and other fediverse accounts) rather than locked into a single platform.

### Why Federated Badging

Traditional contribution recognition is fragmented — every project, event, and platform runs its own recognition scheme. BadgeFed reimagines this through the fediverse: a badge is a first-class ActivityPub object that follows the recipient, lives in their identity, and is verifiable by anyone.

### Key Features

- **ActivityPub federation** — badges delivered to recipients' fediverse inboxes as native ActivityPub objects
- **Verifiable grants** — each badge has a unique accept key and fingerprint for tamper-proof verification
- **Cross-instance recognition** — badge notifications work across Mastodon, Akkoma, and other ActivityPub servers
- **Self-hosted** — independent deployment (badges.ramkrishna.me), no platform lock-in

### My Role

Architecture, implementation, and operations: designing the federation layer, deploying and maintaining the service, and iterating on the notification flow across Mastodon and Akkoma instances.

### Impact

- Demonstrating a working model for decentralized, cross-platform contribution recognition
- Building infrastructure that lets communities recognize contributors in a verifiable, federated way
