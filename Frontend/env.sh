#!/bin/sh
echo "window._env_ = {" > ./env-config.js
grep -v '^#' ./.env | \
	awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' >> ./env-config.js
echo "}" >> ./env-config.js
