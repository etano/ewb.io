# ewb.io

## Setup

    pm2 deploy ecosystem.json setup

## Deployment

    uglifyjs --compress --mangle -- public/javascripts/party.js > public/javascripts/party.min.js
    uglifyjs --compress --mangle -- public/javascripts/lifestream.js > public/javascripts/lifestream.min.js
    pm2 deploy ecosystem.json production
