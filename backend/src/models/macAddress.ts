export default class MacAddress {
  public id?: number;
  public address: string;
  public deviceName: string;
  public owner: string;
  public name: string;
  public ip?: string;

  constructor(
    address: string,
    deviceName: string,
    owner: string,
    name: string,
    ip?: string
  ) {
    this.address = address;
    this.deviceName = deviceName;
    this.owner = owner;
    this.name = name;
    this.ip = ip ? ip : '';
  }
}
