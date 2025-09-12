import React, { createContext, useState, useEffect, useCallback } from "react";
import { postRequest,  apiurl} from '../service/Axios';

import io from "socket.io-client";
const socket = io(`${apiurl}`);

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [currentmatch, setCurrentmatch] = useState([]);
  const [nextMatch, setNextMatch] = useState([]);
  const [teams, setTeams] = useState([]);

  const getcurrentmatch = useCallback(async () => {
    try {
      const response = await postRequest("api/website", {
        req_type: "get-current-match",
      });

      if (response.success) {
        setCurrentmatch(response.datalist.currentMatches);
        setNextMatch(response.datalist.upcomingMatches);
        setTeams(response.datalist.teams);     
      }
      
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  }, []);

  useEffect(() => {
    getcurrentmatch();

    socket.on("matchUpdate", (data) => {
      setCurrentmatch(data.currentMatches);
      setNextMatch(data.upcomingMatches);
      setTeams(data.teams);
    });

    return () => {
      socket.off("matchUpdate");
    };
  }, [getcurrentmatch]);

  return (
    <MatchContext.Provider
      value={{ currentmatch, nextMatch, teams, getcurrentmatch }}
    >
      {children}
    </MatchContext.Provider>
  );
};
