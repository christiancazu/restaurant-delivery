<template>
<q-item
  v-ripple clickable exact
  :to="{name: routeName, params: { module: routeModule } }"
>
  <q-item-section
    v-if="icon"
    avatar
  >
    <q-icon :name="icon" />
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
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>
