import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9mF492gsy4G_bbb-Kyltm_jIgMP0oY7E",
  authDomain: "todo-7c28f.firebaseapp.com",
  projectId: "todo-7c28f",
  storageBucket: "todo-7c28f.appspot.com",
  messagingSenderId: "989390835217",
  appId: "1:989390835217:web:57c46ddba9b20e20bbebb0",
};

firebase.initializeApp(firebaseConfig);
export const todoRef = firebase.firestore().collection("todos");
