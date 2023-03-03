<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <!-- <v-card-title>{{ model.first_name + ' ' + model.last_name }}</v-card-title> -->
        <v-card-subtitle>Purchase Detail</v-card-subtitle>
      </template>
    </v-card>
    <v-card class="mb-3 ">
      <v-card-subtitle>
        <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
        <!-- <v-btn class="ma-1" color="warning" :to="{ name: 'category.edit' }"
          ><v-icon left>mdi-pencil-box-outline</v-icon>Edit category</v-btn
        > -->
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text v-if="!loading" >
        <v-row>
          <v-col cols="12" md="5" lg="12" xl="12">
            <v-card elevation="0" class="bg__card-text">
              <v-card-subtitle class="text-center"> </v-card-subtitle>

              <v-card-text>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon >mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.date | filterDate
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Date</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.supplierDoc?.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Supplier</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-cash-fast</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      >$ {{ decimalNumber(model.total, 2) }}</v-list-item-title
                    >
                    <v-list-item-subtitle>Total</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="7" lg="8" xl="9"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-3">
      <v-card-text>
        Detail
      </v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">No</th>
              <th class="text-left">Name</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Price</th>
              <th class="text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it, index) in model.purchaseDetailDoc" :key="index">
              <td class="text-left">
                {{ index + 1 }}
              </td>
              <td class="text-left">
                {{ it.menuName }}
              </td>
              <td class="text-left">
                {{ it.qty }}
              </td>
              <td class="text-left">
                <v-badge content="$" color="green">
                  {{ decimalNumber(it.price, 2) }}
                </v-badge>
              </td>
              <td class="text-left">
                <v-badge content="$" color="green">
                  {{ decimalNumber(it.cost, 2) }}
                </v-badge>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
import constants from "@/constants";
import api from "@/utils/utilites";
import dayjs from "dayjs";
import { decimalNumber } from "@/lib/numeral";
export default {
  data: () => ({
    decimalNumber,
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
  filters: {
    filterDate(val) {
      return dayjs(val).format("DD/MM/YYYY");
    },
  },
  mounted() {
    this.fetchData();
    //   console.log(constants.storagePath);
  },

  methods: {
    fetchData() {
      api
        .get(`purchases/${this.$route.params.purchase}`)
        .then((response) => {
          this.model = response.data[0];
          console.log(response.data[0]);
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

<style scoped>
.bg__card-text {
  background-color: rgb(241, 240,   232) !important;
}
</style>