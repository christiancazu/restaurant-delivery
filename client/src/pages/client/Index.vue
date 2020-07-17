<template>
<div :key="$route.params.module">
  <h4 class="text-h4 text-center">Acciones de Usuario - {{ $route.params.module }}</h4>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserIndex'
});
</script>
