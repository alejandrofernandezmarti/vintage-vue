<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import comprasAxios from "@/repositories/comprasAxios.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const validationSchemaPedido = yup.object({
      pedido: yup.string().trim().min(10, 'Escribe el contenido que deseas para el pedido').required('El pedido no puede estar vacío'),
      email: yup.string().trim().required('El correo no puede estar en blanco').email('El email debe de ser válido'),
      telefono: yup.string().trim().required('El teléfono no puede estar en blanco').matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    });

    const validationSchemaPassword = yup.object({
      password: yup.string().trim().required('La contraseña no puede estar en blanco')
    });

    return {
      validationSchemaPedido,
      validationSchemaPassword,
      user: {
        pedido: '',
        email: '',
        telefono: '',
        password: ''
      },
      passwordCorrect: false,
      correctPassword: 'qwer',
      errorMessage: '',
      orderSubmitted: false
    };
  },
  methods: {
    checkPassword() {
      if (this.user.password === this.correctPassword) {
        this.passwordCorrect = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Contraseña incorrecta';
      }
    },
    handlePasswordSubmit() {
      this.errorMessage = '';
      this.checkPassword();
    },
    handlePedidoSubmit() {
      if (this.passwordCorrect) {
        comprasAxios.customOrder(this.user)
            .then(() => {
              this.orderSubmitted = true;
              alert('Pedido enviado con éxito');
            })
            .catch((error) => {
              this.errorMessage = 'Error al enviar el pedido';
            });
      } else {
        this.errorMessage = 'Debes validar tu contraseña antes de enviar el pedido';
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="">
      <h2 class="title mt-5">PEDIDO PERSONALIZADO</h2>

      <div class="example">
        <div class="steps">
          <p class="align-content-center">Pasos</p>
          <p>1.- Redactas los productos del pedido como en el ejemplo y añades tus datos de contacto y pulsas enviar</p>
          <p>2.- Recibirás un vídeo y el presupuesto del pedido por whatsapp y gmail</p>
          <p>3.- Después realizas el pago y recibirás el pedido con la factura en 3-5 días laborales</p>
        </div>
        <p class="text-muted">Ejemplo</p>
        <p class="text-muted">1.- Sudaderas de marca (nike y adidas) cantidad 50 uds, estilo oversize y vintage</p>
        <p class="text-muted">2.- Pantalones vaqueros (sin marca) cantidad 40 uds </p>
        <p class="text-muted">3.- Jereys (vintage) cantidad 60 uds</p>
        <p class="text-muted">Datos de contacto<br>Número teléfono: +34 622050341 <br>Gmail: info.wholesale.peninsula@gmail.com</p>
      </div>

      <div class="mt-5 order">
        <div class="row rounded-3 g-0">
          <h4 class="col-12 text-center">PEDIDO PERSONALIZADO</h4>

          <div v-if="!orderSubmitted" class="align-items-center">

            <!-- Formulario de Validación de Contraseña -->
            <Form @submit="handlePasswordSubmit" :validation-schema="validationSchemaPassword" v-if="!passwordCorrect">
              <div class="text-center">
                <p>Para poder realizar un pedido personalizado debes ser cliente VIP</p>
                <div>
                  <Field type="password" name="password" id="password" placeholder="Introduce tu código" v-model="user.password" class="col-12 col-md-6 mt-3" autocomplete="new-password">
                  </Field>
                  <ErrorMessage class="error" name="password"></ErrorMessage>
                </div>
                <div>
                  <button type="submit" class="btn-order col-md-3 col-12 mt-3">VALIDAR</button>
                </div>
              </div>
            </Form>

            <!-- Formulario de Pedido -->
            <form @submit="handlePedidoSubmit" :validation-schema="validationSchemaPedido" v-else>
              <div class="form-group">
                <label for="pedido">Realiza tu pedido:</label>
                <Field as="textarea" name="pedido" id="pedido" placeholder="Escribe tu pedido aquí..." v-model="user.pedido" class="textarea col-12">
                </Field>
                <ErrorMessage class="error" name="pedido"></ErrorMessage>
              </div>
              <div class="row">
                <div class="form-group col-12 col-md-6 mt-3">
                  <label for="email">Correo electrónico:</label><br>
                  <Field type="text" name="email" id="email" placeholder="Correo electrónico" v-model="user.email" class="col-12">
                  </Field>
                  <ErrorMessage class="error" name="email"></ErrorMessage>
                </div>
                <div class="form-group col-12 col-md-6 mt-3">
                  <label for="telefono">Teléfono:</label><br>
                  <Field type="text" name="telefono" id="telefono" placeholder="Núm teléfono" v-model="user.telefono" class="col-12">
                  </Field>
                  <ErrorMessage class="error" name="telefono"></ErrorMessage>
                </div>
              </div>

              <div class="row d-flex justify-content-center mt-2 g-0 offset-3 col-6">
                <button type="submit" class="btn-order mt-3">ENVIAR</button>
              </div>
            </form>

            <div v-if="errorMessage" class="mt-2">
              <p class="error">{{ errorMessage }}</p>
            </div>
          </div>

          <div v-else>
            <p class="text-success">Pedido realizado con éxito, pronto se pondrán en contacto contigo.</p>
          </div>
        </div>
      </div>
      <div>
        <h2 class="title mt-5">VIDEOHANDPICK</h2>
        <div class="order">
          <div class="">
            <p>1.- Concretar una cita a través de whatsapp +34 622050341 o gmail info.wholesale.peninsula@gmail.com</p>
            <p>2.- A través de una videollamada alguien de nuestro equipo os atenderá personalmente y os mostrará las prendas que necesitéis</p>
            <p>3.- Envíamos el presupuesto de las prendas seleccionadas y al realizar el pago enviaremos el producto y lo recibiréis en 3-5 días laborales</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>

.textarea {
  width: 100%;
  height: 150px;
}
.btn-order {
  border: 1px solid #000000;
  border-radius: 5px;
  background-color: white;
  padding: 3px;
}
.btn-order:hover {
  background-color: #424242 !important;
  color: #eaeaea !important;
}
.steps {
  font-weight: 700;
}
.title {
  text-align: center;
}
.order {
  border: 2px solid black !important;
  margin-top: 20px;
}
.example, .order {
  width: 80%;
  border: 2px solid #d2d2d2;
  border-radius: 10px;
  margin-left: 10%;
  padding: 20px;
}
.error {
  color: red;
}
.text-success {
  color: black !important;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>
