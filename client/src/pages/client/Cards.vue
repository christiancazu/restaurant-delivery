<template>
<app-page
  :title="$t('card.default')"
  icon="fad fa-utensils-alt"
>
  <template #pageContent>
    <catalogue-subscription
      btn-add-icon="fad fa-cart-plus"
      @on-select-plate="onSelectPlate"
    />
  </template>
</app-page>
</template>

<script lang="ts">
import { AppPage } from 'src/wrappers';
import { CatalogueSubscription } from 'src/components';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    AppPage,
    CatalogueSubscription
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

<style lang="scss">
.slider-caption {
  background-color: rgba(0, 0, 0, .3);
}
</style>
