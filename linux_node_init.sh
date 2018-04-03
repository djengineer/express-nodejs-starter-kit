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
# Purpose: run update scripts to initialize system environment to run node.js nodejs-starter-kit
# 
# Assuming we have cloud9 node environment
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