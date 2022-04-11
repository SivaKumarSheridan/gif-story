import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import ls from "local-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeFwa6597xNdK01Xf4KHGOqj86KkwJs7k",
  authDomain: "gif-story-prod.firebaseapp.com",
  projectId: "gif-story-prod",
  storageBucket: "gif-story-prod.appspot.com",
  messagingSenderId: "91532025504",
  appId: "1:91532025504:web:cbaed08615bf1eccae33c5",
};

class Firebase {
  /** Global variables */
  USER_COLLECTION = "userDetails";
  GIF_COLLECTION = "gifDetails";

  constructor() {
    this.firbaseApp = app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.user = ls.get("persist:v1-gifstory-auth");
    this.functions = app.functions();
  }

  /*
      Custom Functions
      */
  
  async loginUser(email, password){
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async signupUser(email, password, name) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        return response.user.updateProfile({
          displayName: name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async socialLogin() {
    let socialMediaProvider = new app.auth.GoogleAuthProvider();
      socialMediaProvider.setCustomParameters({
        prompt: "select_account",
      });
    return await this.auth
      .signInWithPopup(socialMediaProvider)
      .then((response) => {
        return response;
      });
  }



}

const firebase = new Firebase();
export default firebase;
