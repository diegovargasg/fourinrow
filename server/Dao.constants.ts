//Because Redis could not use normal booleans as return responses for GET and SET
//this consts object is defined as mapper for normal responses
export const redisDaoConst = {
  true: "OK",
  false: "",
};

export const normalDaoConst = {
  true: true,
  false: false,
};
