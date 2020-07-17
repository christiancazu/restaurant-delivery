<template>
<q-page>
  <q-card
    style="min-height: 100vh"
    class="bg-grey-2"
  >
    <section class="row q-pt-sm q-px-md">
      <div class="col-sm-6 text-h6">
        <q-icon
          :name="icon"
          class="q-mr-sm"
        />{{ title }}
      </div>
      <div class="col-sm-6 flex justify-end">
        <!-- <q-input
          :disable="true"
          placeholder="buscar"
          dense clearable outlined
          bg-color="white"
        >
          <template #prepend>
            <q-icon
              name="fad fa-search"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
          <template #append>
            <q-icon
              name="fad fa-close"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input> -->
      </div>
    </section>

    <q-separator inset />

    <q-card-section>
      <slot name="pageContent" />
    </q-card-section>
  </q-card>

</q-page>
</template>

<script lang="ts">
import { Catalogue } from 'src/components';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  components: {
    Catalogue
  },

  setup () {
    function onSelectPlate (payload) {
      console.warn(payload);
    }

    return {
      onSelectPlate
    };
  }
});
</script>
