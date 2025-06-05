#!/bin/bash
while IFS= read -r filename; do
  # Remove leading/trailing whitespace and convert to lowercase
  filename_clean=$(echo "$filename" | tr -d '\r' | xargs | tr '[:upper:]' '[:lower:]')
  
  # Skip empty lines
  [ -n "$filename_clean" ] && touch "$filename_clean"
done < filenames.txt