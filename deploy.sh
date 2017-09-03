#!/bin/bash
rsync -av -e "ssh -p 7822" dist/ david@davidrodal.com:/var/www/beta/game-dispatcher/public/postneo/
