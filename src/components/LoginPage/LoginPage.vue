<template src="./LoginPage.html"></template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { LoginDocument } from '../../plugins/gql/graphql';
import { useRouter } from 'vue-router';
import { useGlobalError } from '../ErrorProvider/useGlobalError';

const email = ref('');
const password = ref('');
const success = ref(false);
const userData = reactive<{ id?: string; email?: string; name?: string }>({});
const { setError } = useGlobalError();

const router = useRouter();
const { mutate, loading, error, onDone } = useMutation(LoginDocument);

onDone(({ data }) => {
  if (data?.login.token) {
    sessionStorage.setItem('authToken', data.login.token);
    sessionStorage.setItem('userGates', JSON.stringify(data.login.user.gates ?? []));
    success.value = true;
    Object.assign(userData, data.login.user);
    console.log('Loggin in as:', data.login.user);
    setError?.(null);

    setTimeout(() => {
      router.push('/pilot');
    }, 1000);
  }
});

async function onSubmit() {
  try {
    await mutate({ email: email.value, password: password.value });
  } catch (err: any) {
    //error.value = err;
    setError?.(err);
  }
}
</script>

<style scoped></style>
