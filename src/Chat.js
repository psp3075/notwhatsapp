import { Avatar, IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import firebase from "firebase";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
          //console.log(messages);
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    //console.log("you typed:", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      messages: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  function chatDelete() {
    let confirmation = window.confirm("your chat room will be deleted");
    //console.log(confirmation);
    confirmation && db.collection("rooms").doc(roomId).delete();
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          style={{
            marginRight: "14px",
            border: "0.5px solid",
            background: "white",
          }}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {messages.length !== 0 && (
            <p>
              last seen{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              )?.toUTCString()}
            </p>
          )}
        </div>
        <div class="chat__headerRight">
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={chatDelete} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.messages}
            {/* <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span> */}
          </p>
        ))}
      </div>
      <div class="chat__footer">
        {/* <InsertEmoticon /> */}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
