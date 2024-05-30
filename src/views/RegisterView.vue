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
      name: yup.string().trim().required('El nombre es un campo obligatorio').trim().min(2).max(50),
      email: yup.string().trim().required('El correo no puede estar en blanco').email("El email debe de ser válido"),
      password: yup.string().trim().required('La contraseña no puede estar en blanco')
    })
    return {
      validationSchema,
      user: {},
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['saveUser']),
    async handleLogin() {
      try {
        await login.register(this.user)
        let logedUser = await login.login(this.user)
        this.saveUser(logedUser)
        this.$router.push('/')
      } catch (error) {
        let errorMessage = JSON.parse(error.request.response)
        this.errorMessage = errorMessage.message
      }
    }
  },
}
</script>
<template>
  <div class="  align-items-center mt-5 ">
    <div class="  row  align-items-center g-0">
      <h4 class="col-12 text-center">REGISTRARSE</h4>
      <Form class="row text-center g-0" @submit="handleLogin" :validation-schema="validationSchema"
        id="login-form">
        <div>
          <label for="name" class="fw-bold"></label><br>
          <Field type="text" name="name" id="name" class="col-12" placeholder="Nombre y Apellidos"
                 v-model="user.name" />
          <ErrorMessage class="error" name="name" />
        </div>
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
        <div class="row d-flex justify-content-center mt-2 g-0 ">
          <button type="submit" class="btn  mt-3 col-8 col-md-4 col-lg-3">REGISTER</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<style scoped>
.error{
  color: #e80000 !important;
}
.btn{
  text-align: center !important;
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
