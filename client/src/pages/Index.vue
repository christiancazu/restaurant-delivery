<template>
<q-page class="row flex justify-center items-center">
  <pre style="max-width: 600px">
    {{ session }}
  </pre>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { sessionService } from '@core/services';

export default defineComponent({
  name: 'PageIndex',

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup () {
    const { session } = sessionService.get();

    return {
      session
    };
  }
});
</script>
