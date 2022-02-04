"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLiveCodingFilePath = void 0;
const getLiveCodingFilePath = (workspaceId, liveCodingId, fileId) => {
    return `/workspaces/${workspaceId}/liveCodings/${liveCodingId}/repository/0/files/${fileId}`;
};
exports.getLiveCodingFilePath = getLiveCodingFilePath;
//# sourceMappingURL=firestore-path-helper.js.map