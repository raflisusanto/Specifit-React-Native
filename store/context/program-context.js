import { createContext, useState } from "react";
import { PROGRAMS } from "../../data/dummy-data";

export const ProgramContext = createContext({
  addBookmark: (id) => {},
  removeBookmark: (id) => {},
  addProgram: (id) => {},
  removeProgram: (id) => {},
  programList: [],
  bookmarkList: [],
});

function ProgramContextProvider({ children }) {
  function filterPrograms(program) {
    if (program.status) {
      return program.id;
    }
  }

  function filterBookmark(program) {
    if (program.isBookmarked) {
      return program.id;
    }
  }

  const initialProgramList = PROGRAMS.filter((program) => program.status).map((program) => program.id);
  const initialBookmarkList = PROGRAMS.filter((program) => program.isBookmarked).map((program) => program.id);
  const [usedProgramIds, setUsedProgramIds] = useState(initialProgramList);
  const [bookmarkedProgramIds, setBookmarkedProgramIds] = useState(initialBookmarkList);

  function addProgram(id) {
    setUsedProgramIds((currentProgramIds) => [...currentProgramIds, id]);
  }

  function removeProgram(id) {
    setUsedProgramIds((currentProgramIds) =>
      currentProgramIds.filter((programId) => programId !== id)
    );
  }

  function addBookmark(id) {
    setBookmarkedProgramIds((currentBookmarkedIds) => [
      ...currentBookmarkedIds,
      id,
    ]);
  }

  function removeBookmark(id) {
    setBookmarkedProgramIds((currentBookmarkedIds) =>
      currentBookmarkedIds.filter((programId) => programId !== id)
    );
  }

  const value = {
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
    addProgram: addProgram,
    removeProgram: removeProgram,
    programList: usedProgramIds,
    bookmarkList: bookmarkedProgramIds,
  };

  return (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
  );
}

export default ProgramContextProvider;