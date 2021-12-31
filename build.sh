#!/bin/bash

# cd ../tools

# configFile="config.py"
# if [ ! -f "$configFile" ]; then 
# 	cp config.py.temp config.py
# fi 

# LC_ALL=C pip install -r requirements.txt

# cd ../S1Fun

# python ../tools/parse.py ../app/ prod

# cp -R ../app/ ./docs/app

# cp -R ./docs/app/android.json ./src/s1/

yarn build

cp -R ./build/ ./docs