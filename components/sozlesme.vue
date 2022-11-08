<template>
  <el-dialog
    :visible.sync="state"
    title="Sözleşme"
    width="400px"
    :before-close="handleClose"
  >
    <div style="word-break: normal" v-html="sozlesme"></div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="$emit('success'), (state = false)"
          >Onayla</el-button
        >
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
      state: false,
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == true) {
        this.state = this.dialogVisible
        this.$axios.$post(this.fungi + '/Settings/1/get').then((res) => {
          this.sozlesme = res.data.data.sozlesme
        })
      } else {
        this.state = this.dialogVisible
        this.$emit('state')
      }
    },
    state() {
      if (this.state == false) {
        this.$emit('state')
      }
    },
  },
  mounted() {
    this.$axios.$post(this.fungi + '/Settings/1/get').then((res) => {
      this.sozlesme = res.data.data.sozlesme
    })
  },
}
</script>

<style></style>
