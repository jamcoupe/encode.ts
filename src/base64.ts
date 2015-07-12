///<reference path="../typings/base64-js/b64.d.ts" />
import 'base64';
import {UTF8} from './utf8';


export class Base64 {

  /**
   * Pass the Base64 value
   */
  static getBytes(value: string): Uint8Array {
    return base64js.toByteArray(value);
  }


  static getString(value: Uint8Array): string {
    return base64js.fromByteArray(value);
  }

}
