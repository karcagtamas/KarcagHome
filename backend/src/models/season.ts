import Episode from './episode';

// Season model class
export default class Season {
  // Id
  public id?: number;

  // Name of the series
  public series: string;

  // Id of the series
  public seriesId: number;

  // Number of the episode
  public number: number;

  // Count of the episodes
  public episodeCount: number;

  // Episodes
  public episodes: Episode[];

  constructor(
    series: string,
    seriesId: number,
    number: number,
    episodeCount: number,
    episodes: Episode[]
  ) {
    this.series = series;
    this.seriesId = seriesId;
    this.number = number;
    this.episodeCount = episodeCount;
    this.episodes = episodes;
  }
}
