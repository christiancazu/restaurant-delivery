<template>
<q-card
  bordered
>
  <q-card-section>
    <q-form
      class="q-gutter-y-md"
      @submit="onSubmitSignUp"
    >
      <div class="text-h6 text-center q-py-none">
        {{ $t('signUp') }}
      </div>

      <q-separator />

      <q-input
        v-model="signUpInput.email"
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
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input
        v-model="signUpInput.password"
        :rules="[val => !!val || $t('field.errors.required', { field: $t('password') })]"
        :label="$t('password')"
        :disable="loading"
        type="password"
        autocomplete="off"
        outlined lazy-rules
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>

      <q-input
        v-model="repeatPassword"
        :rules="[
          val => !!val || $t('field.errors.required', { field: $t('password') }),
          val => val === signUpInput.password || $t('field.errors.repeatPassword')
        ]"
        :label="$t('confirmPassword')"
        :disable="loading"
        type="password"
        autocomplete="off"
        outlined lazy-rules
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
          {{ $t('register') }}
        </q-btn>
      </div>
      <q-separator />
      <div>
        <q-btn
          class="full-width"
          text-color="primary"
          @click="$emit('cancel')"
        >
          {{ $t('cancel') }}
        </q-btn>
      </div>
    </q-form>
  </q-card-section>
</q-card>
</template>

<script lang="ts">
import { SignUpInput } from '@common/gql/graphql.schema.generated';

import { useMutation } from '@vue/apollo-composable';
import { SIGN_UP_MUTATION } from '@core/graphql/mutations';
import { notifyUtil } from '@core/utils';

import {
  defineComponent,
  ref,
  reactive
} from '@vue/composition-api';

export default defineComponent({
  name: 'SignUpForm',

  setup (_, { emit }) {
    const signUpInput = reactive<SignUpInput>({
      email: '',
      password: ''
    });

    const repeatPassword = ref<string>('');

    const { mutate: signUpMutation, loading } = useMutation(SIGN_UP_MUTATION);

    async function onSubmitSignUp () {
      try {
        await signUpMutation(signUpInput);

        notifyUtil.success('account.success.created');

        emit('cancel');
      } catch (error) {
      }
    }

    return {
      signUpInput,
      repeatPassword,
      onSubmitSignUp,
      loading
    };
  }
});
</script>
