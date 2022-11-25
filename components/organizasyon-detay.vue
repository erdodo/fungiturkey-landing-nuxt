<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :Title="services?.title"
      width="60%"
    >
      <div class="p-2 text-center" v-loading="load">
        <el-image
          :src="this.$store.state.img_base + services?.image"
          class="w-100 rounded"
          :alt="services?.title"
        >
          <template #placeholder>
            <div class="image-slot">YÜKLENİYOR<span class="dot">...</span></div>
          </template>
        </el-image>
        <h4 class="mt-3">{{ services?.title }}</h4>
        <p v-html="services?.content"></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Organizasyon',
    titleTemplate: 'Mantar Organizasyonları',
    htmlAttrs: {
      lang: 'tr',
      amp: true,
    },
  },
  props: ['visible', 'id'],
  data() {
    return {
      services: [],
      load: true,
      dialogVisible: false,
    }
  },
  mounted() {},
  methods: {
    getData() {
      this.load = true
      this.$axios
        .$post(this.$store.state.fungi + '/Services/' + this.id + '/get')
        .then((response) => {
          this.services = response.data
          this.load = false
        })
    },
  },
  watch: {
    visible() {
      this.dialogVisible = this.visible
    },
    dialogVisible() {
      this.$emit('visible', this.dialogVisible)
    },
    id() {
      this.getData()
    },
  },
}
</script>

<style></style>
