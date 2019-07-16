#!/bin/bash

SUB=$1
DIR=$2

if [[ $# != 2 ]]; then
    echo ------------------------------------------
    echo You must pass 2 arguments into this script
    echo ------------------------------------------

    else
        wget -q https://old.reddit.com/r/widescreenwallpaper -O - | tr '\n' ' ' | grep -o '<div class="thing">.*</div>'
fi