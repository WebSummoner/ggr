---
title: Proxying session logs
description: Download and delete Selenium session logs through Ggr.
sidebar:
  order: 5
---

Similarly to video files Ggr gives you an ability to view Selenium session logs.

1. To download a log file via Ggr send the following request:

   ```bash
   curl -o log-file.log http://ggr-host.example.com:4444/logs/<ggr-test-session-id>
   ```

2. To delete log file via Ggr just change HTTP method to DELETE:

   ```bash
   curl -X DELETE http://ggr-host.example.com:4444/logs/<ggr-test-session-id>
   ```
