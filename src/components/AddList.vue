<template>
  <v-dialog v-model="open" transition="dialog-top-transition" width="80%">
    <v-card class="v-theme--dark">
      <v-toolbar color="info" :title="edit ? 'Editar' : 'Agregar'" />
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="6">
            <v-text-field
              persistent-placeholder
              variant="underlined"
              v-model="name"
              :counter="10"
              label="Articulo"
              placeholder="Cerveza 16Oz"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              persistent-placeholder
              variant="underlined"
              v-model="price"
              label="Precio"
              placeholder="0.00"
              @keypress="filter"
            >
              <template v-slot:prepend-inner>
                <v-icon class="mt-2" size="small" color="white"
                  >mdi-currency-usd</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              class="qty"
              variant="underlined"
              label="Cantidad"
              v-model="qty"
              readonly
            >
              <template v-slot:prepend>
                <v-icon size="x-large" @click="sustract()" color="red"
                  >mdi-minus</v-icon
                >
              </template>
              <template v-slot:append>
                <v-icon size="x-large" @click="add()" color="green"
                  >mdi-plus</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="error" variant="text" @click="handleClose()">
          Cancelar
        </v-btn>
        <v-spacer />
        <v-btn color="success" variant="text" @click="saveItem()">
          {{ edit ? "Aceptar" : "Agregar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AddList",
  data: () => ({
    qty: 0,
    name: "",
    price: "",
    open: false,
  }),
  props: {
    edit: Boolean,
    visible: Boolean,
    onClose: Function,
    item: Object,
  },
  methods: {
    handleClose() {
      this.onClose();
      this.resetValues();
    },
    resetValues() {
      this.price = "";
      this.name = "";
      this.qty = 0;
    },
    saveItem() {
      const { editing, qty, name, price } = this;
      const return_item = {
        qty: parseFloat(qty),
        name,
        price: parseFloat(price),
      };
      this.resetValues();
      this.onClose(return_item);
    },
    add() {
      this.qty = this.qty + 1;
    },
    sustract() {
      const { qty } = this;
      if (qty > 0) this.qty = qty - 1;
    },
    filter: function (evt) {
      evt = evt ? evt : window.event;
      let expect = evt.target.value.toString() + evt.key.toString();

      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } else return true;
    },
  },
  watch: {
    edit: function (newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (newVal) {
        this.price = this.item.price;
        this.name = this.item.name;
        this.qty = this.item.qty;
      }
    },

    visible: function (newVal, oldVal) {
      this.open = newVal;
    },
  },
};
</script>

<style>
.qty .v-input__prepend {
  display: flex;
  align-items: center;
}

.qty .v-input__append {
  display: flex;
  align-items: center;
}

.qty .v-field__input {
  text-align: center !important;
  font-size: 30px;
}
</style>
