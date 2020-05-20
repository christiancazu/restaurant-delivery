<template>
<q-layout view="lHh Lpr lFf">
  <q-page-container>
    <q-page class="sign-in-page row justify-center flex-center">
      <div class="col col-md-3">
        <sign-in-form />
      </div>
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
