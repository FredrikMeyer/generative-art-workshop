#!/usr/bin/env bash

if [ -z "$1" ]
then
  echo "Please provide a folder name."
else
  if [ -d $1 ]; then
     echo "Reusing folder: $1"
  else
    echo "Creating sketch in folder: $1"
    cp -r basis/ $1
  fi
  echo "Open localhost:9966 in your browser, edit \"$1/index.js\" in your editor"
  echo "Happy sketching :-)"
fi


./node_modules/budo/bin/cmd.js ./$1/index.js --dir ./$1 --live
