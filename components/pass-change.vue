<template>
  <el-dialog :visible.sync="state" title="Şifre değiştir" width="300px">
    <label for="">Eski şifreniz</label>
    <el-input
      v-model="oldPass"
      show-password
      type="password"
      placeholder="Eski Şifreniz"
    />
    <label for="">Yeni şifreniz</label>
    <el-input
      v-model="newPass"
      show-password
      type="password"
      placeholder="Yeni Şifreniz"
    />
    <label for="">Yeni şifreniz Tekrar</label>
    <el-input
      v-model="checkPass"
      show-password
      type="password"
      placeholder="Yeni Şifreniz Tekrar"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="newPassword()">Onayla</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogVisible'],
  data() {
    return {
      sozlesme: '',
      state: this.dialogVisible,
      oldPass: '',
      newPass: '',
      checkPass: '',
    }
  },
  computed: {},
  watch: {
    dialogVisible() {
      this.state = this.dialogVisible
    },
  },
  methods: {
    newPassword() {
      this.$axios
        .$post('new-password', {
          oldPass: this.oldPass,
          newPass: this.newPass,
          checkPass: this.checkPass,
        })
        .then((res) => {
          if (res.status == 'success') {
            this.$emit('success')
            this.$notify({
              title: 'Başarılı',
              message: res.message,
              type: 'success',
            })
          } else {
            this.$notify({
              title: 'Dikkat',
              message: res.message,
              type: 'info',
            })
          }
        })
    },
  },
  mounted() {
    this.$axios
      .$post(this.$store.state.fungi + '/Settings/1/get')
      .then((res) => {
        this.sozlesme = res.data.sozlesme
      })
  },
}
</script>

<style></style>
