class IndexDb {
  database = null;
  dbName = null;
  version;
  constructor(dbName, version) {
    this.dbName = dbName;

    if (!version) {
      const currentVersion = localStorage.getItem(`${this.dbName}-version`);
      version = currentVersion ? JSON.parse(currentVersion) : 1;
    }

    localStorage.setItem(`${dbName}-version`, version);
    this.version = version;
  }

  connectDB() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(this.dbName);

      openRequest.onsuccess = function (event) {
        this.database = event.target.result;
        resolve(this.database);
      }.bind(this);

      openRequest.onerror = function (event) {
        reject(event);
      }.bind(this);
    });
  }

  #increaseVersion() {
    this.version = this.version + 1;
    localStorage.setItem(`${this.dbName}-version`, this.version);
  }
}

export default IndexDb;
