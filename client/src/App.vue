<template>
<div id="q-app">
  <transition
    appear
    enter-active-class="animated slideInDown"
  >
    <router-view />
  </transition>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App'
});
</script>
