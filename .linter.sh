#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberlegalguard-28485-3f7145d3/cyberlegalguard
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

