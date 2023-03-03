<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <!-- <v-card-title>{{ model.first_name + ' ' + model.last_name }}</v-card-title> -->
        <v-card-subtitle>Category Detail</v-card-subtitle>
      </template>
    </v-card>
    <v-card>
      <v-card-subtitle>
        <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
        <v-btn class="ma-1" color="warning" :to="{ name: 'category.edit' }"
          ><v-icon left>mdi-pencil-box-outline</v-icon>Edit category</v-btn
        >
      </v-card-subtitle>
      <v-card-text v-if="!loading">
        <v-row>
          <v-col cols="12" md="5" lg="4" xl="3">
            <v-card elevation="0">
              <v-card-subtitle class="text-center"> </v-card-subtitle>

              <v-card-text>
                >
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-shape</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.name }}</v-list-item-title>
                    <v-list-item-subtitle>Name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.description
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Description</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="7" lg="8" xl="9"></v-col>
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
  options: {
      handler(val) {
        if (val) {
          // console.log(val);
          this.fetchData();
        }
      },
      deep: true,
    },
  mounted() {
    this.fetchData();
    //   console.log(constants.storagePath);
  },

  methods: {
    fetchData() {
      api
        .get(`categories/${this.$route.params.category}`)
        .then((response) => {
          this.model = response.data;
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
