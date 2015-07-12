///<reference path="../typings/tsd.d.ts" />
import {Hexadecimal} from './../src/hexadecimal';




describe('Hexadecimal Tests', () => {

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
});

