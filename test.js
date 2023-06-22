function startConnect(){

    clientID = "clientID: " + parseInt(Math.random() * 100)

    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    userId = document.getElementById("username").value;
    passwordId = document.getElementById("password").value;

    document.getElementById("messages").innerHTML += "<span> Connecting to " + host + "on port " + port + "</span><br>";
    document.getElementById("messages").innerHTML += "<span> Using client Id " + clientID +  "</span><br>";

    client = new Paho.MQTT.Client(host, Number(port), clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSucces: onConnect
    });
}

function onConnect(){
    topic = document.getElementById("topic_s".value)

    document.getElementById("messages").innerHTML += "<span> Subscribing to topic " + topic +  "</span><br>";

    client.subscribe(topic);
}


function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> Error: Connection lost </span><br>";
    if(responseObject !=0){
    document.getElementById("messages").innerHTML += "<span> Error: "+ responseObject.errorMessage+" </span><br>";
    }

}

function onMessageArrived(message){
console.log("OnMessageArrived").innerHTML += "<span> Topic:" + message.destinationName + "| Message: " + message.payloadString + "</span><br>"
}


function startDisconnect(){

}

function publishMessage(){


}