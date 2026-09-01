#!/usr/bin/env bash

set -e

# Docker rejects upper-case repository names; the org has capitals.
IMAGE=$(echo "$GITHUB_REPOSITORY" | tr '[:upper:]' '[:lower:]')

docker build --pull -t "$IMAGE" .
docker tag "$IMAGE" "$IMAGE:$1"
mkdir -p watch
cp ggr-watch watch/ggr
cp Dockerfile watch/Dockerfile
[ -n "${DOCKER_USERNAME:-}" ] && [ -n "${DOCKER_PASSWORD:-}" ] || { echo "DOCKER_USERNAME and DOCKER_PASSWORD must be set" >&2; exit 1; }
printf '%s' "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push "$IMAGE"
docker push "$IMAGE:$1"
