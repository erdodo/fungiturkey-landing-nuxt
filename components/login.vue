<template>
  <div>
    <el-dialog
      :visible.sync="state"
      title="Giriş Yap"
      v-loading="load"
      width="400px"
      draggable
    >
      <label for="">Eposta:</label>
      <el-input
        v-model="email"
        placeholder="Eposta adresiniz"
        @keypress.enter="giris()"
        size="large"
      ></el-input>
      <label for="" class="text-danger">{{ err }}</label>
      <br />
      <label class="mt-3" for="">Şifre:</label>
      <el-input
        v-model="password"
        type="password"
        @keypress.enter="giris()"
        size="large"
        placeholder="Şifreniz"
        show-password
      ></el-input>
      <span @click="forgetstate = true" class="cursor-pointer"
        >Şifremi unuttum
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="giris()" class="w-100"
            >Giriş</el-button
          >
        </span>
      </template>
    </el-dialog>
    <forget
      :forgetstate="forgetstate"
      @forgetstate="forgetstate = $event"
    ></forget>
  </div>
</template>

<script>
export default {
  props: ['loginState'],
  data() {
    return {
      state: false,
      email: '',
      password: '',
      err: '',
      forgetstate: false,
      load: false,
    }
  },
  mounted() {},
  methods: {
    giris() {
      this.load = true
      this.$axios
        .$post('/login', {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: res.message,
              type: 'success',
            })

            this.$store.commit('setToken', res.token)
            this.$auth.$storage.setUniversal('token', res.token)

            this.state = false
            this.email = ''
            this.password = ''
            this.$axios.defaults.headers.common['token'] = res.token
            this.$axios.$post('/profile').then((res2) => {
              this.$store.commit('setProfile', JSON.stringify(res2.data))
              this.$auth.$storage.setUniversal('profile', res2.data)
              window.location.reload()
            })
          } else {
            this.$notify({
              title: 'Hata',
              message: res.message,
              type: 'error',
            })
          }
        })
        .finally(() => {
          this.load = false
        })
    },
  },
  watch: {
    loginState() {
      console.log(this.loginState)
      this.state = true
    },
    email() {
      if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.err = 'Epostanızı kontrol ediniz.'
      } else {
        this.err = ''
      }
    },
  },
}
</script>

<style></style>
