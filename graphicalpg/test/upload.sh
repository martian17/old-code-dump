#!/bin/bash

node /Users/yoshi/works/programs/algorithms/node/packer.js fdgd0.js
/Users/yoshi/programs/algorithms/bin/upload.sh fdgd0.js.html
ssh t18856yy@ccz00.sfc.keio.ac.jp 'cp ~/public_html/fdgd0.js.html ~/public_html/fdgd0.html'
echo 'https://web.sfc.keio.ac.jp/~t18856yy/fdgd0.js.html'

