import os
import sys

here = os.getcwd()

NAME = sys.argv[1]
ARG_COUNT = len(sys.argv)


def reader(file, lines_arr, text):
    content = text.readlines()
    print(content)


if (ARG_COUNT <= 1):
    print('------------------------------------------')
    print('You must pass 1 argument into this script.')
    print('------------------------------------------')

elif (ARG_COUNT == 2):
    NAME = sys.argv[1]
    with open('./resets.txt', 'r') as raw_text:
        text = raw_text.read()
        files = ['index.html', 'style.css', 'app.js']
        starts_stops = [['<!doctype html', '</html>'],
                        ['*,', 'min-width: 100vw; }'],
                        ['Testing Start', 'Testing Stop']]
        for file in files:
            reader(file, starts_stops[files.index(file)], text)


else:
    print('------------------------------------')
    print('This script only accepts 1 argument.')
    print('------------------------------------')
