import os
import sys

here = os.getcwd()

NAME = sys.argv[1]
ARG_COUNT = len(sys.argv)

if (ARG_COUNT <= 1):
    print('------------------------------------------')
    print('You must pass 1 argument into this script.')
    print('------------------------------------------')

elif (ARG_COUNT == 2):
    NAME = sys.argv[1]
    files = ['index.html', 'style.css', 'app.js']
    starts_stops = [['<!doctype html>\n', '</html>\n'],
                    ['*,\n', 'min-width: 100vw; }'],
                    ['Testing Start', 'Testing Stop']]

    with open('./resets.txt', 'r') as raw_text:
        lines = raw_text.readlines()

        for file in files:
            start = starts_stops[files.index(file)][0]
            end = starts_stops[files.index(file)][1]
            with open(file, 'w') as new_file:
                new_file.write(f'{lines.slice(lines[start], lines[end])}')

else:
    print('------------------------------------')
    print('This script only accepts 1 argument.')
    print('------------------------------------')
