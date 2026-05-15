import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://intro-socket-o3yg.vercel.app");

function App() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<string[]>([]);

  // console.log("send Message Data: ", message);
  console.log("All Messages: ", allMessages);

  // receive message
  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log("Received Message: ", data);
      setAllMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("received_message");
    };
  }, []);

  // send message
  const sendMessage = () => {
    if (!message) return;
    
    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Chat</h1>

      <input
      className=" border border-gray-300 rounded py-1 px-4 mb-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="Type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded cursor-pointer" onClick={sendMessage}>
        Send
      </button>

      <div>
        {allMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;