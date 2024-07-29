<script setup>
import IndexDb from "@/services";

import { reactive, onMounted } from "vue";

const state = reactive({
  idb: null,
});

async function createDB(dbName) {
  state.idb = new IndexDb(dbName);
  await state.idb.connectDB(async function update() {
    const columns = [
      {
        indexName: "username",
        keyPath: "username",
        options: { unique: false },
      },
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
      { indexName: "email", keyPath: "email", options: { unique: false } },
    ];
    await state.idb.createTable(
      "users",
      { keyPath: "id", autoIncrement: true },
      columns
    );
  });
}

async function add() {
  await state.idb.insertData("users", {
    username: "mohssednhaagdhsansi",
    firstName: "mohsen",
    lastName: "dehghani",
    email: "msas@g.com",
    // id: uuidv4()
  });
}

async function remove() {
  await state.idb.removeData("users", 5);
}

async function get() {
  const data = await state.idb.getData("users", 2);
  console.log(data);
}

async function edit() {
  const newData = {
    username: "deeeeee",
    firstName: "m",
    lastName: "d",
    email: "maaaaaaaaa@g.com",
    id: 2,
  };
  await state.idb.editData("users", newData);
}

async function getAll() {
  const data = await state.idb.getAll("users");
  console.log(data);
}

async function getWithPagination() {
  await state.idb.getWithPagination("users")
}

onMounted(async () => {
  await createDB("test-db");
});
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
    <button @click="add()">add record</button>
    <button @click="remove()">remove record</button>
    <button @click="get()">get data</button>
    <button @click="edit()">update data</button>

    <button @click="getAll()">get all data</button>
    <button @click="getWithPagination()">get pagination</button>
  </div>
</template>
