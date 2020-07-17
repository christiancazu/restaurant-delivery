<template>
<q-page class="row flex justify-center items-center">
  <pre style="max-width: 600px">
    {{ session.user }}
  </pre>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { useQuery, useResult } from '@vue/apollo-composable';
import { SESSION_QUERY } from '@core/graphql/querys';
import { Session } from '@common/gql/graphql.schema.generated';

export default defineComponent({
  name: 'Home',

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup () {
    const { result, loading } = useQuery(SESSION_QUERY);
    const session = useResult<Session>(result);

    return {
      session,
      loading
    };
  }
});
</script>
