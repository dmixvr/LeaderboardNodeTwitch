<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><router-link to="/">Aim Factory</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>  <router-link to="/BlastJump">Blast Jump</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
                <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>  <router-link to="/FlappyBird">Flappy bird</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Team crash Frontend</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span> Team Crash &copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
