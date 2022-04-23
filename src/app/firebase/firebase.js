import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import ls from "local-storage";


const firebaseConfig = {
    apiKey: "AIzaSyB65b4mwV5VlSm6x7lPigJgz1SwJzyox1g",
    authDomain: "portfolio-gayathri.firebaseapp.com",
    projectId: "portfolio-gayathri",
    storageBucket: "portfolio-gayathri.appspot.com",
    messagingSenderId: "692581807890",
    appId: "1:692581807890:web:6b42439ecf44d5a30865cb"
  };

  class Firebase {
      /** Global variables */
    USER_COLLECTION = "userDetails";
    CONTACT_COLLECTION = "contactDetails";
    WORK_COLLECTION = "workList";

    constructor() {
        this.firbaseApp = app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.user = ls.get("persist:v1-portfolio-auth");
        this.functions = app.functions();
      }

      
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

  async insertContactDetails(contactDetails) {
    
    const contactRef = firebase.db.collection(this.CONTACT_COLLECTION);
    const createcontact = await contactRef.add(contactDetails);
    const contactId = createcontact?.id;
    const contactDetail = await contactRef
      .doc(contactId)
      .get()
      .then((doc) => doc.data());
    const contactDetailsId = { ...contactDetail, contactId: contactId };
    const updatecontactDetails = await contactRef
      .doc(contactId)
      .set(contactDetailsId)
      .then(() => {
        return contactDetailsId;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    return await updatecontactDetails;
  }

  async retrievecontactList() {
    const userId = await this.getUserID();
    return await firebase.db
      .collection(this.CONTACT_COLLECTION);
  }

  async retrievecontactDetailsById(contactId) {
    return await firebase.db
      .collection(this.CONTACT_COLLECTION)
      .doc(contactId)
      .get()
      .then((response) => {
        return response.data();
      });
  }

  async updatecontactDetails(contactDetails) {
    const userId = await this.getUserID();
    const contactRef = firebase.db.collection(this.CONTACT_COLLECTION);

    return await contactRef
      .doc(contactDetails.contactId)
      .update(contactDetails)
      .then(async () => {
        return await contactRef
          .doc(contactDetails.contactId)
          .get()
          .then((doc) => doc.data());
      })
      .catch((err) => {
        return err.message;
      });
  }

  async deletecontactDetails(contactDetails) {
    const contactRef = firebase.db.collection(this.CONTACT_COLLECTION);
    return contactRef
      .doc(contactDetails.contactId)
      .delete()
      .then(() => {
        return { status: 200 };
      });
  }

  
  async retrieveworkList() {
    
    return await firebase.db
      .collection(this.WORK_COLLECTION);
  }

  async updateworkDetails(workList) {
    
    const workRef = firebase.db.collection(this.WORK_COLLECTION);

    return await workRef
      .doc(workList.id)
      .update(workList)
      .then(async () => {
        return await workRef
          .doc(workList.id)
          .get()
          .then((doc) => doc.data());
      })
      .catch((err) => {
        return err.message;
      });
  }

  async deleteworkDetails(workList) {
    const workRef = firebase.db.collection(this.WORK_COLLECTION);
    return workRef
      .doc(workList.id)
      .delete()
      .then(() => {
        return { status: 200 };
      });
  }

  }

  
  
const firebase = new Firebase();
export default firebase;
