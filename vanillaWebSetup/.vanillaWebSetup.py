import os
import sys

here = os.getcwd()

html_start = '-- HTML START --'
html_end = '-- HTML END --'


def reader(line_start, line_stop):
    text = open('./resets.txt', 'r')
    print(text.read())
    text.close()


if len(sys.argv) == 1:
    print('-------------------------------------------------')
    print('You need to enter a project name into this script.')
    print('-------------------------------------------------')

else:
    NAME = sys.argv[1]
    html = open('index.html', 'w')
    html.write('Testing')
    html.close()
    reader(html_start, html_end)
    print(f'index.html was created in ${here}')
