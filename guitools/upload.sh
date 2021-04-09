#!/bin/bash

node /Users/yoshi/works/programs/algorithms/node/packer.js energyConverter.js
/Users/yoshi/programs/algorithms/bin/upload.sh energyConverter.js.html
ssh t18856yy@ccz00.sfc.keio.ac.jp 'cp ~/public_html/energyConverter.js.html ~/public_html/energyConverter.html'