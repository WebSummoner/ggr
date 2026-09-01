---
title: Proxying session video
description: Download and delete Selenium session videos through Ggr using the test session ID.
sidebar:
  order: 4
---

Ggr gives you an ability to view Selenium session videos captured directly from
browser screen.

1. Video files are expected to be stored on the hub hosts specified in quota
   files and accessible via the following URL:

   ```
   http://hub-host.example.com:4444/video/<real-session-id>.mp4
   ```

   This API for example is supported by
   [WebSummoner](https://websummoner.github.io/websummoner/).

2. To download video file via Ggr just use the same request but with the
   session ID returned to test:

   ```bash
   curl -o video-file.mp4 http://ggr-host.example.com:4444/video/<test-session-id>
   ```

   :::note
   Notice that session ID for hub host (aka `real-session-id`) and for Ggr (aka
   `test-session-id`) differ — the latter is longer because it contains
   information about hub host. Trying to use shorter session ID will not work.
   :::

3. To delete video file via Ggr just change HTTP method to DELETE:

   ```bash
   curl -X DELETE http://ggr-host.example.com:4444/video/<test-session-id>
   ```
