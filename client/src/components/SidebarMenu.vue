<template>
<q-item
  v-ripple clickable exact
  exact-active-class="text-warning"
  :to="{name: routeName, params: { module: routeModule } }"
>
  <q-item-section
    v-if="avatar"
    avatar
  >
    <q-avatar>
      <img :src="`avatars/${avatar}`">
    </q-avatar>
  </q-item-section>

  <q-item-section>
    <q-item-label class="text-capitalize">{{ title }}</q-item-label>
    <q-item-label caption>
      {{ caption }}
    </q-item-label>
  </q-item-section>
</q-item>
</template>

<script>
export default {
  name: 'SidebarMenu',

  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: '#'
    },
    routeModule: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
svg {
  border:10px solid yellow;
  stroke-width: 4;
  fill: yellow;
}
</style>
