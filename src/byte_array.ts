


export class ByteArray {


  static pad(array: Uint8Array, length: number): Uint8Array {
    var newArry = new Uint8Array(length);
    newArry.set(array, length - array.length);
    return newArry;
  }

  static concat(a: Uint8Array, b: Uint8Array, ...rest: Uint8Array[]): Uint8Array {
    if(rest.length > 0) {
      var count = a.length + b.length;
      for (var i = 0; i < rest.length; i++) {
        var arr = rest[i];
        count+=arr.length;
      }
      var hi2 = new Uint8Array(count);
      hi2.set(a);
      hi2.set(b, a.length);
      var start = a.length + b.length;
      for (var i = 0; i < rest.length; i++) {
        var arr = rest[i];
        hi2.set(arr,  start);
        start += arr.length;
      }
      return hi2;
    } else {
      var  hi = new Uint8Array(a.length + b.length);
      hi.set(a);
      hi.set(b, a.length);
      return hi;
    }
  }



}