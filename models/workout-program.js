class WorkoutProgram {
    constructor(id, title, desc, status, img, ctgList, workoutList) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.status = status;
        this.img = img;
        this.ctgList = ctgList;
        this.workoutList = workoutList;
        this.statusDayList = this.initializeStatus();
    }

    initializeStatus() {
        let statusDayList = []
        for (let i = 0; i < this.workoutList.length; i++) {
            statusDayList.push(0);
        }
        return statusDayList;
    }
}

export default WorkoutProgram;