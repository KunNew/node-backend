<template>
  <v-row>
    <!-- SECTION: Change Password -->
    <v-col cols="12">
      <v-card>
        <v-form
          lazy-validation
          ref="form"
          @submit.prevent
          :disabled="form.submitting"
        >
          <v-card-text>
            <!-- 👉 Current Password -->
            <v-row class="mb-3">
              <v-col cols="12" md="6">
                <!-- 👉 current password -->
                <v-text-field
                  outlined
                  v-model="form.data.currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-icon="
                    isNewPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="Current Password"
                  required
                  :rules="[(v) => !!v || 'Old Password is required']"
                  @click:append="
                    isCurrentPasswordVisible = !isCurrentPasswordVisible
                  "
                />
              </v-col>
            </v-row>

            <!-- 👉 New Password -->
            <v-row>
              <v-col cols="12" md="6">
                <!-- 👉 new password -->
                <v-text-field
                  outlined
                  v-model="form.data.newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-icon="
                    isNewPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="New Password"
                  required
                  :rules="[
                    (v) => !!v || 'validation.new_password',
                    (v) =>
                      (v && v.length >= 8) ||
                      'validation.new_password_at_least 8',
                  ]"
                  @click:append="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </v-col>

              <v-col cols="12" md="6">
                <!-- 👉 confirm password -->
                <VTextField
                  outlined
                  v-model="form.data.confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-icon="
                    isConfirmPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                  "
                  label="Confirm New Password"
                  required
                  :rules="confirmPasswordRule"
                  @click:append="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                />
              </v-col>
            </v-row>
          </v-card-text>

          <!-- 👉 Action Buttons -->
          <v-card-text class="d-flex flex-wrap gap-4">
            <v-btn
              color="primary"
              type="submit"
              :loading="form.submitting"
              @click="onSubmit()"
            >
              <v-icon left>mdi-check-circle-outline</v-icon> Save changes</v-btn
            >

            <v-btn
              color="secondary"
              type="reset"
              @click.prevent="$router.go(-1)"
            >
              <v-icon left>mdi-cancel</v-icon>
              Cancel
            </v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/utils/utilites";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    isCurrentPasswordVisible: false,
    isNewPasswordVisible: false,
    isConfirmPasswordVisible: false,
    form: {
      submitting: false,
      data: {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
      },
      additional: {
        avatar: null,
      },
    },
  }),
  computed: {
    ...mapGetters("auth", {
      user: "user",
    }),
    confirmPasswordRule() {
      return [
        (v) => !!v || "validation.confirm_password",
        () =>
          this.form.data.newPassword == this.form.data.confirmPassword ||
          "validation.confirm_password_not_match",
      ];
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.form.submitting = true;

        api
          .patch("/users/profile", this.form.data)
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
              message: response.data?.message,
              type: "error",
            });
            // console.log(error);
          })
          .finally(() => {
            this.form.submitting = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
