<script setup>
import IndexDb from "@/services";

async function createDB(dbName) {
  // let t = new IndexDb(dbName);
  // await t.connectDB();
}

async function addTable(dbName, tableName) {
  let t = new IndexDb(dbName);
  await t.connectDB();
  await t.createTable(tableName, { keyPath: "id" });
}
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
    <button @click="addTable('test-db', 'users')">create table</button>
  </div>
</template>
