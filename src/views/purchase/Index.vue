<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-card-title>Puchase</v-card-title>
      <v-card-text>
        <v-btn color="success" outlined :to="{ name: 'purchase.show' }">
          <v-icon left> mdi-eye </v-icon>
          View Purchase
        </v-btn>
      </v-card-text>
    </v-card>
    <v-form
      lazy-validation
      ref="form"
      @submit.prevent
      :disabled="form.submitting"
    >
      <v-card class="mb-3">
        <v-toolbar dense flat color="grey lighten-2">
          <v-toolbar-title class="body-2 font-weight-bold">
            Purchase Form
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row class="pa-3" align="center">
            <v-col cols="12" sm="6">
              <v-row>
                <v-col class="py-0" cols="12">
                  <v-text-field
                    v-model="form.invoiceNumber"
                    required
                    outlined
                    label="Invoice Number"
                    readonly
                  >
                  </v-text-field>
                  <!-- :rules="[(v) => !!v || 'Name is required']" -->
                </v-col>
                <v-col class="py-0" cols="12">
                  <v-menu
                    v-model="fromDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <!-- prepend-icon="mdi-calendar" -->
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        label="Date"
                        readonly
                        :value="form.data.date"
                        required
                        :rules="[(v) => !!v || 'Date is required']"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="en-in"
                      v-model="form.data.date"
                      no-title
                      @input="fromDateMenu = false"
                      :min="minDate"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col class="py-0" cols="12">
                  <v-autocomplete
                    v-model="form.data.supplierId"
                    :items="supplierOpts"
                    required
                    item-text="name"
                    item-value="_id"
                    :rules="[(v) => !!v || 'Supplier is required']"
                    outlined
                    clearable
                    label="Supplier"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col class="py-0" cols="12">
                  <v-autocomplete
                    v-model="form.data.menuId"
                    :items="menuOpts"
                    item-text="name"
                    item-value="_id"
                    required
                    :rules="[(v) => !!v || 'Menu is required']"
                    outlined
                    label="Menu"
                    clearable
                    return-object
                    @input="handleChangeItem"
                  >
                    <template v-slot:selection="data">
                      <v-chip v-bind="data.attrs" :input-value="data.selected">
                        <v-avatar left>
                          <v-img
                            :src="storagePath + '/' + data.item.image"
                          ></v-img>
                        </v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>

                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content
                          v-text="data.item"
                        ></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-avatar>
                          <v-img
                            :src="storagePath + '/' + data.item.image"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card-title class="text-h4">
                Total: <span>{{ totalAmount }} $</span>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
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
                <tr v-for="(item, index) in form.data?.items" :key="index">
                  <td>
                    <v-img
                      contain
                      max-width="50"
                      :src="storagePath + '/' + item.image"
                    />
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <v-text-field
                      v-model="item.qty"
                      dense
                      style="max-width: 80px; width: 100px"
                    ></v-text-field>
                  </td>
                  <td>{{ decimalNumber(item.price, 2) }}</td>
                  <td>{{ decimalNumber(item.cost, 2) }}</td>
                  <td>{{ decimalNumber(item.price * item.qty, 2) }}</td>
                  <td>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-right" v-show="form.data?.items?.length">
          <v-btn
            type="submit"
            color="success"
            :loading="form.submitting"
            @click="onSubmit()"
            ><v-icon left>mdi-checkbox-marked-circle-outline</v-icon
            >Submit</v-btn
          >
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import dayjs from "dayjs";
import api from "@/utils/utilites";
import constants from "@/constants";
import { decimalNumber } from "@/lib/numeral";
export default {
  data() {
    return {
      decimalNumber,
      storagePath: constants.storagePath,
      form: {
        submitting: false,
        invoiceNumber: 1,
        data: {
          date: dayjs(new Date()).format("YYYY-MM-DD"),
          supplierId: null,
          menuId: null,
          items: [],
        },
      },
      fromDateMenu: false,
      fromDateVal: null,
      minDate: "2020-01-05",
      maxDate: "2019-08-30",
      supplierOpts: [],
      menuOpts: [],
    };
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format/do something with date
    },
    totalAmount() {
      let total = 0;
      this.form.data?.items.forEach((it) => {
        total += it.qty * it.price;
      });
      return decimalNumber(total, 2);
    },
  },
  methods: {
    handleChangeItem(val) {
      if (val) {
        let found = this.form.data?.items.find((doc) => {
          return doc._id === val._id;
        });

        if (found) {
          found.qty += 1;
        } else {
          this.form.data?.items.push({
            _id: val._id,
            name: val.name,
            price: val.price,
            qty: 1,
            image: val.image,
            cost: val.cost,
          });
        }
      } else {
        this.form.data.menuId = null;
      }
      // this.$nextTick(() => {
      //   this.form.data.menuId = null
      // })
    },

    clearForm() {
      this.form.data = {
        date: null,
        supplierId: null,
        menuId: null,
        items: [],
      };
      (this.fromDateMenu = false),
        (this.fromDateVal = null),
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
    },

    onSubmit() {
      if (this.$refs.form.validate()) {
        this.form.submitting = true;
        api
          .post("/purchases", {
            ...this.form.data,
            total: this.totalAmount,
            date: dayjs(this.form.data.date).endOf('days').toDate()
          })
          .then((response) => {
            this.$store.dispatch("pushNotification", {
              message: response.data.message || "Success",
              type: "success",
            });
            this.fetchInvoiceNumber();
            this.clearForm();
            // this.$router.go(-1);
          })
          .catch(({ response }) => {
            this.$store.dispatch("pushNotification", {
              message: response.data.message,
              type: "error",
            });
            console.log(error);
          })
          .finally(() => {
            this.form.submitting = false;
          });
      }
    },

    onClickDelete(index) {
      this.form.data?.items.splice(index, 1);
    },

    fetchInvoiceNumber() {
      api
        .get(`/purchases/invoiceNumber`)
        .then((response) => {
          // console.log(response.data);
          this.form.invoiceNumber = response.data;
          // this.supplierOpts = response.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("pushNotification", {
            message: response.data.message,
            type: "error",
          });
        });
    },

    fetchSupplier() {
      api
        .get(`/suppliers/getAll`)
        .then((response) => {
          // console.log(response.data);
          this.supplierOpts = response.data;
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
        .get(`/menus/getAll`)
        .then((response) => {
          //   console.log(response.data);
          this.menuOpts = response.data;
          //   this.supplierOpts = response.data;
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
    this.fetchSupplier();
    this.fetchInvoiceNumber();
    this.fetchMenu();
  },
};
</script>

<style scoped></style>
