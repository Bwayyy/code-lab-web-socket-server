import firebaseApp from "../firebase-app";
import { getFirestore, Firestore } from "firebase-admin/lib/firestore";
class LiveCodingFileRepository {
  private firestore: Firestore;
  constructor() {
    this.firestore = getFirestore(firebaseApp);
  }

  public saveFile(docPath: string, content: string) {
    return this.firestore.doc(docPath).update({ content });
  }
  public getFile(docPath: string) {
    return this.firestore.doc(docPath).get();
  }
}

export { LiveCodingFileRepository };
