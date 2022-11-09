<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Organizasyonumuz</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Organizasyonumuz
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 400px">
      <div class="row">
        <template v-for="a in services">
          <div :key="a.id" class="col-12 col-sm-6 col-md-4 mt-2">
            <div
              class="p-2 text-center cursor-pointer"
              @click=";(detayVisible = true), (id = a.id)"
            >
              <el-image :src="a.image" :alt="a.title" class="w-100 rounded">
                <div slot="placeholder" class="image-slot">
                  Yükleniyor<span class="dot">...</span>
                </div>
              </el-image>

              <h4 class="mt-3 ellipsis-2">{{ a.title }}</h4>
              <div v-html="a.content" class="ellipsis-3"></div>
            </div>
          </div>
        </template>
        <div class="col-12 mt-4">
          <div class="w-100 d-flex justify-content-center">
            <el-pagination
              :page-size="limit"
              :pager-count="3"
              @current-change="setPage($event)"
              layout="prev, pager, next"
              :total="count"
            />
          </div>
        </div>
      </div>
    </div>
    <organizasyon-detay
      :visible="detayVisible"
      @visible="detayVisible = $event"
      :id="this.id"
    ></organizasyon-detay>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Organizasyon - FungiTurkey',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor. (Mantar Etkinliği)",
      },
    ],
  },
  data() {
    return {
      services: [],
      load: true,
      detayVisible: false,
      id: 0,
      count: 0,
      limit: 6,
      page: 1,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const params = {
        limit: this.limit,
        page: this.page,
        filter: {
          status: 1,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.load = true
      this.services = []
      this.$axios
        .$post(this.$store.state.fungi + '/Services', params)
        .then((response) => {
          for (const val of Object.values(response.data)) {
            val['image'] = this.$store.state.img_base + val.image
            this.services.push(val)
          }
          this.count = response.count
          this.load = false
        })
    },
    setPage(e) {
      this.page = e
      this.getData()
    },
  },
}
</script>

<style></style>
