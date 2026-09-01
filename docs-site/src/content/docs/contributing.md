---
title: Contributing & development
description: Build Ggr from source, build its Docker image, and work on these docs.
---

To build Ggr:

1. Install [Go](https://go.dev/doc/install) 1.27 or newer — the module
   declares `go 1.27`, so older toolchains cannot build it.

2. Clone Ggr source:

   ```bash
   git clone https://github.com/WebSummoner/ggr.git
   ```

3. Go to project directory:

   ```bash
   cd ggr
   ```

4. Build source:

   ```bash
   go build
   ```

5. Run Ggr:

   ```bash
   ./ggr --help
   ```

:::tip
To build a [Docker](http://docker.com/) container type:

```bash
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build
docker build -t ggr:latest .
```
:::

## Documentation

These docs are an [Astro Starlight](https://starlight.astro.build/) site under
`docs-site/`. Node is not required on your machine — run it in a container:

```bash
docker run --rm -it -v "$PWD/docs-site":/app -w /app -p 4321:4321 \
    node:24 sh -c 'npm install && npm run dev -- --host'
```

Then open `http://localhost:4321`. To produce the static site exactly as CI
does:

```bash
docker run --rm -v "$PWD/docs-site":/app -w /app node:24 \
    sh -c 'npm ci && npm run build'
```

The build fails on dead internal links, so a green build is a link check.
Pushing to `master` deploys automatically through the `docs` workflow.
