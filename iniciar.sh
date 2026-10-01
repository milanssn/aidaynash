#!/bin/sh
cd "$(dirname "$0")"
[ -d backend/node_modules/express ] || npm run setup
npm start
