export interface Connection {
  host: string;
  port: string;
  options: object;
  id: string;
  connect: () => object;
}
