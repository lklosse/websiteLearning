function startConnect(){
    document.getElementById("messages").innerHTML += "<span> Connecting to wss://mqtt.hva-robots.nl/mqtt on port 1883 </span><br>";
    
    client = new Paho.Client("wss://mqtt.hva-robots.nl/mqtt", "clientID: " + parseInt(Math.random() * 100));

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    connect();
    
}

function connect(){
    client.connect({
        onSuccess: onConnect,
        onFailure: connectionFailed,
        userName : "klossel",
        password : "HktRynjxATM0DjYZjoC7"
    });
}

function onConnect(){
    document.getElementById("messages").innerHTML += "<span> Subscribing to topic klossel/test </span><br>";

    client.subscribe("klossel/test");
}

function connectionFailed(){
    document.getElementById("messages").innerHTML += "<span> connection failed </span><br>";
}



function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> Error: Connection lost </span><br>";
    if(responseObject !=0){
    document.getElementById("messages").innerHTML += "<span> Error: "+ responseObject.errorMessage+" </span><br>";
    }

}

function onMessageArrived(message){
console.log("OnMessageArrived: " +message.payloadString);
document.getElementById("messages").innerHTML += "<span> Topic: " + message.destinationName + " | Message: " + message.payloadString + "</span><br>"
}


function startDisconnect(){
    client.disconnect();
    document.getElementById("messages").innerHTML += "<span> Disconnected </span><br>";
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

function publishMessage(elem){
    if(elem.id == "walk"){
        stepsForward = document.getElementById("stepsF").value;
        stepsSideways = document.getElementById("stepsS").value;
        turnDegrees = document.getElementById("turnD").value;
        Message = new Paho.Message(elem.id + " " + stepsForward + " " + stepsSideways + " " + turnDegrees);

    } else {
    Message = new Paho.Message(elem.id);

    }
    
    Message.destinationName = "klossel/test";
    client.send(Message);
}
