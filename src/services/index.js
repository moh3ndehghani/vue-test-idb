class IndexDb {
  database = null;
  version = 1;
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
  }

  connectDB() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(this.dbName, this.version);

      openRequest.onsuccess = function (event) {
        this.database = event.target.result;
        resolve(this.database);
      }.bind(this);

      openRequest.onerror = function (event) {
        reject(event);
      }.bind(this);
    });
  }
}

export default IndexDb;
