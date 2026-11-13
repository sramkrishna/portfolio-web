+++
title = "Privacy Policy"
description = "How the personal calendar automation handles Google user data."
date = 2026-11-13
+++


# Privacy Policy

**Last updated: 13 November 2026**

This policy covers a **personal automation application** operated by Sriram
Ramkrishna as an individual, for his own private use. It is not a product or a
service offered to the public, and it has exactly one user: its operator.

## What Google data is accessed

When the operator authorises the application through Google's OAuth consent
screen, it requests the following scopes and nothing else:

| Scope | Why it is needed |
|---|---|
| `calendar` | Read the operator's own calendars to produce personal daily briefings, meeting reminders and focus-time suggestions. |
| `documents` | Read and edit documents the operator already owns, when he asks for it directly. |
| `spreadsheets` | Read and edit spreadsheets the operator already owns, when he asks for it directly. |
| `contacts.readonly` | Look up the names of people the operator is already meeting with. |

The application does **not** request Gmail access, and it cannot read, send or
modify email.

## How the data is used

Data is used solely to generate information for the operator himself:
calendar summaries, reminders before meetings, and answers to questions he asks
about his own schedule and documents. Data is never used to build profiles,
target advertising, or train machine-learning models.

## Where the data is stored

OAuth credentials are stored in a single file on the operator's own personal
computer. Calendar and document content is held only in memory while a task
runs, and in short-lived local logs. No Google user data is copied into any
third-party system, database or cloud service.

## Sharing

None. The application does not transmit Google user data to any third party. It
does not sell, rent, trade or disclose that data to anyone for any purpose.

## Limited Use disclosure

The use of information received from Google APIs adheres to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the **Limited Use** requirements.

Specifically:

- Data is used only to provide the features described above.
- Data is not transferred to third parties except as necessary to provide those
  features, as required by law, or as part of a merger or acquisition.
- Data is not used for advertising, and is not sold.
- No humans read the data, other than the operator reading his own data.

## Retention and deletion

Access can be revoked at any time at
[myaccount.google.com/permissions](https://myaccount.google.com/permissions),
which immediately invalidates the stored credentials. The local credential file
can be deleted at any time. No copy of the data persists after revocation beyond
ordinary operating-system backups of the operator's own machine.

## Security

Credentials are stored with file permissions restricted to the operator's own
account, on a machine on a private home network. There is no server, no public
endpoint, and no remote access to the stored credentials.

## Children

This application is not directed at children and has no users other than its
operator.

## Changes

Any change to this policy will be published on this page with an updated date.

## Contact

Questions about this policy: **sriram.ramkrishna@gmail.com**
