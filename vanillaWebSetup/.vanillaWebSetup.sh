#!/bin/bash

NAME=$1 
HTML_START='<!doctype html>'
HTML_END='</html>'

function reader () {
    local LINE_START=$1
    local LINE_STOP=$2
    local FILE_NAME=$3

    cat ./resets.txt

    echo sed -n -e /$1/,/$2/ resets.txt >> $FILE_NAME
}

if [[ $# == 0 ]]; then
    echo --------------------------------------------------
    echo You need to enter a project name into this script.
    echo --------------------------------------------------

    elif [[ $# == 1 ]]; then
        touch index.html
        reader $HTML_START $HTML_END index.html
        echo
        echo index.html was created in $(pwd)
fi