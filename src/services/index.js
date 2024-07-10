class IndexDb {
  database = null;
  dbName = null;
  version;
  openReq;
  constructor(dbName, version) {
    this.dbName = dbName;

    if (!version) {
      const currentVersion = localStorage.getItem(`${this.dbName}-version`);
      version = currentVersion ? JSON.parse(currentVersion) + 1 : 1;
    }

    localStorage.setItem(`${dbName}-version`, version);
    this.version = version;
  }

  connectDB() {
    return new Promise((resolve, reject) => {
      this.openReq = indexedDB.open(this.dbName);

      this.openReq.onsuccess = function (event) {
        this.database = event.target.result;
        resolve(this.database);
      }.bind(this);

      this.openReq.onerror = function (event) {
        reject(event);
      }.bind(this);

      // this.openReq.onupgradeneeded = function (event) {}.bind(this);
    });
  }

  createTable(tableName, config) {
    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction(tableName, "readwrite");
    });

    // const objectStore = transaction.objectStore(tableName);

    // transaction.oncomplete = () => {
    //   resolve(`Table '${tableName}' created successfully.`, objectStore);
    // };

    // transaction.onerror = (event) => {
    //   reject(`Error creating table '${tableName}': ${event.target.error}`);
    // };
    // this.openReq.onupgradeneeded = function (event) {
    //   console.log("event ===", event);
    //   this.database.createObjectStore(tableName, config);
    // }.bind(this);
  }

  // #increaseVersion() {
  //   this.version = this.version + 1;
  //   localStorage.setItem(`${this.dbName}-version`, this.version);
  // }
}

export default IndexDb;
