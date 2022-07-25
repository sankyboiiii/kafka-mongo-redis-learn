#### How to install

pre-requisites
1)mongodb
2) redis
3) docker

create the docker instance using docker compose file which will create kafka zookeeper images

now once that is up start mongodb in local using "mongod" commanc

after that start redis

do npm i afterward to install dependencies



#### How to staart

1) run this command to create a topic
   "node topic.js"
2) Run this command to send message from your local mongodb but the message need to be in mongo first 
   "node producer.js"

3) run this command to start listening
   "node consumer.js"

incase the mongo record is not present please uncomment the function in mongo.js and run "node mopngo.js" so that the record is created