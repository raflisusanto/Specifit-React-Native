import Workout from "../../models/workout";
import WorkoutProgram from "../../models/workout-program";
import Tips from "../../models/tips";
import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../../config/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";

export const DataContext = createContext({
  TIPS: [],
  WORKOUTS: [],
  PROGRAMS: [],
  STATUS: [],
  getTips: () => {},
  getWorkoutData: () => {},
  getWorkoutProgramData: () => {},
  getProgramStatus: () => {},
  setProgramStatus: () => {},
});

function DataContextProvider({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [tips, setTips] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutProgramData, setWorkoutProgramData] = useState([]);
  const [programStatus, setProgramStatus] = useState(null);
  const tipsCollectionRef = collection(db, "tips");
  const workoutDataCollectionRef = collection(db, "workout");
  const workoutProgramDataColRef = collection(db, "workoutprogram");
  const programStatusDoc = doc(db, "programstatus", user.uid);

  const getTips = async () => {
    try {
      const data = await getDocs(tipsCollectionRef);
      const listTips = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTips(makeTipsObjects(listTips));
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const getWorkoutData = async () => {
    try {
      const data = await getDocs(workoutDataCollectionRef);
      const listWorkoutData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWorkoutData(makeWorkoutObjects(listWorkoutData));
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const getWorkoutProgramData = async () => {
    try {
      const data = await getDocs(workoutProgramDataColRef);
      const listWorkoutProgramData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWorkoutProgramData(makeWorkoutProgramObjects(listWorkoutProgramData));
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const getProgramStatus = async () => {
    try {
      const data = await getDoc(programStatusDoc);
      const programStatus = data.data();
      setProgramStatus(programStatus);
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  useEffect(() => {
    getProgramStatus();
    getWorkoutData();
    getTips();
    getWorkoutProgramData();
  }, []);

  useEffect(() => {
    getWorkoutProgramData();
  }, [workoutData, programStatus]);

  function makeWorkoutObjects(listWorkoutData) {
    let objList = [];
    for (let i = 0; i < listWorkoutData.length; i++) {
      const workout = new Workout(
        listWorkoutData[i].workoutid,
        listWorkoutData[i].img,
        listWorkoutData[i].title,
        listWorkoutData[i].workoutList,
        listWorkoutData[i].workoutEsts,
        listWorkoutData[i].totalEst,
        listWorkoutData[i].desc,
        listWorkoutData[i].vid,
        listWorkoutData[i].est,
        listWorkoutData[i].ctgList
      );
      objList.push(workout);
    }
    return objList;
  }

  function searchStatusDay(programStatusDay, id) {
    for (let i = 0; i < programStatusDay.length; i++) {
      if (programStatusDay[i].id === id) {
        return programStatusDay[i].statusDayList;
      }
    }
    return null;
  }

  function makeWorkoutProgramObjects(listWorkoutProgramData) {
    let objList = [];
    for (let i = 0; i < listWorkoutProgramData.length; i++) {
      const workoutProgram = new WorkoutProgram(
        listWorkoutProgramData[i].programid,
        listWorkoutProgramData[i].title,
        listWorkoutProgramData[i].desc,
        listWorkoutProgramData[i].img,
        listWorkoutProgramData[i].ctgList,
        listWorkoutProgramData[i].workouts
      );

      // Initialize Workout List
      let listWorkout = [];
      for (let j = 0; j < listWorkoutProgramData[i].workouts.length; j++) {
        let listWorkoutInner = [];
        let arrWorkout = listWorkoutProgramData[i].workouts[j].split(", ");
        for (let k = 0; k < arrWorkout.length; k++) {
          listWorkoutInner.push(
            workoutData.find((workout) => workout.id === arrWorkout[k])
          );
        }
        listWorkout.push(listWorkoutInner);
      }

      // Set the Workout List
      workoutProgram.setWorkoutList(listWorkout);

      // Set Status
      if (programStatus) {
        const startedProgram = programStatus.programid;
        if (
          startedProgram.length > 0 &&
          startedProgram.includes(workoutProgram.id)
        ) {
          workoutProgram.setStatus(true);
        } else {
          workoutProgram.setStatus(false);
        }

        // Set Status Day List
        if (programStatus.statusDay.length > 0) {
          const statusDayList = searchStatusDay(
            programStatus.statusDay,
            workoutProgram.id
          );
          if (statusDayList !== null) {
            workoutProgram.setStatusDayList(statusDayList);
          } else {
            workoutProgram.initializeStatus();
          }
        } else {
          workoutProgram.initializeStatus();
        }

        // Set Bookmark Status
        const bookmarkedProgram = programStatus.bookmark;
        if (
          bookmarkedProgram.length > 0 &&
          bookmarkedProgram.includes(workoutProgram.id)
        ) {
          workoutProgram.setIsBookmarked(true);
        } else {
          workoutProgram.setIsBookmarked(false);
        }
      } else {
        workoutProgram.setStatus(false);
        workoutProgram.initializeStatus();
        workoutProgram.setIsBookmarked(false);
      }

      // Push Workout Program
      objList.push(workoutProgram);
    }
    return objList;
  }

  function makeTipsObjects(listTipsData) {
    let objList = [];
    for (let i = 0; i < listTipsData.length; i++) {
      const tips = new Tips(
        listTipsData[i].id,
        listTipsData[i].img,
        listTipsData[i].article,
        listTipsData[i].author,
        listTipsData[i].title,
        listTipsData[i].date
      );
      objList.push(tips);
    }
    return objList;
  }

  const value = {
    TIPS: tips,
    WORKOUTS: workoutData,
    PROGRAMS: workoutProgramData,
    STATUS: programStatus,
    getTips: getTips,
    getWorkoutData: getWorkoutData,
    getWorkoutProgramData: getWorkoutProgramData,
    getProgramStatus: getProgramStatus,
    setProgramStatus: setProgramStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
