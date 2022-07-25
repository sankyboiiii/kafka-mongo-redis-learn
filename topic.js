const {Kafka} = require("kafkajs")

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        await admin.createTopics({
            "topics": [{
                "topic" : "wassup",
                "numPartitions": 2
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Error ${ex}`)
    }
    finally{
        process.exit(0);
    }


}

module.exports = { run };