interface IDatabase {
  id?: string;
}

export class Database<T extends IDatabase> {
  private database: T[] = [];
  private item: new (data: T) => T;

  constructor(item: { new (data: T): T }) {
    this.item = item;
  }

  async create(data: T): Promise<T> {
    return new Promise((resolver) => {
      const newData = new this.item(data);
      this.database.push(newData);

      resolver(newData);
    });
  }

  async findAll(): Promise<T[]> {
    return new Promise((resolver) => {
      resolver(this.database.map((data: T) => data));
    });
  }

  async findOne(id: string): Promise<T | undefined> {
    return new Promise(async (resolver) => {
      const foundData = this.database.find((data: T) => data.id === id);

      if (!foundData) resolver(undefined);

      resolver(foundData);
    });
  }

  async update(id: string, rawData: T): Promise<T> {
    return new Promise(async (resolver) => {
      const newData = new this.item(rawData);
      this.database = this.database.map((data: T) =>
        data.id === id ? newData : data,
      );

      resolver(newData);
    });
  }

  async remove(id: string): Promise<true> {
    return new Promise(async (resolver) => {
      this.database = this.database.filter((data: T) => data.id !== id);

      resolver(true);
    });
  }
}
