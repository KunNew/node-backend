<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <!-- <v-card-title>{{ model.first_name + ' ' + model.last_name }}</v-card-title> -->
        <v-card-subtitle>Menu Detail</v-card-subtitle>
      </template>
    </v-card>
    <v-card>
      <v-card-subtitle>
        <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
        <v-btn class="ma-1" color="warning" :to="{ name: 'menu.edit' }"
          ><v-icon left>mdi-pencil-box-outline</v-icon>Edit menu</v-btn
        >
      </v-card-subtitle>
      <v-card-text v-if="!loading">
        <v-row align="center">
          <v-col cols="12" md="5" lg="4" xl="3">
            <v-card elevation="0">
              <v-card-subtitle class="text-center">
                <!-- <v-avatar size="86" color="grey">
                  <v-img
                    v-if="model.image"
                    contain
                    :src="constants.storagePath + '/' + model.image"
                  ></v-img>
                  <span class="text-h5" v-else>{{ model.name }}</span>
                </v-avatar> -->
                <!-- <div class="text-subtitle-2 mt-5">{{ model.first_name + ' ' + model.last_name }}</div> -->
              </v-card-subtitle>

              <v-card-text>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-food-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.name }}</v-list-item-title>
                    <v-list-item-subtitle>Name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense v-show="model.qty > 0">
                  <v-list-item-icon>
                    <v-icon>mdi-counter</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.qty > 0 ? model.qty : ""
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Quantity</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-currency-usd</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.price }}</v-list-item-title>
                    <v-list-item-subtitle>Price</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.description ? model.description : "No Description"
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Description</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-shape</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.category?.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Category</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="7" lg="8" xl="9">
            <v-img
              v-if="model.image"
              class="rounded"
              contain
              max-width="320"
              :src="constants.storagePath + '/' + model.image"
            ></v-img>
            <v-avatar size="320" color="grey" v-else>
              <span class="text-h5">{{ model.name }}</span>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import constants from "@/constants";
import api from "@/utils/utilites";
export default {
  data: () => ({
    loading: true,
    constants: constants,
    model: {},
  }),

  mounted() {
    this.fetchData();
    //   console.log(constants.storagePath);
  },

  methods: {
    fetchData() {
      api
        .get(`menus/${this.$route.params.menu}`)
        .then((response) => {
          this.model = response.data?.show;
          //   console.log(response.data);
          // console.log(response.data);
          // console.log(response.data);
        })
        .catch(({ response }) => {
          // this.$store.dispatch('pushNotification', { message: response.data.message, type: 'error' })
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
