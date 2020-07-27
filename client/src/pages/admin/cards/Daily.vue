<template>
<app-page
  :title="$t('card.daily')"
  icon="fad fa-utensils-alt"
>
  <template #pageContent>
    <catalogue @on-select-plate="onSelectPlate" />

    <q-separator class="q-my-md" />

    <div class="q-field__label q-pb-sm">{{ $tc('plate.plurals', 1) }}</div>
    <transition-group
      name="daily-list"
      class="row q-col-gutter-md"
      tag="section"
    >
      <article
        v-for="dailyCard in dailyCards" :key="dailyCard.plate.id"
        class="daily-list-item col-12 col-md-3"
      >
        <q-card>
          <img
            :src="`${PATH_MEDIA}/plates/${dailyCard.plate.avatar}`"
            class="img-cover"
          >
          <q-card-section
            class="absolute"
            style="top: -16px; right: -16px"
          >
            <div>
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
                  {{ dailyCard.initialStock }}
                </q-avatar>
                stock
              </q-chip>
            </div>
            <div class="flex justify-end">
              <q-chip
                color="red"
                text-color="white"
                class="shadow-10"
              >
                <q-avatar
                  class="text-bold"
                  text-color="black"
                  style="background-color: #e0e0e0;"
                >
                  S/.
                </q-avatar>
                {{ dailyCard.price }}
              </q-chip>
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <div class="text-h6">{{ dailyCard.plate.name }}</div>
            <div class="text-caption">{{ dailyCard.plate.type.name }}</div>
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

    <div class="flex justify-center q-my-lg">
      <q-btn
        :loading="loadingCreateCard"
        style="width: 200px"
        color="primary"
        icon="fad fa-save"
        glossy push
        :label="$t('set')"
        @click="createDailyCards"
      />
    </div>

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
import { useMutation, useQuery } from '@vue/apollo-composable';
import { CREATE_CARDS_MUTATION } from '@core/graphql/mutations';
import { IN_CURRENT_DAY_CARDS_QUERY } from '@core/graphql/querys';

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

    const {
      mutate: createCardsMutation,
      loading: loadingCreateCard
    } = useMutation(CREATE_CARDS_MUTATION);

    const {
      onResult: onResultInCurrentDayCardsQuery
    } = useQuery(IN_CURRENT_DAY_CARDS_QUERY);

    onResultInCurrentDayCardsQuery(({ data: { inCurrentDayCards } }) => {
      dailyCards.value = [...inCurrentDayCards];
    });

    async function createDailyCards () {
      loadingCreateCard.value = true;

      try {
        const createCardsInput = dailyCards.value
          .map(dailyCard => {
            const cardInput = {
              initialStock: dailyCard.initialStock,
              price: dailyCard.price,
              plateId: dailyCard.plate.id
            };
            return cardInput;
          });

        await createCardsMutation({ createCardsInput });

        notifyUtil.success('card.success.set');
      } catch (e) {
      } finally {
        loadingCreateCard.value = false;
      }
    }

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

    function removeDailyCard (dailyCardToRemove: Card) {
      dailyCards.value = dailyCards.value.filter(
        dailyCard => dailyCard.plate.id !== dailyCardToRemove.plate.id
      );
    }

    return {
      dialog,
      /* cards */
      onSelectPlate,
      selectedPlate,
      dailyCards,
      createDailyCards,
      addDailyCard,
      removeDailyCard,
      loadingCreateCard,
      /* const */
      PATH_MEDIA
    };
  }
});
</script>

<style lang="scss">
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
