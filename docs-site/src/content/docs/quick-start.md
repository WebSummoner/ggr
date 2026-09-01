---
title: Quick start guide
description: Install Ggr, create a users file and a quota file, and route your first session.
---

To use Go Grid Router do the following:

1. Install [Docker](http://docker.com/) to host.

2. Create configuration directory:

   ```bash
   mkdir -p /etc/grid-router/quota
   ```

3. Create `users.htpasswd` file:

   ```bash
   htpasswd -bc /etc/grid-router/users.htpasswd test test-password
   ```

4. Start [WebSummoner](https://websummoner.github.io/websummoner/) on host
   `websummoner.example.com` and port `4444`.

5. Create quota file (use correct browser name and version):

   ```xml
   <!-- /etc/grid-router/quota/test.xml -->
   <qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
   <browser name="firefox" defaultVersion="88.0">
       <version number="88.0">
           <region name="1">
               <host name="websummoner.example.com" port="4444" count="1"/>
           </region>
       </version>
   </browser>
   </qa:browsers>
   ```

   :::note
   File name should correspond to username you added to `htpasswd` file. For
   user `test` we added on previous steps you should create `test.xml`.
   :::

6. Start Ggr container:

   ```bash
   docker run -d --name \
       ggr -v /etc/grid-router/:/etc/grid-router:ro \
       --net host websummoner/ggr:latest-release
   ```

7. Access Ggr on port 4444 in the same way you do for Selenium Hub but using
   the following url:

   ```
   http://test:test-password@localhost:4444/wd/hub
   ```
