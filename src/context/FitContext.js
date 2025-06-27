// src/context/FitContext.js
import { createContext, useContext, useState } from "react";

const FitContext = createContext();

export const FitProvider = ({ children }) => {
  const [fits, setFits] = useState([]);
  const [user, setUser] = useState("you");

  // NEW: user profile data
  const [profiles, setProfiles] = useState({
    you: {
      bio: "Fashion enthusiast. Always dripped out.",
    },
    ken_drip: {
      bio: "King of monochrome.",
    },
    mel_fits: {
      bio: "Thrift is my game.",
    },
    joyce_fit: {
      bio: "on sum calm shi",
    },
  });

  const updateBio = (username, newBio) => {
    setProfiles((prev) => ({
      ...prev,
      [username]: { ...prev[username], bio: newBio },
    }));
  };

  return (
    <FitContext.Provider
      value={{ fits, setFits, user, setUser, profiles, updateBio }}
    >
      {children}
    </FitContext.Provider>
  );
};

export const useFit = () => useContext(FitContext);
