#!/bin/bash

NAME=$1

if [[ $# == 0 ]]; then
    echo ------------------------------------------
    echo You must pass 1 argument into this script.
    echo ------------------------------------------

    elif [[ $# == 1 ]];then 
        awk 'NR>=0 && NR<=15' resets.txt > index.html && sed -i "" "s/The HTML5 Herald/${NAME}/g" index.html
        awk 'NR>=15 && NR<=34' resets.txt > style.css
        echo 'Testing' >> app.js

        for FILE in index.html style.css app.js; do
            echo $FILE was created in $(pwd)
            done

    elif [[ $# -ge 2 ]]; then
        echo ------------------------------------
        echo This script only accepts 1 argument.
        echo ------------------------------------
fi