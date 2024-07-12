<script setup>
import IndexDb from "@/services";

async function createDB(dbName) {
  let idb = new IndexDb(dbName);
  await idb.connectDB(async function update() {
    const columns = [
      { indexName: "username", keyPath: "username", options: { unique: true } },
      {
        indexName: "firstName",
        keyPath: "firstName",
        options: { unique: false },
      },
      {
        indexName: "lastName",
        keyPath: "lastName",
        options: { unique: false },
      },
      { indexName: "email", keyPath: "email", options: { unique: true } },
    ];
    await idb.createTable("users", { keyPath: "id" }, columns);
  });
}
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
  </div>
</template>
