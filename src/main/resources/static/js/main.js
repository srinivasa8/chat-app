var userNamePage = document.getElementById("username-page");
var chatPage = document.getElementById("chat-page");
var userNameForm = document.getElementById("usernameForm");
var messageForm = document.getElementById("messageForm");
var message = document.getElementById("message");
var messageArea = document.getElementById("messageArea");
var connecting =document.querySelector(".connecting");

var stompClient=null;
var userName =null;

const submit = (event) =>{
    console.log("entered submit");
    userName =  document.getElementById("name").value;
    if(userName){
        userNamePage.classList.add("hidden");
        chatPage.classList.remove("hidden");

        let sock = new SockJS("/ws")
        stompClient = Stomp.over(sock);
        console.log("stompClient>"+stompClient);
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function codingCourse() {
  console.log("freeCodeCamp");
}


const onConnectedSocket =(event) =>{
    getAndShowPastMessages();
    console.log("start->" + new Date());
    //window.setTimeout(codingCourse, 3000);
    setTimeout(onConnected, 500)
    //const myTimeout = setTimeout(codingCourse, 5000);
    //myStopFunction();
  // (async () => await new Promise(resolve => window.setTimeout(resolve, 2000)))();
    console.log("end->" + new Date());
    //event.preventDefault();
}

const onConnected=(event) =>{
   // getAndShowPastMessages();
   // console.log("start->" + new Date());
    //window.setTimeout(codingCourse, 3000);
     //window.setTimeout(resolve, 2000)
    //const myTimeout = setTimeout(codingCourse, 5000);
    //myStopFunction();
   //(async () => await new Promise(resolve => window.setTimeout(resolve, 2000)))();
  ///  console.log("end->" + new Date());
    stompClient.subscribe('/topic/public',OnMessageReceived);
    var message = {
        senderName: userName,
        status:'JOIN'
    }
    stompClient.send('/app/addUser',{}, JSON.stringify(message));
    connecting.classList.add('hidden');

    //event.preventDefault();
}

//const audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
//short-success-sound-glockenspiel-treasure-video-game-6346
// Replace with the path to your sound file

const notifyAudio = new Audio('short-success-sound.mp3');


const OnMessageReceived =(payload)=>{
    var inputMessage =JSON.parse(payload.body);
    var messageElement = document.createElement("li");
    //alert('New message received!')
    var alertMessage ="New message received!";
    if(inputMessage.status==='JOIN'){
        messageElement.classList.add("event-message")
        inputMessage.message=inputMessage.senderName + " joined!";
        alertMessage="New user "+inputMessage.senderName+" joined!";
    }
    else if(inputMessage.status==='LEAVE'){
        messageElement.classList.add("event-message")
        inputMessage.message=inputMessage.senderName + "left!";
        alertMessage=inputMessage.senderName + "left!";
    }
    else{
        messageElement.classList.add("chat-message")

        var avatar = document.createElement("i");
        var avatarText = document.createTextNode(inputMessage.senderName[0]);
        avatar.appendChild(avatarText);
        avatar.style['background-color'] = '#ff85af';//
        //avatarElement.style['background-color'] = getAvatarColor(message.sender);
        messageElement.appendChild(avatar);

        var userNameElement = document.createElement("span");
        var userNameElementText = document.createTextNode(inputMessage.senderName);
        userNameElement.appendChild(userNameElementText);
        messageElement.appendChild(userNameElement);
    }

        var textElement = document.createElement("p");
        var messageText = document.createTextNode(inputMessage.message);
        textElement.appendChild(messageText);

        var dateElement = document.createElement("p");
        var chatDate = '';
        if(inputMessage.date!=null){
        chatDate =inputMessage.date+'';
        }
        var date = document.createTextNode(chatDate);
        dateElement.appendChild(date);
        dateElement.style.fontSize = "8px";

        messageElement.appendChild(textElement);
        messageElement.appendChild(dateElement);

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
        if(inputMessage.senderName!==userName){
            notifyAudio.play();
            alert(alertMessage);
        }

}

const onError =()=>{
    connecting.textContent="Unable to connect..! please try to refresh the page!"
    connecting.style.color ='red';
    console.log()
}

const sendMessage =(event)=>{
    var messageContent = message.value.trim();
    if(messageContent && stompClient){
        var messaget = {
        senderName: userName,
        message: message.value,
        status:'CHAT',
        date: new Date().toLocaleString(),
        }
        stompClient.send('/app/sendMessage',{}, JSON.stringify(messaget));
        message.value="";
    }
    event.preventDefault();
}

userNameForm.addEventListener('submit',submit, true);
messageForm.addEventListener('submit',sendMessage, true);

const myAsyncFunction = async () => {
  await getAndShowPastMessages();
  // Code here will not execute until someAsyncFunction completes.
};

const getAndShowPastMessages = async () => {
   const getMessagesApiUrl = "http://localhost:8080/api/get";
   const res = await fetch(getMessagesApiUrl);
   if (res.ok) {
     const messages = await res.json();
     await messages.forEach(m => showMessage(m));
   } else {
     console.log("Unable to fetch past messages!");
   }
 }

const showMessage = (inputMessage) => {
     console.log("input messages ....."+inputMessage)
     var messageElement = document.createElement("li");
     if(inputMessage.status==='JOIN'){
         messageElement.classList.add("event-message")
         inputMessage.message=inputMessage.senderName + "joined!";
     }
     else if(inputMessage.status==='LEAVE'){
         messageElement.classList.add("event-message")
         inputMessage.message=inputMessage.senderName + "left!";
     }
     else{
         messageElement.classList.add("chat-message")

         var avatar = document.createElement("i");
         var avatarText = document.createTextNode(inputMessage.senderName[0]);
         avatar.appendChild(avatarText);
         avatar.style['background-color'] = '#ff85af';
         //avatarElement.style['background-color'] = getAvatarColor(message.sender);
         messageElement.appendChild(avatar);

         var userNameElement = document.createElement("span");
         var userNameElementText = document.createTextNode(inputMessage.senderName);
         userNameElement.appendChild(userNameElementText);
         messageElement.appendChild(userNameElement);
     }

     var textElement = document.createElement("p");
     var messageText = document.createTextNode(inputMessage.message);
     textElement.appendChild(messageText);

     var dateElement = document.createElement("p");
     var date = document.createTextNode(inputMessage.date+' ');
     dateElement.appendChild(date);
     dateElement.style.fontSize = "8px";
     dateElement.style.color = '#edede8';

     messageElement.appendChild(textElement);
     messageElement.appendChild(dateElement);
     messageArea.appendChild(messageElement);
     messageArea.scrollTop = messageArea.scrollHeight;
}
