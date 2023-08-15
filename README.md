# Data visualization projects


## Installation

```sh
npm install
cp .env-copy .env
```

Site is available at `http://localhost:5025/`.

## Development

```sh
npm run dev
npm run gulp
```

## Apache config

```sh
RewriteCond %{REQUEST_URI} ^/data/2021w24
RewriteRule ^(.*)$ https://stefanbohacek.com/data/projects/makeover-monday/2021w24 [R=301,L]

RewriteCond %{REQUEST_URI} ^/data/2021w27
RewriteRule ^(.*)$ https://stefanbohacek.com/data/projects/makeover-monday/2021w27 [R=301,L]

RewriteCond %{REQUEST_URI} ^/css/projects
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/js/projects
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/libs/projects
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/css
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/js
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/libs
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_URI} ^/projects/makeover-monday
RewriteRule ^(.*)$ https://%{SERVER_NAME}/data/%{REQUEST_URI} [R=301,L]
```
