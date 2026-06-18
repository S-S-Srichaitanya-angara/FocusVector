const SessionModel = require(
  "../models/session.model"
);
const SessionEventModel = require(
  "../models/sessionEvent.model"
);
const calculateFocusScore = require(
  "../utils/focusScore"
);
const TaskModel = require(
  "../models/task.model"
);
class SessionController {
  /*
  |--------------------------------------------------------------------------
  | Start Session
  |--------------------------------------------------------------------------
  */

  static async start(
    req,
    res,
    next
  ) {
    try {
      const existingSession =
        SessionModel.getActiveSession(
          req.user.userId
        );

      if (existingSession) {
        return res.status(409).json({
          status: "error",
          message:
            "Session already active"
        });
      }

      const sessionId =
        SessionModel.create(
          req.user.userId
        );

      return res.status(201).json({
        status: "success",
        sessionId
      });
    } catch (error) {
      next(error);
    }
  }
  /*
|--------------------------------------------------------------------------
| Current Session
|--------------------------------------------------------------------------
*/

static async current(
  req,
  res,
  next
) {
  try {
    const session =
      SessionModel.getCurrentSessionSummary(
        req.user.userId
      );

    if (!session) {
      return res.status(200).json({
        status: "success",
        data: {
          isSessionActive: false
        }
      });
    }

    const startTime =
      new Date(session.start_time);

    const now = new Date();

    const currentSessionSeconds =
      Math.floor(
        (now - startTime) / 1000
      );

    return res.status(200).json({
      status: "success",
      data: {
        isSessionActive: true,
        sessionId: session.id,
        currentSessionSeconds
      }
    });
  } catch (error) {
    next(error);
  }
}
/*
|--------------------------------------------------------------------------
| End Session
|--------------------------------------------------------------------------
*/

static async end(
  req,
  res,
  next
) {
  try {
    const session =
      SessionModel.getActiveSession(
        req.user.userId
      );

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "No active session found"
      });
    }

    const metrics =
      SessionEventModel.aggregateSession(
        session.id
      );

    const focusScore =
      calculateFocusScore({
        focusSeconds:
          metrics.focusSeconds,
        distractionSeconds:
          metrics.distractionSeconds,
        idleSeconds:
          metrics.idleSeconds,
        taskCompletionRate
      });

    SessionModel.endSession(
      session.id,
      metrics.focusSeconds,
      metrics.distractionSeconds,
      metrics.idleSeconds,
      focusScore
    );

    return res.status(200).json({
      status: "success",
      data: {
        sessionId: session.id,
        focusSeconds:
          metrics.focusSeconds,
        distractionSeconds:
          metrics.distractionSeconds,
        idleSeconds:
          metrics.idleSeconds,
        taskCompletionRate,
        focusScore
      }
    });
  } catch (error) {
    next(error);
  }
}
}

module.exports = SessionController;