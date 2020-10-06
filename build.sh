#!/bin/bash

yarn build

cp -R ./build/ ./docs

cd ../tools

configFile="config.py"
if [ ! -f "$configFile" ]; then 
	cp config.py.temp config.py
fi 

LC_ALL=C pip install -r requirements.txt

cd ../koalcat.github.io

python ../tools/parse.py ../app/ prod

cp -R ../app/ ./docs/app
