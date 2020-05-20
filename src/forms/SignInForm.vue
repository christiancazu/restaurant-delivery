<template>
<div>
  <h1 class="text-h1 text-white">SIGN IN</h1>
  <q-btn
    color="secondary"
    @click="login"
  >
    login
  </q-btn>
  <div
    class="text-white flex-column"
    style="max-width: 600px"
  >
    <div
      v-for="(value, key, index) in user" :key="index"
      style="white-space: initial; word-wrap:break-word;"
    >
      {{ key }}: {{ value }}
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Credentials } from '@core/interfaces';
import { sessionService, authService, notifyService } from '@core/services';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignInForm',

  setup (_, { root }) {
    const credentials: Credentials = {
      email: 'christiancazu@gmail.com',
      password: '12345678'
    };

    const { user } = sessionService.get();

    const login = async () => {
      try {
        await authService.signIn(credentials);
        root.$router.push({ name: 'Home' });
      } catch (error) {
        notifyService.error('auth.errors.credentials');
      }
    };
    return {
      user,
      login
    };
  }
});
</script>
