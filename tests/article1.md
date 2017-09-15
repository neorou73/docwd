Often all I need is to find matches in a group of files of a single pattern. But I always forget the grep command for it. This does not come up very often – that’s probably why. In any case, thank you intarwebs for allowing me to have this cheat sheet that is my blog.

The line is:

~~~~
grep -Riln "pattern-to-search" "path-to-search-directory"
~~~~

-R is dereference-recursive option, where the search recurses into subdirectories but follows symlinks (use -r if no follow symlinks).
-i ignores case or searches case-insensitive
-l prints only files with pattern search matches
-n prints line numbers with output lines
