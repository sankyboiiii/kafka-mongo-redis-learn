const {Kafka} = require("kafkajs")
const hostRedis = require("./redis")

run();
async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const consumer = kafka.consumer({"groupId": "test"})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic": "wassup",
            "fromBeginning": true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`)
                await hostRedis.set("mykey", result.message.value).then((result) => {
                    console.log(result);
                });
            }
        })
 

    }
    catch(ex)
    {
        console.error(`Error ${ex}`)
    }
    finally{
        
    }


}