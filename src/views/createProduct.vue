<script>
import { reactive } from 'vue';
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";
import productsAxios from "@/repositories/productsAxios.js";

export default {
  data() {
    return {
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      estados: ['Grado A', 'Grado B', 'Calidad premium'],
      quantities: [10, 20, 30, 50, 70, 100],
      selectedQuantity: 0,
      discountPrice: this.data?.producto?.precio_ud,
      data: reactive({
        producto: {
          nombre: '',
          precio_ud: 0,
          id_categoria: 0,
          tipo: '',
          cantidad: 0,
          descripcion: '',
          estado:'',
        },
        imagenes: {
          url_1: '',
          url_2: '',
          url_3: '',
          url_4: '',
          url_5: '',
          url_6: '',
        },
      })
    };
  },
  computed: {
    ...mapState(categoriasStore,{categories: 'categories'}),
  },
  methods: {
    async submitForm() {
      await productsAxios.createProduct(this.data)
      this.$router.push('/')
    },
    handleImageUpload(index) {
      const fileInput = document.getElementById(`url_${index}`);
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.data.imagenes[`url_${index}`] = reader.result;
      };

      reader.readAsDataURL(file);
    },
    agregarAlCarrito() {
      if (this.data.producto.tipo === 'Selected'){
        categoriasStore().agregarAlCarrito(this.product);
      }else {
        categoriasStore().agregarBoxCarrito(this.data.producto,this.selectedQuantity,this.discountPrice);
      }

    },
    selectQuantity(event,quantity) {
      const cantidades = document.querySelectorAll('.option');

      cantidades.forEach(cantidad => {
        cantidad.classList.remove('selected');
      });

      event.target.classList.add('selected');
      this.selectedQuantity = quantity;

      let descuento = 0;

      if (this.selectedQuantity === 20) {
        descuento = 0.04;
      } else if (this.selectedQuantity === 30) {
        descuento = 0.08;
      } else if (this.selectedQuantity === 50) {
        descuento = 0.12;
      } else if (this.selectedQuantity === 70) {
        descuento = 0.16;
      } else if (this.selectedQuantity === 100) {
        descuento = 0.20;
      }

      this.discountPrice = (this.data.producto?.precio_ud * (1 - descuento)).toFixed(2);
    }
  }
};
</script>

