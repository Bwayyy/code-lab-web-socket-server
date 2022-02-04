export const extractKeys = (room: string) => {
  const substring = room.split("_");
  return {
    workspaceId: substring[0],
    liveCodingId: substring[1],
    fileId: substring[2],
  };
};
