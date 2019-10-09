// Episode model class
export default class Episode {
  // Id
  public id?: number;

  // Season id
  public season: number;

  // Season number
  public seasonNumber: number;

  // Episode number
  public number: number;

  // Episode is seen for the requester user
  public seen: boolean;

  constructor(
    season: number,
    seasonNumber: number,
    number: number,
    seen: boolean
  ) {
    this.season = season;
    this.seasonNumber = seasonNumber;
    this.number = number;
    this.seen = seen;
  }
}
