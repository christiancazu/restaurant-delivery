<template>
<h4 class="text-h4 text-center">Gestión de {{ $tc($route.params.module, 2) }}</h4>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AdminIndex'
});
</script>
