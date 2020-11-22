export interface Connection {
  host: string;
  port: string;
  options: object;
  connect: () => object;
}
