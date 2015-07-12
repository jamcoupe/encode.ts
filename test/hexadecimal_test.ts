///<reference path="../typings/tsd.d.ts" />
import {Hexadecimal} from './../src/hexadecimal';

const hexs = [
  ['2ab', [0x02, 0xAB], '02ab'],
  ['0', [0x00], '00'],
  ['3f3bc67169ea71302599cf1b0f5d408b7b65d347', [0x3f, 0x3b, 0xc6, 0x71, 0x69, 0xea, 0x71, 0x30, 0x25, 0x99, 0xcf, 0x1b, 0x0f, 0x5d, 0x40, 0x8b, 0x7b, 0x65, 0xd3, 0x47], '3f3bc67169ea71302599cf1b0f5d408b7b65d347']
];

describe('Hexadecimal Tests: ', () => {

  it('Invalid Hexadecimals', () => {
    var invalid = ['X', '-', 'h', null, undefined, '3f3bc67169ea71302599cf1b0f5d408b7b65d34g', 'gf3bc67169ea71302599cf1b0f5d408b7b65d342'];
    invalid.forEach((value) => {
      expect(Hexadecimal.isValid(value)).toBeFalsy();
    });
  });


  it('Valid Hexadecimals', () => {
    var valid = ['ad', '3f3bc67169ea71302599cf1b0f5d408b7b65d347', '3f3bc67169ea71302599cf1b0f5d408b7b65d347'];

    valid.forEach((value) => {
      expect(Hexadecimal.isValid(value)).toBeTruthy();
    });
  });


  it('Appends 0 to string with uneven amount of nibbles', () => {
    expect(new Hexadecimal('a').toString()).toEqual('0a');
    expect(new Hexadecimal('0').toString()).toEqual('00');
    expect(new Hexadecimal(new Uint8Array([2])).toString()).toBe('02');
  });


  it('Gets correct bytes from string', () => {
    for(let y = 0; y < hexs.length; y++) {
      var str = hexs[y][0];
      var actualBytes = new Hexadecimal(str).value;
      var bytes = hexs[y][1];
      for(let i = 0; i < bytes.length; i++) {
        expect(actualBytes[i]).toEqual(bytes[i]);
      }
    }
  });


  it('gets correct string from bytes', () => {
    for(let y = 0; y < hexs.length; y++) {
      var bytes = hexs[y][1];
      var expectedString = hexs[y][2];
      var string = new Hexadecimal(bytes).toString();
      expect(string).toEqual(expectedString);
    }
  });



  it('should get correct base64', () => {



  });


});

