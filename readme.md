<div align="center">

&nbsp;

<img src="https://statamic.com/assets/branding/Statamic-Logo+Wordmark-Rad.svg" width="400" alt="Statamic Logo" />

&nbsp;

# Statamic Container Setup

Statamic is the flat-first, Laravel + Git powered CMS<br>
designed for building beautiful, easy to manage websites.

</div>

&nbsp;

&nbsp;

> [!important]
> This is **NOT** an official Statamic repository.<br>
> If you're just looking for Statamic itself check [statamic/cms](https://github.com/statamic/cms).

&nbsp;

&nbsp;

## What’s inside?

| Service      | Image                       | Purpose                                                           |
|--------------|-----------------------------|-------------------------------------------------------------------|
| **php**      | `bitnami/php-fpm:8.3`       | PHP-FPM runtime (Laravel/Statamic)                                |
| **caddy**    | `caddy:2.8-alpine`          | Web server; serves static files and `php_fastcgi` to **php**      |
| **composer** | `composer:2`                | Sidecar for Composer commands (no local PHP needed)               |
| **node**     | `node:22-alpine`            | Vite dev server + JS toolchain (Tailwind 4)                       |

&nbsp;

### Requirements

- Git
- Podman Desktop (macOS/Windows) or Podman Engine (Linux) \*

*\* You can also use Docker, just adapt all the command accordingly.*

&nbsp;

&nbsp;

## How to get started

&nbsp;

### 1. Clone the repository

```bash
git clone git@github.com:unseen-ninja/statamic-container.git statamic
cd statamic
```

&nbsp;

### 2. Install PHP / Statamic dependencies

```bash
# Create Statamic in a temporary subfolder
podman compose run --rm composer create-project statamic/statamic tmp

# Move everything into the project root
rsync -a --exclude-from='.rsyncignore' tmp/ ./

# Remove the temporary folder
rm -rf tmp
```

`create-project` refuses to install into a directory with any files in it (even `podman-compose.yml` or `podman/`), so by pointing it at a fresh subfolder (`tmp`) and then moving everything up, we avoid the error.

&nbsp;

### 3. Environment file

```bash
cp .env.example .env
```

&nbsp;

### 4. Start core services (PHP + Caddy)

```bash
podman compose up -d php caddy
```

Caddy serves the site on **http://localhost** in dev.

&nbsp;

### 5. App key & storage

> Bitnami PHP CLI path: `/opt/bitnami/php/bin/php`

```bash
podman compose exec php /opt/bitnami/php/bin/php artisan key:generate
podman compose exec php /opt/bitnami/php/bin/php artisan storage:link
```

&nbsp;

### 6. Create the first Statamic user

> [!note]
> - Users are **not** tracked in Git (`/content/users/` is ignored).

```bash
podman compose exec php /opt/bitnami/php/bin/php artisan statamic:make:user
```

Follow the prompts (email, name, password, `super`).

&nbsp;

### 7. JavaScript deps (Vite/Tailwind 4)

```bash
podman compose run --rm node npm install
```

&nbsp;

### 8. Run Vite dev server (hot reload)

```bash
podman compose up -d node

# Watch Logs (optional)
podman compose logs -f node

# Stop only Vite
podman compose stop node
```

&nbsp;

&nbsp;

<div align="center">

<a href="https://unseen.ninja">
<img src="https://img.shields.io/badge/-unseen%20ninja-fff?style=for-the-badge&color=EA33ED&labelColor=8819EC&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KICA8ZyBpZD0idGV4dCIgdHJhbnNmb3JtPSJtYXRyaXgoNS4xMTk4OSwwLDAsNS4xMTk4OSw4My44MTUxLDE2Ny42KSI+CiAgICAgIDxwYXRoIGQ9Ik0wLDUuNzU5TDAsLTExLjUwN0wxNy4yNiwtMTEuNTA3TDE3LjI2LDQuMzVDMTcuMjYsMTMuMjkzIDYuNzQ1LDE3LjI2NiA2Ljc0NSwxNy4yNjZMMy44NTcsMTMuOTQzQzMuNTAxLDEzLjUzMiAzLjU3NiwxMi45MDggNC4wMTIsMTIuNTgzQzcuODM2LDkuNzI0IDcuODM1LDcuMTczIDcuODM1LDcuMTczTDcuODM3LDUuNzU5TDAsNS43NTlaTTAsLTMyLjczNUwxNy4yNiwtMzIuNzM1TDE3LjI2LC0xNS40NzVMMCwtMTUuNDc1TDAsLTMyLjczNVoiIGZpbGw9IiNGNUY0NTEiLz4KICA8L2c+Cjwvc3ZnPg==">
</a>

</div>
