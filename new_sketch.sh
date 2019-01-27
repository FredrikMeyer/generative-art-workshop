#!/usr/bin/env bash

if [ -z "$1"]
then
  echo "Please provide a folder name."
else
  echo "Creating sketch in folder: $1"
  cp -r basis/ $1
  echo "Run npm start, and open localhost:3000/$1"
  echo "Happy sketching :-)"
fi


