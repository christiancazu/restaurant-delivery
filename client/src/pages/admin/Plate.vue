<template>
<q-page>
  <q-card
    style="min-height: 100vh"
    class="bg-grey-2"
  >
    <section class="row q-py-sm q-px-md">
      <div class="col-sm-6 text-h6">
        <q-icon name="fad fa-utensils-alt" /> Registrar Platillo
      </div>
    </section>

    <q-separator inset />

    <q-card-section>
      <q-form
        ref="refForm"
        @submit="onSubmitCreatePlate"
      >
        <section
          class="row q-my-sm q-col-gutter-x-md"
          style="padding-top: 8px"
        >

          <div class="col-12 col-md-6">
            <q-uploader
              ref="refUploader"
              class="full-width"
              label="Imagen del platillo"
              accept=".jpg, image/*"
              hide-upload-btn
              @added="avatarFile = $event[0]"
              @removed="avatarFile = null"
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="createPlateInput.name"
              :rules="[
                val => !!val || $t('field.errors.required', { field: $t('name') }),
                val =>
                  val.length >= ASSERTS.PLATE.NAME_MIN_LENGTH ||
                  $t('field.errors.minLength', {
                    field: $t('name'),
                    amount: ASSERTS.PLATE.NAME_MIN_LENGTH,
                  }),
                val =>
                  val.length <= ASSERTS.PLATE.NAME_MAX_LENGTH ||
                  $t('field.errors.maxLength', {
                    field: $t('name'),
                    amount: ASSERTS.PLATE.NAME_MAX_LENGTH,
                  })
              ]"
              :label="$t('name')"
              :disable="loadingPlate"
              outlined lazy-rules
              autocomplete="off"
              bg-color="white"
              class="q-mb-sm"
            >
              <template #prepend>
                <q-icon name="fad fa-utensils" />
              </template>
            </q-input>

            <q-select
              v-model="createPlateInput.typeId"
              :options="types"
              :rules="[
                val => !!val || $t('field.errors.required', { field: 'Tipo' }),
              ]"
              option-label="name"
              option-value="id"
              outlined emit-value map-options
              label="Tipo de plato"
              class="q-mb-sm"
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="fad fa-burger-soda" />
              </template>

            </q-select>

            <q-select
              v-model="createPlateInput.categoryId"
              :options="categories"
              :loading="loadingCategories"
              option-label="name"
              option-value="id"
              outlined emit-value map-options
              label="Categoría"
              class="q-mb-xs"
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="fad fa-salad" />
              </template>
            </q-select>
          </div>
        </section>

        <section class="row q-my-sm q-col-gutter-md">
          <div class="q-field__label">{{ $t('description') }}</div>
          <div class="col-12 q-py-xs">
            <q-editor
              v-model="createPlateInput.description"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify']
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token', 'hr', 'link', 'custom_btn'],
                ['fullscreen'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: [
                      'p',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6',
                    /*'code'*/
                    ]
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                ['undo', 'redo'],
                ['viewsource']
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }"
            />
          </div>
        </section>

        <section class="flex justify-center q-my-lg">
          <q-btn
            :loading="loadingPlate"
            style="width: 200px"
            color="primary"
            icon="fad fa-save"
            glossy push
            label="Enviar"
            type="submit"
          />
        </section>

      </q-form>
    </q-card-section>
  </q-card>
</q-page>
</template>

<script lang="ts">
import { PLATE_CREATE_MUTATION } from '@core/graphql/mutations';
import { notifyUtil } from '@core/utils';
import {
  CATEGORIES_QUERY,
  TYPES_QUERY
} from '@core/graphql/querys';

import { CreatePlateInput } from '@common/gql/graphql.schema.generated';
import { ASSERTS } from '@common/config/asserts.config';

import { defineComponent, reactive, ref } from '@vue/composition-api';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import axios from 'axios';
import { QUploader, QForm } from 'quasar';

export default defineComponent({
  setup () {
    const createPlateInput = reactive<CreatePlateInput>({
      name: '',
      description: '',
      avatar: '',
      categoryId: null,
      typeId: null
    });

    const {
      mutate: createPlateMutation,
      loading: loadingPlate
    } = useMutation(PLATE_CREATE_MUTATION);

    const {
      result: resultCategories,
      loading: loadingCategories
    } = useQuery(CATEGORIES_QUERY);

    const {
      result: resultTypes,
      loading: loadingTypes
    } = useQuery(TYPES_QUERY);

    const categories = useResult(resultCategories);
    const types = useResult(resultTypes);

    const
      avatarFile = ref<string|null>(null),
      refUploader = ref<InstanceType<typeof QUploader>>(null),
      refForm = ref<InstanceType<typeof QForm>>(null);

    async function uploadFile () {
      const fd = new FormData();
      fd.append('image', avatarFile.value);

      const { data } = await axios
        .post(
          `${process.env.API_MEDIA_URL.replace(/"/g, '')}`,
          fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

      return data.avatar;
    }

    async function onSubmitCreatePlate () {
      try {
        if (!avatarFile.value) {
          notifyUtil.warn('avatar.errors.required');
          return;
        }

        const avatarFileName = await uploadFile();

        createPlateInput.avatar = avatarFileName;

        await createPlateMutation(createPlateInput);

        resetForm();

        notifyUtil.success('plateRegister');
      } catch (e) {
      }
    }

    function resetForm () {
      createPlateInput.name = '';
      createPlateInput.description = '';
      createPlateInput.avatar = '';
      createPlateInput.categoryId = null;
      createPlateInput.typeId = null;

      refUploader.value.reset();
      refForm.value.reset();
      refForm.value.resetValidation();
    }

    return {
      avatarFile,
      createPlateInput,
      loadingPlate,
      onSubmitCreatePlate,
      refUploader,
      refForm,
      /* categories */
      categories,
      loadingCategories,
      /* categories */
      types,
      loadingTypes,
      /* const */
      ASSERTS
    };
  }
});
</script>

<style>
.q-uploader__file.relative-position.q-uploader__file--img {
  height: 400px;
}
</style>
