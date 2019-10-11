// Mac Address model class
export default class MacAddress {
  // Id
  public id?: number;

  // MAC address
  public address: string;

  // Name of the device
  public deviceName: string;

  // Owner of the device
  public owner: string;

  // Own name of the device
  public name: string;

  // Static ip address if it exists
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
