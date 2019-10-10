export default class Movies {
  public id?: number;
  public name: string;
  public addedTime: Date;
  public creater: string;
  public createrId: number;
  public lastModification: Date;
  public lastModifier: string;
  public lastModifierId: number;
  public seen: boolean;
  public picked?: boolean = false;

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
