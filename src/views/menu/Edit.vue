<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <v-card-title>user</v-card-title>
        <v-card-subtitle>List all user.</v-card-subtitle>
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
          >Fill the form bellow to create new user</v-card-subtitle
        >
        <v-card-text>
          <v-row>
            <v-col class="py-0 pb-3" cols="6">
              <fieldset class="pa-5 rounded" style="border: thin solid #cccccc">
                <legend>Menu Type</legend>
                <v-radio-group v-model="form.data.status" row>
                  <v-radio label="Export" :value="0"></v-radio>
                  <v-radio label="Import" :value="1"></v-radio>
                </v-radio-group>
              </fieldset>
            </v-col>
            <v-col class="py-0" cols="12">
              <v-list-item class="px-0 mb-5">
                <v-list-item-avatar size="128" tile color="grey">
                  <v-img
                    v-if="!form.data.image"
                    :src="constants.storagePath + '/' + form.additional?.avatar"
                    contain
                  ></v-img>
                  <v-img v-else :src="form.additional?.avatar" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-file-input
                    v-model="form.data.image"
                    @change="onInputFile"
                    show-size
                    prepend-icon=""
                    prepend-inner-icon="mdi-image"
                    accept="image/*"
                    outlined
                    label="Avatar"
                  >
                  </v-file-input>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col class="py-0" cols="12">
              <v-text-field
                v-model="form.data.name"
                required
                :rules="[(v) => !!v || 'name is required']"
                outlined
                label="name"
              >
              </v-text-field>
            </v-col>

            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model.number="form.data.price"
                type="text"
                required
                :rules="[(v) => !!v || 'Price is required']"
                outlined
                label="Price"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="6" v-show="form.data.status == 1">
              <v-text-field
                v-model.number="form.data.cost"
                type="text"
                required
            
                outlined
                label="Cost"
              >
              </v-text-field>
                  <!-- :rules="[(v) => !!v || 'Cost is required']" -->
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model.number="form.data.unit"
                type="text"
                required
                :rules="[(v) => !!v || 'Unit is required']"
                outlined
                label="Unit"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-autocomplete
                v-model="form.data.categoryId"
                :items="categorieOpts"
                required
                item-text="name"
                item-value="_id"
                :rules="[(v) => !!v || 'Category is required']"
                outlined
                label="Category"
              >
              </v-autocomplete>
            </v-col>
            <v-col class="py-0" cols="12">
              <v-textarea
                v-model="form.data.description"
                type="text"
                required
                :rules="[(v) => !!v || 'Description is required']"
                outlined
                label="Description"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn type="submit" color="success" :loading="form.submitting"
            ><v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save</v-btn
          >
          <v-btn color="secondary" @click="$router.go('-1')"
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
        price: null,
        cost: null,
        image: null,
        description: null,
        categoryId: null,
        status: 0,
        unit: null,
      },
      additional: {
        avatar: null,
      },
    },
    roles: [],
    categorieOpts: [],
  }),

  mounted() {
    this.fetchData();
    this.fetchCategory();
  },

  methods: {
    fetchCategory() {
      api
        .get(`/categories/getAll`)
        .then((res) => {
          this.categorieOpts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      api
        .get(`/menus/${this.$route.params.menu}`)
        .then((response) => {
          // console.log(response.data);
          this.form = response.data;
          this.form.data.categoryId = response.data?.data?.category?._id;
          // console.log(this.form);
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
        let formData = new FormData();
        // formData.append("_method", "PUT");
        if (this.form.data.image)
          formData.append("image", this.form.data.image);

        formData.append("name", this.form.data.name);
        formData.append("price", this.form.data.price);
        formData.append("cost", this.form.data.cost);
        formData.append("unit", this.form.data.unit);
        formData.append("categoryId", this.form.data.categoryId);
        formData.append("description", this.form.data.description);
        formData.append("status", this.form.data.status);
        api
          .put(`/menus/${this.$route.params.menu}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.$store.dispatch("pushNotification", {
              message: response.data.message,
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
