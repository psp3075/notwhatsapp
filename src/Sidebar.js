import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { actionTypes } from "./reducer";
//import ChatIcon from "@material-ui/icons/Chat";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import "./Sidebar.css";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  function logout() {
    console.log("logout");
    let confirmation = window.confirm("Are you sure to logout?");
    //console.log(confirmation);
    confirmation &&
      dispatch({
        type: actionTypes.LOGOUT_USER,
        user: null,
      });
  }

  function searchForRoom(e) {
    console.log("search", e.target.value);
    // console.log(db.collection("rooms").where("name"));
    db.collection("rooms")
      .where("name", "=", "testing")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Tooltip title="Profile pic">
          <IconButton>
            <Avatar src={user?.photoURL} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton>
            <LogoutIcon onClick={logout} />
          </IconButton>
        </Tooltip>
        {/* <div class="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton> *
        </div> */}
      </div>

      <div className="sidebar__search">
        <div class="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="search or start new chat"
            type="search"
            onChange={searchForRoom}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
