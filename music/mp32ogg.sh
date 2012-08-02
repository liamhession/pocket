#!/bin/sh
# see also http://www.perturb.org/display/entry/687/
usage="Usage: mp32ogg /path/to/target.mp3";
if [ $# -lt 1 ]; then
    echo $usage;
    exit 1;
fi

input=$1;
if [ ! -f $input ]; then
    echo "file($input) does not exist";
    exit 1;
fi

output=`echo $input | sed -e 's/mp3\$/ogg/'`;
mpg321 $input -w - | oggenc -o $output -
