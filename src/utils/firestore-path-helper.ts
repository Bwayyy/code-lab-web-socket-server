export const getLiveCodingFilePath = (
  workspaceId: string,
  liveCodingId: string,
  fileId: string
) => {
  return `/workspaces/${workspaceId}/liveCodings/${liveCodingId}/repository/0/files/${fileId}`;
};
