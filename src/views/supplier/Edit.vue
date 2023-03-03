<template>
    <v-container fluid>
      <v-card class="mb-3">
        <template v-if="loading">
          <v-skeleton-loader type="card-heading"></v-skeleton-loader>
          <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
        </template>
        <template v-else>
          <v-card-title>supplier</v-card-title>
          <v-card-subtitle>Supplier/Edit</v-card-subtitle>
        </template>
      </v-card>
      <v-form
        lazy-validation
        ref="form"
        @submit.prevent="onSubmit"
        :disabled="form.submitting"
      >
        <v-card>
          <v-card-subtitle>
            <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
              ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
            >
          </v-card-subtitle>
          <v-card-subtitle class="mb-3"
            >Fill the form bellow to edit supplier</v-card-subtitle
          >
          <v-card-text>
            <v-row>
                <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="form.data.name"
                  required
                  :rules="[(v) => !!v || 'Name is required']"
                  outlined
                  label="Name"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="form.data.email"
                  required
                  :rules="[(v) => !!v || 'Email is required']"
                  outlined
                  label="Email"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="form.data.address"
                  type="text"
                  required
                  :rules="[(v) => !!v || 'Address is required']"
                  outlined
                  label="Address"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="form.data.companyName"
                  type="text"
                  required
                  :rules="[(v) => !!v || 'Company Name is required']"
                  outlined
                  label="Company Name"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="form.data.telephone"
                  type="text"
                  required
                  :rules="[(v) => !!v || 'Telephone is required']"
                  outlined
                  label="Telephone"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-4 pb-4">
            <v-btn type="submit" color="success" :loading="form.submitting"
              ><v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save</v-btn
            >
            <v-btn color="secondary" @click="$router.go(-1)"
              ><v-icon left>mdi-cancel</v-icon>Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </template>
  <script>
  import constants from "@/constants";
  import api from "@/utils/utilites";
  export default {
    data: () => ({
      loading: true,
      current_date: null,
      constants: constants,
      form: {
        model: {},
        submitting: false,
        data: {
          name: null,
          email: null,
          address: null,
          companyName: null,
          telephone: null
        },
        additional: {
          avatar: null,
        },
      },
      roles: [],
    }),
  
    mounted() {
      this.fetchData();
    },
  
    methods: {
      fetchData() {
        api
          .get(`/suppliers/${this.$route.params.supplier}`)
          .then((response) => {
            // console.log(response.data);
            this.form.data = response.data;
            //   console.log(this.form);
          })
          .catch(({ response }) => {
            // this.$store.dispatch("pushNotification", {
            //     message: response.data.message,
            //     type: "error",
            // });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      onInputFile(e) {
        if (e) this.form.additional.avatar = URL.createObjectURL(e);
        else this.form.additional.avatar = null;
      },
  
      onSubmit() {
        if (this.$refs.form.validate()) {
          this.form.submitting = true;
          api
            .put(`/suppliers/${this.$route.params.supplier}`, this.form.data)
            .then((response) => {
              this.$store.dispatch("pushNotification", {
                message: response.data.message || "Success",
                type: "success",
              });
              this.$router.go(-1);
            })
            .catch(({ response }) => {
              this.$store.dispatch("pushNotification", {
                message: response.data.message,
                type: "error",
              });
            })
            .finally(() => {
              this.form.submitting = false;
            });
        }
      },
  
      // keyDown(e)
      // {
      //     var charCode = e.keyCode
      //     console.log(e)
      //     if (charCode < 8 || charCode > 9 && charCode < 16 || charCode > 20 && charCode < 33 || charCode > 40 && charCode < 45 || charCode == 47 || charCode > 57 && charCode < 61 || charCode > 61 && charCode < 91 || charCode > 91) e.preventDefault();
      // }
    },
  };
  </script>
  