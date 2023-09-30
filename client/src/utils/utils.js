export const getRoomId = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  return queryParams.get("roomId");
};

export const getInvitationUrl = (roomId) => {
  const currentUrl = window.location.href;
  const invitationUrl = `${currentUrl}?roomId=${roomId}`;
  return invitationUrl;
};
