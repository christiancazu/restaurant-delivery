<template>
<q-page>
  <q-card
    style="min-height: 100vh"
    class="bg-grey-2"
  >
    <section class="row q-pt-sm q-px-md">
      <div class="col-sm-6 text-h6">
        <q-icon name="fad fa-utensils-alt" /> Platillos
      </div>
      <div class="col-sm-6 flex justify-end">
        <q-input
          :disable="true"
          placeholder="buscar"
          dense clearable outlined
          bg-color="white"
        >
          <template #prepend>
            <q-icon
              name="fad fa-search"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
          <template #append>
            <q-icon
              name="fad fa-close"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
      </div>
    </section>

    <q-separator inset />

    <q-card-section v-if="!loadingPlates && !loadingTypes">
      <section
        class="row q-col-gutter-md"
      >
        <div class="col-9">
          <div class="q-mb-sm">{{ $t('variedades') }}</div>
          <q-carousel
            v-model="slide"
            :fullscreen.sync="fullscreen"
            swipeable animated arrows infinite
          >
            <q-carousel-slide
              v-for="plate in filteredPlates" :key="plate.id"
              :name="plate.id"
              :img-src="`${PATH_MEDIA}/${plate.avatar}`"
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
                  icon="fad fa-cart-plus"
                  color="white"
                  text-color="primary"
                  push round
                  class="q-mx-md"
                />
                <q-btn
                  :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  color="white"
                  text-color="primary"
                  push round
                  @click="fullscreen = !fullscreen"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </div>

        <div class="col-3 full-height">
          <div class="q-mb-sm">{{ $t('types') }}</div>
          <q-tab-panels
            v-model="panel"
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
                src="types/all-types.jpg"
                :ratio="16/9"
                spinner-color="primary"
              />
              <div class="q-pt-sm">
                {{ type.description }}
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </section>
    </q-card-section>
  </q-card>

  <dialog-plate-details
    :visible-dialog.sync="visibleDialog"
    :plate="selectedPlate"
  />

</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import { useQuery, useResult } from '@vue/apollo-composable';
import { PLATES_QUERY, TYPES_QUERY } from '@core/graphql/querys';
import DialogPlateDetails from 'src/components/DialogPlateDetails.vue';

const PATH_MEDIA = process.env.URL_MEDIA.replace(/"/g, '');

const fallbackTypes = [{
  id: 0,
  name: 'TODOS',
  avatar: 'types/all-types.jpg',
  description: 'Ofrecemos Una gran variedad de platillos para su deleite'
}];

export default defineComponent({
  components: {
    DialogPlateDetails
  },

  setup () {
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

    const plates = useResult(resultPlates, []);
    const types = useResult(resultTypes);

    const selectedPlate = ref(null);

    const panel = ref<string>('TODOS');
    const fullscreen = ref<boolean>(false);
    const slide = ref<number|null>(1);
    const visibleDialog = ref<boolean>(false);

    const filteredPlates = computed(() => {
      if (panel.value === 'TODOS') {
        return plates.value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const filter = plates.value.filter(plate => plate.type.name === panel.value);
        setTimeout(() => {
          if (filter[0].id) {
            slide.value = filter[0].id;
          }
        }, 10);

        return filter;
      }
    });

    function openDialogPlateDetails (_selectedPlate) {
      selectedPlate.value = _selectedPlate;
      visibleDialog.value = true;
    }

    return {
      fullscreen,
      slide,
      //
      plates,
      loadingPlates,
      /** types tabs */
      panel,
      /** types */
      types,
      loadingTypes,
      fallbackTypes,
      /** consts */
      PATH_MEDIA,
      // plates
      filteredPlates,
      //
      visibleDialog,
      openDialogPlateDetails,
      selectedPlate
    };
  }

});
</script>

<style lang="scss">
.slider-caption {
  background-color: rgba(0, 0, 0, .3);
}
</style>
