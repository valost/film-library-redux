#!/bin/sh
set -e
cat <<EOF > /app/env.js
window.environment = {
  API_URL: "${API_URL}"
};
EOF
exec serve -s /app -l 3000
