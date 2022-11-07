<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Blog</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 300px">
      <div class="row">
        <ul class="nav nav-tabs">
          <li class="nav-item" @click=";(kategori_id = undefined), getData()">
            <a
              class="nav-link cursor-pointer"
              :class="kategori_id == undefined ? 'active' : ''"
            >
              Tümü</a
            >
          </li>
          <li
            class="nav-item"
            v-for="ktg in blog_kategori"
            :key="ktg"
            @click=";(kategori_id = ktg.id), getData()"
          >
            <a
              class="nav-link cursor-pointer"
              :class="
                kategori_id == ktg.id && kategori_id != undefined
                  ? 'active'
                  : ''
              "
            >
              {{ ktg.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="row">
        <template v-for="a in blog">
          <div :key="a" class="col-12 col-sm-6 col-md-4 mt-2">
            <div class="p-2 text-center">
              <el-image :src="a?.image" class="w-100 rounded" :alt="a?.title">
                <div slot="placeholder" class="image-slot">
                  Yükleniyor<span class="dot">...</span>
                </div>
              </el-image>
              <h4 class="mt-3">{{ a.title }}</h4>
              <span class="text-info">
                {{ dateTimeParser(a.added_date) }}
              </span>
            </div>
            <router-link
              :to="'/blog-detay/' + a.id + '-' + a.title.replace(/ /g, '-')"
              class="w-100 btn btn-outline-warning"
              >Devamını Oku</router-link
            >
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
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'
export default {
  metaInfo: {
    title: 'Blog',
    titleTemplate: 'Blog',
    htmlAttrs: {
      lang: 'tr',
      amp: true,
    },
  },
  data() {
    return {
      blog: [],
      blog_kategori: [],
      kategori_id: undefined,
      load: true,
      count: 0,
      limit: 6,
      page: 1,
    }
  },
  mounted() {
    this.getData()
    this.getKategori()
  },
  methods: {
    getData() {
      this.load = true
      const params = {
        limit: this.limit,
        page: this.page,
        filter: {
          status: 1,
          category_id: this.kategori_id,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/Blog', params)
        .then((response) => {
          for (const val of Object.values(response.data)) {
            val['image'] = this.$store.state.img_base + val.image
            this.blog.push(val)
          }
          this.count = response.count
          this.load = false
        })
    },
    getKategori() {
      this.load = true
      const params = {
        limit: 200,
        page: 1,
        filter: {
          status: 1,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/BlogCategory', params)
        .then((response) => {
          this.blog_kategori = response.data
          this.load = false
        })
    },
    setPage(e) {
      this.page = e
      this.getData()
    },
    dateTimeParser,
  },
}
</script>

<style>
.image-card {
  height: 230px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
