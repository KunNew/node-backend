import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import theme from "./vuetify/theme";
import defaults from "./vuetify/defaults";
Vue.use(Vuetify);
import '../@core/scss/libs/vuetify/index.scss'
export default new Vuetify({
 theme: {
    themes: {
        light: {
            // primary: "#9155FD",
            secondary: "#8A8D93",
            "on-secondary": "#fff",
            // success: "#56CA00",
            info: "#16B1FF",
            warning: "#FFB400",
            error: "#FF4C51",
            "on-primary": "#FFFFFF",
            "on-success": "#FFFFFF",
            "on-warning": "#FFFFFF",
            background: "#F4F5FA",
            "on-background": "#3A3541",
            "on-surface": "#3A3541",
            "grey-50": "#FAFAFA",
            "grey-100": "#F5F5F5",
            "grey-200": "#EEEEEE",
            "grey-300": "#E0E0E0",
            "grey-400": "#BDBDBD",
            "grey-500": "#9E9E9E",
            "grey-600": "#757575",
            "grey-700": "#616161",
            "grey-800": "#424242",
            "grey-900": "#212121",
            
          },
          variables: {
            "border-color": "#3A3541",
            "medium-emphasis-opacity": 0.68,
    
            // Shadows
            "shadow-key-umbra-opacity": "rgba(var(--v-theme-on-surface), 0.08)",
            "shadow-key-penumbra-opacity": "rgba(var(--v-theme-on-surface), 0.12)",
            "shadow-key-ambient-opacity": "rgba(var(--v-theme-on-surface), 0.04)",
          },
     
      },
 }
 
});
