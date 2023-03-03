<template>
  <v-container class="fill-height fill_image" fluid>
        <v-row align="center" justify="center" dense>
           <v-card elevation="0" flat class="pa-5">
              <v-img src="storage/error/page_not_found.png"></v-img>
              <v-card-title>We're sorry, Page Not Found</v-card-title>
              <v-card-text>
                The page your are looking for does not exist, might have been
                removed, or is temporary unavailable.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" outlined @click="$router.go(-1)"
                  >Back</v-btn
                >
                <v-btn color="success" link :to="{ name: 'home' }"
                  >Back to home</v-btn
                >
              </v-card-actions>
            </v-card>
        </v-row>
      </v-container>
</template>
