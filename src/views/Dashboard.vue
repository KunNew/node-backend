<template>
  <v-container fluid>
    <v-card class="mb-3">
      <v-card-title>{{ $t("dashboard.title") }}</v-card-title>
    </v-card>
    <v-row>
      <v-col cols="12" sm="8">
        <v-row>
          <v-col sm="6" md="4" cols="12">
            <v-card color="blue lighten-1">
              <v-list-item-content class="pt-5">
                <v-avatar rounded="0">
                  <v-icon color="white" size="60">mdi-shape-outline</v-icon>
                </v-avatar>
              </v-list-item-content>
              <v-list-item-subtitle
                class="text-center text--white ma-1"
                style="color: white"
              >
                Total Categories
              </v-list-item-subtitle>
              <v-list-item-title
                class="text-center text-h5 pb-5"
                style="color: white"
              >
                {{ categorieCounts }}
              </v-list-item-title>
            </v-card>
          </v-col>
          <v-col sm="6" md="4" cols="12">
            <v-card color="red lighten-1">
              <v-list-item-content class="pt-5">
                <v-avatar rounded="0">
                  <v-icon color="white" size="60">mdi-food-outline</v-icon>
                </v-avatar>
              </v-list-item-content>
              <v-list-item-subtitle
                class="text-center text--white ma-1"
                style="color: white"
              >
                Total Menu
              </v-list-item-subtitle>
              <v-list-item-title
                class="text-center text-h5 pb-5"
                style="color: white"
              >
                {{ menuCounts }}
              </v-list-item-title>
            </v-card>
          </v-col>
          <v-col sm="6" md="4" cols="12">
            <v-card color="green lighten-1">
              <v-list-item-content class="pt-5">
                <v-avatar rounded="0">
                  <v-icon color="white" size="60"
                    >mdi-store-minus-outline</v-icon
                  >
                </v-avatar>
              </v-list-item-content>
              <v-list-item-subtitle
                class="text-center text--white ma-1"
                style="color: white"
              >
                Total Sell
              </v-list-item-subtitle>
              <v-list-item-title
                class="text-center text-h5 pb-5"
                style="color: white"
              >
                0
              </v-list-item-title>
            </v-card>
          </v-col>
          <!-- <v-col cols="12" sm="12" lg="12">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
          </v-col> -->
        </v-row>
      </v-col>
      <v-col cols="12" sm="4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50409.331679800154!2d103.15275987552742!3d13.098166692994788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3105498c99011f0b%3A0x1d54085b6473844f!2sBattambang%20Central%20Market!5e0!3m2!1sen!2skh!4v1677140446460!5m2!1sen!2skh"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import api from "@/utils/utilites";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
// import constants from '../constants'
export default {
  data: () => ({
    // storagePath: constants.storagePath,
    loading: true,
    chartData: {
      labels: ["January", "February", "March"],
      datasets: [
        { label: "data", data: [40, 20, 12], backgroundColor: "#f87979" },
      ],
    },
    chartOptions: {
      responsive: true,
    },
    categorieCounts: 0,
    menuCounts: 0,
  }),
  components: {
    Bar,
  },
  methods: {
    fetchCategory() {
      let url = `/dashboards/category`;

      api
        .get(url)
        .then((response) => {
          // this.dataTable = response.data;
          // console.log(response.data);
          this.categorieCounts = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchMenu() {
      let url = `/dashboards/menu`;

      api
        .get(url)
        .then((response) => {
          // this.dataTable = response.data;
          // console.log(response.data);
          this.menuCounts = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchCategory();
    this.fetchMenu()
  },
};
</script>
