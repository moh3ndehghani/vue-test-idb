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

async function removeDB() {
  await state.idb.removeDB()
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
  const data = await state.idb.getWithPagination("users")
  console.log(data);

}

async function clearTable() {
  const data = await state.idb.clearTable("users")
  console.log(data);
}

async function removeTable() {
  const data = await state.idb.removeTable("users")
  console.log(state.idb);
}

onMounted(async () => {
  await createDB("todo");
});
</script>

<template>
  <div>

    <button @click="removeDB()">remove db</button>
    <button @click="add()">add record</button>
    <button @click="remove()">remove record</button>
    <button @click="get()">get data</button>
    <button @click="edit()">update data</button>
    <button @click="getAll()">get all data</button>
    <button @click="getWithPagination()">get pagination</button>
    <button @click="clearTable()">clear table</button>
    <button @click="removeTable()">remove table</button>
  </div>
</template>
