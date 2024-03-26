import usersAxios from '@/repositories/usersAxios'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: null,
    user: null
  }),



  actions: {
    async saveUser(token) {
      this.token = token
      localStorage.setItem('token', token)
      await this.getUserInfo()
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    async getUserInfo() {
      if (this.token) {
        try {
          this.user = (await usersAxios.getUserInfo()) ? await usersAxios.getUserInfo() : null
          localStorage.setItem('user', JSON.stringify(this.user))
        } catch (error) {
          console.log(error)
        }
      }
    },

  }
})
