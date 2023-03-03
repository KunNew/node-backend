<template>
  <v-container fluid>
    <v-tabs show-arrows v-model="activeTab">
      <v-tab v-for="item in tabs" :key="item.icon">
        <v-icon size="20">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-divider />
    <v-tabs-items v-model="activeTab" class="mt-5 disable-tab-transition">
      <v-tab-item>
        <AccountSettingsAccount />
      </v-tab-item>
      <v-tab-item>
        <AccountSettingsSecurity />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import AccountSettingsAccount from "./AccountSettingsAccount.vue";
import AccountSettingsSecurity from "./AccountSettingsSecurity.vue";
export default {
  components: {
    AccountSettingsAccount,
    AccountSettingsSecurity,
  },
  data() {
    return {
      activeTab: "account",
      tabs: [
        {
          title: "Account",
          icon: "mdi-account-outline",
          tab: "account",
        },
        {
          title: "Security",
          icon: "mdi-lock-open-outline",
          tab: "security",
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style scoped>
.disable-tab-transition {
}
</style>
