///<reference path="../typings/jasmine/jasmine.d.ts" />


import {Uuid} from './../src/uuid';

const invalidString = '32412-342-3423-42-34-23424242-34-234-23';
const uuidString = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
const uuidBytes = [0x6b, 0xa7, 0xb8, 0x11, 0x9d, 0xad, 0x11, 0xd1, 0x80, 0xb4, 0x00, 0xc0, 0x4f, 0xd4, 0x30, 0xc8];
const invalidBytes = [4, 34534, 234, 234, 234,5, 754674, 65, 5674, 45];
const emptyUuidString = '00000000-0000-0000-0000-000000000000';


describe('Uuid: ', () => {


  it('should create an empty uuid', () => {
    var emptyUuid = Uuid.empty();
    expect(emptyUuid.toString()).toEqual(emptyUuidString);
  });


  it('should create uuid from existing string', () => {
    expect(new Uuid(uuidString).toString()).toEqual(uuidString);
  });


  describe('when creating uuids from two different data sources but they are the same', () => {

    it('should still show that they equal each other', () => {
      var u1 = new Uuid(uuidString);
      var u2 = new Uuid(uuidBytes);
      expect(u1.equals(u2)).toBeTruthy();
      expect(u2.equals(u1)).toBeTruthy();
    });

  });


  it('newly created uuids should never equal', () => {
    var u1 = new Uuid();
    var u2 = new Uuid();
    expect(u1.equals(u2)).toBeFalsy();
    expect(u2.equals(u1)).toBeFalsy();
  });


  describe('when passing in a uuid object', () => {

    it('should return the original uuid object', () => {
      var orig = new Uuid();

      var notOrigin = new Uuid(orig);
      expect(orig).toEqual(notOrigin);
    })

  });


  describe('when checking if a uuid is valid', () => {

    it('should return a Uuid object as true', () => {
      var id = new Uuid();

      var result = Uuid.isValid(id);

      expect(result).toBe(true);
    });

    it('should return a string uuid as true', () => {
      var result = Uuid.isValid(uuidString);

      expect(result).toBe(true);
    });

    it('should return an array as true', () => {
      var result = Uuid.isValid(uuidBytes);

      expect(result).toBe(true);
    });

    it('should return an Uint8Array as true', () => {
      var setup = new Uint8Array(uuidBytes);

      var result = Uuid.isValid(setup);

      expect(result).toBe(true);
    });

    it('should return an invalid string format as false', () => {
      var result = Uuid.isValid(invalidString);

      expect(result).toBe(false);
    });

    it('should return an invalid array of numbers as false', () => {
      var result = Uuid.isValid(invalidBytes);

      expect(result).toBe(false);
    })

  });




});