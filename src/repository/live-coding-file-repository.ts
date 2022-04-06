import firebaseApp from "../firebase-app";
import Firestore from "firebase-admin/lib/firestore";
class LiveCodingFileRepository {
  private firestore: Firestore.Firestore;
  constructor() {
    this.firestore = Firestore.getFirestore(firebaseApp);
  }

  public saveFile(docPath: string, content: string) {
    return this.firestore.doc(docPath).update({ content });
  }
  public getFile(docPath: string) {
    return this.firestore.doc(docPath).get();
  }
}

export { LiveCodingFileRepository };
