import Workout from "../models/workout";
import WorkoutProgram from "../models/workout-program";
import Tips from "../models/tips";

export const WORKOUTS = [
  new Workout(
    "w1",
    "https://reactnative.dev/img/tiny_logo.png",
    "Olahraga Satu",
    ["Push Up", "Pull Up"],
    ["2 Menit", "1 Menit"],
    "3 Menit",
    "Test Deskripsi",
    "https://www.youtube.com/watch?v=hzQj0O09q7U&ab_channel=PrinceY",
    "10 Menit",
    ["Arms", "Chest"]
  ),
  new Workout(
    "w2",
    "https://reactnative.dev/img/tiny_logo.png",
    "Olahraga Dua",
    ["Push Up", "Pull Up"],
    ["2 Menit", "1 Menit"],
    "3 Menit",
    "Test Deskripsi",
    "https://www.youtube.com/watch?v=hzQj0O09q7U&ab_channel=PrinceY",
    "10 Menit",
    ["Shoulder", "Fat Burning"]
  ),
  new Workout(
    "w3",
    "https://reactnative.dev/img/tiny_logo.png",
    "Olahraga Tiga",
    ["Push Up", "Pull Up"],
    ["2 Menit", "1 Menit"],
    "3 Menit",
    "Test Deskripsi",
    "https://www.youtube.com/watch?v=hzQj0O09q7U&ab_channel=PrinceY",
    "10 Menit",
    ["Legs"]
  ),
  new Workout(
    "w4",
    "https://reactnative.dev/img/tiny_logo.png",
    "Olahraga Empat",
    ["Push Up", "Pull Up"],
    ["2 Menit", "1 Menit"],
    "3 Menit",
    "Test Deskripsi",
    "https://www.youtube.com/watch?v=hzQj0O09q7U&ab_channel=PrinceY",
    "10 Menit",
    ["> 10 Menit"]
  ),
];

export const PROGRAMS = [
  new WorkoutProgram(
    "p1",
    "Program 1",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    true,
    "https://reactnative.dev/img/tiny_logo.png",
    ["Lose Weight", "Fat Burn"],
    [
      [
        WORKOUTS.find((workout) => workout.id === "w1"),
        WORKOUTS.find((workout) => workout.id === "w3"),
      ],
      [
        WORKOUTS.find((workout) => workout.id === "w2"),
        WORKOUTS.find((workout) => workout.id === "w4"),
      ],
    ]
  ),
  new WorkoutProgram(
    "p2",
    "Program 2",
    "Ini desk",
    false,
    "https://reactnative.dev/img/tiny_logo.png",
    ["Lose Weight", "Fat Burn"],
    [
      [
        WORKOUTS.find((workout) => workout.id === "w1"),
        WORKOUTS.find((workout) => workout.id === "w3"),
      ],
      [
        WORKOUTS.find((workout) => workout.id === "w2"),
        WORKOUTS.find((workout) => workout.id === "w4"),
      ],
    ]
  ),
  new WorkoutProgram(
    "p3",
    "Program 3",
    "Ini desk",
    true,
    "https://reactnative.dev/img/tiny_logo.png",
    ["Lose Weight", "Fat Burn"],
    [
      [
        WORKOUTS.find((workout) => workout.id === "w1"),
        WORKOUTS.find((workout) => workout.id === "w3"),
      ],
      [
        WORKOUTS.find((workout) => workout.id === "w2"),
        WORKOUTS.find((workout) => workout.id === "w4"),
      ],
    ]
  ),
  new WorkoutProgram(
    "p4",
    "Program 4",
    "Ini desk",
    false,
    "https://reactnative.dev/img/tiny_logo.png",
    ["Lose Weight", "Fat Burn"],
    [
      [
        WORKOUTS.find((workout) => workout.id === "w1"),
        WORKOUTS.find((workout) => workout.id === "w3"),
      ],
      [
        WORKOUTS.find((workout) => workout.id === "w2"),
        WORKOUTS.find((workout) => workout.id === "w4"),
      ],
    ]
  ),
];

export const TIPS = [
  new Tips(
    "t1",
    "https://reactnative.dev/img/tiny_logo.png",
    "ini contoh artikel",
    "Rafli",
    "Kapan Waktu yang Tepat untuk Berolahraga?",
    "2022-10-10"
  ),
  new Tips(
    "t2",
    "https://reactnative.dev/img/tiny_logo.png",
    "ini contoh artikel",
    "Rafli",
    "Olahraga untuk tidur yang Lebih Nyenyak",
    "2022-10-10"
  ),
];
