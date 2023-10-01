export const pages = {
  home: {
    pageId: "home",
  },
  invitation: {
    pageId: "invitation",
  },
  meetingRoom: {
    pageId: "meetingRoom",
  },
  callEnded: {
    pageId: "callEnded",
  },
};

export const CONNECTION_STATES = {
  new: { key: "new", displayMessage: "No Participant" },
  connecting: { key: "connecting", displayMessage: "Connecting..." },
  connected: { key: "connected", displayMessage: "Connected..." },
  disconnected: { key: "disconnected", displayMessage: "Disconnected!" },
  failed: { key: "failed", displayMessage: "Connection Failed!" },
  closed: { key: "closed", displayMessage: "Connection Closed!" },
};
