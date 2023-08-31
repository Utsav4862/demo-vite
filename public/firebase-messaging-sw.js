importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDk9U5c7nJS2QqO1rBymVxCa_wTOSJDWHg",
  authDomain: "notification-demo-bf318.firebaseapp.com",
  projectId: "notification-demo-bf318",
  storageBucket: "notification-demo-bf318.appspot.com",
  messagingSenderId: "893390784051",
  appId: "1:893390784051:web:7d1047441f42d6a3ffc546",
  measurementId: "G-XQ2DXL7B6E",
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  console.log(payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
