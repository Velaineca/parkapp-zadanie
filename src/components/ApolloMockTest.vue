<template>

  <section>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="text-red-600">{{error.message}}</p>
    <ul v-else>
      <li v-for="p in items" :key="p.id">{{p.name}}</li>
    </ul>
  </section>

</template>

<script setup lang="ts">
import {graphql} from "../plugins/gql";
import {useQuery} from "@vue/apollo-composable";
import {computed} from "vue";

const PILOTS = graphql(`
  query PilotsTest($page: Int!, $perPage:Int!){
    pilots(page: $page, perPage: $perPage){
      totalPages
      items { id name }
    }
  }
`)

const { result, loading, error } = useQuery(PILOTS, { page:1, perPage:6 })
const items = computed(()=> result.value?.pilots.items ?? [])
</script>

<style scoped>

</style>