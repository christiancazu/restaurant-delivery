<template>
<q-card>
  <q-card-section>
    <q-form
      class="q-gutter-y-md"
      @submit="onSubmitSignIn"
    >
      <div class="text-h6 text-center q-py-none">
        {{ $t('signIn') }}
      </div>

      <q-separator />

      <q-input
        v-model="credentials.email"
        :rules="[
          val => !!val || $t('field.errors.required', { name: $t('email') }),
          val => /\S+@\S+\.\S+/.test(val) || $t('field.errors.email')
        ]"
        :label="$t('email')"
        :disable="loading"
        autocomplete="off"
        outlined lazy-rules
      >
        <template v-slot:append>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        v-model="credentials.password"
        :rules="[val => !!val || $t('field.errors.required', { name: $t('password') })]"
        :label="$t('password')"
        :disable="loading"
        type="password"
        autocomplete="off"
        outlined
      >
        <template v-slot:append>
          <q-icon name="lock" />
        </template>
      </q-input>
      <div>
        <q-btn
          :loading="loading"
          type="submit"
          class="full-width"
          color="primary"
        >
          {{ $t('join') }}
        </q-btn>
      </div>
    </q-form>
  </q-card-section>
</q-card>
</template>

<script lang="ts">
import { Credentials } from '@core/interfaces';
import {
  authService,
  notifyService
} from '@core/services';
import {
  defineComponent,
  ref
} from '@vue/composition-api';

export default defineComponent({
  name: 'SignInForm',

  setup (_, { root }) {
    const credentials = ref<Credentials>({
      email: '',
      password: ''
    });

    const loading = ref<boolean>(false);

    async function onSubmitSignIn () {
      try {
        loading.value = true;

        await authService.signIn(credentials.value);

        root.$router.push({ name: 'Home' });
      } catch (error) {
        notifyService.error('auth.errors.credentials');
      } finally {
        loading.value = false;
      }
    };
    return {
      credentials,
      onSubmitSignIn,
      loading
    };
  }
});
</script>
