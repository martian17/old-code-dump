#!/bin/bash

node /Users/yoshi/works/programs/algorithms/node/packer.js yt0.js
/Users/yoshi/programs/algorithms/bin/upload.sh yt0.js.html
ssh t18856yy@ccz00.sfc.keio.ac.jp 'cp ~/public_html/yt0.js.html ~/public_html/yt0.html'
echo 'https://web.sfc.keio.ac.jp/~t18856yy/yt0.html'
