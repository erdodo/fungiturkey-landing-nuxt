<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlik Detay</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/etkinlik" class="text-white"
                  >Etkinlikler</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">Detay</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5" v-loading="load" style="min-height: 550px">
      <div class="d-flex justify-content-center">
        <img
          :src="this.$store.state.img_base + activity.image"
          :alt="activity.title"
          style="max-height: 700px !important"
          class="img-fluid rounded"
        />
      </div>
      <h2 class="mt-4">{{ activity.title }}</h2>
      <div class="d-flex flex-column">
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><Location /> </el-icon>Konum:
          </span>
          <a class="text-dark">{{ activity.location }} </a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><Calendar /> </el-icon>Başlama Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.start_date) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><Calendar /> </el-icon>Bitiş Tarihi:
          </span>
          <a class="text-dark">{{ dateTimeParser(activity.finish_date) }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><Calendar /> </el-icon>Son Kayıt Tarihi:
          </span>
          <a class="text-dark">{{
            dateTimeParser(activity.last_record_date)
          }}</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><Money /> </el-icon>Ücret:
          </span>
          <a class="text-dark">{{ activity.price }} ₺ (Kişi başı)</a>
        </h6>
        <h6 class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><User /> </el-icon>Koordinatör:
          </span>
          <a class="text-dark">{{ activity.director }}</a>
        </h6>
        <h6 v-if="activity.quota > 0" class="d-flex align-items-baseline mt-1">
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><User /> </el-icon>Kota:
          </span>
          <a class="text-dark">{{ activity.quota }} Kişilik</a>
        </h6>
        <h6
          v-if="activity.cadir_kota > 0"
          class="d-flex align-items-baseline mt-1"
        >
          <span class="me-3 text-success">
            <el-icon class="me-2 mb-0"><User /> </el-icon>Çadır Kotamız:
          </span>
          <a class="text-dark">{{ activity.cadir_kota }} Kişilik</a>
        </h6>

        <button
          size="large"
          class="btn btn-outline-warning my-2"
          v-if="!this.$auth.$storage.getUniversal('token')"
          @click="loginMethod()"
        >
          Kayıt Olmak İçin Giriş Yap
        </button>
        <button
          class="btn btn-outline-success my-2"
          @click="guncelle_state = true"
          v-if="
            guncelle_buton_state &&
            my_record_state &&
            this.$auth.$storage.getUniversal('token')
          "
        >
          Etkinlik kaydını güncelle
        </button>

        <button
          size="large"
          class="btn btn-outline-warning my-2"
          @click="ekle_state = true"
          v-else-if="
            !my_record_state &&
            this.$auth.$storage.getUniversal('token') &&
            activity.status_record == '1' &&
            !limit_state
          "
        >
          Etkinliğe Katıl
        </button>
        <button
          v-if="limit_state && !countState"
          size="large"
          class="btn btn-outline-danger my-2"
        >
          Kotamız dolmuştur
        </button>
      </div>
      <p v-html="activity.content"></p>
    </div>
    <div class="container mb-5" v-loading="load">
      <h4>Yorumlar</h4>
      <div v-if="this.$auth.$storage.getUniversal('token')">
        <el-input
          v-model="cmm"
          maxlength="300"
          placeholder="Yorumunuz..."
          show-word-limit
          type="textarea"
        />
        <div class="w-100 d-flex justify-content-end">
          <el-button
            :disabled="load"
            type="primary"
            :loading="buttonLoad"
            class="mt-3"
            @click="yorumGonder()"
          >
            Gönder</el-button
          >
        </div>
        <el-divider />
      </div>

      <template v-for="c in comments">
        <div :key="c.comment" class="card p-3 my-1">
          <div class="d-flex justify-content-between">
            <h5 class="m-0 p-0">{{ c.name }} {{ c.surname }}</h5>
            <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
          </div>
          <p>{{ c.comment }}</p>
        </div>
      </template>
    </div>
    <login v-if="!load" :loginState="loginState"></login>
    <activity-record
      :visible="ekle_state"
      @visible="ekle_state = $event"
      :activity="activity"
      @limitState="limit_state = $event"
    />

    <activity-record-edit
      @countState="countState = $event"
      :visible="guncelle_state"
      @visible="guncelle_state = $event"
      :activity="activity"
    />
    <Footer></Footer>
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'

export default {
  head: {
    title: 'Mantar Etkinliği - Fungi Turkey',
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
      comments: [],
      load: true,
      buttonLoad: false,
      loginState: 0,
      cmm: '',
      my_record_state: false,
      guncelle_state: false,
      ekle_state: false,
      ekle_buton_state: true,
      guncelle_buton_state: true,
      limit_state: false,
      countState: false,
    }
  },
  computed: {},
  mounted() {
    this.getData()
    this.getComment()
    this.getMyRecord()
  },
  methods: {
    getData() {
      this.load = true
      this.$axios
        .$post(
          this.$store.state.fungi +
            '/Activity/' +
            this.$route.params.id.split('-')[0] +
            '/get'
        )
        .then((response) => {
          this.activity = response.data
          document.title = this.activity.title + ' - Fungi Turkey'
        })
      this.load = false
    },
    getMyRecord() {
      const params = {
        filter: {
          own_id: this.$auth.$storage.getUniversal('profile')?.id,
          activity_id: this.$route.params.id.split('-')[0],
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params)
        .then((res) => {
          if (res.count > 0) {
            this.my_record_state = true
          } else {
            this.my_record_state = false
          }

          this.guncelle_buton_state = Object.values(res.data).find(
            (e) => e.price_status == '0'
          )
        })
    },
    getComment() {
      this.load = true
      let params = {
        filter: {
          activity_id: this.$route.params.id.split('-')[0],
          status: 1,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityComment', params)
        .then((response) => {
          this.comments = response.data
          this.buttonLoad = false
        })
      this.load = false
    },

    yorumGonder() {
      if (this.cmm.length < 5) {
        this.$alert('Lütfen en az 5 karakterlik bir yorum giriniz.', 'Dikkat', {
          confirmButtonText: 'Tamam',
        })
      } else {
        this.buttonLoad = true
        var profile = this.$auth.$storage.getUniversal('profile')
        let formData = new FormData()
        formData.append('name', profile.name)
        formData.append('surname', profile.surname)
        formData.append('comment', this.cmm)
        formData.append('activity_id', this.activity.id)
        formData.append('member_id', profile.id)
        formData.append('status', '0')
        this.$axios
          .$post(this.$store.state.fungi + '/ActivityComment/store', formData)
          .then((res) => {
            if (res.status == 'success') {
              this.$alert(
                'Yorumunuz başarıyla gönderildi. Teşekkürler.',
                'Başarılı',
                {
                  confirmButtonText: 'Tamam',
                }
              )

              this.getComment()
            }
          })
      }
    },
    loginMethod() {
      this.loginState++
      this.loginState++
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
