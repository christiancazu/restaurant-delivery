<template>
<app-page
  :title="$t('card.default')"
  icon="fad fa-utensils-alt"
>
  <template #pageContent>
    <catalogue-subscription
      btn-add-icon="fad fa-cart-plus"
      @on-select-card="onSelectCard"
    />

    <template v-if="orderCards.length">
      <q-separator class="q-my-md" />

      <div
        class="q-field__label q-pb-sm text-capitalize"
      >
        {{ $tc('order.plurals', 2) }}
      </div>

      <transition-group
        name="daily-list"
        class="row q-col-gutter-md"
        tag="section"
      >
        <article
          v-for="orderCard in orderCards" :key="orderCard.card.id"
          class="daily-list-item col-12 col-md-3"
        >
          <q-card>
            <img
              :src="`${PATH_MEDIA}/plates/${orderCard.card.plate.avatar}`"
              class="img-cover"
            >
            <q-card-section
              class="absolute"
              style="top: -16px; right: -16px"
            >
              <q-btn
                color="primary"
                icon="fas fa-minus"
                round dense
                @click="decrementOrder(orderCard)"
              />
              <q-chip
                color="red"
                text-color="white"
                class="shadow-10"
              >
                <q-avatar
                  class="text-bold"
                  style="background-color: #e0e0e0"
                  text-color="black"
                >
                  {{ orderCard.amount }}
                </q-avatar>
                {{ $tc('order.plurals', 2) }}
              </q-chip>

              <q-btn
                color="primary"
                icon="fas fa-plus"
                round dense
                @click="incrementOrder(orderCard)"
              />
            </q-card-section>
            <q-card-section class="q-pa-sm">
              <div class="text-h6">{{ orderCard.card.plate.name }}</div>
              <div class="text-caption">{{ orderCard.card.plate.type.name }}</div>
              <div class="text-caption">
                precio unidad
                <span class="text-accent">S/. {{ orderCard.card.price.toFixed(2) }}</span>
              </div>
              <div class="text-caption">
                sub total
                <span class="text-bold text-accent">S/. {{ (orderCard.card.price * orderCard.amount).toFixed(2) }}</span>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                color="primary"
                icon="fad fa-times-circle"
                :label="$t('remove')"
                outline
                @click="removeDailyCard(orderCard)"
              />
            </q-card-actions>
          </q-card>
        </article>
      </transition-group>

      <q-separator class="q-my-lg" />

      <!-- destine geo localization -->
      <section
        class="q-field__label q-pb-sm text-capitalize"
      >
        {{ $t('destine.set') }}

        <span class="q-px-lg">
          <q-btn
            :loading="loadingCreateOrder"
            color="primary"
            icon="fad fa-map-marker-alt fa-swap-opacity"
            glossy push round
            @click="dialogDestineLocation.visible = true"
          />
        </span>
      </section>

      <q-separator class="q-my-lg" />

      <!-- payment -->
      <section
        class="q-field__label q-pb-sm text-capitalize"
      >
        {{ $t('payment.type') }}

        <div class="flex flex-column q-py-md">
          <q-option-group
            v-model="payment"
            :options="payments"
            label="Notifications"
            type="radio"
          />
        </div>
      </section>

      <q-separator class="q-my-lg" />

      <!-- total & send order -->
      <section class="flex justify-center q-my-lg">
        <div class="text-bold text-h5">Total: S/. {{ orderCardsTotal }} </div>

        <div class="q-px-lg">
          <q-btn
            :loading="loadingCreateOrder"
            style="width: 200px"
            color="primary"
            icon="fad fa-save"
            glossy push
            :label="$t('order.send')"
            @click="createOrder"
          />
        </div>
      </section>

      <q-dialog
        :value="dialogDestineLocation.visible"
        persistent maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <marker-geo-json
          :map.sync="map"
          :marker.sync="marker"
          control-btn
          @confirm-destine="dialogDestineLocation.visible = false"
        />
      </q-dialog>
    </template>
  </template>
</app-page>
</template>

