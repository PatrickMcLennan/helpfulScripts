import os
import sys

here = os.getcwd()

NAME = sys.argv[1]
ARG_COUNT = len(sys.argv)

if (ARG_COUNT != 2):
    print('------------------------------------------')
    print('You must pass 1 argument into this script.')
    print('------------------------------------------')

else:
    NAME = sys.argv[1]
    files = ['index.html', 'style.css', 'app.js']
    starts_stops = [['<!doctype html>', '</html>'],
                    ['*,', '    min-width: 100vw; }'],
                    ['Testing Start', 'Testing Stop']]

    def reader(file, lines_arr, good_text):
        start = good_text.index(lines_arr[0])
        stop = (good_text.index(lines_arr[1]) + 1)

        with open(file, 'w') as new_file:
            for i in range(start, stop):
                if good_text[i] == '  <title>The HTML5 Herald</title>':
                    new_file.write(f'<title>{NAME}</title>')
                else:
                    new_file.write(good_text[i])

    with open('./resets.txt', 'r') as raw_text:
        text = raw_text.read().split('\n')
        print(text)
        for file in files:
            reader(file, starts_stops[files.index(file)], text)
