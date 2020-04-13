import React, { Fragment } from "react";

function Message({ message, ruser, user }) {
    const myMessages = () => {
    return (
<Fragment>{message.to==ruser?
      <div className="alert alert-danger px-1 pb-0 mx-3 ">
        <p className=" usernae   mb-0 pb-0  ">
          <span className=" badge badge-pill badge-light text-secondary">{message.from}</span>{" "}
        </p>
        <p className="mx-1 ">{message.message}</p>
      </div>
    :null } </Fragment>);
  };

  const otherMessages = () => {
    console.log("message from ",message.from,"selected",ruser)
    return (
      <Fragment>
        {ruser == message.from ? (
          <div className="alert alert-success px-1 pb-0 mx-3 ">
            <p className=" usernae   mb-0 pb-0  ">
              <span className="text-secondary badge badge-pill badge-light">
                {message.from}
              </span>{" "}
            </p>
            <p className="mx-1 ">{message.message}</p>
          </div>
        ) : null}{" "}
      </Fragment>
    );
  };

  return (
    <Fragment>{user == message.from ? myMessages() : otherMessages()}</Fragment>
  );
}

export default Message;
