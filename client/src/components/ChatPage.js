import React, { useState, useEffect, Fragment } from "react";
import connectIo from "../controller/connect";
import sendMessage from "../controller/sendMessage";
import Message from "./Message";
import { connect } from "react-redux";
import Loader from "./Loader";
import { Redirect } from "react-router-dom";
import AutoScroll from "@brianmcallister/react-auto-scroll";

let socket = null;

function ChatPage({ auth: { user, isAuthenticated } }) {
  useEffect(() => {
    if (user) {
      socket = connectIo(user.name);
      socket.on("usersUpate", (usersUpdated) => {
        setUsers([...usersUpdated]);
      });
      setMessage((prev) => ({ ...prev, from: user.name }));

      socket.on("recieveMessage", (rMessageObj) =>
        setMessages((prev) => [...prev, rMessageObj])
      );
    }
  }, [user]);

  const [messageObj, setMessage] = useState({
    to: null,
    from: null,
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const selectReciver = (e) => {
    const user = e.target.innerHTML;
    setMessage((prev) => ({ ...prev, to: user }));
  };

  const handleSend = () => {
    sendMessage(socket, messageObj);
    messages.push(messageObj);
    setMessage((prev) => ({ ...prev, message: " " }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      {!isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          {!user ? (
            <Loader />
          ) : (
            <div className=" container-fluid full pt-5">

              <div className=" mt-2 font-weight-bold text-secondary text-center mb-0 py-2 alert alert-primary col-md-8 mx-auto">
                {" "}
                {messageObj.to == null
                  ? "Select a user to chat"
                  : messageObj.to}
              </div>
              <div className="bg-light messages container-fluid d-flex col-md-8 py-0 px-0 full ">
                <div className="col-md-2  alert-primary mx-0">
                  <div className="btn font-weight-bold small my-2 pt-1 round">
                    Online users
                  </div>
                  <div className="btn-group-vertical">
                    {users &&
                      users.map(
                        (rUser) =>
                          rUser.name !== user.name && (
                            <div
                              className="btn "
                              key={rUser.id}
                              onClick={selectReciver}
                            >
                              {rUser.name}
                            </div>
                          )
                      )}
                  </div>
                </div>
                <div className="col-md-10  d-flex px-0 mx-0 flex-column">
                  <div className=" flex-grow-1 d-flex flex-column">
                    <div className=" card flex-grow-1 pt-2   ">
                      <AutoScroll style={{overflow:"auto"}} showOption={false} height={360}>
                        {messages.length > 0 &&
                          messages.map((message) => (
                            <Message ruser={messageObj.to} user={user.name}  message={message} />
                          ))}
                      </AutoScroll>
                    </div>
                    <div className="form mb-2 py-1 d-flex">
                      <input
                        name="message"
                        value={messageObj.message}
                        onChange={handleChange}
                        className="col-md-9 mx-1 pb-1"
                      />
                      <button
                        onClick={handleSend}
                        className="btn btn-outline-primary py-1 ml-auto mx-2 my-0 col-md-2"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
