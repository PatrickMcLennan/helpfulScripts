#!/bin/bash

NEW_EXT=$1
OLD_EXT=$2
COUNTER=1

if [[ $# == 0 ]]; then
    echo ---------------------------------------------------
    echo You must pass at least 1 argument into this script.
    echo ---------------------------------------------------

    elif [[ $# == 1 ]]; then
        for i in $(ls *.${NEW_EXT})
            do
                echo Moving $i to Episode\ $COUNTER.$NEW_EXT
                mv $i Episode\ $COUNTER.$NEW_EXT
                (( COUNTER++ ))
            done

    elif [[ $# == 2 ]]; then
        for i in $(ls *.${OLD_EXT})
            do
                echo $i
                echo Moving $i to Episode\ $COUNTER.$NEW_EXT
                mv $i Episode\ $COUNTER.$NEW_EXT
                (( COUNTER++ ))
            done

    elif [[ $# -ge 3 ]]; then
        echo ------------------------------------------
        echo This script only accepts 1 or 2 arguments.
        echo ------------------------------------------
fi