<template>
  <div>
    <Header></Header>
    <el-carousel
      v-loading="load"
      indicator-position="inside "
      height="100vh"
      pause-on-hover
      :interval="7000"
      arrow="always"
    >
      <el-carousel-item v-for="(slide, i) in slides" :key="i.title">
        <div :alt="slide.title">
          <el-image
            :src="slide.image"
            fit="cover"
            style="height: 100vh; width: 100vw"
            :alt="slide.title"
          >
            <div
              slot="placeholder"
              v-loading="true"
              class="image-slot"
              style="height: 100vh; width: 100vw"
            >
              Loading<span class="dot">...</span>
            </div>
          </el-image>
          <div class="slider-content">
            <h1>{{ slide.title }}</h1>
            <p class="fs-6">{{ slide.content }}</p>
            <el-button type="warning" round
              ><router-link
                class="text-decoration-none text-white"
                :to="slide.button_href"
                >{{ slide.button_title }}</router-link
              ></el-button
            >
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [],
      load: true,
    }
  },
  mounted() {
    this.load = true
    this.getData()
  },
  methods: {
    async getData() {
      this.load = true
      let params = {
        filter: {
          status: 1,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      await this.$axios
        .$post(this.$store.state.fungi + '/Slider', params)
        .then((res) => {
          for (const val of Object.values(res.data)) {
            val['image'] = this.$store.state.img_base + val.image
            this.slides.push(val)
          }
          this.load = false
        })
        .catch((e) => {
          if (e.response.message == 'Unauthorized') {
            this.$store.commit('setToken', '')
            this.$store.commit('setProfile', '')
            window.location.reload()
          }
        })
    },
  },
}
</script>
<style>
.slider {
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.slider-content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 0 50px;
}
.slider-content h1 {
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.slider-content p {
  font-size: 1.3rem !important;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
}
.el-carousel__arrow {
  font-size: 45px !important;
  background-color: transparent !important;
}
</style>