<template>
  <div class="product-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nombre">Nombre del Producto:</label>
        <input type="text" id="nombre" v-model="data.producto.nombre" required>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripcion:</label>
        <input type="text" id="descripcion" v-model="data.producto.descripcion" required>
      </div>
      <div class="form-group">
        <label for="precio_ud">Precio:</label>
        <input type="number" step="0.01" id="precio_ud" v-model="data.producto.precio_ud" required>
      </div>
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select id="tipo" v-model="data.producto.tipo" required>
          <option  value="Selected">Box / Selected</option>
          <option  value="Box" >Lote </option>
        </select>
      </div>
      <div class="form-group">
        <label for="estado">Estado:</label>
        <select id="estado" v-model="data.producto.estado" required>
          <option disabled value="">Selecciona un estado</option>
          <option v-for="estado in estados" :value="estado">{{ estado }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="data.producto.id_categoria" required>
          <option disabled value="">Selecciona una categoria</option>
          <option v-for="(categoria, index) in categories" :key="index" :value="categoria.id">{{ categoria.nombre }}</option>
        </select>
      </div>
      <div v-if="this.data.producto.tipo === 'Selected'" class="form-group">
        <label for="cantidad">Cantidad:</label>
        <select id="cantidad" v-model="data.producto.cantidad" required>
          <option value="0" selected>0</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="70">70</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="form-group">
        <label for="url_1">Imagen 1:</label>
        <input type="file" id="url_1" @change="handleImageUpload(1)">
        <img v-if="data.imagenes.url_1" :src="data.imagenes.url_1" class="preview-image">
      </div>
      <div class="form-group">
        <label for="url_2">Imagen 2:</label>
        <input type="file" id="url_2" @change="handleImageUpload(2)">
        <img v-if="data.imagenes.url_2" :src="data.imagenes.url_2" class="preview-image">
      </div>
      <div class="form-group">
        <label for="url_3">Imagen 3:</label>
        <input type="file" id="url_3" @change="handleImageUpload(3)">
        <img v-if="data.imagenes.url_3" :src="data.imagenes.url_3" class="preview-image">
      </div>
      <div class="form-group">
        <label for="url_4">Imagen 4:</label>
        <input type="file" id="url_4" @change="handleImageUpload(4)">
        <img v-if="data.imagenes.url_4" :src="data.imagenes.url_4" class="preview-image">
      </div>
      <div class="form-group">
        <label for="url_5">Imagen 5:</label>
        <input type="file" id="url_5" @change="handleImageUpload(5)">
        <img v-if="data.imagenes.url_5" :src="data.imagenes.url_5" class="preview-image">
      </div>
      <div class="form-group">
        <label for="url_6">Imagen 6:</label>
        <input type="file" id="url_6" @change="handleImageUpload(6)">
        <img v-if="data.imagenes.url_6" :src="data.imagenes.url_6" class="preview-image">
      </div>
      <div class="form-group">
        <button type="submit" class="btn-submit">Guardar Producto</button>
      </div>
    </form>
  </div>
  <div class="row g-0">
    <section id="sec-carousel" class="col-12">
      <div id="carousel" class="carousel carousel-dark slide mx-auto border">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img :src="data.imagenes.url_1" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="data.imagenes.url_2" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="data.imagenes.url_3" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="data.imagenes.url_4" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="data.imagenes.url_5" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="data.imagenes.url_6" class="img-carousel d-block" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <div class="col-12 col-md-7" id="img-grande">
      <div class="fotosDiv row g-0">
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_1" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_2" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_3" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_4" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_5" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_6" class="card-img-top" alt="Detalle del Producto"></div>
      </div>
    </div>

    <div class="information col-12 col-md-5">
      <h2 class="productName" >{{data.producto.nombre}}</h2><br>

      <div v-if="data.producto.tipo === 'Box' " class="cantidades row">
        <h4 class="mb-4">Cantidad:</h4>
        <div class="custom-select justify-content-center">
          <div v-for="quantity in quantities" :key="quantity"  >
            <div  class="col-2"><span class="option numberBorder" @click="selectQuantity($event,quantity)">{{ quantity }}</span></div>
          </div>
        </div>
      </div>
      <div v-if="data.producto.tipo === 'Selected' " class="cantidades ">
        <h4 class="col-6">Cantidad: {{data.producto.cantidad}}</h4>
      </div>

      <p class="text-muted"> {{data.producto.descripcion}}</p>
      <p class="text-muted">Precio Ud. <s v-if="this.selectedQuantity >= 20"> {{data.producto.precio_ud}} € </s><span v-if="this.selectedQuantity <= 10"> {{data.producto.precio_ud}} € </span></p>
      <p  v-if="this.selectedQuantity >= 20" class="text-muted">Precio oferta: {{discountPrice}} €</p>
      <br>
      <h5 class="productName">Estado producto</h5>
      <p>{{data.producto.estado}}</p>
      <br>
      <span v-if="data.producto.tipo === 'Box'">
          <button v-if="this.selectedQuantity === 0" class="boton btn ">SELECCIONA UNA CANTIDAD</button>
          <button v-if="this.selectedQuantity !== 0" @click="agregarAlCarrito" class="boton btn ">AÑADIR AL CARRITO</button>
        </span>
      <span v-if="data.producto.tipo === 'Selected'">
          <button  @click="agregarAlCarrito" class="boton btn ">AÑADIR AL CARRITO</button>
        </span>



    </div>

  </div>

</template>

<style scoped>
.product-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #555;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

input[type="file"] {
  background-color: transparent;
}

.preview-images {
  display: flex;
  flex-wrap: wrap;
}

.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
}

.btn-submit {
  padding: 15px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
