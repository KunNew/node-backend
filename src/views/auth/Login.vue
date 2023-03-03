<template>
  <v-app>
    <v-main>
      <v-container class="fill-height fill_image" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4" style="padding: 10px">
            <v-card elevation="0" color="#FFFFFFDD">
              <v-card-subtitle class="text-center text-h5"
                >Login</v-card-subtitle
              >
              <v-divider></v-divider>
              <v-card-text>
                <v-img v-if="logo" :src="logo" height="150" contain></v-img
                ><br />
                <v-alert v-if="error" tile color="error" dark>
                  {{ error }}
                </v-alert>
                <v-form @submit.prevent="login" lazy-validation ref="form">
                  <v-text-field
                    v-model="form.email"
                    autocomplete="off"
                    label="Enter your email"
                    name="email"
                    required
                    :rules="[(v) => !!v || 'Please enter email or email']"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    class="rounded-0"
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form.password"
                    autocomplete="off"
                    label="Enter your password"
                    name="password"
                    required
                    :rules="[(v) => !!v || 'Please enter your password']"
                    prepend-inner-icon="mdi-lock"
                    :type="show_password ? 'text' : 'password'"
                    class="rounded-0"
                    outlined
                  >
                  </v-text-field>
                  <v-card-actions
                    class="text--secondary"
                    style="margin-top: -30px"
                  >
                    <v-checkbox
                      v-model="show_password"
                      color="#000000"
                      label="Show password"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <!-- <router-link
                      class="pl-2"
                      :to="{ name: 'forget' }"
                      style="color: #000000"
                      >Forgot password?</router-link
                    > -->
                  </v-card-actions>
                  <v-btn
                    type="submit"
                    class="rounded-0"
                    color="success"
                    x-large
                    block
                    dark
                    >Login</v-btn
                  >
                  <v-card-actions class="text--secondary">
                    <!-- <v-checkbox
                      color="#000000"
                      label="Remember me"
                    ></v-checkbox> -->
                    <v-spacer></v-spacer>
                    <!-- <router-link class="pl-2" :to="{ name: 'register' }" style="color: #000000;">Sign Up</router-link> -->
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fill_image {
  background-image: url("../../../public/bg.jpeg");
  background-clip: content-box;
  background-size: cover;
}
</style>

<script>
export default {
  data: () => ({
    form: {
      email: "admin@email.com",
      password: "superadmin",
      remember_me: false,
    },
    show_password: false,
    error: null,
    logo: null,
  }),
  mounted() {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("auth/login", this.form)
          .then((res) => {
            //   console.log(res);
       
            this.$router.push({ name: "home" });
            
          })
          .catch(({response}) => {
            //   console.log(error);
            this.error = response.data?.message
          });
        // this.$store.dispatch('auth/login', this.form)
        // .then(( response ) => {
        //     let redirect_location = window.localStorage.getItem('redirect')
        //     if (redirect_location)
        //     {
        //         this.$router.push(redirect_location)
        //         window.localStorage.removeItem('redirect')
        //     } else
        //     {
        //         this.$router.push({ name: 'home' })
        //     }
        // })
        // .catch(({response}) => {
        //     if (response)
        //     {
        //         this.error = response.data.error_description || 'Cannot connect to the remote server.'
        //     } else
        //     {
        //         this.error = 'Cannot connect to the remote server.'
        //     }
        // })
      }
    },
  },
};
</script>
