import html from "../rendering-library";
import { useState, useCallback, useMemo } from "preact/hooks";
import { Home } from "./Home";
import { Invitation } from "./Invitation";
import { pages } from "./constants";
import { MeetingRoom } from "./Meeting-room";
import { getRoomId } from "./utils";

export const App = ({ callConnection }) => {
  const existingRoomIdFromUrl = getRoomId();
  if (existingRoomIdFromUrl) {
    callConnection.joinRoom(existingRoomIdFromUrl);
  }
  const [roomId, setRoomId] = useState(existingRoomIdFromUrl);
  const [activePage, setActivePage] = useState(
    existingRoomIdFromUrl ? pages.meetingRoom.pageId : pages.home.pageId
  );
  const [invitationUrl, setInvitationUrl] = useState();
  const ActiveComponent = useMemo(() => {
    switch (activePage) {
      case pages.home.pageId:
        return html`<${Home}
          redirectToPage=${setActivePage}
          roomId=${roomId}
          setRoomId=${setRoomId}
          callConnection=${callConnection}
          setInvitationUrl=${setInvitationUrl}
        />`;
      case pages.invitation.pageId:
        return html`<${Invitation}
          invitationUrl=${invitationUrl}
          redirectToPage=${setActivePage}
          roomId=${roomId}
        />`;
      case pages.meetingRoom.pageId:
        return html`<${MeetingRoom}
          roomId=${roomId}
          callConnection=${callConnection}
        />`;
    }
  });
  return ActiveComponent;
};
