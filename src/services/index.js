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
      const request = indexedDB.open(this.dbName);

      request.onsuccess = (event) => {
        this.database = event.target.result;
        console.log("hhh", Object.assign({}, event.target));
        resolve(this.database);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  createTable(tableName, config) {
    console.log(Object.assign(this.database));
    // return new Promise((resolve, reject) => {
    //   const request = indexedDB.open(this.dbName);

    //   request.onsuccess = function (event) {
    //     this.database = event.target.result;
    //     resolve(this.database);
    //   };

    //   request.onerror = function (event) {
    //     reject(event);
    //   };

    //   request.onupgradeneeded = function (event) {

    //   };
    // });
  }

  // #increaseVersion() {
  //   this.version = this.version + 1;
  //   localStorage.setItem(`${this.dbName}-version`, this.version);
  // }
}

export default IndexDb;
