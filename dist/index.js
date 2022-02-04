"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const utils = require("y-websocket/bin/utils");
const code_lab_document_1 = require("./documents/code-lab-document");
const live_coding_file_repository_1 = require("./repository/live-coding-file-repository");
const firestore_path_helper_1 = require("./utils/firestore-path-helper");
const room_name_extraction_1 = require("./utils/room-name-extraction");
const app = (0, express_1.default)();
//initialize a simple http server
const server = http_1.default.createServer(app);
const wss = new ws_1.default.WebSocketServer({ noServer: true });
const liveCodingFileRepository = new live_coding_file_repository_1.LiveCodingFileRepository();
//YJS Socket Config
/*
 Persistence must have the following signature:
{ bindState: function(string,WSSharedDoc):void, writeState:function(string,WSSharedDoc):Promise }
*/
utils.setPersistence({
    bindState: (roomName, doc) => __awaiter(void 0, void 0, void 0, function* () {
        const codeLabDoc = new code_lab_document_1.CodeLabDoc(doc);
        const { workspaceId, liveCodingId, fileId } = (0, room_name_extraction_1.extractKeys)(roomName);
        const docPath = (0, firestore_path_helper_1.getLiveCodingFilePath)(workspaceId, liveCodingId, fileId);
        const fileDocument = yield liveCodingFileRepository.getFile(docPath);
        const fileData = fileDocument.data();
        if (fileData) {
            codeLabDoc.setCodeContent(fileData.content);
            console.log("document is initialed", roomName);
            codeLabDoc.setRefPath(fileDocument.ref.path);
        }
    }),
    writeState: (roomName, doc) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("document is clossed");
        const codeLabDoc = new code_lab_document_1.CodeLabDoc(doc);
        const path = codeLabDoc.getRefPath();
        yield liveCodingFileRepository.saveFile(path, codeLabDoc.getCodeContent());
        console.log("Updated file with path", path);
        // This is called when all connections to the document are closed.
        // In the future, this method might also be called in intervals or after a certain number of updates.
        return new Promise((resolve) => {
            // When the returned Promise resolves, the document will be destroyed.
            // So make sure that the document really has been written to the database.
            resolve("");
        });
    }),
    provider: undefined,
});
wss.on("connection", utils.setupWSConnection);
server.on("upgrade", (request, socket, head) => {
    // You may check auth of request here..
    /**
     * @param {any} ws
     */
    const handleAuth = (ws) => {
        wss.emit("connection", ws, request);
    };
    wss.handleUpgrade(request, socket, head, handleAuth);
});
//start our server
const port = process.env.PORT || 1234;
server.listen(port);
console.log("running on port", port);
//# sourceMappingURL=index.js.map