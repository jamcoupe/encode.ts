///<reference path="../typings/tsd.d.ts" />
import {Uuid} from './../src/uuid';


describe('Uuid Tests', () => {


  it('Empty Uuid', () => {
    var emptyUuid = Uuid.empty();

    expect(emptyUuid.toString()).toEqual('00000000-0000-0000-0000-000000000000');

  });

  it('Uuid from existing string', () => {

    var uuid: Uuid = new Uuid('6ba7b811-9dad-11d1-80b4-00c04fd430c8');
    console.log(uuid);
    var array = [107, 167, 184, 17, 157, 173, 17, 209, 128, 180, 0, 192, 79, 212, 48, 200];



    expect(uuid.toString()).toEqual('6ba7b811-9dad-11d1-80b4-00c04fd430c8');

  });


  it('Uuid from string equals uuid from array', () => {
    var uuidString = new Uuid('6ba7b811-9dad-11d1-80b4-00c04fd430c8');
    var uuidArray = new Uuid(new Uint8Array([107, 167, 184, 17, 157, 173, 17, 209, 128, 180, 0, 192, 79, 212, 48, 200]));
    expect(uuidArray.equals(uuidString)).toBeTruthy();
    expect(uuidString.equals(uuidArray)).toBeTruthy();
  });


  it('create random uuid', () => {

    console.log(new Uuid());

  });

});