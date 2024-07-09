<script setup>
import IndexDb from "@/services"


function createDB(dbName) {
  let t = new IndexDb(dbName)
  console.log(t)
}
</script>

<template>
  <div>
    <button @click="createDB('test-db')">create db</button>
  </div>
</template>
