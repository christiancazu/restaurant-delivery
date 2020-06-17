<template>
<q-card
  bordered
>
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
        v-model="signInInput.email"
        :rules="[
          val => !!val || $t('field.errors.required', { name: $t('email') }),
          val => /\S+@\S+\.\S+/.test(val) || $t('field.errors.email')
        ]"
        :label="$t('email')"
        :disable="loading"
        autocomplete="off"
        outlined lazy-rules
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        v-model="signInInput.password"
        :rules="[val => !!val || $t('field.errors.required', { name: $t('password') })]"
        :label="$t('password')"
        :disable="loading"
        type="password"
        autocomplete="off"
        outlined
      >
        <template v-slot:prepend>
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
import { SignInInput } from '@common/gql/graphql.schema.generated';
import { authService } from '@core/services';
import {
  defineComponent,
  ref,
  reactive
} from '@vue/composition-api';

export default defineComponent({
  name: 'SignInForm',

  setup () {
    const signInInput = reactive<SignInInput>({
      email: '',
      password: ''
    });

    const loading = ref<boolean>(false);

    function onSubmitSignIn () {
      try {
        loading.value = true;

        authService.signIn(signInInput);
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
    return {
      signInInput,
      onSubmitSignIn,
      loading
    };
  }
});
</script>
