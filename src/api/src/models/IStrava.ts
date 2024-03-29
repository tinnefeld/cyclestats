/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {}

export interface definitions {
  DetailedActivity: definitions["SummaryActivity"] & {
    /** @description The description of the activity */
    description?: string;
    photos?: definitions["PhotosSummary"];
    gear?: definitions["SummaryGear"];
    /**
     * Format: float
     * @description The number of kilocalories consumed during this activity
     */
    calories?: number;
    segment_efforts?: definitions["DetailedSegmentEffort"][];
    /** @description The name of the device used to record the activity */
    device_name?: string;
    /** @description The token used to embed a Strava activity */
    embed_token?: string;
    /** @description The splits of this activity in metric units (for runs) */
    splits_metric?: definitions["Split"][];
    /** @description The splits of this activity in imperial units (for runs) */
    splits_standard?: definitions["Split"][];
    laps?: definitions["Lap"][];
    best_efforts?: definitions["DetailedSegmentEffort"][];
  };
  SummaryActivity: definitions["MetaActivity"] & {
    /** @description The identifier provided at upload time */
    external_id?: string;
    /**
     * Format: int64
     * @description The identifier of the upload that resulted in this activity
     */
    upload_id?: number;
    athlete?: definitions["MetaAthlete"];
    /** @description The name of the activity */
    name?: string;
    /**
     * Format: float
     * @description The activity's distance, in meters
     */
    distance?: number;
    /** @description The activity's moving time, in seconds */
    moving_time?: number;
    /** @description The activity's elapsed time, in seconds */
    elapsed_time?: number;
    /**
     * Format: float
     * @description The activity's total elevation gain.
     */
    total_elevation_gain?: number;
    /**
     * Format: float
     * @description The activity's highest elevation, in meters
     */
    elev_high?: number;
    /**
     * Format: float
     * @description The activity's lowest elevation, in meters
     */
    elev_low?: number;
    type?: definitions["ActivityType"];
    /**
     * Format: date-time
     * @description The time at which the activity was started.
     */
    start_date?: string;
    /**
     * Format: date-time
     * @description The time at which the activity was started in the local timezone.
     */
    start_date_local?: string;
    /** @description The timezone of the activity */
    timezone?: string;
    start_latlng?: definitions["LatLng"];
    end_latlng?: definitions["LatLng"];
    /** @description The number of achievements gained during this activity */
    achievement_count?: number;
    /** @description The number of kudos given for this activity */
    kudos_count?: number;
    /** @description The number of comments for this activity */
    comment_count?: number;
    /** @description The number of athletes for taking part in a group activity */
    athlete_count?: number;
    /** @description The number of Instagram photos for this activity */
    photo_count?: number;
    /** @description The number of Instagram and Strava photos for this activity */
    total_photo_count?: number;
    map?: definitions["PolylineMap"];
    /** @description Whether this activity was recorded on a training machine */
    trainer?: boolean;
    /** @description Whether this activity is a commute */
    commute?: boolean;
    /** @description Whether this activity was created manually */
    manual?: boolean;
    /** @description Whether this activity is private */
    private?: boolean;
    /** @description Whether this activity is flagged */
    flagged?: boolean;
    /** @description The activity's workout type */
    workout_type?: number;
    /** @description The unique identifier of the upload in string format */
    upload_id_str?: string;
    /**
     * Format: float
     * @description The activity's average speed, in meters per second
     */
    average_speed?: number;
    /**
     * Format: float
     * @description The activity's max speed, in meters per second
     */
    max_speed?: number;
    /** @description Whether the logged-in athlete has kudoed this activity */
    has_kudoed?: boolean;
    /** @description Whether the activity is muted */
    hide_from_home?: boolean;
    /** @description The id of the gear for the activity */
    gear_id?: string;
    /**
     * Format: float
     * @description The total work done in kilojoules during this activity. Rides only
     */
    kilojoules?: number;
    /**
     * Format: float
     * @description Average power output in watts during this activity. Rides only
     */
    average_watts?: number;
    /** @description Whether the watts are from a power meter, false if estimated */
    device_watts?: boolean;
    /** @description Rides with power meter data only */
    max_watts?: number;
    /** @description Similar to Normalized Power. Rides with power meter data only */
    weighted_average_watts?: number;
  };
  MetaActivity: {
    /**
     * Format: int64
     * @description The unique identifier of the activity
     */
    id?: number;
  };
  UpdatableActivity: {
    /** @description Whether this activity is a commute */
    commute?: boolean;
    /** @description Whether this activity was recorded on a training machine */
    trainer?: boolean;
    /** @description Whether this activity is muted */
    hide_from_home?: boolean;
    /** @description The description of the activity */
    description?: string;
    /** @description The name of the activity */
    name?: string;
    type?: definitions["ActivityType"];
    /** @description Identifier for the gear associated with the activity. ‘none’ clears gear from activity */
    gear_id?: string;
  };
  /** @description A set of rolled-up statistics and totals for an athlete */
  ActivityStats: {
    /**
     * Format: double
     * @description The longest distance ridden by the athlete.
     */
    biggest_ride_distance?: number;
    /**
     * Format: double
     * @description The highest climb ridden by the athlete.
     */
    biggest_climb_elevation_gain?: number;
    /** @description The recent (last 4 weeks) ride stats for the athlete. */
    recent_ride_totals?: definitions["ActivityTotal"];
    /** @description The recent (last 4 weeks) run stats for the athlete. */
    recent_run_totals?: definitions["ActivityTotal"];
    /** @description The recent (last 4 weeks) swim stats for the athlete. */
    recent_swim_totals?: definitions["ActivityTotal"];
    /** @description The year to date ride stats for the athlete. */
    ytd_ride_totals?: definitions["ActivityTotal"];
    /** @description The year to date run stats for the athlete. */
    ytd_run_totals?: definitions["ActivityTotal"];
    /** @description The year to date swim stats for the athlete. */
    ytd_swim_totals?: definitions["ActivityTotal"];
    /** @description The all time ride stats for the athlete. */
    all_ride_totals?: definitions["ActivityTotal"];
    /** @description The all time run stats for the athlete. */
    all_run_totals?: definitions["ActivityTotal"];
    /** @description The all time swim stats for the athlete. */
    all_swim_totals?: definitions["ActivityTotal"];
  };
  /** @description A roll-up of metrics pertaining to a set of activities. Values are in seconds and meters. */
  ActivityTotal: {
    /** @description The number of activities considered in this total. */
    count?: number;
    /**
     * Format: float
     * @description The total distance covered by the considered activities.
     */
    distance?: number;
    /** @description The total moving time of the considered activities. */
    moving_time?: number;
    /** @description The total elapsed time of the considered activities. */
    elapsed_time?: number;
    /**
     * Format: float
     * @description The total elevation gain of the considered activities.
     */
    elevation_gain?: number;
    /** @description The total number of achievements of the considered activities. */
    achievement_count?: number;
  };
  /**
   * @description An enumeration of the types an activity may have.
   * @enum {string}
   */
  ActivityType:
    | "AlpineSki"
    | "BackcountrySki"
    | "Canoeing"
    | "Crossfit"
    | "EBikeRide"
    | "Elliptical"
    | "Golf"
    | "Handcycle"
    | "Hike"
    | "IceSkate"
    | "InlineSkate"
    | "Kayaking"
    | "Kitesurf"
    | "NordicSki"
    | "Ride"
    | "RockClimbing"
    | "RollerSki"
    | "Rowing"
    | "Run"
    | "Sail"
    | "Skateboard"
    | "Snowboard"
    | "Snowshoe"
    | "Soccer"
    | "StairStepper"
    | "StandUpPaddling"
    | "Surfing"
    | "Swim"
    | "Velomobile"
    | "VirtualRide"
    | "VirtualRun"
    | "Walk"
    | "WeightTraining"
    | "Wheelchair"
    | "Windsurf"
    | "Workout"
    | "Yoga";
  DetailedAthlete: definitions["SummaryAthlete"] & {
    /** @description The athlete's follower count. */
    follower_count?: number;
    /** @description The athlete's friend count. */
    friend_count?: number;
    /**
     * @description The athlete's preferred unit system.
     * @enum {string}
     */
    measurement_preference?: "feet" | "meters";
    /** @description The athlete's FTP (Functional Threshold Power). */
    ftp?: number;
    /**
     * Format: float
     * @description The athlete's weight.
     */
    weight?: number;
    /** @description The athlete's clubs. */
    clubs?: definitions["SummaryClub"][];
    /** @description The athlete's bikes. */
    bikes?: definitions["SummaryGear"][];
    /** @description The athlete's shoes. */
    shoes?: definitions["SummaryGear"][];
  };
  SummaryAthlete: definitions["MetaAthlete"] & {
    /** @description Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail" */
    resource_state?: number;
    /** @description The athlete's first name. */
    firstname?: string;
    /** @description The athlete's last name. */
    lastname?: string;
    /** @description URL to a 62x62 pixel profile picture. */
    profile_medium?: string;
    /** @description URL to a 124x124 pixel profile picture. */
    profile?: string;
    /** @description The athlete's city. */
    city?: string;
    /** @description The athlete's state or geographical region. */
    state?: string;
    /** @description The athlete's country. */
    country?: string;
    /**
     * @description The athlete's sex.
     * @enum {string}
     */
    sex?: "M" | "F";
    /** @description Deprecated.  Use summit field instead. Whether the athlete has any Summit subscription. */
    premium?: boolean;
    /** @description Whether the athlete has any Summit subscription. */
    summit?: boolean;
    /**
     * Format: date-time
     * @description The time at which the athlete was created.
     */
    created_at?: string;
    /**
     * Format: date-time
     * @description The time at which the athlete was last updated.
     */
    updated_at?: string;
  };
  MetaAthlete: {
    /**
     * Format: int64
     * @description The unique identifier of the athlete
     */
    id?: number;
  };
  DetailedClub: definitions["SummaryClub"] & {
    /**
     * @description The membership status of the logged-in athlete.
     * @enum {string}
     */
    membership?: "member" | "pending";
    /** @description Whether the currently logged-in athlete is an administrator of this club. */
    admin?: boolean;
    /** @description Whether the currently logged-in athlete is the owner of this club. */
    owner?: boolean;
    /** @description The number of athletes in the club that the logged-in athlete follows. */
    following_count?: number;
  };
  SummaryClub: definitions["MetaClub"] & {
    /** @description URL to a 60x60 pixel profile picture. */
    profile_medium?: string;
    /** @description URL to a ~1185x580 pixel cover photo. */
    cover_photo?: string;
    /** @description URL to a ~360x176  pixel cover photo. */
    cover_photo_small?: string;
    /**
     * @description Deprecated. Prefer to use activity_types.
     * @enum {string}
     */
    sport_type?: "cycling" | "running" | "triathlon" | "other";
    /** @description The activity types that count for a club. This takes precedence over sport_type. */
    activity_types?: definitions["ActivityType"][];
    /** @description The club's city. */
    city?: string;
    /** @description The club's state or geographical region. */
    state?: string;
    /** @description The club's country. */
    country?: string;
    /** @description Whether the club is private. */
    private?: boolean;
    /** @description The club's member count. */
    member_count?: number;
    /** @description Whether the club is featured or not. */
    featured?: boolean;
    /** @description Whether the club is verified or not. */
    verified?: boolean;
    /** @description The club's vanity URL. */
    url?: string;
  };
  MetaClub: {
    /**
     * Format: int64
     * @description The club's unique identifier.
     */
    id?: number;
    /** @description Resource state, indicates level of detail. Possible values: 1 -> "meta", 2 -> "summary", 3 -> "detail" */
    resource_state?: number;
    /** @description The club's name. */
    name?: string;
  };
  ClubAnnouncement: {
    /**
     * Format: int64
     * @description The unique identifier of this announcement.
     */
    id?: number;
    /**
     * Format: int64
     * @description The unique identifier of the club this announcements was made in.
     */
    club_id?: number;
    athlete?: definitions["SummaryAthlete"];
    /**
     * Format: date-time
     * @description The time at which this announcement was created.
     */
    created_at?: string;
    /** @description The content of this announcement */
    message?: string;
  };
  MembershipApplication: {
    /** @description Whether the application for membership was successfully submitted */
    success?: boolean;
    /** @description Whether the membership is currently active */
    active?: boolean;
    /**
     * @description The membership status of this application
     * @enum {string}
     */
    membership?: "member" | "pending";
  };
  DetailedGear: definitions["SummaryGear"] & {
    /** @description The gear's brand name. */
    brand_name?: string;
    /** @description The gear's model name. */
    model_name?: string;
    /** @description The gear's frame type (bike only). */
    frame_type?: number;
    /** @description The gear's description. */
    description?: string;
  };
  SummaryGear: {
    /** @description The gear's unique identifier. */
    id?: string;
    /** @description Resource state, indicates level of detail. Possible values: 2 -> "summary", 3 -> "detail" */
    resource_state?: number;
    /** @description Whether this gear's is the owner's default one. */
    primary?: boolean;
    /** @description The gear's name. */
    name?: string;
    /**
     * Format: float
     * @description The distance logged with this gear.
     */
    distance?: number;
  };
  Lap: {
    /**
     * Format: int64
     * @description The unique identifier of this lap
     */
    id?: number;
    activity?: definitions["MetaActivity"];
    athlete?: definitions["MetaAthlete"];
    /**
     * Format: float
     * @description The lap's average cadence
     */
    average_cadence?: number;
    /**
     * Format: float
     * @description The lap's average speed
     */
    average_speed?: number;
    /**
     * Format: float
     * @description The lap's distance, in meters
     */
    distance?: number;
    /** @description The lap's elapsed time, in seconds */
    elapsed_time?: number;
    /** @description The start index of this effort in its activity's stream */
    start_index?: number;
    /** @description The end index of this effort in its activity's stream */
    end_index?: number;
    /** @description The index of this lap in the activity it belongs to */
    lap_index?: number;
    /**
     * Format: float
     * @description The maximum speed of this lat, in meters per second
     */
    max_speed?: number;
    /** @description The lap's moving time, in seconds */
    moving_time?: number;
    /** @description The name of the lap */
    name?: string;
    /** @description The athlete's pace zone during this lap */
    pace_zone?: number;
    split?: number;
    /**
     * Format: date-time
     * @description The time at which the lap was started.
     */
    start_date?: string;
    /**
     * Format: date-time
     * @description The time at which the lap was started in the local timezone.
     */
    start_date_local?: string;
    /**
     * Format: float
     * @description The elevation gain of this lap, in meters
     */
    total_elevation_gain?: number;
  };
  /** @description A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers. */
  LatLng: number[];
  PolylineMap: {
    /** @description The identifier of the map */
    id?: string;
    /** @description The polyline of the map, only returned on detailed representation of an object */
    polyline?: string;
    /** @description The summary polyline of the map */
    summary_polyline?: string;
  };
  PhotosSummary: {
    /** @description The number of photos */
    count?: number;
    primary?: {
      /** Format: int64 */
      id?: number;
      source?: number;
      unique_id?: string;
      urls?: { [key: string]: string };
    };
  };
  DetailedSegment: definitions["SummarySegment"] & {
    /**
     * Format: date-time
     * @description The time at which the segment was created.
     */
    created_at?: string;
    /**
     * Format: date-time
     * @description The time at which the segment was last updated.
     */
    updated_at?: string;
    /**
     * Format: float
     * @description The segment's total elevation gain.
     */
    total_elevation_gain?: number;
    map?: definitions["PolylineMap"];
    /** @description The total number of efforts for this segment */
    effort_count?: number;
    /** @description The number of unique athletes who have an effort for this segment */
    athlete_count?: number;
    /** @description Whether this segment is considered hazardous */
    hazardous?: boolean;
    /** @description The number of stars for this segment */
    star_count?: number;
  };
  SummarySegment: {
    /**
     * Format: int64
     * @description The unique identifier of this segment
     */
    id?: number;
    /** @description The name of this segment */
    name?: string;
    /** @enum {string} */
    activity_type?: "Ride" | "Run";
    /**
     * Format: float
     * @description The segment's distance, in meters
     */
    distance?: number;
    /**
     * Format: float
     * @description The segment's average grade, in percents
     */
    average_grade?: number;
    /**
     * Format: float
     * @description The segments's maximum grade, in percents
     */
    maximum_grade?: number;
    /**
     * Format: float
     * @description The segments's highest elevation, in meters
     */
    elevation_high?: number;
    /**
     * Format: float
     * @description The segments's lowest elevation, in meters
     */
    elevation_low?: number;
    start_latlng?: definitions["LatLng"];
    end_latlng?: definitions["LatLng"];
    /** @description The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. */
    climb_category?: number;
    /** @description The segments's city. */
    city?: string;
    /** @description The segments's state or geographical region. */
    state?: string;
    /** @description The segment's country. */
    country?: string;
    /** @description Whether this segment is private. */
    private?: boolean;
    athlete_pr_effort?: definitions["SummarySegmentEffort"];
    athlete_segment_stats?: definitions["SummaryPRSegmentEffort"];
  };
  ExplorerResponse: {
    /** @description The set of segments matching an explorer request */
    segments?: definitions["ExplorerSegment"][];
  };
  ExplorerSegment: {
    /**
     * Format: int64
     * @description The unique identifier of this segment
     */
    id?: number;
    /** @description The name of this segment */
    name?: string;
    /** @description The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category. If climb_category = 5, climb_category_desc = HC. If climb_category = 2, climb_category_desc = 3. */
    climb_category?: number;
    /**
     * @description The description for the category of the climb
     * @enum {string}
     */
    climb_category_desc?: "NC" | "4" | "3" | "2" | "1" | "HC";
    /**
     * Format: float
     * @description The segment's average grade, in percents
     */
    avg_grade?: number;
    start_latlng?: definitions["LatLng"];
    end_latlng?: definitions["LatLng"];
    /**
     * Format: float
     * @description The segments's evelation difference, in meters
     */
    elev_difference?: number;
    /**
     * Format: float
     * @description The segment's distance, in meters
     */
    distance?: number;
    /** @description The polyline of the segment */
    points?: string;
  };
  DetailedSegmentEffort: definitions["SummarySegmentEffort"] & {
    /** @description The name of the segment on which this effort was performed */
    name?: string;
    activity?: definitions["MetaActivity"];
    athlete?: definitions["MetaAthlete"];
    /** @description The effort's moving time */
    moving_time?: number;
    /** @description The start index of this effort in its activity's stream */
    start_index?: number;
    /** @description The end index of this effort in its activity's stream */
    end_index?: number;
    /**
     * Format: float
     * @description The effort's average cadence
     */
    average_cadence?: number;
    /**
     * Format: float
     * @description The average wattage of this effort
     */
    average_watts?: number;
    /** @description For riding efforts, whether the wattage was reported by a dedicated recording device */
    device_watts?: boolean;
    /**
     * Format: float
     * @description The heart heart rate of the athlete during this effort
     */
    average_heartrate?: number;
    /**
     * Format: float
     * @description The maximum heart rate of the athlete during this effort
     */
    max_heartrate?: number;
    segment?: definitions["SummarySegment"];
    /** @description The rank of the effort on the global leaderboard if it belongs in the top 10 at the time of upload */
    kom_rank?: number;
    /** @description The rank of the effort on the athlete's leaderboard if it belongs in the top 3 at the time of upload */
    pr_rank?: number;
    /** @description Whether this effort should be hidden when viewed within an activity */
    hidden?: boolean;
  };
  SummarySegmentEffort: {
    /**
     * Format: int64
     * @description The unique identifier of this effort
     */
    id?: number;
    /**
     * Format: int64
     * @description The unique identifier of the activity related to this effort
     */
    activity_id?: number;
    /** @description The effort's elapsed time */
    elapsed_time?: number;
    /**
     * Format: date-time
     * @description The time at which the effort was started.
     */
    start_date?: string;
    /**
     * Format: date-time
     * @description The time at which the effort was started in the local timezone.
     */
    start_date_local?: string;
    /**
     * Format: float
     * @description The effort's distance in meters
     */
    distance?: number;
    /** @description Whether this effort is the current best on the leaderboard */
    is_kom?: boolean;
  };
  SummaryPRSegmentEffort: {
    /**
     * Format: int64
     * @description The unique identifier of the activity related to the PR effort.
     */
    pr_activity_id?: number;
    /** @description The elapsed time ot the PR effort. */
    pr_elapsed_time?: number;
    /**
     * Format: date-time
     * @description The time at which the PR effort was started.
     */
    pr_date?: string;
    /** @description Number of efforts by the authenticated athlete on this segment. */
    effort_count?: number;
  };
  Split: {
    /**
     * Format: float
     * @description The average speed of this split, in meters per second
     */
    average_speed?: number;
    /**
     * Format: float
     * @description The distance of this split, in meters
     */
    distance?: number;
    /** @description The elapsed time of this split, in seconds */
    elapsed_time?: number;
    /**
     * Format: float
     * @description The elevation difference of this split, in meters
     */
    elevation_difference?: number;
    /** @description The pacing zone of this split */
    pace_zone?: number;
    /** @description The moving time of this split, in seconds */
    moving_time?: number;
    /** @description N/A */
    split?: number;
  };
}

export interface operations {}

export interface external {
  "https://developers.strava.com/swagger/activity_total.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/activity_type.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/activity.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/athlete.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/club.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/gear.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/lap.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/latlng.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/map.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/photo.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/segment_effort.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/segment.json": {
    paths: {};
    operations: {};
  };
  "https://developers.strava.com/swagger/split.json": {
    paths: {};
    operations: {};
  };
}
