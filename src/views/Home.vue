<template>
  <div class="list-wrapper">
    <v-row>
      <v-col class="mb-3">
        <h2 class="text-h4 text-white">Lista</h2>
      </v-col>
    </v-row>
    <v-table theme="dark"  style="height: 100%;overflow-y: scroll;">
      <thead>
        <tr>
          <th class="text-left">Articulo</th>
          <th class="text-left">Cantidad</th>
          <th class="text-center">precio</th>
          <th class="text-center">opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in item_list"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}x</td>
          <td class="text-center">${{item.price }}</td>
          <td>
          <v-row class="d-flex justify-center">
            <v-btn
              color="info"
              icon="mdi-pencil"
              size="x-small"
              @click="edit(index)"
            />
            <v-btn
              class="ml-2"
              color="error"
              icon="mdi-trash-can"
              size="x-small"
              @click="remove(index)"
            />
          </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-row class="ma-2">
      <p class="text-h5 text-white">Total:</p>
      <v-spacer/>
      <h2 class="text-h4 text-white">${{getTotal(item_list)}}</h2>
    </v-row>
    <v-row class="ma-2">
      <v-btn
        size="large"
        prepend-icon="mdi-trash-can"
        color="error"
        @click="clear()"
      >
        Clear
      </v-btn>
      <v-spacer/>
      <v-btn
        size="large"
        class="mr-2"
        color="success"
        prepend-icon="mdi-plus"
        @click="add()"
      >
        Agregar
      </v-btn>
      <v-btn
        size="large"
        color="info"
        prepend-icon="mdi-printer"
        @click="printReceipt()"
      >
        Imprimir Ticket
      </v-btn>
    </v-row>
    <Confirmation 
      :dialog="confirmation_dialog" 
      :on-close="onCloseConfirmation"
      :msg_data="message_data[type]"
    />
    <AddList 
      :edit="editing" 
      :visible="add_edit_dialog" 
      :item="item_list[selectedIndex]" 
      :onClose="onCloseAdd"
    />
    <v-snackbar
      v-model="snackbar"
      multi-line
      
    >
      <p class="mr-3"> <v-icon class="mr-2">mdi-alert</v-icon> {{ text }}</p>
    </v-snackbar>
  </div>
</template>


<script>
  import { defineComponent } from "vue"
  import Confirmation from "../components/Confirmation.vue"
  import AddList from "../components/AddList.vue"
  import Api from "../service/api";
  export default defineComponent({
    name: "HelloWorld",
    components:{Confirmation, AddList},
    data: () => ({
        item_list: [],
        snackbar: false,
        confirmation_dialog: false,
        type: 0,
        text: `No se encontró la dentro de la red impresora`,
        message_data:[
          {title:"Borrar", msg:"¿Estás seguro que deseas borrar todos los artículos?"},
          {title:"Imprimir", msg:"¿Desea imprimir el ticket de compra?"},
        ],
        add_edit_dialog: false,
        selectedIndex: 0,
        editing: false

    }),
    methods:{
      edit(item_index){
        this.selectedIndex = item_index;
        this.editing  =  true; 
        this.add_edit_dialog = true;
      },
      add(){
        this.add_edit_dialog = true;
      },
      remove(item_index){
        this.item_list.splice(item_index, 1)
      },
      clear(){
        this.type = 0;
        this.confirmation_dialog = true;
      },
      printReceipt(){
        this.type = 1;
        this.confirmation_dialog = true;
      },
      async confimPrint(){
        // this.loader = true;
        const data = { items:this.item_list }
        // console.warn(data);
        try {
          let response = await Api().post("/print-receipt", data);
          if (response.data.confirmation) {
            // Ya se armó
          }
        } catch (e) {
          this.snackbar = true;
        }
      },
      confirmClear(){
        console.warn('aquí');
        this.item_list = [];
      },
      onCloseConfirmation(confirmation){
        this.confirmation_dialog = false;

        if(!confirmation) return;
        if (this.type == 0) {
          this.confirmClear();
        }
        else if (this.type == 1) {
          this.confimPrint();
        }
      },
      onCloseAdd(item){
        if(item){
          if (this.editing){
            this.editing = false
            this.selectedIndex = 0;
            if (item) this.item_list.splice(this.selectedIndex, 1, item);
          } else{
            this.item_list.push(item);
          }
        }
        this.add_edit_dialog = false;
      },
      getTotal(product_list){
        if(product_list.length == 0) return "0.00"
        return product_list
            .map((item) => item.price)
            .reduce((acc, amount) => acc + amount);
      },
    }
  })
</script>

<style lang="scss" scoped>
  .list-wrapper{
    display: flex;
    padding: 15px;
    flex-direction: column;
    height: 100vh;
    background-color: #2d3436;
    .list {

    }
  }
</style>
