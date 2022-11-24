<template>
  <v-dialog v-model="visible" width="300px">
    <v-card class="v-theme--dark">
      <v-card-title>
        {{ msg_data.title }}
      </v-card-title>
      <v-card-text class="text-h9">
        {{ msg_data.msg }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="handleClose(false)">Cancelar</v-btn>
        <v-spacer />
        <v-btn color="success" @click="handleClose(true)">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "Confirmation",
    props: {
      onClose: Function,
      dialog: Boolean,
      msg_data: Object,
    },
    data: () => ({
      visible: false,
    }),
    watch: {
      dialog: function (newVal, oldVal) {
        this.visible = newVal
      },
      visible: function (newVal, oldVal) {
        if (this.dialog && !newVal) {
          this.onClose(false)
        }
      },
    },
    methods: {
      handleClose(value) {
        this.onClose(value)
      },
    },
  }
</script>
