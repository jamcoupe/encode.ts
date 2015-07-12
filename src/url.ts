


const protocolPattern: RegExp = /^([a-z0-9.+-]+:)/i;
const portPattern: RegExp = /:[0-9]*$/;
const simplePathPattern: RegExp = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
const delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];
const unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);



export class Url {

  public protocol: string = null;
  public slashes: string = null;
  public auth: string = null;
  public host: string = null;
  public port: string = null;
  public hostname: string = null;
  public hash: string = null;
  public search: string = null;
  public query: string = null;
  public pathname: string = null;
  public path: string = null;
  public href: string = null;

  constructor(url: string) {
    this.parse(url);
  }

  public parse(url: string): void {
    this.href = url;
    var u = url.split(':');
    this.host = u[0];
    this.port = u[1];
  }

}