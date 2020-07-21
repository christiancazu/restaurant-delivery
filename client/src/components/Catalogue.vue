<template>
<section
  v-if="!loadingPlates && !loadingTypes"
  class="row q-col-gutter-md"
>
  <div class="col-9">
    <div class="q-mb-sm">{{ $t('variedades') }}</div>
    <q-carousel
      v-model="carousel.id"
      :fullscreen.sync="carousel.fullScreen"
      swipeable animated arrows infinite
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
          <q-btn
            :icon="btnAddIcon"
            color="white"
            text-color="primary"
            push round
            class="q-mx-md"
            @click="
              /** emits the current plate on carousel v-model */
              $emit('on-select-plate', plates.find(plate => plate.id === carousel.id))
            "
          />
          <q-btn
            :icon="carousel.fullScreen ? 'fad fa-compress' : 'fad fa-expand'"
            color="white"
            text-color="primary"
            push round
            @click="carousel.fullScreen = !carousel.fullScreen"
          />
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
import { PLATES_QUERY, TYPES_QUERY } from '@core/graphql/querys';

import { defineComponent, reactive, computed, ref } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';

import { DialogPlateDetails } from 'src/components';

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
  name: 'Catalogue',

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
      result: resultPlates,
      loading: loadingPlates
    } = useQuery(PLATES_QUERY, {}, {
      fetchPolicy: 'network-only'
    });

    const {
      result: resultTypes,
      loading: loadingTypes
    } = useQuery(TYPES_QUERY);

    const plates = useResult(resultPlates);
    const types = useResult(resultTypes);

    const selectedPlate = ref<Plate>(null);

    const filteredPlates = computed<Plate[]>(() => {
      if (panel.typeName === 'TODOS') {
        return plates.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const filter = plates.value.filter(plate => plate.type.name === panel.typeName);
        setTimeout(() => {
          if (filter[0].id) {
            carousel.id = filter[0].id;
          }
        }, 10);

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
      PATH_MEDIA
    };
  }
});
</script>

<style lang="scss">
.slider-caption {
  background-color: rgba(0, 0, 0, .3);
}
</style>
