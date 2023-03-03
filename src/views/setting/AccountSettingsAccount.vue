<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div>
            <v-row>
              <v-col class="py-0" cols="12">
                <v-list-item class="px-0 mb-5">
                  <v-list-item-avatar size="128" tile color="grey">
                    <v-img
                      v-if="!form.data.avatar"
                      :src="
                        constants.storagePath + '/' + form.additional?.avatar
                      "
                      contain
                    ></v-img>
                    <v-img
                      v-else
                      :src="form.additional?.avatar"
                      contain
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-file-input
                      v-model="form.data.avatar"
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
            </v-row>

            <p class="text-body-1 mb-0">Allowed JPG, JPEG or PNG.</p>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-text>
          <!-- 👉 Form -->
          <v-form
            class="mt-6"
            lazy-validation
            ref="form"
            @submit.prevent="onSubmit"
            :disabled="form.submitting"
          >
            <v-row>
              <!-- 👉 First Name -->
              <v-col md="6" cols="12">
                <VTextField
                  outlined
                  v-model="form.data.firstName"
                  :rules="[(v) => !!v || 'First Name is required']"
                  label="First Name"
                />
              </v-col>

              <!-- 👉 Last Name -->
              <v-col md="6" cols="12">
                <VTextField
                  outlined
                  v-model="form.data.lastName"
                  :rules="[(v) => !!v || 'Last Name is required']"
                  label="Last Name"
                />
              </v-col>
              <!-- 👉 First Name -->
              <v-col md="6" cols="12">
                <VTextField
                  outlined
                  v-model="form.data.name"
                  label="Name"
                  :rules="[(v) => !!v || 'Name is required']"
                />
              </v-col>

              <!-- 👉 Email -->
              <v-col cols="12" md="6">
                <VTextField
                  outlined
                  v-model="form.data.email"
                  :rules="[(v) => !!v || 'Email is required']"
                  label="E-mail"
                  type="email"
                />
              </v-col>

              <!-- 👉 Country -->
              <!-- <v-col cols="12" md="6">
                <VSelect
                  v-model="accountData.country"
                  outlined
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                     :menu-props="{ maxHeight: 200 }"
                />
              </v-col> -->

              <!-- 👉 Form Actions -->
              <v-col cols="12" class="d-flex flex-wrap gap-2">
                <v-btn type="submit" color="primary" :loading="form.submitting">
                  <v-icon left>mdi-check-circle-outline</v-icon> Save
                  changes</v-btn
                >

                <v-btn
                  color="secondary"
                  type="reset"
                  @click.prevent="$router.go(-1)"
                >
                  <v-icon left>mdi-cancel</v-icon>
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import constants from "@/constants";
import { mapGetters } from "vuex";
import api from "@/utils/utilites";
export default {
  data: () => ({
    constants,
    form: {
      submitting: false,
      data: {
        avatar: null,
        name: "",
        firstName: "",
        lastName: "",
        email: "",
      },
      additional: {
        avatar: null,
      },
    },

    accountData: {
      // avatarImg: require("../../../public/avatar-1.png"),
      name: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  }),
  mounted() {
    this.form.data = {
      ...this.user,
      avatar: null,
    };
    // this.form.data.avatar = null;
    this.form.additional.avatar = this.user?.avatar;
  },
  computed: {
    ...mapGetters("auth", {
      user: "user",
    }),
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.form.submitting = true;
        let formData = new FormData();
        if (this.form.data.avatar)
          formData.append("avatar", this.form.data.avatar);
        formData.append("firstName", this.form.data.firstName);
        formData.append("lastName", this.form.data.lastName);
        formData.append("name", this.form.data.name);
        formData.append("email", this.form.data.email);
        api
          .put("/users/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.$store.dispatch("pushNotification", {
              message: response.data.message || "Success",
              type: "success",
            });
            // this.$router.go(-1);
            this.$store.dispatch("auth/getUser").catch(() => {});
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
    onInputFile(e) {
      if (e) this.form.additional.avatar = URL.createObjectURL(e);
      else this.form.additional.avatar = null;
    },
  },
};
</script>

<style scoped></style>
