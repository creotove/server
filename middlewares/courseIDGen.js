export async function addCourseId(req, res, next) {
  try {
   next()
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
