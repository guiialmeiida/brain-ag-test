export interface IConnectionDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getConnection(): any;
}
