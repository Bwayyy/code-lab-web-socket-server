import firebaseApp from "../firebase-app";
import admin from "firebase-admin";
class LiveCodingFileRepository {
  private firestore: any;
  constructor() {
    this.firestore = admin.firestore(firebaseApp);
  }

  public saveFile(docPath: string, content: string) {
    return this.firestore.doc(docPath).update({ content });
  }
  public getFile(docPath: string) {
    return this.firestore.doc(docPath).get();
  }
}

export { LiveCodingFileRepository };
