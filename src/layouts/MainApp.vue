<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      dark
      app
    >
      <v-list shaped>
        <v-list-item v-if="!$vuetify.breakpoint.lgAndUp"></v-list-item>
        <v-list-item dark :to="{ name: 'home' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-home-analytics</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>User Management</v-subheader>
        <v-list-item dark :to="{ name: 'user.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark :to="{ name: 'supplier.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Supplier</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark :to="{ name: 'category.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-shape</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark :to="{ name: 'table.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-table</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Table</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark :to="{ name: 'purchase.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Purchase</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dark :to="{ name: 'menu.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-food</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>Cashier</v-subheader>
        <v-list-item dark :to="{ name: 'cashier.index' }">
          <v-list-item-icon>
            <v-icon color="info">mdi-cash-register</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cashier</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>Report</v-subheader>
        <v-list-group
          v-for="item in items1"
          :key="item.title"
          prepend-icon="mdi-poll"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Report</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item dark :to="{ name: 'purchase.report' }">
            <v-list-item-icon>
              <v-icon color="info">mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Purchase</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dark :to="{ name: 'purchaseDetailBySupplier.report' }">
            <v-list-item-icon>
              <v-icon color="info">mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Purchase Detail By Supplier</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dark :to="{ name: 'purchaseSummaryBySupplier.report' }">
            <v-list-item-icon>
              <v-icon color="info">mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                >Purchase Summary By Supplier</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Restaurant</v-toolbar-title>
      <!-- <div v-if="$vuetify.breakpoint.smAndUp" class="ml-4 text-subtitle-2">Hello</div> -->
      <v-spacer></v-spacer>
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" icon v-bind="attrs" v-on="on">
            <v-badge color="primary" content="8">
              <v-icon> mdi-bell </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list three-line dense>
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu open-on-hover offset-y offset-overflow>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar tile v-on="on" v-bind="attrs" class="mr-5">
            <!-- <v-img contain src="/flag/en.svg" max-width="30" /> -->
            <v-img
              contain
              :src="'/flag/' + $i18n.locale + '.svg'"
              max-width="30"
            ></v-img>
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item @click="changeLanguage('km')">
            <v-list-item-avatar tile>
              <v-img contain :src="'/flag/' + 'km' + '.svg'"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Km</v-list-item-title>
              <v-list-item-subtitle>ភាសាខ្មែរ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="changeLanguage('en')">
            <v-list-item-avatar tile>
              <v-img contain :src="'/flag/' + 'en' + '.svg'"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>En</v-list-item-title>
              <v-list-item-subtitle>English</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y transition="slide-y-transition" v-if="user">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" icon v-bind="attrs" v-on="on">
            <v-avatar color="primary" v-if="user.avatar">
              <v-img :src="storagePath + '/' + user.avatar"></v-img>
            </v-avatar>
            <v-avatar color="primary" v-else>{{
              user.firstName?.charAt(0) + user.lastName?.charAt(0)
            }}</v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar class="white--text">
                <v-avatar
                  color="primary"
                  v-if="user.avatar"
                  class="text-center"
                >
                  <v-img :src="storagePath + '/' + user.avatar"></v-img>
                </v-avatar>
                <v-avatar color="primary" v-else>
                  <span>
                    {{ user.firstName?.charAt(0) + user.lastName?.charAt(0) }}
                  </span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item link dense :to="{ name: 'setting' }">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Setting</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link dense @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <div style="position: fixed; right: 10px; z-index: 9999">
        <Notification
          v-for="notification in $store.state.notifications"
          :key="notification.id"
          :item="notification"
        ></Notification>
      </div>
      <transition name="slide-x-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <v-footer padless>
      <v-card flat tile width="100%" dark class="text-center">
        <v-card-text class="white--text"
          >{{ new Date().getFullYear() }} —<strong>
            made by Code4You</strong
          ></v-card-text
        >
      </v-card>
    </v-footer>
  </v-app>
</template>
<style>
.v-app-bar.v-app-bar--fixed {
  position: fixed;
  top: 0;
  z-index: 10 !important;
}
.v-btn {
  text-transform: none !important;
}
</style>
<script>
import { mapGetters } from "vuex";
import constants from "@/constants";
import Notification from "@/components/Notification.vue";
export default {
  data: () => ({
    storagePath: constants.storagePath,
    drawerMenu: [],
    drawer: null,
    notifications: [],
    count_notification: 0,
    items1: [
      {
        action: "mdi-ticket",
        items: [{ title: "List Item" }],
        title: "Attractions",
      },
    ],
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
    ],
  }),
  components: {
    Notification,
  },
  computed: {
    ...mapGetters("auth", {
      user: "user",
    }),
  },

  beforeCreate() {
    // this.$store.commit("auth/SET_REFRESHING", false)
    this.$i18n.locale = this.$store.state.locale;
    this.$store.dispatch("auth/getUser").catch(() => {});
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    changeLanguage(locale) {
      this.$store.dispatch("changeLanguage", locale);
      this.$i18n.locale = locale;
    },
  },
};
</script>
