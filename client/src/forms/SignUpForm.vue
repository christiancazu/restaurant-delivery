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

      <section class="row q-my-sm q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.email"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('email') }),
              val => /\S+@\S+\.\S+/.test(val) || $t('field.errors.email'),
              val =>
                val.length >= ASSERTS.USER.EMAIL_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('email'),
                  amount: ASSERTS.USER.EMAIL_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.EMAIL_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('email'),
                  amount: ASSERTS.USER.EMAIL_MAX_LENGTH,
                })
            ]"
            :label="$t('email')"
            :disable="loading"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-at" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.document"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('document') }),
              val =>
                val >= 10000000 ||
                $t('field.errors.notValid', {
                  field: $t('document')
                }),
              val =>
                val.length >= ASSERTS.USER.DOCUMENT_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('document'),
                  amount: ASSERTS.USER.DOCUMENT_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.DOCUMENT_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('document'),
                  amount: ASSERTS.USER.DOCUMENT_MAX_LENGTH,
                })
            ]"
            :label="$t('document')"
            :disable="loading"
            type="number"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-id-card" />
            </template>
          </q-input>
        </div>
      </section>

      <section class="q-my-sm row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.password"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('password') }),
              val =>
                val.length >= ASSERTS.USER.PASSWORD_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('password'),
                  amount: ASSERTS.USER.PASSWORD_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.PASSWORD_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('password'),
                  amount: ASSERTS.USER.PASSWORD_MAX_LENGTH,
                })
            ]"
            :label="$t('password')"
            :disable="loading"
            type="password"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-lock" />
            </template>
          </q-input>

        </div>
        <div class="col-12 col-md-6">
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
            <template #prepend>
              <q-icon name="fad fa-lock" />
            </template>
          </q-input>
        </div>
      </section>

      <section class="row q-my-sm q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.firstname"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('firstname') }),
              val =>
                val.length >= ASSERTS.USER.FIRSTNAME_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('firstname'),
                  amount: ASSERTS.USER.FIRSTNAME_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.FIRSTNAME_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('firstname'),
                  amount: ASSERTS.USER.FIRSTNAME_MAX_LENGTH,
                })
            ]"
            :label="$t('firstname')"
            :disable="loading"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-user" />
            </template>
          </q-input>

        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.lastname"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('lastname') }),
              val =>
                val.length >= ASSERTS.USER.LASTNAME_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('lastname'),
                  amount: ASSERTS.USER.LASTNAME_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.LASTNAME_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('lastname'),
                  amount: ASSERTS.USER.LASTNAME_MAX_LENGTH,
                })
            ]"
            :label="$t('lastname')"
            :disable="loading"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-user" />
            </template>
          </q-input>
        </div>
      </section>

      <section class="row q-my-sm q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.phone"
            :rules="[
              val => !!val || $t('field.errors.required', { field: $t('phone') }),
              val =>
                val >= 100000000 ||
                $t('field.errors.notValid', {
                  field: $t('phone')
                }),
              val =>
                val.length >= ASSERTS.USER.PHONE_MIN_LENGTH ||
                $t('field.errors.minLength', {
                  field: $t('phone'),
                  amount: ASSERTS.USER.PHONE_MIN_LENGTH,
                }),
              val =>
                val.length <= ASSERTS.USER.PHONE_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('phone'),
                  amount: ASSERTS.USER.PHONE_MAX_LENGTH,
                })
            ]"
            :label="$t('phone')"
            :disable="loading"
            autocomplete="off"
            type="number"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-mobile" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6">
          <q-input
            v-model="signUpInput.address"
            :rules="[
              val =>
                val.length <= ASSERTS.USER.ADDRESS_MAX_LENGTH ||
                $t('field.errors.maxLength', {
                  field: $t('address'),
                  amount: ASSERTS.USER.ADDRESS_MAX_LENGTH,
                })
            ]"
            :label="$t('address')"
            :disable="loading"
            autocomplete="off"
            outlined lazy-rules
          >
            <template #prepend>
              <q-icon name="fad fa-address-card" />
            </template>
          </q-input>
        </div>
      </section>

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
import { ASSERTS } from '@common/config/asserts.config';

import { notifyUtil } from '@core/utils';
import { SIGN_UP_MUTATION } from '@core/graphql/mutations';

import { useMutation } from '@vue/apollo-composable';
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
      password: '',
      document: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: ''
      // locationLatLng: '',
      // avatar: ''
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
      loading,
      /** consts */
      ASSERTS
    };
  }
});
</script>
