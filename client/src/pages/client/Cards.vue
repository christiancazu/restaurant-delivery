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

    <q-separator class="q-my-md" />

    <div class="q-field__label q-pb-sm text-capitalize">{{ $tc('order.plurals', 2) }}</div>
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
              <span class="text-accent">S/. {{ orderCard.card.price }}</span>
            </div>
            <div class="text-caption">
              sub total
              <span class="text-bold text-accent">S/. {{ orderCard.card.price * orderCard.amount }}</span>
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

    <q-separator
      inset
      class="q-my-lg"
    />

    <div
      v-if="orderCards.length"
      class="flex justify-center q-my-lg"
    >

      <div class="text-bold text-h5">Total: S/. {{ orderCardsTotal }} </div>

      <div class="q-px-lg">
        <q-btn
          :loading="loadingCreateOrderCards"
          style="width: 200px"
          color="primary"
          icon="fad fa-save"
          glossy push
          :label="$t('order.send')"
          @click="createOrder"
        />
      </div>
    </div>

  </template>
</app-page>
</template>

<script lang="ts">
import { AppPage } from 'src/wrappers';
import { CatalogueSubscription } from 'src/components';

import { defineComponent, ref, computed } from '@vue/composition-api';
import { notifyUtil } from '@core/utils';
import { OrderCard, Card } from '@common/gql/graphql.schema.generated';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_ORDER_CARD_MUTATION } from '@core/graphql/mutations';

const PATH_MEDIA = process.env.URL_MEDIA;

export default defineComponent({
  components: {
    AppPage,
    CatalogueSubscription
  },

  setup () {
    const orderCards = ref<OrderCard[]>([]);

    const {
      // mutate: createOrderCardsMutation,
      loading: loadingCreateOrderCards
    } = useMutation(CREATE_ORDER_CARD_MUTATION);

    const orderCardsTotal = computed(() => orderCards.value.reduce((acc, item) => {
      acc += item.amount * item.card.price;
      return acc;
    }, 0));

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

    function createOrder () {
      loadingCreateOrderCards.value = true;
      try {
        // const createCardsInput = orderCards.value
        //   .map(orderCard => ({
        //     cardId: orderCard.card.id,
        //     amount: orderCard.amount
        //   })
        //   );

        // await createOrderCardsMutation({ createCardsInput });
        // console.warn(createCardsInput)

        notifyUtil.success('order.success.created');
      } catch (e) {
      } finally {
        loadingCreateOrderCards.value = false;

        orderCards.value = [];
      }
    }

    return {
      onSelectCard,
      removeDailyCard,
      orderCards,
      decrementOrder,
      incrementOrder,
      createOrder,
      loadingCreateOrderCards,
      orderCardsTotal,
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
</style>
