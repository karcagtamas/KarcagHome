// Movie model class
export default class Movie {
  // Id
  public id?: number;

  // Name of the movie
  public name: string;

  // Time of the creation
  public addedTime: Date;

  // Name of the creater
  public creater: string;

  // Id of the creater
  public createrId: number;

  // Time of the last modification
  public lastModification: Date;

  // Name of the last modifier
  public lastModifier: string;

  // Id of the last modifier
  public lastModifierId: number;

  // Movie is seen for the requester user
  public seen: boolean;

  constructor(
    name: string,
    addedTime: Date,
    creater: string,
    createrId: number,
    lastModification: Date,
    lastModifier: string,
    lastModifierId: number,
    seen: boolean
  ) {
    this.name = name;
    this.addedTime = addedTime;
    this.creater = creater;
    this.createrId = createrId;
    this.lastModification = lastModification;
    this.lastModifier = lastModifier;
    this.lastModifierId = lastModifierId;
    this.seen = seen;
  }
}
