---
title: "How to Make a Coding Timelapse"
description: "Turn your coding sessions into short, shareable timelapses. Here's how developers are using screen timelapse recording to document and share their work."
pubDate: "2026-05-21"
author: "dom (@_dngi)"
tags: ["coding timelapse", "screen recording", "timelapse", "developers", "devlog"]
category: tofu
---

Coding timelapses have become one of the most effective ways to share your work online. A 6-hour build session becomes a 45-second clip. People watch it, share it, and remember you made the thing.

But most developers either don't bother (too much hassle) or end up with something that looks amateurish — janky frame rates, no trimming, no polish.

This is how to do it properly.

## Why coding timelapses work

The reason they spread is simple: building software is invisible work. Commits, PRs, and screenshots don't convey effort. A timelapse does. It shows the problem-solving, the dead ends, the refactors. It's documentation that's actually interesting to watch.

They're also very low effort relative to other content. You don't need a script, a mic, or a camera. You just record your screen while you code.

## What you need

- [Tau](https://trytau.app) — handles screen timelapse recording, editing, and export
- A coding session worth capturing (anything from a small bug fix to a full build)

## The setup (takes 2 minutes)

**1. Open Tau and start a new recording.** Select your screen as the source.

**2. Set your frame interval.** For coding sessions, somewhere between 1 frame every 3–8 seconds works well. Shorter intervals preserve more detail; longer intervals are better for all-day sessions.

**3. Make your editor full-screen.** Distractions in the background look bad at timelapse speed. Use a clean, focused layout — your editor, nothing else. Dark themes tend to look better in the final video.

**4. Hit Record.** Tau runs in the background. Your machine won't notice it.

**5. Code.** Don't think about the recording. That's the whole point.

## Editing for maximum impact

Once you stop recording, Tau drops you into the editor automatically.

**Trim ruthlessly.** The best coding timelapses are short. Cut the parts where you were reading docs, stuck on a bug, or away from the keyboard. Keep the parts where things are actually happening — you can tell by how much the code is changing.

**Add a stopwatch overlay.** A live elapsed-time overlay gives viewers context. Seeing "1h 47m" in the corner of a clip that runs for 40 seconds makes the compression feel dramatic rather than cheap.

**Add background music.** A subtle lo-fi track makes the timelapse feel intentional rather than like raw footage. Tau lets you attach an audio file and set the start point.

**Export as MP4.** For Twitter, YouTube, and LinkedIn, MP4 is the right format. For embedding in a README or portfolio site, WEBM is smaller and loads faster.

## What makes a good coding timelapse

The best ones have something in common: they show a clear arc. Something starts, something happens, something finishes.

- Build a feature from scratch
- Fix a nasty bug and show how the test suite responds
- Refactor a messy file into something clean
- Set up a project from zero

Avoid recording "a normal work day" — too long, too unfocused, nothing to root for.

## Sharing it

Twitter/X and LinkedIn are the highest-signal platforms for dev content. YouTube Shorts and TikTok work well if the clip is under 60 seconds.

A good caption matters more than you'd think. "Spent 3 hours refactoring the auth module" with a timelapse clip gets way more engagement than the clip alone. Give people context.

---

Tau handles the recording, editing, and export so the friction is low enough that you'll actually do it. If you're not already making coding timelapses, [download Tau at trytau.app](https://trytau.app) and try it on your next session.
