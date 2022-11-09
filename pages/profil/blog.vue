<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Blog Yorumlarınız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Blog Yorumlarınız
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container mb-5" v-loading="load" style="min-height: 500px">
      <h4>Yorumlar</h4>
      <template v-for="c in comments">
        <div :key="c.comment" class="card p-3 my-1">
          <a
            :href="'/blog/' + c.blog_id + '-' + 'Yorum-yapılan-blog'"
            class="d-flex"
          >
            <div style="width: 200px">
              <el-image
                :src="blogs[c.blog_id]?.img"
                :alt="blogs[c.blog_id]?.title"
                style="height: 100px"
              >
                <template #placeholder>
                  <div class="image-slot">
                    Loading<span class="dot">...</span>
                  </div>
                </template>
              </el-image>
            </div>
            <div class="d-flex flex-column justify-content-between">
              <h5>{{ blogs[c.blog_id]?.title }}</h5>
              <p class="text-warning">{{ dateTimeParser(c.added_date) }}</p>
              <p>{{ c.comment }}</p>
            </div>
          </a>
          <div class="w-100 d-flex justify-content-between">
            <div>
              <el-button type="success" @click="duzenle(c)">Düzenle</el-button>
              <el-popconfirm
                title="Silmek istediğinize emin misiniz?"
                confirm-button-text="Evet"
                cancel-button-text="Vazgeç"
                @confirm="sil(c)"
              >
                <template #reference>
                  <el-button type="danger">Sil</el-button>
                </template>
              </el-popconfirm>
            </div>
            <div>
              <el-tag
                class="mx-1"
                size="large"
                type="success"
                v-if="c.status == 1"
                >Onaylı</el-tag
              >
              <el-tag class="mx-1" size="large" type="danger" v-else
                >Onay Bekliyor</el-tag
              >
            </div>
          </div>
        </div>
      </template>
      <el-empty
        description="Buralar boş gibi görünüyor"
        v-if="comments?.length <= 0"
      />
    </div>
    <el-dialog :visible.sync="dialogState" title="Düzenle" width="50%">
      <el-input
        v-model="islemData.comment"
        :rows="4"
        type="textarea"
        placeholder="Yorumunu<"
      ></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogState = false">Vazgeç</el-button>
          <el-button type="primary" @click="duzenleOnay()">Kaydet</el-button>
        </span>
      </template>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'

export default {
  data() {
    return {
      comments: [],
      islemData: {},
      dialogState: false,
      load: false,
      blogs: {},
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    blogs: {},
  },
  methods: {
    getData() {
      this.load = true
      const params = {
        filter: {
          own_id: this.$auth.$storage.getUniversal('profile').id,
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/BlogComment', params)
        .then(async (response) => {
          this.comments = response.data
          for (const val of Object.values(this.comments)) {
            await this.getBlog(val.blog_id)
          }
        })
        .finally(() => {
          this.load = false
        })
    },
    duzenle(c) {
      this.dialogState = true
      this.islemData = c
    },
    duzenleOnay() {
      this.load = true
      this.$axios
        .$post(
          this.$store.state.fungi +
            '/BlogComment/' +
            this.islemData.id +
            '/update',
          {
            comment: this.islemData.comment,
            status: '0',
          }
        )
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: 'Yorum başarıyla onaya gönderildi.',
              type: 'success',
            })
            this.dialogState = false
            this.getData()
          }
        })
        .finally(() => {
          this.load = false
        })
    },
    sil(c) {
      this.$axios
        .$post(this.$store.state.fungi + '/BlogComment/' + c.id + '/delete')
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: 'Yorum başarıyla silindi',
              type: 'success',
            })
            this.dialogState = false
            this.getData()
          }
        })
    },
    async getBlog(id) {
      this.load = true

      return await this.$axios
        .$post(this.$store.state.fungi + '/Blog/' + id + '/get')
        .then((response) => {
          this.blogs[id] = response.data
          for (const [key, val] of Object.entries(this.blogs)) {
            this.blogs[key]['img'] = this.$store.state.img_base + val.image
          }
        })
        .finally(() => {
          this.load = false
        })
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
