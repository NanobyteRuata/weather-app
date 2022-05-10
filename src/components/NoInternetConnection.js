import React, { useState, useEffect } from "react";

const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (isOnline) {
    return props.children;
  } else {
    return <h3>No Internet Connection</h3>;
  }
};

export default NoInternetConnection;
