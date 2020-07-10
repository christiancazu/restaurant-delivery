<!-- eslint-disable vue/no-v-html -->
<template>
<q-dialog
  :value="visibleDialog"
  @hide="$emit('update:visibleDialog', false)"
>
  <q-card
    v-if="visibleDialog"
    style="width: 780px"
  >
    <q-img
      :src="`${PATH_MEDIA}/${plate.avatar}`"
    />

    <q-card-section>
      <!-- <q-btn
        fab
        color="primary"
        icon="place"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      /> -->

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

      <q-rating
        :value="4"
        :max="5" size="32px"
      />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- <div class="text-subtitle1">
        $・Italian, Cafe
      </div> -->
      <div
        class="text-caption"
        v-html="plate.description"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        label="Agregar a mi Orden"
        icon="fad fa-cart-plus"
        color="primary"
        push glossy
      />
    </q-card-actions>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

const PATH_MEDIA = process.env.URL_MEDIA.replace(/"/g, '');

export default defineComponent({
  props: {
    visibleDialog: {
      type: Boolean
    },
    plate: {
      type: Object, default: () => ({})
    }
  },

  setup () {
    return {
      PATH_MEDIA
    };
  }
});
</script>
