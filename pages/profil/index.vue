<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Profil</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Profil</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <div class="container" v-loading="load" style="min-height: 550px">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7">
          <div v-for="(c, name) in columns" :key="name">
            <label class="mt-3" v-if="name != 'password'"
              >{{ c.display }}:
            </label>
            <el-input
              v-if="c.name == 'phone'"
              v-model="params[name]"
              v-mask="'+90(###) ### ## ##'"
              type="text"
              :ref="name"
              :placeholder="c.display"
            />
            <template v-else-if="c.name == 'password'"></template>
            <div v-else-if="c.type == 'file'" class="row">
              <div
                v-if="params[name]"
                class="position-relative col-12 col-md-6"
              >
                <el-button
                  type="danger"
                  style=""
                  class="image-remover"
                  circle
                  @click="imageRemove(name)"
                >
                  X
                </el-button>
                <img
                  :src="img_base + params[name]"
                  class="rounded"
                  style="max-height: 250px; max-width: 100%"
                  alt=""
                />
              </div>
              <div
                class="mt-2 mt-md-0 col-12 text-center"
                :class="params[name] ? 'col-md-6' : 'col-md-12'"
              >
                <input type="file" :ref="name" :placeholder="c.display" />
              </div>
            </div>

            <el-input
              v-else-if="c.type == 'varchar'"
              v-model="params[name]"
              type="text"
              :ref="name"
              :placeholder="c.display"
            />
            <el-input
              v-else-if="c.type == 'int' || c.type == 'smallint'"
              type="number"
              v-model="params[name]"
              :ref="name"
              :placeholder="c.display"
            />

            <el-input
              v-else-if="c.type == 'text'"
              v-model="params[name]"
              :ref="name"
              :placeholder="c.display"
            />
            <div v-else-if="c.type == 'tinyint' || c.type == 'bit'">
              <el-switch v-model="params[name]" :ref="name" />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <el-button type="warning" @click="passChangeState = true"
              >Şifre değiştir</el-button
            >
            <el-button type="primary" @click="save()">Kaydet</el-button>
          </div>
        </div>
      </div>
    </div>
    <pass-change
      :dialogVisible="passChangeState"
      @success="passChangeState = false"
    />
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: {},
      params: {},
      msg: {},
      passChangeState: false,
      load: false,
      img_base: this.$store.state.img_base,
    }
  },
  computed: {},
  mounted() {
    this.getData()
    this.$axios.$post('/token_control').then((res) => {
      if (res.status == 'error') {
        this.$auth.$storage.setUniversal('token', '')
        this.$auth.$storage.setUniversal('profile', '')
      }
    })
  },
  methods: {
    getData() {
      this.load = true
      let params = {
        filter: {
          token: this.$auth.$storage.getUniversal('token'),
        },
      }
      this.$axios
        .$post(
          this.$store.state.simple +
            '/users/' +
            this.$auth.$storage.getUniversal('profile').id +
            '/edit',
          params
        )
        .then((res) => {
          this.columns = res.columns
          this.params = res.data
          for (const clm of Object.values(this.columns)) {
            if (clm.type == 'tinyint' || clm.type == 'bit') {
              this.params[clm.name] =
                this.params[clm.name] == '1' ? true : false
            }
          }
        })
        .finally(() => {
          this.load = false
        })
    },
    save() {
      this.load = true
      const formData = new FormData()
      let form = false
      for (const [key, val] of Object.entries(this.columns)) {
        if (val.type == 'file') {
          if (this.$refs.image?.[0]?.files[0] != undefined) {
            formData.append(key, this.$refs.image?.[0]?.files[0])
            form = true
          } else {
            formData.append(
              key,
              this.params[key] == undefined ? '' : this.params[key]
            )
          }
        } else if (val.type == 'tinyint' || val.type == 'bit') {
          formData.append(
            key,
            this.params[key] == undefined ? '' : this.params[key] ? '1' : '0'
          )
        } else {
          formData.append(
            key,
            this.params[key] == undefined ? '' : this.params[key]
          )
        }
      }
      this.$axios
        .$post(
          this.$store.state.simple +
            '/users/' +
            this.$auth.$storage.getUniversal('profile').id +
            '/update',
          form == true ? formData : this.params
        )
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı!',
              message: 'Düzenleme işlemi başarıyla gerçekleşti.',
              type: 'success',
            })
            this.params = res.data
          }
        })
        .finally(() => {
          this.load = false
        })
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
    imageRemove(name) {
      this.params[name] = ''
    },
  },
}
</script>

<style>
.image-remover {
  padding-left: 10px !important;
  padding-right: 10px !important;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
