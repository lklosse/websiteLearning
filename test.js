function startConnect(){

    clientID = "clientID: " + parseInt(Math.random() * 100);

    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    userId = document.getElementById("username").value;
    passwordId = document.getElementById("password").value;

    document.getElementById("messages").innerHTML += "<span> Connecting to " + host + " on port " + port + "</span><br>";
    document.getElementById("messages").innerHTML += "<span> Using client Id " + clientID +  "</span><br>";

    client = new Paho.Client(host, clientID);
    client.username_pw_set(userId, passwordId);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        userName : userId,
        password : passwordId
    });
}

function onConnect(){
    topic = document.getElementById("topic_s").value;

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
    client.disconnect();
    document.getElementById("messages").innerHTML += "<span> Disconnected </span><br>";
    }

function publishMessage(){
    msg = document.getElementById("message").value;
    topic = document.getElementById("topic_p").value;

    Message = new Paho.Message(msg);
    Message.destinationName = topic;

    client.send(Message);
    }
