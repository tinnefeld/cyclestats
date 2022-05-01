import * as express from "express";
import { AuthCode, BearerToken } from "../models/IUtils";
import { StatisticsService } from "../services/StatisticsService.js";
import { StravaImportService } from "../services/StravaImportService.js";

export async function getStatistics(req: express.Request, res: express.Response): Promise<void> {
  if (!req.headers.authorization) {
    res.status(400).send("Missing bearer token");
  }
  const statisticsService = new StatisticsService(req.headers.authorization as BearerToken);
  const result = await statisticsService.createStatistics();
  res.json(result);
}

export async function getSummary(req: express.Request, res: express.Response): Promise<void> {
  if (!req.headers.authorization) {
    res.status(400).send("Missing bearer token");
  }
  const statisticsService = new StatisticsService(req.headers.authorization as BearerToken);
  const result = await statisticsService.createSummary();
  res.json(result);
}

export async function postToken(req: express.Request, res: express.Response): Promise<void> {
  if (!req.query.code) {
    res.status(400).send("Missing authorization code");
  }
  const stravaService = new StravaImportService();
  const result = await stravaService.getOAuthToken(req.query.code as AuthCode);
  if (result.status === 200 || result.status === 201) {
    const data: any = await result.json();
    res.status(201).json({
      bearerToken: data.access_token
    });
  } else {
    res.status(result.status).send(result.statusText);
  }
}
