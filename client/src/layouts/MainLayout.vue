<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated>
    <q-toolbar>
      <q-btn
        icon="menu"
        aria-label="Menu"
        flat dense round
        @click="leftDrawerOpen = !leftDrawerOpen"
      />

      <q-toolbar-title>
        UTP Restaurant Delivery
      </q-toolbar-title>

      <div
        v-if="session.user"
        class="q-mx-sm"
      >{{ session.user.email }}</div>
      <q-btn
        color="secondary"
        @click="signOut"
      >
        {{ $t('signOut') }}
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above bordered
    content-class="bg-grey-1"
  >
    <q-list>
      <q-item-label
        header
        class="text-grey-8"
      >
        Menu
      </q-item-label>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { sessionService } from '@core/services';

import { notifyUtil } from '@core/utils';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup (_, { root }) {
    const { session } = sessionService.get();

    function signOut () {
      sessionService.close();
      notifyUtil.info('session.info.close');
      root.$router.push({ name: 'SignIn' });
    }

    return {
      session,
      signOut
    };
  }
});
</script>
