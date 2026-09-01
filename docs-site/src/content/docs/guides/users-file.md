---
title: Creating a users file
description: Ggr stores authentication data in htpasswd files with encrypted passwords.
sidebar:
  order: 1
---

Ggr is using
[htpasswd](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html)
files to store authentication data. Passwords are stored in encrypted form. To
create such file type:

1. Ensure you have `htpasswd` utility installed (e.g. from `apache2-utils`
   package on Ubuntu).

2. Create a new users file…

   ```bash
   htpasswd -bc /path/to/new.htpasswd username password
   ```

   … or update an existing one:

   ```bash
   htpasswd -b /path/to/existing.htpasswd username password
   ```
