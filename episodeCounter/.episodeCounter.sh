#!/bin/bash

NEW_EXT=$1
OLD_EXT=$2
COUNTER=1

function renamer() {
    local i=$1
    echo Moving $i to Episode\ $COUNTER.$NEW_EXT
    mv $i Episode\ $COUNTER.$NEW_EXT
    (( COUNTER++ ))
}

if [[ $# == 0 ]] || [ $# -ge 3 ]; then
    echo ---------------------------------------------------
    echo You must pass at 1 or 2 arguments into this script.
    echo ---------------------------------------------------
    exit 1

    elif [[ $# == 1 ]]; then
        for i in $(ls *.${NEW_EXT})
            do
                renamer $i
            done

    elif [[ $# == 2 ]]; then
        for i in $(ls *.${OLD_EXT})
            do
                renamer $i
            done
fi