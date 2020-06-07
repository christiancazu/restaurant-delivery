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
        Virtual Classroom
      </q-toolbar-title>

      <div class="q-mx-sm">{{ user.name }} {{ user.lastname }}</div>
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
import {
  sessionService,
  notifyService
} from '@core/services';
import { Session } from '@core/interfaces';

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup (_, { root }) {
    const { user }: Session = sessionService.get();

    function signOut () {
      sessionService.close();
      notifyService.info('session.info.close');
      root.$router.push({ name: 'SignIn' });
    }

    return {
      user,
      signOut
    };
  }
});
</script>
