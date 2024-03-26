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
      user: {}
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
    loginWithGoogle() {
      try {
        window.location.href = 'https://backend.projecteg3.ddaw.es/auth/google/'
      } catch (error) {
        console.log(error)
      }
    },

    async handleLogin() {
      try {
        let logedUser = await login.login(this.user)
        this.saveUser(logedUser)
        alert('success', 'Sesión iniciada')
        this.$router.push('/')
      } catch (error) {
        alert('danger', 'Los datos Insertados no son Correctos')
      }
    }
  }
}
</script>
<template>
  <div class="container  align-items-center mt-5 ">
    <div class=" text-center row rounded-3 align-items-center">
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
        <div class="row d-flex justify-content-center mt-2">
          <button type="submit" class="btn  mt-3 m-2 col-1">LOGIN</button>
        </div>
      </Form>
      <div class="mt-2">
        <a href="https://backend.projecteg3.ddaw.es/forgot-password">He olvidado mi contraseña</a>
      </div>
      <div>No tienes una cuenta? <a href="/selectRegister">Registrate aquí</a></div>
    </div>
  </div>
</template>
<style scoped>
.container {

  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  padding-block: 20px;
}


.login-box {
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 90%;
  max-width: 60%;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.col-12 {
  margin-top: 3px;
}

input[type="text"],
input[type="password"] {
  width: 50%;
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

@media (max-width: 768px) {
  .login-box {
    max-width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .login-box {
    max-width: 75%;
  }
}

@media (max-width: 576px) {
  .btn-primary {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
