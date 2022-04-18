import * as express from "express";

export async function getStatistics(req: express.Request, res: express.Response): Promise<void> {
  res.send("statistics");
}

export async function getSummary(req: express.Request, res: express.Response): Promise<void> {
  res.send("summary");
}
