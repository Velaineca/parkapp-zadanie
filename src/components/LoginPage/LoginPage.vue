<template src="./LoginPage.html"></template>

<script setup lang="ts">
/*export default {
  name: 'LoginPage',
};*/

import {reactive, ref} from "vue"
import {useMutation} from "@vue/apollo-composable"
import {LoginDocument} from "../../plugins/gql/graphql"
import {useRouter} from "vue-router";

const email = ref("")
const password = ref("")
const success = ref(false)
const userData = reactive<{id?:string; email?:string; name?:string}>({})

const router = useRouter()
const { mutate, loading, error, onDone } = useMutation(LoginDocument)

onDone(({ data }) => {
  if(data?.login.token){
    localStorage.setItem("authToken", data.login.token)
    success.value = true
    Object.assign(userData, data.login.user)
    console.log("Loggin in as:", data.login.user)

    setTimeout(()=>{
      router.push("/pilot")
    },1000)
  }
})

function onSubmit(){
  mutate({ email: email.value, password: password.value })
}
</script>

<style scoped></style>
