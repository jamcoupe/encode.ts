/// <reference path="../typings/jasmine/jasmine.d.ts" />

import {Base64} from './../src/base64';
import {UTF8} from './../src/utf8';
import {Hexadecimal} from './../src/hexadecimal';

const testUtf8 = [
  ['any carnal pleas', 'YW55IGNhcm5hbCBwbGVhcw=='],
  ['any carnal pleasu', 'YW55IGNhcm5hbCBwbGVhc3U='],
  ['any carnal pleasur', 'YW55IGNhcm5hbCBwbGVhc3Vy'],
  ['any carnal pleasure', 'YW55IGNhcm5hbCBwbGVhc3VyZQ=='],
  ['any carnal pleasure.', 'YW55IGNhcm5hbCBwbGVhc3VyZS4='],
  ['sure.', 'c3VyZS4='],
  ['asure.', 'YXN1cmUu'],
  ['easure.', 'ZWFzdXJlLg=='],
  ['leasure.', 'bGVhc3VyZS4='],
  ['pleasure.', 'cGxlYXN1cmUu']
];



describe('Base64 tests;', () => {


  it('convert between utf8 ', () => {
    for (var i = 0; i < testUtf8.length; i++) {
      var item = testUtf8[i];
      var utf8bytes = UTF8.getBytes(item[0]);
      var baseBytes = Base64.getBytes(item[1]);
      for (var j = 0; j < baseBytes.length; j++) {
        var byte = baseBytes[j];
        var byte2 = utf8bytes[j];
        expect(byte).toBe(byte2);
      }
      var str = Base64.getString(utf8bytes);
      expect(str).toBe(item[1]);
    }
  });


  it('converts hex', () => {
    var hex = '3f3bc67169ea71302599cf1b0f5d408b7b65d347';
    var base = 'PzvGcWnqcTAlmc8bD11Ai3tl00c=';
    var hexBytes = Hexadecimal.getBytes(hex);

    var base64Rep = Base64.getString(hexBytes);
    expect(base64Rep).toBe(base);
    var baseBytes = Base64.getBytes(base);
    for (var j = 0; j < baseBytes.length; j++) {
      var byte = baseBytes[j];
      var byte2 = hexBytes[j];
      expect(byte).toBe(byte2);
    }
  });


});