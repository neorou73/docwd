I use Vim 6+. I like to have basic things set up on vim to get going. Often though, I do not remember the setting commands. Simple things like syntax highlighting, auto-numbering of file lines, auto indentation, tab expansion and tab width in character spaces.

After installing vim on your UNIX/Linux machine, go to your home directory and edit or create the new .vimrc file:

~~~~
user@machine:~$ cd ∧∧ vim .vimrc
~~~~

Below is what I enter to get started:

~~~~
:set syntax=on
:set number
:set autoindent
:set expandtab
:set shiftwidth=2
:set softtabstop=2
~~~~
