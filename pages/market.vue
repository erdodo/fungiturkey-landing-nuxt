<template>
  <div></div>
</template>

<script>
export default {
  mounted() {},
  methods: {
    odeme() {
      this.$axios.post('/odeme')
    },
  },
}
</script>

<style></style>
