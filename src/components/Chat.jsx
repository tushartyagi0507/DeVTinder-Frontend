/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createSocketConnection from "../Utils/socket";
import { useSelector } from "react-redux";

export const Chat = () => {
  const [messages, setmessages] = useState([]);
  const [message, setMessage] = useState("");
  const { touserId } = useParams();

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("join", { firstName: user.FirstName, userId, touserId });

    socket.on("messageReceived", ({ firstName, message }) => {
      // console.log(`Message received from ${firstName}: ${message}`);
      setmessages((prev) => {
        return [
          ...prev,
          {
            firstName,
            text: message,
            time: new Date().toLocaleTimeString(),
            sender: firstName === user.FirstName ? "me" : "other",
          },
        ];
      });
    });
    console.log(messages);

    return () => {
      socket.disconnect();
    };
  }, [userId, touserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("message", {
      firstName: user.FirstName,
      userId,
      touserId,
      message,
    });
    setMessage(" ");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col h-[80vh] w-[60vw] max-w-lg mx-auto border border-gray-300 rounded-lg shadow-md bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="flex-1 p-4 overflow-y-auto ">
          {/* Messages will be mapped here */}
          {Array.isArray(messages) &&
            messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "me" ? "place-self-end" : "self-start"
                }
              >
                <div className="chat-header">
                  {message.sender === "me" ? user.FirstName : message.firstName}
                  <time className="text-xs opacity-50"> {message.time}</time>
                </div>

                <div
                  className={`my-2 p-2 w-fit rounded-lg ${
                    message.sender === "me"
                      ? "bg-blue-500 text-white self-end "
                      : "bg-gray-300 text-gray-800 self-start "
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center p-4 border-t border-gray-300 ">
          <input
            type="text"
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
                setMessage("");
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
