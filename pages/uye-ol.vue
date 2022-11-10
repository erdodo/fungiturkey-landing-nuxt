<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Üye Ol</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Üye Ol</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!--Start Contact Us
	=========================================== -->
    <div class="container" style="min-height: 600px">
      <div class="row">
        <div class="col-12 col-md-6" v-for="r in registerData" :key="r.name">
          <label class="mt-0 mb-0">{{ r.display }} :</label>

          <el-input
            v-if="r.name == 'phone'"
            v-mask="'+90(###) ### ## ##'"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input
            v-else-if="r.name == 'password' || r.name == 'password_2'"
            type="password"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input
            v-else-if="r.name == 'email'"
            @keyup="validateEmail()"
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <el-input
            v-else
            v-model="params[r.name]"
            size="large"
            :placeholder="r.display"
          ></el-input>
          <label class="text-danger"> {{ msg[r.name] }} </label>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <div class="">
              Üyeliğiniz var mı?
              <el-button type="success" class="w-100" @click="loginState = true"
                >Giriş Yap</el-button
              >
            </div>

            <div>
              <el-button type="primary" @click="register()" class="w-100"
                >Üye ol</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <login :loginState="loginState" @loginState="loginState = $event"></login>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Hoş Geldiniz - FungiTurkey',
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
      registerData: {},
      params: {},
      msg: {},
      load: false,
      loginState: false,
    }
  },
  mounted() {
    this.getCreateData()
  },
  methods: {
    register() {
      this.load = true
      let control = 0
      for (const clm of Object.keys(this.registerData)) {
        console.log(this.params[clm] == undefined)
        if (
          this.params[clm] == '' ||
          this.params[clm] == null ||
          this.params[clm] == undefined
        ) {
          control++
        }
      }
      console.log(control)
      if (control > 0) {
        this.$notify({
          title: 'Dikkat',
          message: 'Boş alanları lütfen doldurunuz',
          type: 'info',
        })
      } else if (this.params['password'] != this.params['password_2']) {
        this.$notify({
          title: 'Dikkat',
          message: 'Girdiğiniz şifreler uyumsuz',
          type: 'warning',
        })
      } else {
        this.$axios
          .$post('/register', this.params)
          .then((res) => {
            if (res.status == 'success') {
              this.$notify({
                title: 'Başarılı',
                message: res.message,
                type: 'success',
              })
              this.state = false
              this.loginState = true
            } else {
              this.$notify({
                title: 'Başarılı',
                message: res.message,
                type: 'error',
              })
            }
          })
          .finally(() => {
            this.load = false
          })
      }
    },
    getCreateData() {
      this.load = true
      this.registerData = {
        name: {
          name: 'name',
          display: 'İsim',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        surname: {
          name: 'surname',
          display: 'Soyisim',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        phone: {
          name: 'phone',
          display: 'Telefon',
          type: 'varchar',
          length: '30',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        email: {
          name: 'email',
          display: 'Eposta',
          type: 'varchar',
          length: '100',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
        password: {
          name: 'password',
          display: 'Şifre',
          type: 'varchar',
          length: '100',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
        password_2: {
          name: 'password_2',
          display: 'Şifre Kontrol',
          type: 'varchar',
          length: '100',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
        city: {
          name: 'city',
          display: 'Şehir',
          type: 'varchar',
          length: '50',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        job: {
          name: 'job',
          display: 'Meslek',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        about: {
          name: 'about',
          display: 'Hakkınızda',
          type: 'text',
          length: '65535',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        instagram: {
          name: 'instagram',
          display: 'Instagram',
          type: 'varchar',
          length: '200',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
      }
    },
    validateEmail() {
      if (
        !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.params.email
        )
      ) {
        this.msg['email'] = 'Epostanızı kontrol ediniz.'
      } else {
        this.msg['email'] = ''
      }
    },
  },
  watch: {
    registerState() {
      this.state = true
      this.getCreateData()
    },
  },
}
</script>

<style></style>
