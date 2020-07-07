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

      <q-avatar
        size="48px"
        @click="$router.push({ name: 'Home' })"
      >
        <img src="app-logo-128x128.png">
      </q-avatar>

      <q-toolbar-title v-if="!$q.screen.lt.md">
        Restaurant Delivery
        <q-btn
          icon="fad fa-home fa-swap-opacity"
          flat round
          :to="{ name: 'Home', params: { module: '' } }"
        />
      </q-toolbar-title>

      <template v-if="session.user">
        <q-btn-dropdown
          stretch flat
        >
          <template #label>
            <q-avatar
              square
              size="2em"
              icon="fad fa-bell fa-swap-opacity"
            >
              <q-badge
                color="warning"
                label="2"
                floating
                style="transform: translate(16px, -4px)"
              />
            </q-avatar>
          </template>

          <q-list>
            <q-item
              v-close-popup clickable tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="fad fa-bells"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('myNotification') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown
          stretch flat
        >
          <template #label>
            <q-avatar
              square
              size="2em"
              icon="fad fa-shopping-cart"
            >
              <q-badge
                color="warning"
                label="2"
                floating
                style="transform: translate(16px, -4px)"
              />
            </q-avatar>
          </template>

          <q-list>
            <q-item
              v-close-popup clickable tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="fad fa-cart-plus"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $tc('myOrder', 2) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown
          stretch
          flat
        >
          <template #label>
            <q-avatar
              square
              size="2em"
              icon="fad fa-user-circle"
            />
            <span v-if="!$q.screen.lt.md">{{ session.user.email }}</span>
          </template>

          <q-list>
            <q-item
              v-close-popup clickable tabindex="0"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="fad fa-address-card"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('myProfile') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-close-popup clickable tabindex="1"
              @click="signOut"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="fad fa-sign-out"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('signOut') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

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

  <q-page-container class="bg-grey-11">
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
import { Session } from '@common/gql/graphql.schema.generated';

import { sessionService } from '@core/services';
import { notifyUtil } from '@core/utils';

import { defineComponent } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';
import { SESSION_QUERY } from '@core/graphql/querys';

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
          icon: 'fad fa-clipboard-list',
          routeName: 'AdminPlate'
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
        },
        {
          title: this.$tc('report', 2),
          icon: 'fad fa-file-chart-line',
          routeName: 'Admin',
          routeModule: 'report'
        }
      ],
      clientOptions: [
        {
          title: this.$tc('myOrder', 2),
          icon: 'fad fa-address-book',
          routeName: 'User',
          routeModule: 'order'
        },
        {
          title: this.$t('menuDaily'),
          icon: 'fad fa-hat-chef',
          routeName: 'User',
          routeModule: 'menu'
        },
        {
          title: 'Platillos',
          icon: 'fad fa-burger-soda',
          routeName: 'UserPlates'
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
