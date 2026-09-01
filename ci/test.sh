#!/bin/bash

export GO111MODULE="on"
go test -tags 'watch' -v -race -coverprofile=coverage.out -covermode=atomic -coverpkg github.com/WebSummoner/ggr
cp coverage.out coverage.txt

go install golang.org/x/vuln/cmd/govulncheck@latest
"$(go env GOPATH)"/bin/govulncheck -tags production ./...
