<template>
  <v-alert
    dense
    dismissible
    border="left"
    prominent
    transition="slide-y-transition"
    min-width="300"
    max-width="500"
    :type="item.type"
  >
    <div class="text-subtitle-2 text-capitalize">{{ item.type }}</div>
    <div class="text-body-2">{{ item.message }}</div>
  </v-alert>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    timeOut: null,
  }),

  mounted() {
    this.timeOut = setTimeout(() => {
      this.$store.dispatch("removeNotification", this.item);
    }, 3500);
  },

  beforeUnmount() {
    clearInterval(this.timeOut);
  },
};
</script>
