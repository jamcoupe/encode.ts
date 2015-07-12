import {EMPTY_STRING} from './constants/string';
import {Hexadecimal} from './hexadecimal';


declare var window = {
  crypto: Crypto
};

const uuidBits = 128;
const uuidBytes = uuidBits / 8;


export enum UuidVersion {
  V1, V2, V3, V4, V5
}


export class Uuid {


  private data: Uint8Array = null;
  private strData: string = EMPTY_STRING;

  private version: UuidVersion = UuidVersion.V4;

  public get value(): Uint8Array {
    return this.data;
  }


  constructor(obj?: string|Uint8Array) {
    if (typeof obj === 'string') {
      this.data = Uuid.parseString(obj);
    } else if (typeof obj === 'object' && obj instanceof Uint8Array) {
      if (obj.length === uuidBytes) {
        this.data = obj;
      } else {
        throw new InvalidUuid();
      }
      this.data = obj;
    } else if (typeof obj === 'undefined') {
      this.data = this.uuid();
    }
  }


  private static parseString(str: string): Uint8Array {
    if(Uuid.isValid(str)) {
      let newstr = str.split('-').join('');
      return new Hexadecimal(newstr).value;
    } else {
      throw new InvalidUuid();
    }
  }


  private uuid() : Uint8Array {
    if(this.version === UuidVersion.V4) {
      let buffer = new Uint8Array(16);
      window.crypto.getRandomValues(buffer);
      buffer[6] = (0x40 | (buffer[6] & 0xf));
      buffer[8] = (0x80 | (buffer[8] & 0x3f));
      return buffer;
    } else {
      throw "Unimplemented version";
    }
  }


  static empty(): Uuid {
    return new Uuid(new Uint8Array(uuidBytes))
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
    // lazy create it
    if(this.strData === EMPTY_STRING) {
      let len = this.data.length;
      var str = '';
      for(var i = 0; i < len; i++) {
        let octet = this.data[i].toString(16);
        if(octet.length === 1) {
          octet = "0" + octet;
        }
        str += octet;
        if(i === 3 || i === 5 || i === 7 || i === 9) {
          str += '-'
        }
      }
      this.strData = str;

    }
    return this.strData;
  }



  public static isValid(value: string): boolean {
    let arr = value.split('-');
    var isCorrectLengths = arr.length === 5 && (arr[0].length === 8 && arr[1].length === 4 && arr[2].length === 4 && arr[3].length === 4 && arr[4].length === 12);
    var isHex = Hexadecimal.isValid(arr.join(EMPTY_STRING));
    return isCorrectLengths && isHex;
  }

}





class InvalidUuid {

  constructor(public message?: string);

  toString() {
    return this.message || "Invalid UUID";
  }


}

