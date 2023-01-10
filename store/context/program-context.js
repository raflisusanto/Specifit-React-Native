import { createContext, useState, useContext, useEffect } from "react";
import { DataContext } from "./data-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { AuthContext } from "./auth-context";
import { Alert } from "react-native";

export const ProgramContext = createContext({
  addBookmark: (id) => {},
  removeBookmark: (id) => {},
  addProgram: (id) => {},
  removeProgram: (id) => {},
  updateProgramStatus: (data) => {},
  setUsedProgramIds: () => {},
  setBookmarkedProgramIds: () => {},
  setProgramStatus: () => {},
  getProgramStatus: () => {},
  updateUserProgramStatus: () => {},
  programList: [],
  bookmarkList: [],
});

function ProgramContextProvider({ children }) {
  const programDataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const initialProgramList = programDataCtx.PROGRAMS.filter(
    (program) => program.status
  ).map((program) => program.id);

  const initialBookmarkList = programDataCtx.PROGRAMS.filter(
    (program) => program.isBookmarked
  ).map((program) => program.id);

  const [usedProgramIds, setUsedProgramIds] = useState(initialProgramList);
  const [bookmarkedProgramIds, setBookmarkedProgramIds] =
    useState(initialBookmarkList);
  const [programStatus, setProgramStatus] = useState(null);

  useEffect(() => {
    sendData();
  }, [bookmarkedProgramIds, usedProgramIds]);

  async function updateProgramStatus(data) {
    if (data) {
      try {
        await updateDoc(doc(db, "programstatus", authCtx.currentUid), data);
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  }

  const getProgramStatus = async () => {
    if (authCtx?.currentUid !== null) {
      try {
        const data = await getDoc(doc(db, "programstatus", authCtx.currentUid));
        const programStatus = data.data();
        setProgramStatus(programStatus);
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  };

  useEffect(() => {
    getProgramStatus();
  }, []);

  async function sendData() {
    if (usedProgramIds && bookmarkedProgramIds && programStatus) {
      let statusDayData = [];
      for (let i = 0; i < usedProgramIds.length; i++) {
        const statusDay = programDataCtx.PROGRAMS.filter(
          (program) => program.id === usedProgramIds[i]
        ).map((program) => {
          return { id: program.id, statusDayList: program.statusDayList };
        });
        statusDayData.push(statusDay[0]);
      }

      const sendData = {
        programid: usedProgramIds,
        statusDay: statusDayData,
        bookmark: bookmarkedProgramIds,
      };

      updateProgramStatus(sendData);

      setProgramStatus((currStatus) => {
        return { ...currStatus, ...sendData };
      });
    }
  }

  function addProgram(id) {
    setUsedProgramIds((currentProgramIds) => [...currentProgramIds, id]);
    sendData();
  }

  function removeProgram(id) {
    setUsedProgramIds((currentProgramIds) =>
      currentProgramIds.filter((programId) => programId !== id)
    );
    sendData();
  }

  function addBookmark(id) {
    setBookmarkedProgramIds((currentBookmarkedIds) => [
      ...currentBookmarkedIds,
      id,
    ]);
    sendData();
  }

  function removeBookmark(id) {
    setBookmarkedProgramIds((currentBookmarkedIds) =>
      currentBookmarkedIds.filter((programId) => programId !== id)
    );
    sendData();
  }

  const value = {
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
    addProgram: addProgram,
    removeProgram: removeProgram,
    updateProgramStatus: updateProgramStatus,
    setUsedProgramIds: setUsedProgramIds,
    setBookmarkedProgramIds: setBookmarkedProgramIds,
    setProgramStatus: setProgramStatus,
    getProgramStatus: getProgramStatus,
    updateUserProgramStatus: sendData,
    programList: usedProgramIds,
    bookmarkList: bookmarkedProgramIds,
  };

  return (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
  );
}

export default ProgramContextProvider;
