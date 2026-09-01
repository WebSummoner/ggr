---
title: Creating quota files
description: Quota files define the browsers, versions, regions and hosts available to each user.
sidebar:
  order: 2
---

1. Quota files define available browsers for each user. All quota files should
   be placed to the same directory.
2. For user `username` quota file should be named `username.xml`.
3. Each quota file contains the following XML:

```xml title="A typical quota file"
<qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
<browser name="firefox" defaultVersion="61.0">
    <version number="61.0">
        <region name="1">
            <host name="host1.example.com" port="4444" count="1"/>
            <host name="host2.example.com" port="4444" count="1"/>
            ...
        </region>
        <region name="2">
            ...
        </region>
    </version>
    <version number="60.0">
        ...
    </version>
</browser>
<browser name="chrome" defaultVersion="67.0">
    ...
</browser>
...
</qa:browsers>
```

Here we define a list of browser names, their versions and default version for
each browser. Each version has one or more regions (in cloud term, i.e. data
centers). Every region contains one or more hosts. Each host defined in XML
should have Selenium listening on specified port. The XML namespace is needed
to be fully compatible with
[original](http://github.com/seleniumkit/gridrouter) Java GridRouter
implementation.

:::note
A frequent question being asked is the meaning of `count` attribute because the
name for historical questions is a bit confusing. You can have hosts with
different number of CPU and memory allowing to run different number of browsers
simultaneously. So `count` is the relative host weight allowing to adjust the
load to every host depending on its capacity. For example if your quota
contains two hosts with `count = 1` and `count = 3` then new session requests
will be distributed as `1:3` between these hosts. The easiest way to deliver
uniform load distribution is to set `count` equal to total number of browsers
available on the host. This is what we always recommend to do by default.
:::

4. Browser name is matched against `browserName` capability. Values are
   compared as strings and should be exactly equal. When testing mobile
   applications (e.g. with [Appium](http://github.com/appium/appium))
   `browserName` capability makes no sense and can be replaced by `deviceName`
   or `appium:deviceName` capability. Ggr will try to match both against
   browser name specified in XML.
5. Version `number` is matched against `version` or `browserVersion` capability
   by prefix. For example both `61` and `61.0` in version capability (i.e. in
   your code) will match version number `61.0`.
6. Similarly, version `platform` attribute is matched against `platform` or
   `platformName` capability by prefix. When platform from capabilities equals
   to `ANY` — default platform will be chosen.
7. Sometimes you may need to have the same browser name and version on
   different platforms, e.g. Firefox on both Linux and Windows. To achieve this
   you need to add `defaultPlatform` and `platform` attributes to quota file as
   follows:

```xml title="Adding platform information to quota file"
<qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
<browser name="firefox" defaultVersion="61.0" defaultPlatform="LINUX">
    <version number="61.0" platform="LINUX">
        ...
    </version>
    <version number="61.0" platform="WINDOWS">
        ...
    </version>
</browser>
...
</qa:browsers>
```

## Proxying VNC traffic

Sometimes for debugging purposes you need to see the screen of the browser
where your test is being executed. The simplest way to do that is to install a
[VNC](https://en.wikipedia.org/wiki/Virtual_Network_Computing) server to browser
host. Default TCP port for VNC protocol is `5900`. Ggr can proxy the VNC traffic
from multiple hosts and makes it accessible on a
[WebSocket](https://en.wikipedia.org/wiki/WebSocket). For example having the
running session ID you can get the VNC traffic by accessing the following
endpoint:

```
ws://ggr-host.example.com:4444/vnc/<session-id>
```

Browser VNC clients like [noVNC](https://github.com/novnc/noVNC) work with such
URLs out of the box. By default, having an XML host entry like this…

```xml
<host name="host1.example.com" port="4444" count="1"/>
```

…Ggr proxies all traffic from `host1.example.com:5900`. You can customize this
by adding an optional `vnc` attribute to a host:

```xml
<host name="host1.example.com" port="4444" count="1" vnc="vnc://host1.example.com:6900"/>
```

Two notations are supported in `vnc` attribute:

1. If the remote server has a VNC server listening on dedicated TCP port you
   should use `vnc://` protocol and specify only host and port:

   ```
   vnc://my-vnc-host.example.com:5900
   ```

2. If the remote server also returns VNC traffic on a web socket (which is a
   case for [WebSummoner](https://websummoner.github.io/websummoner/)) — then
   you should specify a `ws://` URL without trailing `<session-id>` value:

   ```
   ws://my-websummoner-host.example.com:4444/vnc
   ```

   Having this URL Ggr will append session ID and proxy VNC traffic from:

   ```
   ws://my-websummoner-host.example.com:4444/vnc/<session-id>
   ```

## Working with external Selenium services

Although Ggr is mainly used for creating your own Selenium cluster you can also
configure it to obtain some browsers in external Selenium services such as
[Saucelabs](http://saucelabs.com/), [BrowserStack](http://browserstack.com/) or
[TestingBot](https://testingbot.com/). These services always require username
and password to be specified. Credentials should be set for each browser
version in respective quota file:

```xml title="Providing username and password for external Selenium service"
<qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
<browser name="firefox" defaultVersion="45.0">
    <version number="45.0">
        <region name="1">
            <host name="hub.browserstack.com" port="443" count="1" username="test-user" password="my-password" scheme="https" />
        </region>
    </version>
</browser>
</qa:browsers>
```

## Guest quota

By default, every quota file corresponds to a user. In some cases you may need
to give anonymous (guest) access to some users. This is very useful to maintain
a sandbox where users can debug their tests without disturbing other tests.
Guest quota is enabled using Ggr flags:

```bash
./ggr -guests-allowed -guests-quota test <the-rest-of-the-flags...>
```

With these flags specified any browsers declared in `test.xml` file will be
accessible without password.

## Fetching quota information

You may want to show lists of available browsers in the user interface. To
fetch this information from Ggr just use the following request:

```bash
curl -s http://test:test-password@example.com:4444/quota
```

This request returns quota file contents as JSON for specified user.
