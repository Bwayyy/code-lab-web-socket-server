import { doc } from "firebase/firestore";
import { Doc, YArrayEvent } from "yjs";

class CodeLabDoc {
  yDoc: Doc;
  constructor(doc: Doc) {
    this.yDoc = doc;
  }
  public getMetaData() {
    return this.yDoc.getMap<string>("meta");
  }
  public getCodeText() {
    return this.yDoc.getText("codemirror");
  }
  public getCodeContent() {
    return this.getCodeText().toString();
  }
  public setCodeContent(content: string) {
    const text = this.yDoc.getText("codemirror");
    text.insert(0, content);
  }
  public setRefPath(path: string) {
    const metaData = this.getMetaData();
    metaData.set("refPath", path);
  }
  public getRefPath() {
    return this.getMetaData().get("refPath");
  }
}

export { CodeLabDoc };
