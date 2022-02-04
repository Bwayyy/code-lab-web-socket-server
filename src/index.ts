import express from "express";
import http from "http";
import WebSocket from "ws";
const utils = require("y-websocket/bin/utils");
import { YArrayEvent, applyUpdate, Text, encodeStateAsUpdate, Doc } from "yjs";
import { CodeLabDoc } from "./documents/code-lab-document";
import { LiveCodingFileRepository } from "./repository/live-coding-file-repository";
import { getLiveCodingFilePath } from "./utils/firestore-path-helper";
import { extractKeys } from "./utils/room-name-extraction";

const app = express();

//initialize a simple http server
const server = http.createServer(app);
const wss = new WebSocket.WebSocketServer({ noServer: true });
const liveCodingFileRepository = new LiveCodingFileRepository();
//YJS Socket Config
/*
 Persistence must have the following signature:
{ bindState: function(string,WSSharedDoc):void, writeState:function(string,WSSharedDoc):Promise }
*/
utils.setPersistence({
  bindState: async (roomName: string, doc: Doc) => {
    const codeLabDoc = new CodeLabDoc(doc);
    const { workspaceId, liveCodingId, fileId } = extractKeys(roomName);
    const docPath = getLiveCodingFilePath(workspaceId, liveCodingId, fileId);
    const fileDocument = await liveCodingFileRepository.getFile(docPath);
    const fileData = fileDocument.data();
    if (fileData) {
      codeLabDoc.setCodeContent(fileData.content);
      console.log("document is initialed", roomName);
      codeLabDoc.setRefPath(fileDocument.ref.path);
    }
  },
  writeState: async (roomName: string, doc: Doc) => {
    console.log("document is clossed");
    const codeLabDoc = new CodeLabDoc(doc);
    const path = codeLabDoc.getRefPath();
    await liveCodingFileRepository.saveFile(path, codeLabDoc.getCodeContent());
    console.log("Updated file with path", path);
    // This is called when all connections to the document are closed.
    // In the future, this method might also be called in intervals or after a certain number of updates.
    return new Promise((resolve) => {
      // When the returned Promise resolves, the document will be destroyed.
      // So make sure that the document really has been written to the database.
      resolve("");
    });
  },
  provider: undefined,
});

wss.on("connection", utils.setupWSConnection);
server.on("upgrade", (request, socket, head) => {
  // You may check auth of request here..
  /**
   * @param {any} ws
   */
  const handleAuth = (ws: any) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

//start our server
const port = process.env.PORT || 1234;
server.listen(port);
console.log("running on port", port);
