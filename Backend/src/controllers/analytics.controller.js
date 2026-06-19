const SessionModel = require(
  "../models/session.model"
);

const AnalyticsModel = require(
  "../models/analytics.model"
);

class AnalyticsController {
  static async current(
    req,
    res,
    next
  ) {
    try {
      const activeSession =
        SessionModel.getActiveSession(
          req.user.userId
        );

      const todayStats =
        AnalyticsModel.getTodayStats(
          req.user.userId
        );

      const taskStats =
        AnalyticsModel.getTaskStats(
          req.user.userId
        );

      let currentSessionSeconds = 0;

      if (activeSession) {
        currentSessionSeconds =
          Math.floor(
            (
              new Date() -
              new Date(
                activeSession.start_time
              )
            ) / 1000
          );
      }

      return res.status(200).json({
        status: "success",
        data: {
          isSessionActive:
            !!activeSession,

          currentSessionSeconds,

          todayStats: {
            totalFocusHours:
              Number(
                (
                  todayStats.total_focus_seconds /
                  3600
                ).toFixed(2)
              ),

            focusScore:
              Math.round(
                todayStats.average_focus_score
              ),

            completedTasksCount:
              taskStats.completed_tasks || 0,

            totalTasksCount:
              taskStats.total_tasks || 0
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
    static async timeline(
    req,
    res,
    next
    ) {
    try {
        const rows =
        AnalyticsModel.getTimelineData(
            req.user.userId
        );

        const timelineMap = {};

        rows.forEach((row) => {
        if (!timelineMap[row.time_window]) {
            timelineMap[row.time_window] = {
            timeWindow: row.time_window,
            focus: 0,
            distraction: 0,
            idle: 0
            };
        }

        timelineMap[row.time_window][
            row.event_type.toLowerCase()
        ] = row.total_duration;
        });

        return res.status(200).json({
        status: "success",
        data: Object.values(timelineMap)
        });
    } catch (error) {
        next(error);
    }
    }


    static async distractions(
  req,
  res,
  next
) {
  try {
    const rows =
      AnalyticsModel.getDistractionBreakdown(
        req.user.userId
      );

    const totalSeconds =
      rows.reduce(
        (sum, row) =>
          sum + row.total_duration,
        0
      );

    const data = rows.map((row) => ({
      app: row.app_name,
      durationMinutes: Math.round(
        row.total_duration / 60
      ),
      percentage:
        totalSeconds === 0
          ? 0
          : Math.round(
              (
                row.total_duration /
                totalSeconds
              ) * 100
            )
    }));

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
}

static async focusTrend(
  req,
  res,
  next
) {
  try {
    const trend =
      AnalyticsModel.getFocusTrend(
        req.user.userId
      );

    return res.status(200).json({
      status: "success",
      data: trend.map((row) => ({
        date: row.date,
        focusScore: row.focus_score
      }))
    });
  } catch (error) {
    next(error);
  }
}

static async heatmap(
  req,
  res,
  next
) {
  try {
    const rows =
      AnalyticsModel.getHeatmapData(
        req.user.userId
      );

    const data = rows.map((row) => {
      const hours =
        row.total_focus_seconds / 3600;

      let intensity = 0;

      if (hours > 0 && hours < 1) {
        intensity = 1;
      } else if (hours >= 1 && hours < 3) {
        intensity = 2;
      } else if (hours >= 3 && hours < 5) {
        intensity = 3;
      } else if (hours >= 5) {
        intensity = 4;
      }

      return {
        date: row.date,
        intensity,
        focusHours: Number(
          hours.toFixed(2)
        )
      };
    });

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
}

static async focusHours(
  req,
  res,
  next
) {
  try {
    const rows =
      AnalyticsModel.getFocusHours(
        req.user.userId
      );

    const data = rows.map((row) => ({
      hour: row.hour,
      focusMinutes: Math.round(
        row.focus_seconds / 60
      )
    }));

    return res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    next(error);
  }
}

static async insights(
  req,
  res,
  next
) {
  try {
    const peakWindow =
      AnalyticsModel.getPeakFocusWindow(
        req.user.userId
      );

    return res.status(200).json({
      status: "success",
      data: {
        peakFocusWindow:
          peakWindow?.hour || null,

        focusMinutes:
          peakWindow
            ? Math.round(
                peakWindow.focus_seconds /
                60
              )
            : 0
      }
    });
  } catch (error) {
    next(error);
  }
}

}

module.exports = AnalyticsController;