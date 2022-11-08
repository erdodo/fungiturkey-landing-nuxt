<template>
  <el-dialog :visible.sync="state" title="Odanız" width="400px">
    <div>
      <el-image :src="ImgBase + Oda.image" class="w-100">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <h5 class="mt-2">{{ Oda.room_name }} / {{ Oda.room_no }}</h5>
      <span> {{ Oda.price }}TL (Kişi Başı) </span>
      <span> {{ Oda.quota }} Kişilik </span>

      <p v-html="Oda.content"></p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="" @click="$emit('success'), (state = false)"
          >Kapat</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: ['dialogVisible', 'room'],
  data() {
    return {
      sozlesme: '',
      state: false,
      Oda: {},
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == true) {
        this.state = this.dialogVisible
        axios
          .post(this.fungi + '/ActivityRoom/' + this.room + '/get')
          .then((res) => {
            this.Oda = res.data.data
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
  mounted() {},
}
</script>

<style></style>
