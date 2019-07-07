import os
import sys
from pathlib import Path

ARG_COUNT = len(sys.argv)
COUNTER = 1

if ARG_COUNT == 1:
    print('--------------------------------------------------')
    print('You must pass at least 1 arugment into this script')
    print('--------------------------------------------------')

elif ARG_COUNT == 2:
    NEW_EXT = f'.{sys.argv[1]}'
    for i in os.listdir():
        if Path(i).suffix == NEW_EXT:
            new_name = f'Episode {COUNTER}{NEW_EXT}'
            print(f'Renaming {i} to {new_name}')
            os.rename(i, new_name)
            COUNTER += 1

elif ARG_COUNT == 3:
    NEW_EXT = f'.{sys.argv[1]}'
    OLD_EXT = f'.{sys.argv[2]}'
    for i in os.listdir():
        if Path(i).suffix == OLD_EXT:
            new_name = f'Episode {COUNTER}{NEW_EXT}'
            print(f'Renaming {i} to {new_name}')
            os.rename(i, new_name)
            COUNTER += 1

elif ARG_COUNT >= 4:
    print('------------------------------------------')
    print('This script only accepts 1 or 2 arguments.')
    print('------------------------------------------')
