<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import login from '../repositories/loginAxios.js'
import { mapActions } from 'pinia'
import * as yup from 'yup'

export default {

  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const validationSchema = yup.object({
      email: yup.string().trim().required('El correo no puede estar en blanco').email("El email debe de ser válido"),
      password: yup.string().trim().required('La contraseña no puede estar en blanco')
    })
    return {
      validationSchema,
      user: {},
      errorMessage: '',
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const dataParam = urlParams.get('data')
    if (dataParam) {
      let logedUser = JSON.parse(decodeURIComponent(dataParam))
      this.saveUser(logedUser.token)
      this.addMessage('success', 'Sesión iniciada')
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions(useUserStore, ['saveUser']),
    async handleLogin() {
      try {
        let logedUser = await login.login(this.user)
         await this.saveUser(logedUser)
        this.$router.push('/')
      } catch (error) {
        let errorMessage = JSON.parse(error.request.response)
        this.errorMessage = errorMessage.message
      }
    }
  }
}
</script>
<template>
  <div class="  align-items-center mt-5 ">
    <div class=" text-center row rounded-3 align-items-center g-0">
      <h4 class="col-12 text-center">BIENVENIDO</h4>
      <p class="namePrice">INTRODUCE USUARIO Y CONTRASEÑA</p>
      <Form class="login-form col-12 text-center" @submit="handleLogin" :validation-schema="validationSchema"
        id="login-form">
        <div>
          <label for="email"></label>
          <Field type="text" name="email" id="email" class="col-12 mt-3" placeholder="Correo electrónico" v-model="user.email">
          </Field>
          <ErrorMessage class="error" name="email"></ErrorMessage>
        </div>
        <div>
          <label for="password" class="mt-4"></label>
          <Field type="password" name="password" id="password" class="col-12 mt-3" placeholder="Contraseña"
            v-model="user.password"></Field>
          <ErrorMessage class="error" name="password"></ErrorMessage>
        </div>
        <div class="mt-2" v-if="errorMessage">
          <p class="error">{{ errorMessage }}</p>
        </div>
        <div class="row d-flex justify-content-center mt-2 g-0">
          <button type="submit" class="btn  mt-3 m-2 col-1 btn col-8 col-md-4 col-lg-3">LOGIN</button>
        </div>
      </Form>
      <div class="mt-2">
        <a href="https://backend.projecteg3.ddaw.es/forgot-password">He olvidado mi contraseña</a>
      </div>
      <div class="mb-5">No tienes una cuenta? <a href="/register">Registrate aquí</a></div>
    </div>
  </div>
</template>
<style scoped>
.error{
  color: #e80000 !important;
}
h1 {
  margin-bottom: 20px;
  color: #333;
}

.col-12 {
  margin-top: 3px;
}

@media (min-width: 769px){
  input[type="text"],
  input[type="password"] {
    width: 40% !important;
  }
}
input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid;
}

input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
}

.error {
  margin-top: 5px;
  color: #000000;
  display: block;
  font-size: 1em;
}

a {
  text-decoration: none;
  color: rgb(107, 107, 107);
}

a:hover {
  color: rgb(197, 197, 197);
}

</style>
