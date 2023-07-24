"use client";
const logger = (store: any) => (next: any) => (action: any) => {
  //   console.group(action.type);
  //   console.log("The action: ", action);
  //   const value = next(action);
  //   console.log("The new state: ", store.getState());
  //   console.groupEnd();
  return next(action);
};

export default logger;
