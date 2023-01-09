class WorkoutProgram {
  constructor(id, title, desc, img, ctgList, workouts) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.status = false;
    this.img = img;
    this.ctgList = ctgList;
    this.workouts = workouts;
    this.workoutList = [];
    this.statusDayList = [];
    this.isBookmarked = false;
  }

  initializeStatus() {
    let statusDayList = [];
    for (let i = 0; i < this.workoutList.length; i++) {
      statusDayList.push(0);
    }
    this.statusDayList = statusDayList;
  }

  setIsBookmarked(status) {
    this.isBookmarked = status;
  }

  setStatusDay(idx, val) {
    this.statusDayList[idx] = val;
  }

  setStatusDayList(statusDayList) {
    this.statusDayList = statusDayList;
  }

  setStatus(status) {
    this.status = status;
  }

  setWorkoutList(workoutList) {
    this.workoutList = workoutList;
  }
}

export default WorkoutProgram;
