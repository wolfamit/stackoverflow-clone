import React from "react";
import UsersList from "./UsersList";
import "./Users.css";

const Users = () => {
  return (
    <div id="below-topnav-userlist">
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 >Users</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;