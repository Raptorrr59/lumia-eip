#!/bin/bash

# Change directory to the folder where this script is located
cd "$(dirname "$0")"

rm -R gameselect

# Now run your Python script from here
python3 selection.py
