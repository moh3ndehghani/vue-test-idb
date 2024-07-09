<script setup>
import IndexDb from "@/services"


async function createDB(dbName) {
  let t = new IndexDb(dbName)
  await t.connectDB()
  console.log(t);
}
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
  </div>
</template>
