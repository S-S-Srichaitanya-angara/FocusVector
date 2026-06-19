const express = require("express");

const authMiddleware = require(
  "../middleware/auth"
);

const AnalyticsController = require(
  "../controllers/analytics.controller"
);

const router = express.Router();

router.get(
  "/current",
  authMiddleware,
  AnalyticsController.current
);

router.get(
  "/timeline",
  authMiddleware,
  AnalyticsController.timeline
);

router.get(
  "/distractions",
  authMiddleware,
  AnalyticsController.distractions
);

router.get(
  "/focus-trend",
  authMiddleware,
  AnalyticsController.focusTrend
);

router.get(
  "/heatmap",
  authMiddleware,
  AnalyticsController.heatmap
);

router.get(
  "/focus-hours",
  authMiddleware,
  AnalyticsController.focusHours
);

router.get(
  "/insights",
  authMiddleware,
  AnalyticsController.insights
);

module.exports = router;