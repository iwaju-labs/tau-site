---
title: "Record Your Screen and Camera at the Same Time"
description: "Tau now supports multi-source recording — capture your screen and camera simultaneously in a single timelapse. Here's how to use it and why it changes how you share your work."
pubDate: "2026-05-21"
author: "dom (@_dngi)"
tags: ["screen recording", "camera", "multi-source", "timelapse", "tutorial"]
category: mofu
---

Most recording tools make you choose: screen or camera. You either show what's on your display or you show your face. Rarely both, and almost never in a timelapse.

Tau now supports multi-source recording — you can capture your screen and camera simultaneously, and they'll both appear in your final timelapse export.

## What multi-source recording looks like

The most common use case is what you'd recognise from YouTube devlog-style videos: a full-screen view of your work with a small camera feed inset in the corner. In a timelapse, this becomes incredibly effective — you see the code, design, or art evolving on screen, and your reactions (or just your presence) in the corner ground it in the real world.

It makes the content feel more human without requiring a full video production setup.

## How to set it up in Tau

**1. Open Tau and start a new recording.**

**2. Enable multi-source mode.** In the recording setup screen, you'll see an option to add a secondary source alongside your primary one. Select your camera as the secondary input.

**3. Position the camera overlay.** Choose where the camera feed sits — corner position and size can be adjusted before you start. Most people go with bottom-right, small.

**4. Set your frame interval and hit Record.** Both sources are captured simultaneously from the same starting point. No syncing required later.

**5. Edit and export as normal.** The camera overlay is composited into the final video automatically. What you preview is what you get.

## Why this is better than doing it in post

The usual approach is to record your screen and camera separately, then combine them in a video editor. That works, but it adds a lot of friction:

- You have to manually sync the two recordings
- Any timelapse speed-up has to be applied consistently to both
- You need a video editor just to add an inset — which defeats the point of a tool like Tau

With multi-source recording, both feeds are captured and composited together in Tau. No external editor, no syncing, no extra steps.

## Who this is for

**Developers sharing their process.** A coding timelapse with a camera feed shows both the work and the person doing it. It's more compelling than a screen recording alone, and it differentiates your content from everyone else sharing static commits or screenshots.

**Designers and artists.** Showing the evolution of a design alongside your face reading and reacting to it adds a layer that pure screen recording can't.

**Tutorial creators.** Even if your end goal isn't a timelapse, multi-source capture gives you a way to record a complete session — everything on screen plus your presence — and export a polished, time-compressed version without touching a video editor.

## Tips

**Keep the camera feed small.** The work is the main event. A large camera overlay competes with it. A small inset in the corner adds presence without distraction.

**Frame yourself well.** Since the camera feed is time-compressed, movement looks amplified. A stable, well-lit camera position looks much better at timelapse speed than a shaky or poorly lit one.

**Use an external camera for better quality.** On macOS, you can use your iPhone as a camera source via Continuity Camera. The quality difference compared to a built-in webcam is significant.

---

Multi-source recording is available now in Tau for macOS and Windows. If you haven't tried it yet, [download Tau at trytau.app](https://trytau.app).
