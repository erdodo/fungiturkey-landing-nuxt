<template>
  <div>
    <el-dialog
      :visible.sync="state"
      title="Şifremi Unuttum"
      width="400px"
      v-loading="load"
      draggable
    >
      <div v-if="!pinState">
        <label for="">Eposta:</label>
        <el-input
          v-model="email"
          placeholder="Eposta adresiniz"
          size="large"
        ></el-input>
        <label for="" class="text-danger">{{ err }}</label>
      </div>
      <br />
      <div v-if="pinState">
        <label class="mt-3" for="">Pin:</label>
        <el-input
          v-model="pin"
          type="number"
          size="large"
          placeholder="Pin kodu"
        ></el-input>
        <label class="mt-3" for="">Yeni Şifreniz:</label>
        <el-input
          v-model="password"
          type="password"
          size="large"
          placeholder="Şifreniz"
          show-password
        ></el-input>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            v-if="pinState == false"
            type="primary"
            @click="mail()"
            class="w-100"
            >Eposta gönder</el-button
          >
          <el-button v-else type="primary" @click="newPass()" class="w-100"
            >Şifre yenile</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['forgetstate'],
  data() {
    return {
      state: false,
      email: '',
      password: '',
      pin: '',
      err: '',
      pinState: false,
      load: false,
    }
  },
  mounted() {},
  methods: {
    mail() {
      this.load = true
      axios
        .post('/forget', {
          email: this.email,
        })
        .then((res) => {
          if (res.data.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: res.data.message,
              type: 'success',
            })
            this.pinState = true
          } else {
            this.$notify({
              title: 'Hata',
              message: res.data.message,
              type: 'error',
            })
          }
        })
        .finally(() => {
          this.load = false
        })
    },
    newPass() {
      axios
        .post('/forgetPassword', {
          email: this.email,
          pin: this.pin,
          password: this.password,
        })
        .then((res) => {
          if (res.data.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: res.data.message,
              type: 'success',
            })
            this.state = false
          } else {
            this.$notify({
              title: 'Hata',
              message: res.data.message,
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
    forgetstate() {
      this.state = this.forgetstate
    },
    state() {
      this.$emit('forgetstate', this.state)
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
