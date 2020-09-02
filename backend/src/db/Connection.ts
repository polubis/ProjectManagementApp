import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Connection {
  public connection: Mongoose;
  public connectionOptions: ConnectionOptions;

  constructor() {
    this.createConnectionOptions();
    this.createConnection();
  }

  private createConnectionOptions(): void {
    this.connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  private createConnection = async (
    dbURI = process.env.DB_URI,
  ): Promise<void> => {
    try {
      this.connection = await mongoose.connect(dbURI, this.connectionOptions);
      console.log(`Successfully connected to ${dbURI}`);
    } catch (err) {
      return console.error('Database connection:', err);
    }
  };
}

export default new Connection().connection;
