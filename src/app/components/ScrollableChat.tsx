import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../helpers/chatLogic";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: any) => (
          <div className="mb-2" key={i}>
            <div className=" p-2 rounded-lg text-sm text-black">
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <h1>{m.sender.username}</h1>
              )}

              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </span>
            </div>
          </div>
        ))}

      {/* <div className="mb-2 text-right">
        <div className="bg-blue-500 p-2 rounded-lg text-white text-sm">
          Sure, I'd be happy to assist you.
        </div>
      </div> */}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
