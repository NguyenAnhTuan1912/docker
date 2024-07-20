// Import utils
import { ErrorUtils } from "./error/index.mjs"; 
import { HTTPUtils } from "./http/index.mjs";

export class Utils {
  static Http = new HTTPUtils();
  static Error = new ErrorUtils(Utils.Http);
}