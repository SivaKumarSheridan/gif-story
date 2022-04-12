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

  async getUserID() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }
    let user = ls.get("persist:v1-gifstory-auth");
    return JSON.parse(user?.user)?.id;
  }

  async loginUser(email, password) {
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

  async insertMemeDetails(memeDetails) {
    const userId = await this.getUserID();
    const memeRef = firebase.db.collection(this.GIF_COLLECTION);
    const createMeme = await memeRef.add({ ...memeDetails, userId });
    const memeId = createMeme?.id;
    const memeDetail = await memeRef
      .doc(memeId)
      .get()
      .then((doc) => doc.data());
    const memeDetailsId = { ...memeDetail, memeId: memeId };
    const updatememeDetails = await memeRef
      .doc(memeId)
      .set(memeDetailsId)
      .then(() => {
        return memeDetailsId;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    return await updatememeDetails;
  }

  async retrieveMemeList() {
    const userId = await this.getUserID();
    return await firebase.db
      .collection(this.GIF_COLLECTION)
      .where("userId", "==", userId);
  }

  async retrieveMemeDetailsById(memeId) {
    return await firebase.db
      .collection(this.GIF_COLLECTION)
      .doc(memeId)
      .get()
      .then((response) => {
        return response.data();
      });
  }

  async updateMemeDetails(memeDetails) {
    const userId = await this.getUserID();
    const memeRef = firebase.db.collection(this.GIF_COLLECTION);

    return await memeRef
      .doc(memeDetails.memeId)
      .update(memeDetails)
      .then(async () => {
        return await memeRef
          .doc(memeDetails.memeId)
          .get()
          .then((doc) => doc.data());
      })
      .catch((err) => {
        return err.message;
      });
  }

  async deleteMemeDetails(memeDetails) {
    const memeRef = firebase.db.collection(this.GIF_COLLECTION);
    return memeRef
      .doc(memeDetails.memeId)
      .delete()
      .then(() => {
        return { status: 200 };
      });
  }
}

const firebase = new Firebase();
export default firebase;
