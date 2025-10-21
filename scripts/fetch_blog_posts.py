#!/usr/bin/env python3
"""
Fetch blog posts from RSS feeds and create Hugo content files.
"""

import feedparser
import os
import sys
from datetime import datetime
from pathlib import Path
import hashlib

# RSS Feeds configuration
FEEDS = [
    {
        "url": "https://blogs.gnome.org/sri/feed/",
        "name": "GNOME Blog",
        "max_posts": 5
    },
    {
        "url": "https://dev.to/feed/sramkrishna",
        "name": "Dev.to",
        "max_posts": 5
    }
]

# Output directory for blog posts
CONTENT_DIR = Path(__file__).parent.parent / "content" / "blog-posts"


def slugify(text):
    """Create a URL-safe slug from text."""
    return text.lower().replace(" ", "-").replace("/", "-")[:50]


def create_hugo_content(entry, feed_name):
    """Create a Hugo markdown file from an RSS entry."""

    # Extract data from feed entry
    title = entry.get("title", "Untitled")
    link = entry.get("link", "")

    # Parse date
    if hasattr(entry, "published_parsed") and entry.published_parsed:
        pub_date = datetime(*entry.published_parsed[:6])
    else:
        pub_date = datetime.now()

    # Get description/summary
    description = entry.get("summary", entry.get("description", ""))

    # Create unique filename using hash of URL
    url_hash = hashlib.md5(link.encode()).hexdigest()[:8]
    slug = slugify(title)
    filename = f"{pub_date.strftime('%Y-%m-%d')}-{slug}-{url_hash}.md"

    # Hugo front matter
    front_matter = f"""---
title: "{title}"
date: {pub_date.strftime('%Y-%m-%dT%H:%M:%S%z')}
source: "{feed_name}"
external_url: "{link}"
draft: false
---

{description}

[Read full post on {feed_name}]({link})
"""

    return filename, front_matter


def fetch_and_save_posts():
    """Fetch RSS feeds and save as Hugo content."""

    # Create content directory if it doesn't exist
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    # Clear existing blog posts
    for existing_file in CONTENT_DIR.glob("*.md"):
        existing_file.unlink()

    all_posts = []

    # Fetch from each feed
    for feed_config in FEEDS:
        print(f"Fetching {feed_config['name']}...")

        try:
            feed = feedparser.parse(feed_config["url"])

            if feed.bozo:
                print(f"Warning: Feed parsing issue for {feed_config['name']}")

            # Get latest posts
            max_posts = feed_config.get("max_posts", 5)
            entries = feed.entries[:max_posts]

            for entry in entries:
                filename, content = create_hugo_content(entry, feed_config["name"])
                all_posts.append((filename, content))
                print(f"  - {entry.get('title', 'Untitled')}")

        except Exception as e:
            print(f"Error fetching {feed_config['name']}: {e}")
            continue

    # Save all posts
    for filename, content in all_posts:
        filepath = CONTENT_DIR / filename
        filepath.write_text(content, encoding="utf-8")

    print(f"\nSaved {len(all_posts)} blog posts to {CONTENT_DIR}")


if __name__ == "__main__":
    fetch_and_save_posts()
