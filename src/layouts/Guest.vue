<template>
  <v-app>
    <v-main>
      <div style="position: fixed; right: 10px; z-index: 9999">
        <Notification
          v-for="notification in $store.state.notifications"
          :key="notification.id"
          :item="notification"
        ></Notification>
      </div>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import Notification from "@/components/Notification.vue";
export default {
  components: {
    Notification,
  },
  mounted() {
    
  }
};
</script>
