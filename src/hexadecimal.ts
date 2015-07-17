import {EMPTY_STRING} from './utf8';

export const HEX_REGEX = new RegExp('[0-9a-fA-F]');
export const HEX_BASE = 16;


/**
 * Immutable object that can parse Hexadecimal strings and byte array
 */
export class Hexadecimal {


  private data: Uint8Array = null;
  private strValue: string = EMPTY_STRING;


  public get value(): Uint8Array {
    return this.data;
  }


  constructor(value: string|Uint8Array|ArrayBuffer|Array<number>) {
    if(typeof value === 'object') {
      if(value instanceof Uint8Array) {
        this.data = value;
      } else if(value instanceof Array) {
        this.data = new Uint8Array(value);
      } else if(value instanceof ArrayBuffer) {
        this.data = new Uint8Array(value);
      }
    } else if(typeof value === 'string'){
      if(Hexadecimal.isValid(value)) {
        this.parseHexadecimal(value);
      } else {
        throw 'Invalid Hexadecimal value provided: ' + value;
      }
    }
  }


  private parseHexadecimal(nibbles: string) {
    this.data = Hexadecimal.getBytes(nibbles);
  }


  public toString() {
    if(this.strValue === EMPTY_STRING) {
      this.strValue = Hexadecimal.getString(this.data);
    }
    return this.strValue;
  }


  public static isValid(value: string): boolean {
    if(typeof value === 'string') {
      let isHex: boolean = true;
      for(let letter of value) {
        if(!letter.match(HEX_REGEX)) {
          isHex = false;
        }
      }
      return isHex;
    } else {
      return false;
    }
  }


  public static getBytes(nibbles: string): Uint8Array {
    nibbles = !(nibbles.length % 2) ? nibbles : `0${nibbles}`;
    var len = nibbles.length;
    var length = len / 2;
    var array = new Uint8Array(length);
    var index = 0;

    for(let i = 0; i < nibbles.length; i += 2) {
      let octet = nibbles[i] + nibbles[i + 1];
      array.BYTES_PER_ELEMENT = 1;
      array[index] = parseInt(octet, 16);
      index += 1;
    }
    return array;
  }


  public static getString(octets: Uint8Array): string {
    let str = '';
    for(let i = 0; i < octets.length; i += 1) {
      var strOctet = octets[i].toString(HEX_BASE);
      str += strOctet.length == 2 ? strOctet : `0${strOctet}`;
    }
    return str;
  }


}
