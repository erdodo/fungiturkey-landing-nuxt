<template>
  <header class="fixed-top head">
    <div class="px-5" v-if="desktop || true">
      <!-- main nav -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center justify-content-center d-flex"
        style="border-bottom: none"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-menu-item :index="'/'" class="border-bottom-0">
          <a href="/">
            <img src="@/static/logo.png" width="130" class="m-2" alt=""
          /></a>
        </el-menu-item>
        <div
          v-if="this.fungi == 'fungitu2_test_fungiturkey'"
          class="text-danger"
        >
          <h1>TEST</h1>
        </div>
        <el-menu-item class=""></el-menu-item>
        <el-menu-item index="/">Anasayfa</el-menu-item>
        <el-menu-item :index="m.table_name" v-for="m in menu" :key="m"
          ><i :class="m.icon" class="me-1"></i>
          {{ m.display_name }}</el-menu-item
        >

        <el-sub-menu v-if="getToken">
          <template #title>Profil</template>
          <el-menu-item index="/profil"
            ><span class="text-dark">Bilgilerim</span></el-menu-item
          >
          <el-menu-item index="/profil/blog"
            ><span class="text-dark">Blog Yorumlarım</span></el-menu-item
          >
          <el-menu-item index="/profil/etkinlik"
            ><span class="text-dark">Etkinlik Yorumlarım</span></el-menu-item
          >
          <el-menu-item index="/profil/kayit"
            ><span class="text-dark">Kayıtlarım</span></el-menu-item
          >
          <el-menu-item :index="$route.path" @click="cikis()"
            ><span class="text-dark">Çıkış</span></el-menu-item
          >
        </el-sub-menu>
        <el-menu-item v-else index="/uye-ol" @click="uyeol()"
          >Üye Ol</el-menu-item
        >
      </el-menu>
      <!-- /main nav -->
    </div>

    <register :registerState="registerState"></register>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      desktop: true,
      token: '',
      registerState: 0,
      menu: {},
    }
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  mounted() {
    this.getMenu()
    this.desktop = window.innerWidth > 1365 ? true : false
    window.addEventListener('resize', () => {
      this.desktop = window.innerWidth > 1365 ? true : false
    })
  },
  methods: {
    uyeol() {
      this.registerState++
    },
    cikis() {
      window.location.href = '/'
    },
    getMenu() {
      const params = {
        filter: {
          status: '1',
        },
        order: {
          name: 'id',
          type: 'DESC',
        },
      }
      if (this.$auth.$storage.getUniversal('menu') != undefined) {
        this.menu = this.$auth.$storage.getUniversal('menu')
      } else {
        this.$axios
          .$post(this.$store.state.fungi + '/Menu', params)
          .then((res) => {
            this.menu = res.data
            this.$auth.$storage.setUniversal('menu', this.menu)
          })
      }

      /*.catch(() => {
          this.$store.commit("setToken", "");
          window.location.href = "/";
        });*/
    },
  },
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.head {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.01));
}
@media screen and (max-width: 768px) {
  .mobil-header {
    background: rgba(0, 0, 0, 1);
  }
}
.el-menu-item,
.el-sub-menu__title {
  font-size: 15px !important;
  padding-right: 10px;
  padding-left: 10px;
}
.el-menu-item:hover {
  background: transparent !important;
}
</style>
