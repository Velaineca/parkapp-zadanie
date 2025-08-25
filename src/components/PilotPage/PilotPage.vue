<template src="./PilotPage.html"></template>

<script lang="ts">
import {computed, ref} from "vue"
import {useRouter} from "vue-router"

export default {
  setup() {
    const router = useRouter()

    const gates = ref<string[]>(JSON.parse(sessionStorage.getItem("userGates") || "[]"))
    const activeGate = ref<number | null>(0) //--mockup highlight just to fit figma file
    const perPage = 4
    const page = ref(1)

    const totalPages = computed(() => Math.ceil(gates.value.length / perPage))
    const pagedGates = computed(() => {
      const start = (page.value -1) * perPage
      return gates.value.slice(start, start + perPage)
    })

    return { gates, activeGate, page, totalPages, pagedGates,router }
  }
}

</script>

<style scoped></style>
