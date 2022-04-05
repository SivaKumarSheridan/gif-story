import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import ls from "local-storage";


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };

  class Firebase {
      /** Global variables */
    USER_COLLECTION = "userDetails";

    constructor() {
        this.firbaseApp = app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.user = ls.get("persist:v1-gifstory-auth");
        this.functions = app.functions();
        //this.functions.useFunctionsEmulator('http://localhost:5000')
      }

      /*
      Custom Functions
      */ 
      
  }

  
const firebase = new Firebase();
export default firebase;
