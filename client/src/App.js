import html from "./libraries/rendering-library";
import { useState, useMemo } from "preact/hooks";
import { Home } from "./components/Home";
import { Invitation } from "./components/Invitation";
import { pages } from "./constants";
// const {
//   MeetingRoom,
// } = () => {
//   return import("./components/Meeting-room");
//   };
import { MeetingRoom } from "./components/Meeting-room";
import { getRoomId } from "./utils/utils";
import { CallEnded } from "./components/CallEnded";

export const App = () => {
  const existingRoomIdFromUrl = getRoomId();
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
          redirectToPage=${setActivePage}
        />`;
      case pages.callEnded.pageId:
        return html`<${CallEnded} />`;
    }
  });
  return ActiveComponent;
};
