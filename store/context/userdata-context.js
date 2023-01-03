import { createContext, useState } from "react";

export const UserdataContext = createContext({
  addUserdata: (key, value) => {},
  calculateIMT: () => {},
  calculateCalPerDay: () => {},
  calculateRecommendation: () => {},
  userdata: {},
});

function UserdataContextProvider({ children }) {
  const initialProgramFilter = {
    loseweight: false,
    gainweight: false,
    agility: false,
    fatburn: false,
    strength: false,
    calist: false,
    gemuk: false,
    normal: false,
    kurus: false,
    injury: false,
    item: false,
    recommend: false,
    sevendays: false,
    fourteendays: false,
    morefourteen: false,
  };

  const initialUserdata = {
    gender: "",
    age: "",
    height: "",
    weight: "",
    activity: "",
    medicalCondition: "",
    isFilled: false,
    recommendation: initialProgramFilter,
    imt: 0,
    imtStatus: "",
    calPerDayHold: 0,
    calPerDayLose: 0,
  };

  const [userdata, setUserdata] = useState(initialUserdata);

  function addUserdata(key, value) {
    setUserdata((currUserdata) => {
      return { ...currUserdata, [key]: value };
    });
  }

  function calculateIMT() {
    const heightMeter = userdata.height / 100;
    const IMT = userdata.weight / (heightMeter * heightMeter);
    addUserdata("imt", IMT.toFixed(1));

    if (IMT > 17 && IMT < 18.5) {
      addUserdata("imtStatus", "Kurus");
    } else if (IMT >= 18.5 && IMT <= 25) {
      addUserdata("imtStatus", "Normal");
    } else if (IMT > 25 && IMT <= 27) {
      addUserdata("imtStatus", "Gemuk");
    } else if (IMT > 27) {
      addUserdata("imtStatus", "Obesitas");
    }
  }

  function calculateCalPerDay() {
    let BMR;
    let TDEE;
    if (userdata.gender === 1) {
      BMR =
        userdata.height * 6.25 +
        userdata.weight * 9.99 -
        userdata.age * 4.92 +
        5;
      if (userdata.activity === 1) {
        TDEE = BMR * 1.2;
      } else if (userdata.activity === 2) {
        TDEE = BMR * 1.375;
      } else if (userdata.activity === 3) {
        TDEE = BMR * 1.725;
      } else if (userdata.activity === 4) {
        TDEE = BMR * 1.9;
      }
    } else if (userdata.gender === 2) {
      BMR =
        userdata.height * 6.25 +
        userdata.weight * 9.99 -
        userdata.age * 4.92 -
        161;
      if (userdata.activity === 1) {
        TDEE = BMR * 1.1;
      } else if (userdata.activity === 2) {
        TDEE = BMR * 1.275;
      } else if (userdata.activity === 3) {
        TDEE = BMR * 1.35;
      } else if (userdata.activity === 4) {
        TDEE = BMR * 1.525;
      }
    }
    addUserdata("calPerDayHold", Math.round(TDEE));
    addUserdata("calPerDayLose", Math.round(TDEE - 500));
  }

  function calculateRecommendation() {
    // Dummy Recommendation
    let recommendation = [];
    if (userdata.imtStatus === "Gemuk" || userdata.imtStatus === "Obesitas") {
      recommendation = ["loseweight", "fatburn", "gemuk"];
    } else if (userdata.imtStatus === "Kurus") {
      recommendation = ["gainweight", "kurus", "strength"];
    } else if (userdata.imtStatus === "Normal") {
      recommendation = ["normal", "recommend"];
    }

    // Set Recommendation
    let newRecommendation = initialProgramFilter;
    for (let i = 0; i < recommendation.length; i++) {
      newRecommendation[recommendation[i]] = true;
    }

    addUserdata("recommendation", newRecommendation);
  }

  const value = {
    addUserdata: addUserdata,
    calculateIMT: calculateIMT,
    calculateCalPerDay: calculateCalPerDay,
    calculateRecommendation: calculateRecommendation,
    userdata: userdata,
  };

  return (
    <UserdataContext.Provider value={value}>
      {children}
    </UserdataContext.Provider>
  );
}

export default UserdataContextProvider;
