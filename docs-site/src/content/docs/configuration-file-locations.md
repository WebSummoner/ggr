---
title: Configuration file locations
description: Where Ggr looks for the users file and the quota directory, and how to override them.
---

1. Default users file locations are: `.htpasswd` for standalone binary and
   `/etc/grid-router/users.htpasswd` for Docker image.
2. Default quota directory location is `quota` for standalone binary and
   `/etc/grid-router/quota` for Docker image. This is why just attaching
   `/etc/grid-router` to container as read-only volume is enough.
3. To specify custom configuration file locations pass additional arguments to
   Ggr.

With the standalone binary:

```bash
ggr -quotaDir /path/to/quota/directory \
    -users /path/to/.htpasswd
```

With Ggr packed in a Docker container:

```bash
docker run -d --name ggr \
    -v /etc/grid-router/:/etc/grid-router:ro \
    --net host websummoner/ggr:latest-release \
    -quotaDir /path/to/quota/directory \
    -users /path/to/.htpasswd
```
