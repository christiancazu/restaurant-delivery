<template>
<app-page
  :title="$t('order.my')"
  icon="fad fa-ballot"
>
  <template #pageContent>
    <q-table
      ref="table"
      :columns="columns"
      :data="orders"
      :pagination.sync="pagination"
      :loading="loadingOrders"
      :card-style="{ backgroundColor: 'transparent', boxShadow: 'none' }"
      row-key="order"
      :no-results-label="$t('noResults')"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols" :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td
            key="payment"
            :props="props"
          >
            {{ translatePayment(props.row.order.payment.name) }}
          </q-td>
          <q-td
            key="status"
            :props="props"
          >
            {{ translateStatus(props.row.order.status.name) }}
          </q-td>
          <q-td
            key="payed"
            :props="props"
          >
            {{ props.row.order.payed ? $t('yes') : $t('no') }}
          </q-td>
          <q-td
            key="createdAt"
            :props="props"
          >
            {{ new Date(props.row.order.createdAt).toLocaleString() }}
          </q-td>
          <q-td
            key="total"
            :props="props"
          >
            S/. {{ props.row.order.total ? props.row.order.total.toFixed(2) : '' }}
          </q-td>
          <q-td
            auto-width
          >
            <q-btn
              color="primary"
              round
              :icon="props.expand ? 'remove' : 'add'"
              size="12px"
              @click="props.expand = !props.expand"
            />
          </q-td>
        </q-tr>

        <!-- expand -->
        <q-tr
          v-show="props.expand"
          :props="props"
        >
          <q-td colspan="100%">
            <q-card
              flat
            >
              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-center">{{ $tc('plate.plurals', 0) }}</th>
                    <th class="text-center">{{ $t('name') }}</th>
                    <th class="text-center">{{ $tc('order.plurals', 1) }}</th>
                    <th class="text-center">{{ $t('price.default') }}</th>
                    <th class="text-center">subTotal</th>
                    <th class="text-center">{{ $t('destine.place') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(orderCard, index) in props.row.orderCards"
                    :key="orderCard.id"
                  >
                    <td class="text-center">
                      <q-img
                        width="48px"
                        height="48px"
                        :src="`${PATH_MEDIA}/plates/${orderCard.card.plate.avatar}`"
                        class="img-cover"
                      />
                    </td>
                    <td class="text-center">{{ orderCard.card.plate.name }}</td>
                    <td class="text-center">{{ orderCard.amount }}</td>
                    <td class="text-center">S/. {{ orderCard.card.price.toFixed(2) }}</td>
                    <td class="text-center">S/. {{ orderCard.subtotal.toFixed(2) }}</td>
                    <td class="text-center">
                      <q-btn
                        v-if="index === 0"
                        color="secondary"
                        icon="fad fad fa-map-marker-alt"
                        round dense
                        @click="viewDestine(props.row.order.destineLatLng)"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog
      :value="dialogDestineLocation.visible"
      persistent maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <marker-geo-json
        :map="map"
        :marker="marker"
        :draggable="false"
        @confirm-destine="dialogDestineLocation.visible = false"
      />
    </q-dialog>

  </template>
</app-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api';

import { AppPage } from 'src/wrappers';
import MarkerGeoJson from 'src/components/leaflet/MarkerGeoJson.vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import {
  SESSION_QUERY,
  ORDER_DETAILS_BY_CLIENT_QUERY
} from '@core/graphql/querys';
import { Session, Order } from '@common/gql/graphql.schema.generated';

import { i18n } from 'src/boot/i18n';

const PATH_MEDIA = process.env.URL_MEDIA;

export default defineComponent({
  name: 'Home',

  components: {
    AppPage,
    MarkerGeoJson
  },

  data () {
    return {
      leftDrawerOpen: false
    };
  },

  setup () {
    const { result, loading } = useQuery(SESSION_QUERY);
    const { result: ordersResult, loading: loadingOrders } = useQuery(ORDER_DETAILS_BY_CLIENT_QUERY, {}, {
      fetchPolicy: 'network-only'
    });
    const session = useResult<Session>(result);
    const orders = useResult<Order[]>(ordersResult);

    const pagination = {
      page: 1,
      rowsPerPage: 50,
      rowsNumber: 0
    };

    const columns = [
      { name: 'payment', align: 'center', label: i18n.t('payment.type'), field: 'payment', sortable: true },
      { name: 'status', align: 'center', label: i18n.t('status.default'), field: 'status', sortable: true },
      { name: 'payed', align: 'center', label: i18n.t('payed'), field: 'payed' },
      { name: 'createdAt', align: 'center', label: i18n.t('createdAt'), field: 'createdAt', sortable: true },
      { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
      { name: 'expand', align: 'center', label: i18n.t('details') }
    ];

    const dialogDestineLocation = reactive({
      visible: false
    });

    const map = ref({
      latLng: [],
      zoom: 12
    });

    const marker = ref({
      latLng: [],
      visible: true
    });

    function translatePayment (payload) {
      switch (payload) {
        case 'CASH':
          return i18n.t('payment.cash');
        case 'CREDIT_CARD':
          return i18n.t('payment.creditCard');
        case 'YAPE':
          return i18n.t('payment.yape');
      }
    }

    function translateStatus (payload) {
      switch (payload) {
        case 'RECEIVED':
          return i18n.t('status.received');
        case 'PREPARING':
          return i18n.t('status.preparing');
        case 'DISPATCHED':
          return i18n.t('status.dispatched');
        case 'DELIVERED':
          return i18n.t('status.delivered');
        case 'CANCELED':
          return i18n.t('status.canceled');
      }
    }

    function viewDestine (latLngString) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const latLng = latLngString.split(',').map(v => parseFloat(v));

      dialogDestineLocation.visible = true;
      map.value.latLng = latLng;
      marker.value.latLng = latLng;
    }

    return {
      session,
      loading,
      orders,
      loadingOrders,
      columns,
      translatePayment,
      translateStatus,
      pagination,
      viewDestine,
      dialogDestineLocation,
      map,
      marker,
      PATH_MEDIA
    };
  }
});
</script>
