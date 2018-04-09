. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
#/usr/bin/bash
#
# Script: linux_node_init.sh
# Author: djengineer 
# Date: yyyymmdd - ee   (ee = times edited)
# Date: 20180403 - 01
# 
# Purpose: run update scripts to initialize system environment to run node.js express-nodejs-starter-kit
# 
# Assuming you have NVM installed
# install nodejs 8
nvm install 8

# update  npm
sudo npm i -g npm

# initialize npm
sudo npm init

# install EXPRESS
sudo npm install --save express

# install embedded js (ejs)
sudo npm install ejs --save

# install body parser
sudo npm install body-parser --save

# for Auth0
sudo npm install connect-ensure-login cookie-parser debug dotenv express-session morgan passport passport-auth0 --save

# For mongoose and pagination
sudo npm install mongoose --save

# faker to generate fake data for testing, developing
sudo npm install faker --save-dev

# to install mongodb for c9
# refer to https://community.c9.io/t/setting-up-mongodb/1717
sudo apt-get install -y mongodb-org
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
chmod a+x mongod