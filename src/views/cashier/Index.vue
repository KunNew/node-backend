<template>
  <div>
    <v-container fluid>
      <v-card class="mb-3">
        <v-card-title>Cashier</v-card-title>
      </v-card>
      <v-card class="pa-3">
        <v-row>
          <template v-if="isTable">
            <v-col cols="12" md="4" v-for="(table, idx) in tables" :key="idx">
              <v-card color="blue lighten-1">
                <v-list-item-content class="pt-5">
                  <v-img src="images/table.svg" contain height="80px" alt="" />
                </v-list-item-content>
                <v-list-item-subtitle
                  class="text-center text--white ma-1"
                  style="color: white"
                >
                  {{ table.name }}
                </v-list-item-subtitle>
              </v-card>
            </v-col>
          </template>
        </v-row>
        <v-row v-if="isTable">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row class="pa-2">
              <v-btn
                color="primary"
                block
                @click="isTable = true"
                v-if="!isTable"
                x-large
              >
                <v-icon>mdi-table</v-icon>
                Show Table</v-btn
              >
              <v-btn
                color="error"
                block
                @click="isTable = false"
                x-large
                v-else
              >
                <v-icon>mdi-table</v-icon>
                Hide Table</v-btn
              >
            </v-row>
            <v-simple-table class="mt-5">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Image</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Qty</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Cost</th>
                    <th class="text-left">Amount</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">
                      <v-img contain src="/images/cashier.svg" width="50px" />
                    </td>
                    <td class="text-left">Pizza</td>
                    <td class="text-left">1</td>
                    <td class="text-left">5$</td>
                    <td class="text-left">2$</td>
                    <td class="text-left">10$</td>
                    <td class="text-left">
                      <v-tooltip top>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            color="error"
                            icon
                            small
                            v-bind="attrs"
                            @click="onClickDelete(index)"
                            v-on="on"
                            ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                          >
                        </template>
                        <span>Delete</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" md="6">
            <v-form @submit.prevent>
              <v-row>
                <v-col cols="12">
                  <v-card elevation="1">
                    <v-toolbar
                      color="green"
                      dark
                      class="font-weight-bold text-subtitle-1"
                      flat
                    >
                      Total: 0
                    </v-toolbar>
                    <v-card-text>
                      <v-btn color="blue" outlined class="mr-1">
                        <v-icon left> mdi-printer </v-icon>
                        <span> Print </span>
                      </v-btn>
                      <v-btn dark color="error" outlined>
                        <v-icon left> mdi-poll </v-icon>
                        <span> Report </span>
                      </v-btn>
                    </v-card-text>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            outlined
                            label="Customer"
                            :rules="[(v) => !!v || 'Customer is required']"
                          />
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-textarea outlined label="Note" />
                        </v-col>
                        <v-col cols="12">
                          <div>Payment Method</div>
                          <v-radio-group v-model="form.data.orderType" row>
                            <template v-slot:label> </template>
                            <v-radio value="Cash">
                              <template v-slot:label>
                                <div>
                                  <v-icon size="30px" color="green" left>
                                    mdi-cash
                                  </v-icon>
                                  <strong class="primary--text">Cash</strong>
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="Bank">
                              <template v-slot:label>
                                <div>
                                  <v-icon size="25px" color="red" left
                                    >mdi-bank</v-icon
                                  >
                                  <strong class="blue--text">Bank</strong>
                                </div>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            outlined
                            label="Payment"
                            :rules="[(v) => !!v || 'Payment is required']"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field outlined readonly label="Change" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="12">
                          <v-btn color="blue" dark block x-large>
                            <v-icon>mdi-cash-multiple</v-icon>
                            Save
                          </v-btn>
                        </v-col>
                        <v-col cols="12" v-show="menus.length > 0">
                          <v-btn color="error" dark block x-large>
                            <v-icon left>mdi-cart</v-icon>
                            Cancel Order
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import api from "@/utils/utilites";
export default {
  data: () => ({
    length: 15,
    tab: "all",
    isTable: false,
    form: {
      data: {
        orderType: "Cash",
      },
    },
    tables: [],
    page: 1,
    itemsPerPage: 3,
    totalPages: 0,
    categories: [],
    menus: [],
  }),

  watch: {
    page(val) {
      if (val) {
        this.page = val;
        this.fetchTable();
      }
    },
  },
  methods: {
    fetchTable() {
      let url = `/tables?page=${this.page}&rowsPerPage=${this.itemsPerPage}`;
      api
        .get(url)
        .then((response) => {
          // console.log(response.data);
          this.tables = response.data?.items;
          this.totalPages = response.data?.numOfPages;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        });
    },
    fetchCategory() {
      api
        .get(`/categories/getAll`)
        .then((response) => {
          // console.log(response.data);
          this.categories = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        });
    },
    fetchMenu() {
      api
        .get(`/menus`)
        .then((response) => {
          // console.log(response.data);
          this.menus = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.fetchTable();
    this.fetchCategory();
    this.fetchMenu();
  },
};
</script>
