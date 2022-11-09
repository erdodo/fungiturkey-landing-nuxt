<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Takımımız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Takımımız
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 500px">
      <div class="row">
        <template v-for="a in team">
          <div :key="a.id" class="col-12 col-sm-6 col-md-4 p-2">
            <div class="border-right border-left">
              <a
                class="p-2 text-center team-card"
                :href="a.WebSite"
                target="_blank"
              >
                <el-image
                  :src="a?.image"
                  class="w-100 rounded team-image"
                  :alt="a?.name + '' + a.surname"
                  fit="cover"
                >
                  <div slot="placeholder" class="image-slot">
                    Yükleniyor<span class="dot">...</span>
                  </div>
                </el-image>
                <div class="">
                  <h4 class="mt-3 text-dark">{{ a.name }} {{ a.surname }}</h4>
                  <h4 class="mt-3 text-dark">{{ a.job }}</h4>
                  <p class="mx-1 ellipsis-3" v-html="a.content"></p>
                  <el-button @click="detay(a)">Devamı...</el-button>
                </div>
              </a>
            </div>
          </div>
        </template>
        <div class="col-12 mt-4">
          <div class="w-100 d-flex justify-content-center">
            <el-pagination
              :page-size="limit"
              pager-count="4"
              @current-change="setPage($event)"
              layout="prev, pager, next"
              :total="count"
            />
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Detaylar"
      top="2vh"
      width="400px"
    >
      <el-image
        :src="detaylar.image"
        :alt="detaylar.name + ' ' + detaylar.surname"
      >
        <template #placeholder>
          <div class="image-slot">Yükleniyor<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="w-100 text-center mt-4">
        <h4>{{ detaylar.name }} {{ detaylar.surname }}</h4>
        <h5>{{ detaylar.job }}</h5>
      </div>
      <p v-html="detaylar.content"></p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Kapat</el-button>
        </span>
      </template>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'
export default {
  metaInfo: {
    title: 'Takımımız',
    titleTemplate: 'Mantar Takımımız',
    htmlAttrs: {
      lang: 'tr',
      amp: true,
    },
  },
  data() {
    return {
      team: [],
      load: true,
      detaylar: {},
      dialogVisible: false,
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
      this.load = true
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
      this.team = []
      this.$axios
        .$post(this.$store.state.fungi + '/Team', params)
        .then((response) => {
          for (const val of Object.values(response.data)) {
            val['image'] = this.$store.state.img_base + val.image
            this.team.push(val)
          }
          this.load = false
          this.count = response.count
        })
    },
    setPage(e) {
      this.page = e
      this.getData()
    },
    detay(a) {
      this.dialogVisible = true
      this.detaylar = a
    },
    dateTimeParser,
  },
}
</script>

<style>
.team-image {
  height: 230px;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}
</style>
