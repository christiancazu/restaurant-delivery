<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />

      <q-toolbar-title>
        Quasar App
      </q-toolbar-title>

      <div>{{ user.name }} {{ user.lastname }}</div>
      <q-btn @click="signOut">
        sign Out
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    content-class="bg-grey-1"
  >
    <q-list>
      <q-item-label
        header
        class="text-grey-8"
      >
        Essential Links
      </q-item-label>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { sessionService } from '@core/services';

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup (_, { root }) {
    const { user } = sessionService.get();

    function signOut () {
      root.$router.push({ name: 'SignIn' });
      sessionService.close();
    }

    return {
      user,
      signOut
    };
  }
});
</script>
