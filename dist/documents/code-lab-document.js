"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLabDoc = void 0;
class CodeLabDoc {
    constructor(doc) {
        this.yDoc = doc;
    }
    getMetaData() {
        return this.yDoc.getMap("meta");
    }
    getCodeText() {
        return this.yDoc.getText("codemirror");
    }
    getCodeContent() {
        return this.getCodeText().toString();
    }
    setCodeContent(content) {
        const text = this.yDoc.getText("codemirror");
        text.insert(0, content);
    }
    setRefPath(path) {
        const metaData = this.getMetaData();
        metaData.set("refPath", path);
    }
    getRefPath() {
        return this.getMetaData().get("refPath");
    }
}
exports.CodeLabDoc = CodeLabDoc;
//# sourceMappingURL=code-lab-document.js.map