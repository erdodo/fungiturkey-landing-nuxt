<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>İletişim</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                İletişim
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!--Start Contact Us
	=========================================== -->
    <section
      class="contact-us"
      id="contact"
      v-loading="load"
      style="min-height: 500px"
    >
      <div class="container">
        <div class="row">
          <!-- Contact Details -->
          <div class="contact-details col-md-6">
            <h3 class="mb-3">Detaylar</h3>
            <ul class="contact-short-info mt-4">
              <li class="mb-3">
                <i class="bi bi-house mr-2"></i>
                <span>Adres: {{ contact?.adress }} </span>
              </li>
              <li class="mb-3">
                <i class="bi bi-telephone mr-2"></i>
                <span>Telefon: {{ contact?.phone }} </span>
              </li>
              <li class="mb-3">
                <i class="bi bi-envelope mr-2"></i>
                <span>E-Posta: {{ contact?.mail }} </span>
              </li>
              <li>
                <i class="bi bi-people mr-2"></i>
                <span>Yönetici: {{ contact?.director }} </span>
              </li>
            </ul>
            <!-- Footer Social Links -->
            <div class="social-icon">
              <ul>
                <li>
                  <a :href="contact?.facebook" target="_blank"
                    ><i class="bi bi-facebook"></i
                  ></a>
                </li>
                <li>
                  <a :href="contact?.twitter" target="_blank"
                    ><i class="bi bi-twitter"></i
                  ></a>
                </li>
                <li>
                  <a :href="contact?.linkedin" target="_blank"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                </li>
                <li>
                  <a :href="contact?.youtube" target="_blank"
                    ><i class="bi bi-youtube"></i
                  ></a>
                </li>
              </ul>
            </div>
            <!--/. End Footer Social Links -->
          </div>
          <!-- / End Contact Details -->

          <!-- Contact Form -->
          <div class="contact-form col-md-6" v-loading="load">
            <div class="form-group mb-4">
              <input
                type="text"
                placeholder="İsminiz"
                class="form-control"
                v-model="name"
              />
            </div>

            <div class="form-group mb-4">
              <input
                type="email"
                placeholder="Eposta Adresiniz"
                class="form-control"
                v-model="email"
              />
            </div>
            <div class="form-group mb-4">
              <input
                type="text"
                placeholder="Telefon numaranız"
                class="form-control"
                v-model="phone"
              />
            </div>
            <div class="form-group mb-4"></div>
            <div class="form-group mb-4">
              <input
                type="text"
                placeholder="Başlık"
                class="form-control"
                v-model="subject"
              />
            </div>

            <div class="form-group mb-4">
              <textarea
                rows="6"
                placeholder="Mesajınız"
                class="form-control"
                v-model="message"
              ></textarea>
            </div>
            <div class="d-flex">
              <el-button type="" circle class="me-2 px-3" @click="getResim">
                <i class="bi bi-arrow-clockwise fs-5"></i>
              </el-button>
              <div class="resim" v-html="dgresim"></div>

              <div class="ms-2 w-100">
                <input
                  type="text"
                  placeholder="Doğrulama"
                  class="form-control w-100"
                  style="height: auto"
                  v-model="dogrulama"
                />
              </div>
            </div>

            <div class="mt-4">
              <el-button type="primary" class="w-100" @click="gonder()"
                >Gönder</el-button
              >
            </div>
          </div>
          <!-- ./End Contact Form -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </section>
    <!-- end section -->

    <!--================================
=            Google Map            =
=================================-->
    <iframe
      v-if="false"
      :src="contact?.map_link"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <!--====  End of Google Map  ====-->
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'İletişim',
    titleTemplate:
      "Fungi Turkey 2018 yılında mantar türlerini topluma tanıtabilmek ve bilinçli bir şekilde mantar avcılığı yapabilmek adına Ömer Üngör tarafından kurulmuştur. Sosyal medya üzerinden yaptığımız detaylı tür tanımlamaları, online mantar eğitimleri, saha eğitimleri, etkinlikler ve mantar gastronomisi etkinlikleriyle bu alanda Türkiye'de ilkleri gerçekleştirmiştir. Birbirinden değerli katılımcılara sahip Fungi Turkey topluluğu her geçen gün büyüyerek ilerlemeye devam ediyor.",
    htmlAttrs: {
      lang: 'tr',
      amp: true,
    },
  },
  data() {
    return {
      contact: {
        map_link: '',
        adress: '',
        phone: '',
        mail: '',
        director: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: '',
      },
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      load: true,
      buttonLoading: false,
      dgresim: '',
      dogrulama: '',
    }
  },
  mounted() {
    this.getData()
    this.getResim()
  },
  methods: {
    getResim() {
      this.$axios.$post('dogrulama').then((res) => {
        this.dgresim = res
      })
    },
    getData() {
      this.load = true
      this.$axios
        .$post(this.$store.state.fungi + '/Contact/first')
        .then((response) => {
          this.contact = response.data
          this.load = false
        })
    },
    toDataURL(url, callback) {
      var xhr = new XMLHttpRequest()
      xhr.onload = function () {
        var reader = new FileReader()
        reader.onloadend = function () {
          callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()
    },
    gonder() {
      this.$axios.$post('md5', { text: this.dogrulama }).then((res) => {
        if (res == document.getElementById('cpt').getAttribute('alt')) {
          if (
            this.email.length < 3 ||
            this.name.length < 3 ||
            this.subject.length < 3 ||
            this.message.length < 3
          ) {
            this.$notify({
              title: 'Dikkat',
              message: 'Boş alanları doldurunuz!',
              type: 'info',
            })
          } else {
            this.buttonLoading = true
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('phone', this.phone)
            formData.append('subject', this.subject)
            formData.append('message', this.message)

            this.$axios
              .$post(this.$store.state.fungi + '/Feedbacks/store', formData)
              .then((res) => {
                if (res.status == 'success') {
                  this.$notify({
                    title: 'Başarılı',
                    message: 'Mesaj başarıyla gönderildi',
                    type: 'success',
                  })
                  this.buttonLoading = false
                  window.location.reload()
                }
              })
          }
        } else {
          this.$notify({
            title: 'Hata',
            message: 'Lütfen resimdeki rakamları doğru giriniz.',
            type: 'error',
          })
        }
      })
      /*
      
      */
    },
  },
}
</script>

<style>
.resim p {
  margin: 0 !important;
}
</style>
