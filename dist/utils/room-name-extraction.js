"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKeys = void 0;
const extractKeys = (room) => {
    const substring = room.split("_");
    return {
        workspaceId: substring[0],
        liveCodingId: substring[1],
        fileId: substring[2],
    };
};
exports.extractKeys = extractKeys;
//# sourceMappingURL=room-name-extraction.js.map