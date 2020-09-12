import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
import { __DB_URI__ } from '@consts';

class Connection {
  public connection: Mongoose;
  public connectionOptions: ConnectionOptions;

  constructor() {
    this.createConnectionOptions();
    this.createConnection(__DB_URI__);
  }

  private createConnectionOptions(): void {
    this.connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  private createConnection = async (DB_URI: string): Promise<void> => {
    try {
      this.connection = await mongoose.connect(DB_URI, this.connectionOptions);
      console.log(`Successfully connected to ${DB_URI}`);
    } catch (err) {
      return console.error('Database connection:', err);
    }
  };
}

export default new Connection().connection;
