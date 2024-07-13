<script setup>
import IndexDb from "@/services";

import { reactive, onMounted } from "vue"

const state = reactive({
  idb: null
})

async function createDB(dbName) {
  state.idb = new IndexDb(dbName);
  await state.idb.connectDB(async function update() {
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
    await state.idb.createTable("users", { keyPath: "id" }, columns);
  });

}

async function add() {
  await state.idb.insertData("users", { id: 10, username: "mohssednhagdhsani", firstName: "mohsen", lastName: "dehghani", email: "m@g.com" })
}


onMounted(async () => {
  await createDB('test-db')
})
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
    <button @click="add()">add record</button>
  </div>
</template>
