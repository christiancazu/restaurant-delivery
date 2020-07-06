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
          val => !!val || $t('field.errors.required', { field: $t('email') }),
          val => /\S+@\S+\.\S+/.test(val) || $t('field.errors.email')
        ]"
        :label="$t('email')"
        :disable="loading"
        autocomplete="off"
        outlined lazy-rules
      >
        <template v-slot:prepend>
          <q-icon name="fad fa-user" />
        </template>
      </q-input>
      <q-input
        v-model="signInInput.password"
        :rules="[val => !!val || $t('field.errors.required', { field: $t('password') })]"
        :label="$t('password')"
        :disable="loading"
        type="password"
        autocomplete="off"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="fad fa-lock" />
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
  <q-card-section class="text-center">
    {{ $t('account.notHave') }}
    <span
      class="text-link text-lowercase"
      @click="openSignUp"
    >
      {{ $t('registerHere') }}
    </span>
  </q-card-section>

  <q-dialog
    v-model="signUpDialogOpen"
    persistent medium
  >
    <sign-up-form
      :style="`width: ${!$q.screen.lt.md ? '92%' : '100%'}`"
      @cancel="signUpDialogOpen = false"
    />
  </q-dialog>
</q-card>
</template>

<script lang="ts">
import { SignInInput } from '@common/gql/graphql.schema.generated';
import { authService } from '@core/services';

import SignUpForm from './SignUpForm.vue';

import {
  defineComponent,
  ref,
  reactive
} from '@vue/composition-api';

export default defineComponent({
  name: 'SignInForm',

  components: {
    SignUpForm
  },

  setup () {
    const signInInput = reactive<SignInInput>({
      email: '',
      password: ''
    });

    const
      loading = ref<boolean>(false),
      signUpDialogOpen = ref<boolean>(false);

    function onSubmitSignIn () {
      try {
        loading.value = true;

        authService.signIn(signInInput);
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }

    function openSignUp () {
      signUpDialogOpen.value = true;
    }
    return {
      signInInput,
      onSubmitSignIn,
      openSignUp,
      loading,
      signUpDialogOpen
    };
  }
});
</script>

<style lang="scss">
.dialog-sign-up {
  & .q-dialog__inner {
    padding: 8px;
  }
}
</style>
