#!/bin/bash                                                                     
# Converts all ogg files in the current path to mp3 files.
# This is useful for moving a music libary to iTunes, which doesn't support ogg
find .|grep 'ogg$' > /tmp/ogg_files.txt
while read line; do
    basepath=$(echo $line | sed 's/.ogg$//g')
    echo $basepath

    # get as much id3 tag information as possible from the path                 
    trackAndSong=$(basename "$basepath")
    track=$(echo $trackAndSong|cut -c1-2)
    song=$(echo $trackAndSong|cut -c6-)
    dirname=$(dirname "$basepath")
    album=$(basename "$dirname")
    artistPath=$(dirname "$dirname")
    artist=$(basename "$artistPath")

    sox "${basepath}.ogg" "${basepath}.wav"
    # -V 2 is for high quality VBR encoding                                     
    lame -V 2 --tt "${song}" --ta "${artist}" --tl "${album}" --tn "${track}" "${basepath}.wav" "${basepath}.mp3"
    rm "${basepath}.wav"
done < /tmp/ogg_files.txt
