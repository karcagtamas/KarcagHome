export default class Episode {
  public id?: number;
  public season: number;
  public seasonNumber: number;
  public number: number;
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
