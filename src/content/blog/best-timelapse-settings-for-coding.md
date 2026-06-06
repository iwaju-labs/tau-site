---
title: "The Best Timelapse Settings for a Coding Session"
description: "What frame interval, FPS, and resolution to use when recording a coding timelapse — based on how long your session is and where you're sharing it."
pubDate: "2026-06-06"
author: "dom (@_dngi)"
tags: ["timelapse", "coding timelapse", "settings", "tutorial", "screen recording"]
category: mofu
---

Recording a coding timelapse is simple in principle — capture frames at intervals, play them back fast. But get the settings wrong and you end up with either a 5-minute video nobody will watch, or a 15-second blur where you can't tell what you were building.

Here's how to get it right.

## The core settings and what they do

**Frame interval** — how often Tau captures a frame. A 5-second interval means one frame every 5 seconds. A 1-hour session at 5s intervals gives you 720 frames.

**Output FPS** — how many of those frames play per second in the final video. 30fps is standard. 24fps feels slightly more cinematic. 60fps is smoother but rarely needed for coding timelapses.

**Resolution** — matches your recording source. 1080p is the sweet spot for readability and file size.

These three numbers together determine how long your timelapse ends up and whether your code is legible.

## Recommended settings by session length

### Short session (30–60 minutes)

- **Interval**: 2–3 seconds
- **Output FPS**: 30
- **Target length**: 30–45 seconds

A 45-minute session at 2s intervals gives 1,350 frames. At 30fps that's 45 seconds — a good length for Twitter/X or Instagram.

### Standard session (1–3 hours)

- **Interval**: 5 seconds
- **Output FPS**: 30
- **Target length**: 60–90 seconds

A 2-hour session at 5s intervals gives 1,440 frames. At 30fps that's 48 seconds. Bump to 3s intervals if you want something closer to 90 seconds.

### Long session (4–8 hours)

- **Interval**: 10–15 seconds
- **Output FPS**: 30
- **Target length**: 60–120 seconds

An 8-hour session at 10s intervals gives 2,880 frames. At 30fps that's 96 seconds — a solid two-minute timelapse of a full work day.

## Resolution: 1080p is usually right

For coding timelapses specifically, readability matters. If someone watching your timelapse can vaguely make out what language you're writing in and roughly what you're building, that's ideal.

At 720p, text gets blurry. At 1080p it's sharp enough to be legible in passing. 4K is overkill for this use case — it produces larger files and most platforms will compress it down anyway.

## Where you're sharing it matters

**Twitter / X**: Keep it under 2 minutes 20 seconds. MP4 works. GIF is an option for short clips (under 15 seconds) — it autoplays without a video player.

**YouTube**: Longer is fine. 60–120 seconds is a good target. Export to MP4.

**Instagram Reels / TikTok**: Aim for 30–60 seconds in vertical format if possible (or square). If you're recording a standard widescreen display, consider cropping or adding padding.

**Portfolio / website**: WEBM for web embedding — smaller file size, fast loading.

## Adding a timer overlay

A stopwatch overlay showing elapsed real time makes coding timelapses significantly more interesting. Watching a progress bar tick to 4 hours while the code evolves gives the viewer a sense of scale that a plain timelapse doesn't.

In Tau: open the Overlays panel, select Stopwatch, position it in a corner, and it'll be burned into the export automatically.

## A practical example

Here's a specific setup that works well for a 3-hour coding session destined for Twitter:

- Session length: 3 hours (180 minutes)
- Interval: 8 seconds
- Output FPS: 30
- Frames captured: ~1,350
- Final length: ~45 seconds
- Format: MP4

That's a clean 45-second timelapse — short enough to hold attention, long enough to show meaningful progress.

Use the [Tau frame interval calculator](/tools/frame-interval-calculator) to dial in the exact interval for your session length and target video duration.

## The things that make coding timelapses worth watching

Settings aside, a few things separate forgettable timelapses from ones people share:

- **Code that visibly changes**: A session where you're refactoring in one file is less visually interesting than one where you're building something new. If you can, pick sessions where the screen changes a lot.
- **A timer overlay**: It grounds the video in real time. Seeing "4h 23m" in the corner adds stakes.
- **Good music**: A clean instrumental track transforms a timelapse. Attach it in Tau's editor before exporting.
- **Trim the boring bits**: If you spent 20 minutes on a call or reading docs, the start/end trim in Tau lets you cut that out.

[Download Tau at trytau.app](https://trytau.app) — available for macOS and Windows.
