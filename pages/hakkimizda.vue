<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Hakkımızda</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Hakkımızda
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 500px">
      <div class="row">
        <div class="col-12 col-md-6">
          <h2>{{ about1?.title }}</h2>
          <div v-html="about1?.content"></div>
          <el-image
            :src="this.$store.state.img_base + about1?.image"
            class="w-100"
            :alt="about1?.title"
          >
            <div slot="placeholder" class="image-slot">
              Yükleniyor<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="col-12 col-md-6">
          <h2>{{ about2?.title }}</h2>
          <div v-html="about2?.content"></div>
          <el-image
            :alt="about2?.title"
            :src="this.$store.state.img_base + about2?.image"
            class="w-100"
          >
            <div slot="placeholder" class="image-slot">
              Yükleniyor<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hakkımızda',
    titleTemplate:
      "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor.",
    htmlAttrs: {
      lang: 'tr',
      amp: true,
    },
  },
  data() {
    return {
      about1: {
        title: '',
        content: '',
        image: '',
      },
      about2: {
        title: '',
        content: '',
        image: '',
      },
      load: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.load = true
      this.$axios
        .$post(this.$store.state.fungi + '/About/1/get')
        .then((response) => {
          this.about1 = response.data
          this.$axios
            .$post(this.$store.state.fungi + '/About/2/get')
            .then((res) => {
              this.about2 = res.data
              this.load = false
            })
        })
    },
  },
}
</script>

<style></style>
