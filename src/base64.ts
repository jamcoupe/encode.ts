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


  static getString(value: Uint8Array|Array<number>): string {
    var val;
    if(value instanceof Uint8Array) {
      val = value;
    } else if(value instanceof Array) {
      val = new Uint8Array(value);
    }
    return base64js.fromByteArray(val);
  }

}
