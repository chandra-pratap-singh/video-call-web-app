export const getRoomId = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  return queryParams.get("roomId");
};
