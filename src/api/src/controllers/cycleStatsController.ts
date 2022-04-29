import * as express from "express";
import { StatisticsService } from "../services/StatisticsService.js";

export async function getStatistics(req: express.Request, res: express.Response): Promise<void> {
  const statisticsService = new StatisticsService();
  const result = await statisticsService.createStatistics();
  res.json(result);
}

export async function getSummary(req: express.Request, res: express.Response): Promise<void> {
  const statisticsService = new StatisticsService();
  const result = await statisticsService.createSummary();
  res.json(result);
}
