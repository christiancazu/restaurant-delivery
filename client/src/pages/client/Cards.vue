<template>
<app-page
  :title="$t('card.default')"
  icon="fad fa-utensils-alt"
>
  <template #pageContent>
    <catalogue-subscription
      btn-add-icon="fad fa-cart-plus"
      @on-select-plate="onSelectPlate"
    />

    <q-separator class="q-my-md" />

    <div class="q-field__label q-pb-sm">{{ $tc('plate.plurals', 1) }}</div>
    <transition-group
      name="daily-list"
      class="row q-col-gutter-md"
      tag="section"
    >
      <article
        v-for="dailyCard in dailyCards" :key="dailyCard.id"
        class="daily-list-item col-12 col-md-3"
      >
        <q-card>
          <img
            :src="`${PATH_MEDIA}/plates/${dailyCard.avatar}`"
            class="img-cover"
          >
          <q-card-section class="q-pa-sm">
            <div class="text-h6">{{ dailyCard.name }}</div>
            <div class="text-caption">{{ dailyCard.type.name }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              color="primary"
              icon="fad fa-times-circle"
              :label="$t('remove')"
              outline
              @click="removeDailyCard(dailyCard)"
            />
          </q-card-actions>
        </q-card>
      </article>
    </transition-group>
  </template>
</app-page>
</template>

<script lang="ts">
import { AppPage } from 'src/wrappers';
import { CatalogueSubscription } from 'src/components';

import { defineComponent, ref } from '@vue/composition-api';
import { notifyUtil } from '@core/utils';
import { Plate, Card } from '@common/gql/graphql.schema.generated';

const PATH_MEDIA = process.env.URL_MEDIA;

export default defineComponent({
  components: {
    AppPage,
    CatalogueSubscription
  },

  setup () {
    const dailyCards = ref<Card[]>([]);

    function onSelectPlate (_selectedPlate: Plate) {
      const hasInDailyCards = dailyCards.value.find(
        (dailyCard) => dailyCard.id === _selectedPlate.id
      );

      if (hasInDailyCards) {
        notifyUtil.warn('card.warnings.exists');
      } else {
        dailyCards.value.push(_selectedPlate);
      }
    }

    function removeDailyCard (dailyPlateToRemove: Plate) {
      dailyCards.value = dailyCards.value.filter(
        dailyCard => dailyCard.id !== dailyPlateToRemove.id
      );
    }

    return {
      onSelectPlate,
      removeDailyCard,
      dailyCards,
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
