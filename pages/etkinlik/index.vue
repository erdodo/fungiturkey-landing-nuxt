<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlikler</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Etkinlikler
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 550px">
      <div class="w-100 d-flex justify-content-end">
        <el-button @click="calendarState = true"
          ><i class="bi bi-calendar-date mr-2"></i> Etkinlik Takvimi</el-button
        >
      </div>
      <div class="row">
        <template v-for="a in activity">
          <div :key="a.id" class="col-12 col-sm-6 col-md-4 mt-2">
            <div class="p-2 text-center">
              <el-image
                :src="a.image"
                :alt="a.title"
                @click="modalData = !modalData"
                class="w-100 image-card rounded cursor-pointer"
                style="height: 226px"
                fit="cover"
              >
                <template #placeholder>
                  <div class="image-slot">
                    Yükleniyor<span class="dot">...</span>
                  </div>
                </template>
              </el-image>
              <h3 class="mt-3">{{ a.title }}</h3>
              <h5 v-if="a.status_record == '1'">
                Son Kayıt:
                <a class="text-warning">{{
                  dateTimeParser(a.last_record_date)
                }}</a>
              </h5>
              <span v-else>Kayıtlar kapanmıştır.</span>
              <div class="">
                <router-link
                  :to="'/etkinlik/' + a.id + '-' + a.title.replace(/ /g, '-')"
                  class="btn mx-2 text-white"
                  :class="
                    a.status_record == '1' ? 'btn-warning' : 'btn-secondary'
                  "
                  >Devamını Oku</router-link
                >
              </div>
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

    <activity-calendar
      :state="calendarState"
      @state="calendarState = $event"
    ></activity-calendar>
    <Footer></Footer>
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'

export default {
  head: {
    title: 'Mantar Etkinlikleri - Fungi Turkey',
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
      activity: [],
      modalData: false,
      loginState: 0,
      load: true,
      kayitDialog: false,
      calendarState: false,
      dialogData: {},
      page: 1,
      limit: 6,
      count: 0,
    }
  },
  mounted() {
    this.getData()
    this.$axios.$post('/token_control').then((res) => {
      if (res.status == 'error') {
        this.$auth.$storage.setUniversal('token', '')
        this.$auth.$storage.setUniversal('profile', '')
      }
    })
  },
  computed: {},
  methods: {
    getData() {
      this.load = true
      const params = {
        page: this.page,
        limit: this.limit,
        filter: {
          status: '1',
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.activity = []
      this.$axios
        .$post(this.$store.state.fungi + '/Activity', params)
        .then((response) => {
          for (const val of Object.values(response.data)) {
            val['image'] = this.$store.state.img_base + val.image
            this.activity.push(val)
          }
          this.count = response.count
          this.load = false
        })
    },
    setPage(e) {
      this.page = e
      this.getData()
    },
    login() {
      this.loginState++
    },
    kayitDialogEvent(data) {
      this.kayitDialog = true
      this.dialogData = data
    },
    dateTimeParser,
  },
}
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
