# Go Grid Router
[![Build](https://github.com/WebSummoner/ggr/actions/workflows/build.yml/badge.svg)](https://github.com/WebSummoner/ggr/actions/workflows/build.yml)
[![Lint](https://github.com/WebSummoner/ggr/actions/workflows/lint.yml/badge.svg)](https://github.com/WebSummoner/ggr/actions/workflows/lint.yml)
[![codecov](https://codecov.io/gh/websummoner/ggr/graph/badge.svg?token=IEON28O0E1)](https://codecov.io/gh/websummoner/ggr)
[![Release](https://img.shields.io/github/release/WebSummoner/ggr.svg)](https://github.com/WebSummoner/ggr/releases/latest)
[![Docker Pulls](https://img.shields.io/docker/pulls/websummoner/ggr.svg)](https://hub.docker.com/r/websummoner/ggr)

**GGR is maintained by [RIADVICE](https://riadvice.com) under the WebSummoner project**, kept up to date alongside WebSummoner.

Go Grid Router (aka Ggr) is a lightweight active load balancer used to create scalable and highly-available [Selenium](http://seleniumhq.org/) clusters.
![Ggr Animation](docs/img/ggr-animation.gif)

## Articles

* [Selenium testing: a new hope (part I)](https://hackernoon.com/selenium-testing-a-new-hope-7fa87a501ee9)
* [Selenium testing: a new hope (part II)](https://hackernoon.com/selenium-testing-a-new-hope-a00649cdb100)

## Quick Start Guide
To use Go Grid Router do the following:
1) Install [Docker](http://docker.com/) to host
2) Create configuration directory:
```
$ mkdir -p /etc/grid-router/quota
```
3) Create ```users.htpasswd``` file:
```
$ htpasswd -bc /etc/grid-router/users.htpasswd test test-password
```
4) Start Selenium standalone server on port 4445:
```
$ java -jar selenium-server-standalone.jar -port 4445
```
You can also start [WebSummoner](https://github.com/WebSummoner/websummoner) instead.

5) Create quota file (use correct browser name and version):
```
$ cat /etc/grid-router/quota/test.xml
<qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
<browser name="firefox" defaultVersion="59.0">
    <version number="59.0">
        <region name="1">
            <host name="localhost" port="4445" count="1"/>
        </region>
    </version>
</browser>
</qa:browsers>
```
***Note***: file name should correspond to username you added to htpasswd file. For user ```test``` we added on previous steps you should create ```test.xml```.

6) Start Ggr container:
```
# docker run -d --name ggr -v /etc/grid-router/:/etc/grid-router:ro --net host websummoner/ggr:latest-release
```
7) Access Ggr on port 4444 in the same way you do for Selenium Hub but using the following url:
```
http://test:test-password@localhost:4444/wd/hub
```

## Complete Guide & Build Instructions

Complete reference guide (including build instructions) can be found at: https://websummoner.github.io/ggr/