<script lang="ts">
import { AppPage } from 'src/wrappers';
import { CatalogueSubscription } from 'src/components';
import MarkerGeoJson from 'src/components/leaflet/MarkerGeoJson.vue';

import { defineComponent, ref, computed, reactive } from '@vue/composition-api';
import { notifyUtil } from '@core/utils';
import { OrderCard, Card } from '@common/gql/graphql.schema.generated';
import { useMutation } from '@vue/apollo-composable';
import { i18n } from 'src/boot/i18n';
import { CREATE_ORDER_MUTATION } from '@core/graphql/mutations';
import Router from 'src/router';

const PATH_MEDIA = process.env.URL_MEDIA;

/* eslint-disable @typescript-eslint/no-unsafe-call */
export default defineComponent({
  components: {
    AppPage,
    CatalogueSubscription,
    MarkerGeoJson
  },

  setup () {
    const orderCards = ref<OrderCard[]>([]);

    const dialogDestineLocation = reactive({
      visible: false
    });

    const map = ref({
      latLng: [ // Perú - Arequipa
        -16.409081256597535, -71.56253814697267
      ],
      zoom: 12
    });

    const marker = ref({
      latLng: [],
      visible: false
    });

    const {
      mutate: createOrderMutation,
      loading: loadingCreateOrder
    } = useMutation(CREATE_ORDER_MUTATION);

    const payments = [
      { value: 1, label: i18n.t('payment.cash') },
      { value: 2, label: i18n.t('payment.creditCard') },
      { value: 3, label: i18n.t('payment.yape') }
    ];

    const payment = ref(null);

    const orderCardsTotal = computed(() => orderCards.value.reduce((acc, item) => {
      acc += item.amount * item.card.price;
      return acc;
    }, 0).toFixed(2));

    function onSelectCard (selectedCard: Card) {
      const hasInDailyCards = orderCards.value.find(
        (orderCard) => orderCard.card.id === selectedCard.id
      );

      if (hasInDailyCards) {
        notifyUtil.warn('card.warnings.exists');
      } else {
        orderCards.value.push({ card: selectedCard, amount: 1 });
      }
    }

    function removeDailyCard (orderCardToRemove: OrderCard) {
      orderCards.value = orderCards.value.filter(
        orderCard => orderCard.card.id !== orderCardToRemove.card.id
      );
    }

    function decrementOrder (orderCard: OrderCard) {
      if (orderCard.amount > 1) {
        orderCard.amount--;
      }
    }

    function incrementOrder (orderCard: OrderCard) {
      if (orderCard.amount === orderCard.card.stock) {
        notifyUtil.warn('card.warnings.notMore');
      } else {
        orderCard.amount++;
      }
    }

    async function createOrder () {
      if (!payment.value) {
        notifyUtil.warn('order.info.choosePayment');
        return;
      }
      if (!marker.value.latLng.length) {
        notifyUtil.warn('order.info.chooseDestine');
        return;
      }

      loadingCreateOrder.value = true;

      try {
        const createOrderInput = {
          paymentId: payment.value,
          destineLatLng: marker.value.latLng.join(',')
        };

        const createOrderCardsInput = orderCards.value
          .map(orderCard => ({
            cardId: orderCard.card.id,
            amount: orderCard.amount
          })
          );

        await createOrderMutation({ createOrderInput, createOrderCardsInput });

        notifyUtil.success('order.success.created');

        orderCards.value = [];

        Router.push({ name: 'Home' });
      } catch (e) {
      } finally {
        loadingCreateOrder.value = false;
      }
    }

    return {
      payment,
      payments,
      onSelectCard,
      removeDailyCard,
      orderCards,
      decrementOrder,
      incrementOrder,
      createOrder,
      loadingCreateOrder,
      orderCardsTotal,
      // leaflet
      map,
      marker,
      dialogDestineLocation,
      // const
      PATH_MEDIA
    };
  }
});
</script>

<style lang="scss">
.slider-caption {
  background-color: rgba(0, 0, 0, .3);
}
.img-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.daily-list-enter-active, .daily-list-leave-active {
  transition: all 1s;
}
.daily-list-enter, .daily-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
svg.q-radio__bg {
  border: none;
}
</style>
