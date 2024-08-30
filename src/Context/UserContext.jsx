import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Create a Context object for user information.
export let UserContext = createContext();

export default function UserContextProvider(props) {
  // Declare state variables for the token and user ID.
  const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") ? localStorage.getItem("userName") : null
  );

  // Effect to store the token and extract the user ID when `UserLogin` changes.
  useEffect(() => {
    if (UserLogin) {
      localStorage.setItem("userToken", UserLogin);
      // Decode the token to extract the user ID and set it in state and localStorage.
      const decodedToken = jwtDecode(UserLogin);
      setUserId(decodedToken.id);
      setUserName(decodedToken.name);
      localStorage.setItem("userId", decodedToken.id, decodedToken.name);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setUserId(null);
    }
  }, [UserLogin]);

  // Provide `UserLogin`, `setUserLogin`, and `userId` to any child components.
  return (
    <UserContext.Provider value={{ UserLogin, setUserLogin, userId, userName }}>
      {props.children}
    </UserContext.Provider>
  );
}
