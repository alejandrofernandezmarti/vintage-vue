<script>
import { reactive } from 'vue';
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";
import productsAxios from "@/repositories/productsAxios.js";

export default {
  data() {
    return {
      sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      data: reactive({
        producto: {
          nombre: '',
          precio: 0,
          id_marca: 0,
          id_categoria: 0,
        },
        medidas: {
          alto:  0,
          ancho: 0,
          manga: 0,
        },
        talla:{
          etiqueta: '',
          real:'',
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
    ...mapState(categoriasStore,{categories: 'categories',brands:'brands'}),
  },
  methods: {
    async submitForm() {
      await productsAxios.createProduct(this.data)
    },
   /* handleImageUpload(index) {
      const inputId = `url_${index}`;
      const input = document.getElementById(inputId);
      const file = input.files[0];

      if (file) {
        // Obtener el nombre del archivo
        const fileName = file.name;

        // Crear un objeto URL para mostrar una vista previa de la imagen
        const imageUrl = URL.createObjectURL(file);

        // Asignar el nombre del archivo a la propiedad correspondiente
        this.data.imagenes[inputId] = fileName;

        // Asignar la URL de la imagen a otra propiedad
        this.data.imagenes[`preview_${inputId}`] = imageUrl;
      } else {
        // Si no se selecciona ningún archivo, borrar tanto el nombre del archivo como la URL de la imagen
        this.data.imagenes[inputId] = '';
        this.data.imagenes[`preview_${inputId}`] = '';
      }
    }, */
    handleImageUpload(index) {
      const fileInput = document.getElementById(`url_${index}`);
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.data.imagenes[`url_${index}`] = reader.result; // Modifica la propiedad directamente
      };

      reader.readAsDataURL(file);
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
        <label for="precio">Precio:</label>
        <input type="number" id="precio" v-model="data.producto.precio" required>
      </div>
      <div class="form-group">
        <label for="marca">Marca:</label>
        <select id="marca" v-model="data.producto.id_marca" required>
          <option v-for="(marca, index) in brands" :key="index" :value="marca.id">{{ marca.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="data.producto.id_categoria" required>
          <option v-for="(categoria, index) in categories" :key="index" :value="categoria.id">{{ categoria.nombre }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="medidas">Medidas (cm):</label>
        <input type="number" id="alto" v-model="data.medidas.alto" placeholder="Alto" required>
        <input type="number" id="ancho" v-model="data.medidas.ancho" placeholder="Ancho" required>
        <input type="number" id="manga" v-model="data.medidas.manga" placeholder="Manga" required>
      </div>
      <div class="form-group">
        <label for="medidas">Tallas:</label><br><br>
        <strong>Real </strong>
        <select id="tallaReal" v-model="data.talla.real" required>
          <option disabled value="">Selecciona una talla</option>
          <option v-for="size in sizes" :value="size">{{ size }}</option>
        </select><br><br>
        <strong>  Etiqueta </strong>
        <select id="tallaEtiqueta" v-model="data.talla.etiqueta" required>
          <option disabled value="">Selecciona una talla</option>
          <option v-for="size in sizes" :value="size">{{ size }}</option>
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

    <div class="col-12 col-md-8" id="img-grande">
      <div class="fotosDiv row g-0">
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_1" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_2" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_3" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_4" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_5" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="data.imagenes.url_6" class="card-img-top" alt="Detalle del Producto"></div>
      </div>
    </div>

    <div class="information col-12 col-md-4">
      <h2 class="productName" >{{data.producto.nombre}}</h2><br>
      <p class="text-muted">TALLA: {{data.talla.real}}</p>
      <p class="text-muted">Marca: {{data.producto.id_marca}}</p>
      <p class="text-muted">Precio: {{data.producto.precio}} €</p>
      <br>
      <h5 class="productName">Medidas: </h5>
      <p class="text-muted">Alto: {{data.medidas?.alto}} cm</p>
      <p class="text-muted">Ancho: {{data.medidas?.ancho}} cm</p>
      <p class="text-muted">Mangas: {{data.medidas?.manga}} cm</p><br>

      <h5 class="productName">Estado producto</h5>
      <p>{{data.producto.id_categoria}}</p>
      <br>
      <button v-if="!enCarrito" @click="agregarAlCarrito" class="boton btn btn-primary">AÑADIR AL CARRITO</button>
      <button v-if="enCarrito" class="boton btn btn-primary">AÑADIDO CORRECTAMENTE</button>
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
