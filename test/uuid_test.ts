///<reference path="../typings/jasmine/jasmine.d.ts" />


import {Uuid} from './../src/uuid';

const uuidString = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
const uuidBytes = [0x6b, 0xa7, 0xb8, 0x11, 0x9d, 0xad, 0x11, 0xd1, 0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8];
const emptyUuidString = '00000000-0000-0000-0000-000000000000';



describe('Uuid Tests: ', () => {


  it('creates an empty uuid', () => {
    var emptyUuid = Uuid.empty();
    expect(emptyUuid.toString()).toEqual(emptyUuidString);
  });


  it('creates uuid from existing string', () => {
    expect(new Uuid(uuidString).toString()).toEqual(uuidString);
  });


  it('generated from uuids equal', () => {
    var u1 = new Uuid(uuidString);
    var u2 = new Uuid(uuidBytes);
    expect(u1.equals(u2)).toBeTruthy();
    expect(u2.equals(u1)).toBeTruthy();
  });


  it('newly created uuids should never equal', () => {
    var u1 = new Uuid();
    var u2 = new Uuid();
    expect(u1.equals(u2)).toBeFalsy();
    expect(u2.equals(u1)).toBeFalsy();
  });


});