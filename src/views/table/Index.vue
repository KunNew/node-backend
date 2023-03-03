<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <v-card-title>Table</v-card-title>
        <v-card-subtitle>List all tables.</v-card-subtitle>
      </template>
    </v-card>
    <v-card class="mb-3">
      <v-card-title> Filter </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" lg="4">
            <v-select
              outlined
              label="Status"
              clearable
              dense
              v-model="filterStatus"
              :items="['available', 'unavilable']"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
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
      <!-- :options.sync="options" -->
      <template #[`top`]>
        <v-toolbar flat>
          <v-btn class="ma-1" color="primary" :to="{ name: 'table.create' }"
            ><v-icon left>mdi-plus</v-icon>New table</v-btn
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

      <template #[`item.status`]="{ item }" :ref="item.id">
        <v-chip
          :color="`${item.status === 'unavilable' ? '#f87171' : '#0284c7'}`"
          dark
        >
          {{ item.status }}
        </v-chip>
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
              :to="{ name: 'table.show', params: { table: item._id } }"
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
              :to="{ name: 'table.edit', params: { table: item._id } }"
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
    filterStatus: "",
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
    filterStatus(val) {
      if (val) {
        this.fetchData();
      } else {
        this.filterStatus = "";
        this.fetchData();
      }
    },
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
      // params: {
      //     page: this.options.page,
      //     perpage:
      //       this.options.itemsPerPage === -1
      //         ? this.dataTable.totalItems
      //         : this.options.itemsPerPage,
      //     search: this.searchQuery,
      //   },
      // }
      let url = `/tables?page=${this.options.page}&rowsPerPage=${
        this.options.itemsPerPage === -1
          ? this.dataTable.totalItems
          : this.options.itemsPerPage
      }&status=${this.filterStatus}`;
      if (this.searchQuery) {
        url = url + `&search=${this.searchQuery}`;
      }
      if (this.filterStatus) {
        url = url + `&status=${this.filterStatus}`;
      }
      api
        .get(url)
        .then((response) => {
          this.dataTable = response.data;
          // console.log(response.data);
        })
        .catch(({ response }) => {
          // this.$store.dispatch("pushNotification", {
          //   message: response.data.message,
          //   type: "error",
          // });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePage(val) {
      if (val) this.fetchData();
    },

    onClickDelete(item) {
      this.deleteItem = item._id;
      this.diaglogDelete = true;
    },

    onConfirmDelete() {
      this.deleting = true;
      api
        .delete(`/tables/${this.deleteItem}`)
        .then((response) => {
          this.fetchData();
          //   this.$store.dispatch("pushNotification", {
          //     message: response.data.message,
          //     type: "success",
          //   });
          this.diaglogDelete = false;
        })
        .catch(({ response }) => {
          //   this.$store.dispatch("pushNotification", {
          //     message: response.data.message,
          //     type: "error",
          //   });
        })
        .finally(() => {
          this.deleting = false;
        });
    },
  },
};
</script>
