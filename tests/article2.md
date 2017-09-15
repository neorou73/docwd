One will need to ensure that compiler and development SSL library is available before specifying nvm installation in Ubuntu 14.04/16.04 LTS.

~~~~
sudo apt install build-essential libssl-dev
~~~~

Then get the package and install

~~~~
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | sudo bash
~~~~

After that, exit out of user account and login again. See if you can install a specific version of node js, let’s say 6.10.0. You can see what is available by issuing:

~~~~
nvm ls-remote
~~~~

You should see all available version, including 6.10.0. To install:

~~~~
nvm install 6.10.0
nvm use 6.10.0
~~~~

Get some help by issuing

~~~~
nvm help
~~~~

If you want multiple versions, install the other versions as necessary using the steps above. Would be good to select a default. If we want to default to 6.10.0 do the following:

~~~~
nvm alias default 6.10.0
~~~~                                                                                                    
