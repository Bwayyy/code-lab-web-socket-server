"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveCodingFileRepository = void 0;
const firebase_app_1 = __importDefault(require("../firebase-app"));
const firestore_1 = require("firebase-admin/lib/firestore");
class LiveCodingFileRepository {
    constructor() {
        this.firestore = (0, firestore_1.getFirestore)(firebase_app_1.default);
    }
    saveFile(docPath, content) {
        return this.firestore.doc(docPath).update({ content });
    }
    getFile(docPath) {
        return this.firestore.doc(docPath).get();
    }
}
exports.LiveCodingFileRepository = LiveCodingFileRepository;
//# sourceMappingURL=live-coding-file-repository.js.map