<template>
  <v-data-table
    :headers="headers"
    :items="puntuaciones"
    sort-by="Nick"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat >
        <v-toolbar-title>Puntuaciones Blast Jump</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Insertar puntuacion</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Nick" label="Nick"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Puntuacion" label="Puntuacion"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.Minijuego" label="Minijuego"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reiniciar</v-btn>
    </template>
  </v-data-table>
</template>


<script>
import axios from 'axios'
  export default {
    data: () => ({
      dialog: false,
      IP: "localhost",
      headers: [
        {
          text: 'Nick',
          align: 'start',
          sortable: false,
          value: 'Nick',
        },
        { text: 'Puntuacion', value: 'Puntuacion' },
        { text: 'Minijuego', value: 'Minijuego' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      puntuaciones: [],
      editedIndex: -1,
      editedItem: {
        Nick: '',
        Puntuacion: 0,
        Minijuego: 2,
      },
      defaultItem: {
        Nick: '',
        Puntuacion: 0,
        Minijuego: 2,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Insertar puntiacion' : 'Editar Puntuacion'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
         
        axios.get('http://'+IP+':8083/api/leaderboard/2')
        .then((response) =>{
            this.puntuaciones = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        console.log
        
      },

      editItem (item) {
        this.editedIndex = this.puntuaciones.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
  
      },

      deleteItem (item) {
        const index = this.puntuaciones.indexOf(item)
        confirm('Estas seguro que quieres eliminarlo?')

          axios.post('http://'+IP+':8083/api/leaderboard/delete',   this.puntuaciones[index])
          .then(function (response) {
            console.log(response);
           
          })
          .catch(function (error) {
            console.log(error);
          });
           this.puntuaciones.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.puntuaciones[this.editedIndex], this.editedItem)
          axios.post('http://'+IP+':8083/api/leaderboard/update', this.editedItem)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });


        } else {
          this.puntuaciones.push(this.editedItem)
          axios.post('http://'+IP+':8083/api/leaderboard/insert', this.editedItem)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        this.close()
      },
    },
  }
</script>