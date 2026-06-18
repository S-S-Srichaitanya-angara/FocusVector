const TaskModel = require(
  "../models/task.model"
);

class TaskController {
  static async create(
    req,
    res,
    next
  ) {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({
          status: "error",
          message: "Title required"
        });
      }

      const taskId =
        TaskModel.create(
          req.user.userId,
          title
        );

      return res.status(201).json({
        status: "success",
        taskId
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req,
    res,
    next
  ) {
    try {
      const tasks =
        TaskModel.getAll(
          req.user.userId
        );

      return res.json({
        status: "success",
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }

  static async complete(
    req,
    res,
    next
  ) {
    try {
      TaskModel.complete(
        req.params.id,
        req.user.userId
      );

      return res.json({
        status: "success"
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;