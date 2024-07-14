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

  connectDB(update) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName , this.version);

      request.onsuccess = (event) => {
        this.database = event.target.result;
        resolve(request);
      };

      request.onerror = (event) => {
        reject(event);
      };

      request.onupgradeneeded = (event) => {
        this.database = event.target.result;
        update();
      };

      request.onversionchange = (event) => {
        console.log("event version changed ===" , event)
      }
    });
  }

  createTable(tableName, tableConfig, columns) {
    return new Promise((resolve, reject) => {
      const objectStore = this.database.createObjectStore(
        tableName,
        tableConfig
      );
      for (let item of columns) {
        objectStore.createIndex(
          item["indexName"],
          item["keyPath"],
          item["options"]
        );
      }
      resolve(objectStore);
    });
  }

   insertData(tableName , data , options){
    return new Promise((resolve , reject) => {
      const transaction = this.database.transaction(tableName , 'readwrite' , options)
      const store = transaction.objectStore(tableName)
      const addResponse = store.add(data)
      addResponse.oncomplete = (event) => {
        console.log("event ===" , event)
        resolve(event)
      }
      addResponse.onerror = (event) => {
        console.log("error ===" , event)
        reject(event)
      }
    })
  }

  #increaseVersion() {
    this.version = this.version + 1;
    localStorage.setItem(`${this.dbName}-version`, this.version);
  }
}

export default IndexDb;
