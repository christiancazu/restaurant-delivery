<template>
<q-page
  padding
>
  <q-card
    style="min-height: 100vh"
    class="bg-grey-1"
    bordered
  >
    <q-card-section>
      <q-form
        class="q-gutter-y-md"
        @submit="onSubmitPlateCreate"
      >
        <div class="text-h6 text-center q-py-none">
          <q-icon name="fad fa-utensils-alt" /> Registrar Platillo
        </div>

        <q-separator />

        <section class="row q-my-sm q-col-gutter-md">

          <div class="col-12 col-md-6">
            <q-uploader
              class="full-width"
              label="Imagen del platillo"
              accept=".jpg, image/*"
              hide-upload-btn
              @added="added"
            />
          </div>

          <div class="col-12 col-md-6">
            <q-input
              v-model="plateCreateInput.name"
              class="bg-white q-mb-md"
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
              :disable="loading"
              autocomplete="off"
              outlined lazy-rules
            >
              <template #prepend>
                <q-icon name="fad fa-utensils" />
              </template>
            </q-input>

            <q-select
              v-model="plateCreateInput.typeId"
              outlined
              :options="types"
              :rules="[
                val => !!val || $t('field.errors.required', { field: 'Tipo' }),
              ]"
              style="margin-bottom: 36px"
              label="Tipo de plato"
            >
              <template v-slot:prepend>
                <q-icon name="fad fa-burger-soda" />
              </template>

            </q-select>

            <q-select
              v-model="plateCreateInput.categoryId"
              outlined
              :options="categories"
              class="q-mb-md"
              label="Categoría"
            >
              <template v-slot:prepend>
                <q-icon name="fad fa-salad" />
              </template>
            </q-select>
          </div>
        </section>

        <section class="row q-my-sm q-col-gutter-md">
          <div class="col-12">
            <q-editor
              v-model="plateCreateInput.description"
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
                      'code'
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
            style="width: 200px"
            color="primary"
            icon="check"
            :loading="loading"
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
import { defineComponent, reactive } from '@vue/composition-api';
import { PLATE_CREATE_MUTATION } from '@core/graphql/mutations';

import axios from 'axios';
import { useMutation } from '@vue/apollo-composable';
import { PlateCreateInput } from '@common/gql/graphql.schema.generated';

import { ASSERTS } from '@common/config/asserts.config';
import { notifyUtil } from '../../../core/utils';

export const CATEGORIES = {
  CALDOS: 'CALDOS',
  CHICHARRONES: 'CHICHARRONES',
  MIXTOS: 'MIXTOS',
  POLLOS: 'POLLOS',
  ENSALADAS: 'ENSALADAS',
  ARROCES: 'ARROCES',
  PESCADOS: 'PESCADOS'
};

export default defineComponent({
  setup (_, { root }) {
    const types = [
      {
        label: 'Entrada',
        value: 1
      },
      {
        label: 'Fondo',
        value: 2
      },
      {
        label: 'Postre',
        value: 3
      },
      {
        label: 'Bebida',
        value: 4
      },
      {
        label: 'Extra',
        value: 5
      }
    ];

    const categories = [
      {
        label: 'Caldos',
        value: 1
      },
      {
        label: 'Chicharrones',
        value: 2
      },
      {
        label: 'Mixtos',
        value: 3
      },
      {
        label: 'Pollos',
        value: 4
      },
      {
        label: 'Ensaladas',
        value: 5
      },
      {
        label: 'Arroces',
        value: 6
      },
      {
        label: 'Pescados',
        value: 7
      }
    ];

    const plateCreateInput = reactive<PlateCreateInput>({
      name: '',
      description: '',
      avatar: '',
      categoryId: null,
      typeId: null
    });

    const { mutate: createPlateMutation, loading } = useMutation(PLATE_CREATE_MUTATION);

    async function added (e) {
      try {
        const fd = new FormData();
        fd.append('image', e[0]);

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

        plateCreateInput.avatar = data.avatar;
      } catch (e) {}
    }

    async function onSubmitPlateCreate () {
      try {
        if (plateCreateInput.categoryId) {
          plateCreateInput.categoryId = plateCreateInput.categoryId.value;
        }
        if (plateCreateInput.typeId) {
          plateCreateInput.typeId = plateCreateInput.typeId.value;
        }

        await createPlateMutation(plateCreateInput);

        notifyUtil.success('plateRegister');

        root.$router.push({ name: 'Home' });
      } catch (e) {
      }
    }

    return {
      types,
      categories,
      added,
      plateCreateInput,
      loading,
      onSubmitPlateCreate,
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
