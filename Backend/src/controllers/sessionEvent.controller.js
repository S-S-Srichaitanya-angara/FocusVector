const SessionModel = require(
  "../models/session.model"
);

const SessionEventModel = require(
  "../models/sessionEvent.model"
);

class SessionEventController {
  static async create(
    req,
    res,
    next
  ) {
    try {
      const {
        sessionId,
        eventType,
        appName,
        windowTitle,
        startTime,
        endTime,
        durationSeconds
      } = req.body;

      const session =
        SessionModel.findById(
          sessionId
        );

      if (!session) {
        return res.status(404).json({
          status: "error",
          message: "Session not found"
        });
      }

      const eventId =
        SessionEventModel.create({
          sessionId,
          eventType,
          appName,
          windowTitle,
          startTime,
          endTime,
          durationSeconds
        });

      return res.status(201).json({
        status: "success",
        eventId
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SessionEventController;