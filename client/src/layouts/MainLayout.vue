<template>
<q-layout view="hHh Lpr lFf">
  <q-header elevated>
    <q-toolbar class="bg-primary">

      <q-btn
        icon="fad fa-bars"
        aria-label="Menu"
        flat round
        @click="leftDrawerOpen = !leftDrawerOpen"
      />

      <q-avatar size="48px">
        <img src="app-logo-128x128.png">
      </q-avatar>

      <q-toolbar-title>
        Restaurant Delivery
        <q-btn
          icon="fad fa-home"
          flat round
          :to="{ name: 'Home' }"
        />
      </q-toolbar-title>

      <div
        v-if="session.user"
        class="q-mx-sm"
      >{{ session.user.email }}</div>
      <q-btn
        color="grey"
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
    <q-list v-if="session.isLogged">

      <!-- ADMIN PANEL -->
      <template v-if="session.user.roles.find(role => role.name === 'ADMIN')">
        <q-item-label
          header
          class="text-grey-8"
        >
          {{ $t('admin' ) }}
        </q-item-label>

        <SidebarMenu
          v-for="adminOption in adminOptions" :key="adminOption.title"
          v-bind="adminOption"
        />

        <q-separator />

      </template>

      <!-- CLIENT PANEL -->
      <SidebarMenu
        v-for="clientOption in clientOptions" :key="clientOption.title"
        v-bind="clientOption"
      />

    </q-list>
  </q-drawer>

  <q-page-container>
    <transition
      appear
      enter-active-class="animated slideInDown"
    >
      <router-view />
    </transition>
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { sessionService } from '@core/services';

import { notifyUtil } from '@core/utils';

import { defineComponent } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SESSION_QUERY } from '@core/graphql/querys';
import { Session } from '@common/gql/graphql.schema.generated';

import SidebarMenu from 'src/components/SidebarMenu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SidebarMenu
  },

  data () {
    return {
      leftDrawerOpen: false,
      adminOptions: [
        {
          title: this.$tc('plate', 1),
          icon: 'school',
          routeName: 'Admin',
          routeModule: 'plate'
        },
        {
          title: this.$tc('dealer', 2),
          icon: 'fad fa-biking-mountain',
          routeName: 'Admin',
          routeModule: 'dealer'
        },
        {
          title: this.$tc('employee', 2),
          icon: 'fad fa-users',
          routeName: 'Admin',
          routeModule: 'employee'
        },
        {
          title: this.$tc('client', 2),
          icon: 'fad fa-user-friends',
          routeName: 'Admin',
          routeModule: 'client'
        },
        {
          title: this.$tc('vehicle', 2),
          icon: 'fad fa-motorcycle',
          routeName: 'Admin',
          routeModule: 'vehicle'
        }
      ],
      clientOptions: [
        {
          title: this.$t('my_orders'),
          icon: 'fad fa-address-book',
          routeName: 'User',
          routeModule: 'order'
        },
        {
          title: this.$t('menu_daily'),
          icon: 'fad fa-hat-chef',
          routeName: 'User',
          routeModule: 'menu'
        },
        {
          title: this.$tc('plate', 2),
          icon: 'fad fa-burger-soda',
          routeName: 'User',
          routeModule: 'extras'
        }

      ]
    };
  },

  setup (_, { root }) {
    const { result } = useQuery(SESSION_QUERY);
    const session = useResult<Session>(result);

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
