class IndexDb {
  database;
  version = 1;
  constructor(dbName) {
    const openRequest = indexedDB.open(dbName, this.version);
    openRequest.onsuccess = function (event) {
      this.database = event.target.result;
      console.log("Database created", this.database);
    };
    openRequest.onerror = function (event) {
      console.log("error =========");
    };
  }
}

export default IndexDb;
