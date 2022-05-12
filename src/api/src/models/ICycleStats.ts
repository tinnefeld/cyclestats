/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/summary": {
    /** Returns summary about cyclist and rides */
    get: operations["getSummary"];
  };
  "/statistics": {
    /** Returns detailed statistics about cyclist and rides */
    get: operations["getStatistics"];
  };
  "/oauth/token": {
    /** Request an OAuth 2.0 token by providing an authorization code */
    post: operations["postToken"];
  };
}

export interface components {
  schemas: {
    /** @description Information about the cyclist */
    Cyclist: {
      firstName?: string;
      lastName?: string;
      sex?: string;
      location?: string;
      ftp?: number;
      weight?: number;
      profileUrl?: string;
      measurement?: components["schemas"]["MeasurementUnit"];
      longestRide?: number;
      highestClimb?: number;
    };
    /** @description Detailed statistics about cyclist and rides */
    Statistics: {
      /** @description Riding statistics summarized on a monthly basis */
      monthlySummary: {
        year: number;
        /** @description Distance in kilometers ridden in a year */
        distance?: number;
        /** @description Elevation gain in meters climbed in a year */
        elevation?: number;
        /** @description Number of rides in a year */
        rides?: number;
        /** @description Riding time in minutes */
        movingTime?: number;
        months: components["schemas"]["SummaryPerMonth"][];
      }[];
    };
    /** @description Summary info about cyclist and rides */
    Summary: {
      cyclist?: components["schemas"]["Cyclist"];
    };
    /** @description Summary of statistics on a monthly basis */
    SummaryPerMonth: {
      /** @description Month of the year where 0 is January and 11 is December */
      month: number;
      /** @description Distance in kilometers */
      distance?: number;
      /** @description Elevation gain in meters */
      elevation?: number;
      /** @description Number of rides in a month */
      rides?: number;
      /** @description Riding time in minutes */
      movingTime?: number;
    };
    /**
     * @description Indicates if imperial or metric units are used
     * @enum {string}
     */
    MeasurementUnit: "IMPERIAL" | "METRIC";
  };
}

export interface operations {
  /** Returns summary about cyclist and rides */
  getSummary: {
    responses: {
      /** success */
      200: {
        content: {
          "application/json": components["schemas"]["Summary"];
        };
      };
    };
  };
  /** Returns detailed statistics about cyclist and rides */
  getStatistics: {
    responses: {
      /** success */
      200: {
        content: {
          "application/json": components["schemas"]["Statistics"];
        };
      };
    };
  };
  /** Request an OAuth 2.0 token by providing an authorization code */
  postToken: {
    parameters: {
      query: {
        /** Authorization code used for requesting the OAuth 2.0 token */
        code: unknown;
      };
    };
    responses: {
      /** created */
      201: {
        content: {
          "application/json": {
            bearerToken?: string;
          };
        };
      };
    };
  };
}

export interface external {}
