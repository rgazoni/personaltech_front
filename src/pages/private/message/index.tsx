import { Header } from "@/components/common/header";
import { TextMessage, User, CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file
import React from "react";

const COMETCHAT_CONSTANTS = {
  APP_ID: "2633795789fab3b8", //Replace with your App ID
  REGION: "US", //Replace with your App Region
  AUTH_KEY: "e54ae7e26cb407640a0a4e9a15797ec288d3f8c4", //Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};

export const initChat = async () => {
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .build();

  const result = await CometChatUIKit.init(UIKitSettings);
  console.log(result);
  return result;
};

export const loginChat = async (UID: string) => {
  const login = await CometChatUIKit.getLoggedinUser();
  console.log("Logged in user:", login);
  if (!login) {
    return CometChatUIKit.login(UID)
      .then((user: CometChat.User) => {
        console.log("Login Successful:", { user });
        return user;
      })
      .catch((error) => {
        console.log("Login failed:", error);
        throw error;
      });
  }
};

export const logoutChat = async () => {
  const logout = await CometChatUIKit.logout();
  console.log("Logout successful:", logout);
  return logout;
}

export const App1 = () => {
  const [chatUser, setChatUser] = React.useState<User>();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("id")) {
      CometChat.getUser(params.get("id")).then((user) => {
        setChatUser(user);
      })
    }
  }, [])


  return (
    <div className="h-screen px-16">
      <Header />
      <div className="h-[41rem]">
        <CometChatConversationsWithMessages
          user={chatUser}
        />
      </div>
    </div>
  );
};

