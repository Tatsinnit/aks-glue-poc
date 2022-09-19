var path = require('path');
const notifier = require('node-notifier');

var options = [
  {
    title: "Basic Notification",
    body: "Short message part"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
    icon: path.join(__dirname, 'icon.png')
  }
]

// String
notifier.notify('Message');

notifier.notify({
  title: 'My notification',
  message: 'Hello, there!'
});

function doNotify(evt) {
  if (evt.srcElement.id == "basic") {
    mynotification();
  }
  else if (evt.srcElement.id == "image") {
    
  }
}

function mynotification(){
  // Object
  notifier.notify({
    title: 'My notification',
    message: 'Hello, there!'
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("image").addEventListener("click", doNotify);
})
