import Episode from './episode';

export default class Season {
  public id?: number;
  public series: string;
  public seriesId: number;
  public number: number;
  public episodeCount: number;
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
