declare var crypto: Crypto;

import {EMPTY_STRING} from './utf8';
import {Hexadecimal} from './hexadecimal';

export const UUID_BIT_LENGTH = 128;
export const UUID_BYTE_LENGTH = UUID_BIT_LENGTH / 8;

export enum UuidVersion {
  V1, V2, V3, V4, V5
}


export class Uuid {

  private data: Uint8Array = null;
  private strData: string = EMPTY_STRING;
  private version: UuidVersion = UuidVersion.V4;



  public getBytes(): Uint8Array {
    return this.data;
  }


  constructor(obj?: string|Uint8Array|Array<number>|Uuid) {

    if(typeof obj === 'undefined'){
      this.data = this.uuid();
    } else {

      if(Uuid.isValid(obj)) {
        if(obj instanceof Uuid) {
          return obj;
        } else if(typeof obj === 'string') {
          this.data = Uuid.getBytes(obj);
        } else {
          if(obj instanceof Uint8Array) {
            this.data = obj;
          } else if(obj instanceof Array) {
            this.data = new Uint8Array(obj);
          }
        }
      } else {
        throw "Invalid UUID: " + obj;
      }
    }

  }


  private uuid() : Uint8Array {
    if(this.version === UuidVersion.V4) {
      return Uuid.uuid4();
    } else {
      throw "Unimplemented version";
    }
  }


  private static uuid4() : Uint8Array {
    let buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    buffer[6] = (0x40 | (buffer[6] & 0xf));
    buffer[8] = (0x80 | (buffer[8] & 0x3f));
    return buffer;
  }


  static empty(): Uuid {
    return new Uuid(new Uint8Array(UUID_BYTE_LENGTH))
  }


  public equals(other: Uuid): boolean {
    var result = true;
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i] !== other.data[i]) {
        result = false;
        break;
      }
    }
    return result;
  }


  public toString(): string {
    if(this.strData === EMPTY_STRING) {
      this.strData = Uuid.getString(this.data);
    }
    return this.strData;
  }


  public static isValid(value: string|Uint8Array|Array<number>|Uuid): boolean {
    if(typeof value === 'string') {
      let arr = value.split('-');
      var isCorrectLengths = arr.length === 5 && (arr[0].length === 8 && arr[1].length === 4 && arr[2].length === 4 && arr[3].length === 4 && arr[4].length === 12);
      var isHex = Hexadecimal.isValid(arr.join(EMPTY_STRING));
      return isCorrectLengths && isHex;
    } else if(value instanceof Uuid) {
      return Uuid;
    } else if(value instanceof Uint8Array || value instanceof Array) {
      return value.length === UUID_BYTE_LENGTH;
    }
  }


  public static getString(uuidByteArray: Uint8Array) {
    let len = uuidByteArray.length;
    var str = '';
    for(var i = 0; i < len; i++) {
      let octet = uuidByteArray[i].toString(16);
      if(octet.length === 1) {
        octet = "0" + octet;
      }
      str += octet;
      if(i === 3 || i === 5 || i === 7 || i === 9) {
        str += '-'
      }
    }
    return str;
  }


  public static getBytes(uuidString: string): Uint8Array {
    if(Uuid.isValid(uuidString)) {
      let newstr = uuidString.split('-').join('');
      return Hexadecimal.getBytes(newstr);
    } else {
      return null;
    }
  }

}
