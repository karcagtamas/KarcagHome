import { CheckError } from "./checkError";
export default interface ICheck {
  error: CheckError | null;
  isSuccess: boolean;
}
