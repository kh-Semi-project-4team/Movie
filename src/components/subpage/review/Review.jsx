import React, { useEffect } from "react";
import jwt from "jwt-simple"; // Add jwt-simple library

// Function to generate a dummy JWT token
const generateJwtToken = () => {
  const payload = {
    userId: "dummyUserId",
    name: "John Doe",
  };
  const secret = "semi4teamsecret"; // Replace this with your actual secret
  return jwt.encode(payload, secret);
};

// Function to insert the Remark42 script
const insertScript = (id, parentElement) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.id = id;

  // Ensure the URL does not end with a trailing slash
  let url = window.location.origin + window.location.pathname;
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  // Remark42 configuration and script insertion
  script.innerHTML = `
    var remark_config = {
      host: "http://114.207.177.58:48080",
      site_id: "semi4team",
      url: "${url}",
      theme: "dark",
      components: ["embed"],
    };
    !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`
  
  parentElement.appendChild(script);
};

// Function to remove the Remark42 script
const removeScript = (id, parentElement) => {
  const script = document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

// Function to manage the script insertion and removal
const manageScript = () => {
  if (document.getElementById("remark42")) {
    insertScript("comments-script", document.body);
  }
  return () => removeScript("comments-script", document.body);
};

// Function to recreate the Remark42 instance
const recreateRemark42Instance = () => {
  const remark42 = window.REMARK42;
  if (remark42) {
    remark42.destroy();
    remark42.createInstance(window.remark_config);
  }
};

const Comments = () => {
  useEffect(() => {
    // Generate and set the JWT token as a header
    const jwtToken = generateJwtToken();
    window.localStorage.setItem("jwtToken", jwtToken); // Optionally store it for later use

    manageScript();
    recreateRemark42Instance();
  }, []);

  return (
    <>
      <h2>Comments</h2>
      <div id="remark42"></div>
    </>
  );
};

export default Comments;
