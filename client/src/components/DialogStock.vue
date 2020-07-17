<template>
<q-dialog
  :value="visible"
  @hide="$emit('update:visible', false)"
>
  <q-card>
    <q-img :src="`${PATH_MEDIA}/plates/${plate.avatar}`" />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ plate.name }}
        </div>
        <div class="col-auto text-caption text-primary row no-wrap items-center">
          <q-chip>
            <q-avatar
              color="red"
              text-color="white"
              icon="fad fa-utensils-alt"
            />
            {{ plate.type.name }}
          </q-chip>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="q-field__label q-mb-sm">{{ $t('stock.set') }}</div>
      <q-input
        v-model.number="stock.initial"
        :rules="[
          val => !!val || $t('field.errors.required', { field: 'stock' }),
          val =>
            val < 1 ||
            $t('field.errors.minValue', {
              field: $t('stock.initial'),
              amount: 1,
            }),
        ]"
        label="stock"
        outlined lazy-rules dense
        type="number"
        min="1"

        autocomplete="off"
        class="q-mb-sm"
      >
        <template #prepend>
          <q-icon name="fad fa-utensils" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions
      align="right"
      class="q-mb-sm"
    >
      <q-btn
        v-close-popup
        :label="$t('confirm')"
        color="primary"
        icon="fad fa-save"
        class="q-mr-sm"
        @click="$emit('confirm', {
          plate,
          initialStock: stock.initial,
          stock: stock.initial
        })"
      />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

interface Stock {
  initial: number
  current: number
}

const PATH_MEDIA = process.env.URL_MEDIA;

export default defineComponent({
  name: 'DialogStock',

  props: {
    visible: {
      type: Boolean
    },
    plate: {
      type: Object, default: () => ({})
    }
  },

  setup () {
    const stock = reactive<Stock>({
      initial: 1,
      current: 1
    });

    return {
      stock,
      //
      PATH_MEDIA
    };
  }
});
</script>
