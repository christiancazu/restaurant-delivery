<template>
<q-dialog
  :value="visible"
  @hide="$emit('update:visible', false)"
>
  <q-card>
    <img
      :src="`${PATH_MEDIA}/plates/${plate.avatar}`"
      style="max-width: 360px"
    >

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

    <q-card-section class="q-py-none">
      <div class="q-field__label q-mb-sm">{{ $t('stock.set') }}</div>
      <q-input
        v-model.number="stock.initial"
        :rules="[
          val => !!val || $t('field.errors.required', { field: 'stock' })
        ]"
        label="stock"
        outlined lazy-rules dense
        type="number"
        min="1"
        max="99"
        autocomplete="off"
      >
        <template #prepend>
          <q-icon name="fad fa-utensils" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section class="q-py-none">
      <div class="q-field__label q-mb-sm">{{ $t('price.set') }}</div>
      <q-input
        v-model.number="price"
        :rules="[
          val => !!val || $t('field.errors.required', { field: $t('price.default') })
        ]"
        :label="$t('price.default')"
        outlined lazy-rules dense
        type="number"
        min="0.00"
        max="999.99"
        step="0.01"
        autocomplete="off"
      >
        <template #prepend>
          <q-icon name="fad fa-dollar-sign" />
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
        @click="
          $emit('confirm', {
            plate,
            initialStock: stock.initial,
            stock: stock.initial,
            price: price
          })
          stock.initial = 1
          stock.current = 1
          price = 0
        "
      />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';

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

    const price = ref<number>(0);

    function onKeyDown (e) {
      if (e.keyCode === 69) {
        stock.initial = parseInt(stock.initial.toString().replace('e', ''));
      }
    }

    return {
      stock,
      price,
      onKeyDown,
      //
      PATH_MEDIA
    };
  }
});
</script>
