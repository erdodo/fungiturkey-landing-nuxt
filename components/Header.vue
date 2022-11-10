<template>
  <header class="fixed-top head">
    <div class="px-5 pt-1 d-flex justify-content-between">
      <!-- main nav -->
      <a href="/" class="">
        <img src="@/static/logo.png" width="130" class="m-2" alt=""
      /></a>
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center justify-content-center d-none d-lg-flex"
        style="border-bottom: none"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <div
          v-show="this.$store.state.fungi == 'fungitu2_test_fungiturkey'"
          class="text-danger"
        >
          <h1>TEST</h1>
        </div>

        <el-menu-item index="/">Anasayfa</el-menu-item>
        <el-menu-item
          :index="m.table_name"
          v-for="m in menu"
          :key="m.table_name"
          ><i :class="m.icon" class="me-1"></i>
          {{ m.display_name }}</el-menu-item
        >

        <el-submenu
          index="/profil"
          class="profil"
          v-show="this.$auth.$storage.getUniversal('token')"
        >
          <template slot="title">Profil</template>

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
        </el-submenu>
        <el-menu-item
          v-show="!this.$auth.$storage.getUniversal('token')"
          index="/uye-ol"
          @click="uyeol()"
          >Üye Ol</el-menu-item
        >
      </el-menu>
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo align-items-center justify-content-center d-flex d-lg-none menu-mobil"
        style="border-bottom: none"
        text-color="black"
        active-text-color="#ffd04b"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-submenu>
          <template slot="title">
            <i class="bi bi-list h2 text-white"></i>
          </template>
          <el-menu-item index="/">Anasayfa</el-menu-item>
          <el-menu-item
            :index="m.table_name"
            v-for="m in menu"
            :key="m.table_name"
            ><i :class="m.icon" class="me-1"></i>
            {{ m.display_name }}</el-menu-item
          >

          <el-submenu
            index="/profil"
            class="profil"
            v-show="this.$auth.$storage.getUniversal('token')"
          >
            <template slot="title"
              ><span class="text-dark">Profil</span></template
            >

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
          </el-submenu>
          <el-menu-item
            v-show="this.$auth.$storage.getUniversal('token')"
            index="/uye-ol"
            @click="uyeol()"
            >Üye Ol</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <!-- /main nav -->
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      desktop: true,
      token: '',
      registerState: 0,
      menu: {},
    }
  },
  computed: {},
  mounted() {
    this.getMenu()
    this.desktop = window.innerWidth > 1365 ? true : false
    window.addEventListener('resize', () => {
      this.desktop = window.innerWidth > 1365 ? true : false
    })
  },
  created() {
    this.$axios.defaults.headers.common['token'] =
      this.$auth.$storage.getUniversal('token')
  },
  methods: {
    uyeol() {
      this.registerState++
    },
    cikis() {
      this.$auth.$storage.setUniversal('token', '')
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
  background-image: linear-gradient(
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.1)
  ) !important;
  height: auto;
}
@media screen and (max-width: 768px) {
  .mobil-header {
    background: rgba(0, 0, 0, 1);
  }
}
.el-menu-item,
.el-submenu__title {
  font-size: 17px !important;
  padding-right: 10px;
  padding-left: 10px;
  color: white;
}
.profil .el-submenu__title {
  color: white !important;
  border-bottom: none !important;
}
.el-menu-item:hover,
.el-submenu__title:hover {
  background: rgb(255, 208, 75, 0.1) !important;
  border-radius: 4px;
}
.el-menu--horizontal {
  background-color: white;
}
.menu-mobil {
  background-color: transparent !important;
}
.menu-mobil .profil .el-submenu__title {
  color: black !important;
  border-bottom: none !important;
}
</style>
