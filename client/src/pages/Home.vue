<template>
<div>
  <component :is="HomeComponent" />
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';

import { useQuery, useResult } from '@vue/apollo-composable';
import {
  SESSION_QUERY
} from '@core/graphql/querys';

const staff = ['SUPER_ADMIN', 'ADMIN'];

/* eslint-disable @typescript-eslint/no-unsafe-call */
export default defineComponent({
  name: 'Home',

  components: {
    HomeClient: () => import('src/pages/client/Home.vue'),
    HomeAdmin: () => import('src/pages/admin/Home.vue')
  },

  setup () {
    const { result } = useQuery(SESSION_QUERY);

    const session = useResult(result);

    const HomeComponent = ref('div');

    watch(session, session => {
      if (session.user) {
        assignHome();
      }
    }, { immediate: true });

    function assignHome () {
      if (session.value.user.roles.find(role => staff.includes(role.name))) {
        HomeComponent.value = 'HomeAdmin';
        return;
      }
      if (session.value.user.roles.find(role => role.name === 'DEALER')) {
        HomeComponent.value = 'HomeClient';
        return;
      }
      if (session.value.user.roles.find(role => role.name === 'CLIENT')) {
        HomeComponent.value = 'HomeClient';
      }
    }

    return {
      session,
      HomeComponent
    };
  }
});
</script>
