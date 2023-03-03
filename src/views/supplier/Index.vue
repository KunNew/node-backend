<template>
    <v-container fluid>
      <v-card class="mb-3">
        <template v-if="loading">
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>
          <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
        </template>
        <template v-else>
          <v-card-title>Supplier</v-card-title>
          <v-card-subtitle>List all suppliers.</v-card-subtitle>
        </template>
      </v-card>
      <v-dialog v-model="diaglogDelete" max-width="500">
        <v-card>
          <v-card-title>Are you sure?</v-card-title>
          <v-card-text>Do you want to delete?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              outlined
              :disabled="deleting"
              @click="diaglogDelete = false"
              ><v-icon left>mdi-cancel</v-icon>Cancel</v-btn
            >
            <v-btn color="error" :loading="deleting" @click="onConfirmDelete"
              ><v-icon left>mdi-trash-can-outline</v-icon>Confirm</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="dataTable.headers"
        :items="dataTable.items"
        :options.sync="options"
        :server-items-length="dataTable.totalItems"
        :loading="loading"
      >
        <!-- @update:items-per-page="handlePage" -->
        <!-- @pagination="handlePaginate" -->
        <!-- :options.sync="options" -->
        <template #[`top`]>
          <v-toolbar flat>
            <v-btn class="ma-1" color="primary" :to="{ name: 'supplier.create' }"
              ><v-icon left>mdi-plus</v-icon>New supplier</v-btn
            >
            <!-- <v-btn class="ma-1" color="green" dark @click="exportExcel()"
                ><v-icon left>mdi-export</v-icon>Export excel</v-btn
              > -->
            <!-- <v-btn color="green" dark to="/role">
                <v-icon left>mdi-account</v-icon>
                Role</v-btn
              >
              <v-btn color="error" dark class="ml-1" to="/permission">
                <v-icon left> mdi-account-key </v-icon>
                Permission
              </v-btn>\ -->
            <v-spacer></v-spacer>
            <div class="ma-3" style="width: 250px">
              <v-text-field
                outlined
                dense
                hide-details
                label="Search"
                v-model="searchQuery"
              ></v-text-field>
            </div>
          </v-toolbar>
        </template>
        <!-- plan -->
        <template #[`item.no`]="{ item, index }" :ref="item.id">
          {{ options.itemsPerPage * (options.page - 1) + index + 1 }}
        </template>
  
        <template #[`item.avatar`]="{ item }" :ref="item.id">
          <v-avatar size="64" class="ma-1" tile>
            <v-img :src="constant.storagePath + item.avatar" contain></v-img>
          </v-avatar>
        </template>
  
        <!-- actions -->
        <template #[`item.actions`]="{ item }">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                icon
                small
                :to="{ name: 'supplier.show', params: { supplier: item._id } }"
                v-on="on"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
            </template>
            <span>Detail</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                color="warning"
                icon
                small
                :to="{ name: 'supplier.edit', params: { supplier: item._id } }"
                v-bind="attrs"
                v-on="on"
                ><v-icon>mdi-pencil-box-outline</v-icon></v-btn
              >
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                color="error"
                :disabled="item._id === user._id"
                icon
                small
                v-bind="attrs"
                @click="onClickDelete(item)"
                v-on="on"
                ><v-icon>mdi-trash-can-outline</v-icon></v-btn
              >
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-container>
  </template>
  <script>
  import { mapGetters } from "vuex";
  // import contants from '../../constants'
  import api from "@/utils/utilites";
  import axios from "axios";
  import _ from "lodash";
  export default {
    data: () => ({
      loading: true,
      // constant: contants,
      diaglogDelete: false,
      deleteItem: null,
      deleting: false,
      options: {
        sortBy: ["id"],
        sortDesc: [true],
        itemsPerPage: 5,
        page: 1,
      },
      dataTable: {
        headers: [],
        items: [],
        totalItems: 0,
        meta: {
          total: 0,
        },
      },
  
      searchQuery: null,
    }),
  
    computed: {
      ...mapGetters("auth", {
        user: "user",
      }),
    },
    watch: {
      searchQuery: _.debounce(function (val) {
        this.fetchData();
      }, 1000),
      options: {
        handler(val) {
          if (val) {
            // console.log(val);
            this.fetchData();
          }
        },
        deep: true,
      },
    },
  
    mounted() {
      // this.fetchData();
    },
  
    methods: {
      exportExcel() {
        api
          .get(`/users/exportUser`, {
            method: "GET",
            responseType: "blob",
          })
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${Date.now()}.xlsx`);
            document.body.appendChild(link);
            link.click();
          });
      },
  
      async fetchData() {
        let url = `/suppliers?page=${this.options.page}&rowsPerPage=${
          this.options.itemsPerPage === -1
            ? this.dataTable.totalItems
            : this.options.itemsPerPage
        }`;
        if (this.searchQuery) {
          url = url + `&search=${this.searchQuery}`;
        }
        api
          .get(url)
          .then((response) => {
            this.dataTable = response.data;
            // console.log(response.data);
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
  
      onClickDelete(item) {
        this.deleteItem = item._id;
        this.diaglogDelete = true;
      },
  
      onConfirmDelete() {
        this.deleting = true;
        api
          .delete(`/suppliers/${this.deleteItem}`)
          .then((response) => {
            this.fetchData();
              this.$store.dispatch("pushNotification", {
                message: response.data.message,
                type: "success",
              });
            this.diaglogDelete = false;
          })
          .catch(({ response }) => {
              this.$store.dispatch("pushNotification", {
                message: response.data.message,
                type: "error",
              });
          })
          .finally(() => {
            this.deleting = false;
          });
      },
    },
  };
  </script>
  