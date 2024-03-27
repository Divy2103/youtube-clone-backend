const AsyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      res.status(err.status || 500).json({
        success: false,
        message: err.message,
      });
    });
  };
};

export { AsyncHandler };

// const asyncHandler = () => {};
// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => {() => {}};
// const asyncHandler = (fn) => async () => {};

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {

//     await fn(req, res, next);

//   } catch (error) {

//     res.status(error.status || 500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };
