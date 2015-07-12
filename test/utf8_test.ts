///<reference path="../typings/tsd.d.ts" />
import {UTF8} from './../src/utf8';

const utf8test = [
  ['hello', 5],
  ['κόσμε', 10]
];

describe('UTF8 Tests: ', () => {


  it('should get correct amount of bytes', () => {
    for(var i = 0; i < utf8test.length; i++) {
      var bytes = UTF8.getBytes(utf8test[i][0]);
      expect(bytes.length).toBe(utf8test[i][1]);
    }
  });


});

