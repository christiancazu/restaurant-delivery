<template>
<section
  v-if="!loadingPlates && !loadingTypes"
  class="row q-col-gutter-md"
>
  <div class="col-9">
    <div class="q-mb-sm">{{ $t('variedades') }}</div>

    <template v-if="!filteredPlates.length">
      <q-banner
        class="bg-info text-white"
        rounded
      >
        <q-icon name="fad fa-info-circle" /> {{ $t('plate.info.empty') }}
      </q-banner>
    </template>
    <q-carousel
      v-else
      v-model="carousel.id"
      :fullscreen.sync="carousel.fullScreen"
      swipeable animated infinite
    >
      <q-carousel-slide
        v-for="plate in filteredPlates" :key="plate.id"
        :name="plate.id"
        :img-src="`${PATH_MEDIA}/plates/${plate.avatar}`"
        style="cursor: move"
        @click="openDialogPlateDetails(plate)"
      >
        <div class="absolute-bottom slider-caption">
          <div class="text-h2 text-white text-center">{{ plate.name }}</div>
          <div class="text-subtitle1 text-white text-center">{{ plate.type.name }}</div>
        </div>
      </q-carousel-slide>

      <template #control>
        <q-carousel-control
          position="bottom-right"
          :ofiltered-platesset="[18, 18]"
        >
          <section style="transform: translate(20%, -20%)">
            <div>
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
                {{ cardsCtx.find(cCtx => cCtx.plate.id === plates.find(plate => plate.id === carousel.id).id).price.toFixed(2) }}
              </q-chip>
            </div>
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
                  {{ cardsCtx.find(cCtx => cCtx.plate.id === plates.find(plate => plate.id === carousel.id).id).stock }}
                </q-avatar>
                stock
              </q-chip>
            </div>
          </section>
          <section class="flex">
            <q-btn
              :icon="btnAddIcon"
              color="white"
              text-color="primary"
              push round
              class="q-mx-md"
              @click="
                /** emits the current card on carousel v-model */
                $emit('on-select-card', cardsCtx.find(cardCtx => cardCtx.plate.id === carousel.id))
              "
            />
            <q-btn
              :icon="carousel.fullScreen ? 'fad fa-compress' : 'fad fa-expand'"
              color="white"
              text-color="primary"
              push round
              @click="carousel.fullScreen = !carousel.fullScreen"
            />
          </section>
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>

  <div class="col-3 full-height">
    <div class="q-mb-sm">{{ $t('types') }}</div>
    <q-tab-panels
      v-model="panel.typeName"
      animated swipeable vertical infinite
      class="shadow-2 bg-grey-1 rounded-borders"
    >
      <q-tab-panel
        v-for="type in [...fallbackTypes, ...types]" :key="type.id"
        :name="type.name"
        class="non-selectable"
        style="cursor: move"
      >
        <div class="absolute-top-right q-pa-sm">
          <q-icon
            size="1.5em"
            name="fad fa-arrows-v"
          />
        </div>
        <div class="text-h6">{{ type.name }}</div>
        <q-img
          :src="`${PATH_MEDIA}/types/${type.avatar}`"
          :ratio="16/9"
          spinner-color="primary"
        />
        <div class="q-pt-sm">
          {{ type.description }}
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <dialog-plate-details
    :visible.sync="dialog.visible"
    :plate="selectedPlate"
  />

</section>
</template>

<script lang="ts">
import { Plate } from '@common/gql/graphql.schema.generated';
import { TYPES_QUERY, IN_CURRENT_DAY_CARDS_QUERY } from '@core/graphql/querys';

import { defineComponent, reactive, computed, ref } from '@vue/composition-api';
import { useQuery, useResult, useSubscription } from '@vue/apollo-composable';

import { DialogPlateDetails } from 'src/components';
import { CARDS_UPDATED_SUBSCRIPTION } from '@core/graphql/subscriptions';

const PATH_MEDIA = process.env.URL_MEDIA;

interface Carousel {
  id: number
  fullScreen: boolean
}

interface Panel {
  typeName: string
}

interface Dialog {
  visible: boolean
}

const fallbackTypes: Plate[] = [{
  id: 0,
  name: 'TODOS',
  avatar: 'all-types.jpg',
  description: 'Ofrecemos Una gran variedad de platillos para su deleite'
}];

export default defineComponent({
  name: 'CatalogueSubscription',

  props: {
    btnAddIcon: {
      type: String,
      default: 'fad fa-plus'
    }
  },

  components: {
    DialogPlateDetails
  },

  setup () {
    const carousel = reactive<Carousel>({
      id: 1,
      fullScreen: false
    });

    const panel = reactive<Panel>({
      typeName: 'TODOS'
    });

    const dialog = reactive<Dialog>({
      visible: false
    });

    const {
      loading: loadingPlates,
      onResult: onResultPlates
    } = useQuery(IN_CURRENT_DAY_CARDS_QUERY, {}, {
      fetchPolicy: 'network-only'
    });

    const {
      result: resultTypes,
      loading: loadingTypes
    } = useQuery(TYPES_QUERY);

    const {
      onResult: onResultCardsUpdated
    } = useSubscription(CARDS_UPDATED_SUBSCRIPTION);

    const plates = ref([]);
    const cardsCtx = ref([]);

    onResultCardsUpdated(({ data: { cardsUpdated } }) => {
      cardsCtx.value = [...cardsUpdated];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      plates.value = [...cardsUpdated.map(o => o.plate)];
    });

    onResultPlates(({ data: { inCurrentDayCards } }) => {
      cardsCtx.value = [...inCurrentDayCards];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      plates.value = [...inCurrentDayCards.map(o => o.plate)];
    });

    const types = useResult(resultTypes);

    const selectedPlate = ref<Plate>(null);

    const filteredPlates = computed<Plate[]>(() => {
      if (panel.typeName === 'TODOS') {
        return plates.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const filter = plates.value.filter(plate => plate.type.name === panel.typeName);
        setTimeout(() => {
          try {
            carousel.id = filter[0].id;
          } catch (e) {
          }
        }, 1);

        return filter;
      }
    });

    function openDialogPlateDetails (_selectedPlate) {
      selectedPlate.value = _selectedPlate;
      dialog.visible = true;
    }

    return {
      carousel,
      dialog,
      panel,
      openDialogPlateDetails,
      /** plates */
      fallbackTypes,
      plates,
      filteredPlates,
      selectedPlate,
      loadingPlates,
      /** types */
      types,
      loadingTypes,
      /** const */
      PATH_MEDIA,
      //
      cardsCtx
    };
  }
});
</script>

<style lang="scss">
.slider-caption {
  background-color: rgba(0, 0, 0, .3);
}
</style>
