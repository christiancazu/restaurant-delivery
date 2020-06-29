<template>
<q-layout view="lHh Lpr lFf">
  <q-page-container>
    <q-page
      :class="[
        { 'justify-center': $q.screen.lt.md },
        'row justify-end items-center'
      ]"
      :style="`background: url(utp_restaurant.jpg) no-repeat center center fixed;`"
    >
      <section
        :style="!$q.screen.lt.md && 'margin-right: 92px'"
        class="col col-md-3 q-px-sm"
      >
        <sign-in-form />
      </section>
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
