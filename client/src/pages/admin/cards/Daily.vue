<template>
<app-page
  :title="$t('card.daily')"
  icon="fad fa-utensils-alt"
>
  <template #pageContent>
    <catalogue @on-select-plate="onSelectPlate" />

    <q-separator class="q-my-md" />

    <div class="q-field__label q-pb-sm">{{ $tc('plate.plurals', 1) }}</div>
    <section class="row q-col-gutter-md">
      <article
        v-for="dailyCard in dailyCards"
        :key="dailyCard.id" class="col-12 col-md-4"
      >
        <q-card class="col-12 col-md-4">
          <img :src="`${PATH_MEDIA}/plates/${dailyCard.plate.avatar}`">
          <q-card-section
            class="absolute"
            style="top: -10px; right: -10px"
          >
            <q-chip
              color="red"
              text-color="white" class="shadow-10"
            >
              <q-avatar
                class="text-bold"
                style="background-color: #e0e0e0"
                text-color="black"
              >{{ dailyCard.initialStock }}</q-avatar>stock
            </q-chip>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">{{ dailyCard.plate.name }}</div>
            <q-chip>
              <q-avatar
                color="red"
                text-color="white" icon="fad fa-utensils-alt"
              />
              {{ dailyCard.plate.type.name }}
            </q-chip>
          </q-card-section>
        </q-card>
      </article>
    </section>
    <dialog-stock
      v-if="selectedPlate"
      :visible.sync="dialog.visible"
      :plate="selectedPlate"
      @confirm="addDailyCard"
    />
  </template>
</app-page>
</template>

<script lang="ts">
import { Card, Plate } from '@common/gql/graphql.schema.generated';
import { notifyUtil } from '@core/utils';

import { defineComponent, ref, reactive } from '@vue/composition-api';

import { AppPage } from 'src/wrappers';
import { Catalogue, DialogStock } from 'src/components';

interface DialogStockProps {
  visible: boolean;
}

const PATH_MEDIA = process.env.URL_MEDIA;

export default defineComponent({
  name: 'AdminCardsDaily',

  components: {
    AppPage,
    Catalogue,
    DialogStock
  },

  setup () {
    const dailyCards = ref<Card[]>([]);
    const selectedPlate = ref<Plate>(null);

    const dialog = reactive<DialogStockProps>({
      visible: false
    });

    function addDailyCard (selectedPlate: Card) {
      dailyCards.value.unshift(selectedPlate);
    }

    function onSelectPlate (_selectedPlate: Plate) {
      const hasInDailyCards = dailyCards.value.find(
        (dailyCard) => dailyCard.plate.id === _selectedPlate.id
      );

      if (hasInDailyCards) {
        notifyUtil.warn('card.warnings.exists');
      } else {
        selectedPlate.value = _selectedPlate;
        dialog.visible = true;
      }
    }

    return {
      onSelectPlate,
      selectedPlate,
      dailyCards,
      dialog,
      addDailyCard,
      //
      PATH_MEDIA
    };
  }
});
</script>
