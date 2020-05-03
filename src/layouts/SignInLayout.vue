<template>
<q-layout view="lHh Lpr lFf">
  <q-page-container>
    <q-page class="sign-in-page flex flex-center">
      <sign-in-form />
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import SignInForm from 'src/forms/SignInForm.vue';

export default {
  name: 'SignInLayout',

  components: {
    SignInForm
  }
};
</script>
