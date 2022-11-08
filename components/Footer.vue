<template>
  <div>
    <div
      class="footer-abone py-2 mt-5 d-flex flex-column flex-md-row text-center justify-content-center align-content-center align-items-center align-items-md-baseline"
      v-if="
        $route.path != '/' &&
        this.$auth.$storage.getUniversal('token') &&
        getProfile?.bulletin_state == '0'
      "
    >
      Son etkinliklerden haberdan olmak ister misiniz
      <button class="ml-2 btn btn-outline-primary btn-sm" @click="aboneOl()">
        Abone Ol
      </button>
    </div>
    <div
      class="footer-bottom py-2 mt-1 d-flex flex-column flex-md-row text-center justify-content-center align-content-center align-items-center align-items-md-baseline"
      v-if="$route.path != '/'"
    >
      <h5 class="mr-2">
        &copy; Copyright {{ new Date().getFullYear() }}. Tüm hakları saklıdır.
      </h5>
      <h6 class="mr-3">
        Geliştirici
        <a
          href="https://www.linkedin.com/in/erdogan-yesil-7b7263b3/"
          target="_blank"
          >Erdoğan Yeşil</a
        >
      </h6>
      <div style="height: 40px"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {},
  methods: {
    aboneOl() {
      const params = {
        bulletin_state: '1',
      }
      axios
        .post(
          this.simple +
            '/users/' +
            this.$auth.$storage.getUniversal('profile').id +
            '/update',
          params
        )
        .then((res) => {
          if (res.data.status == 'success') {
            this.$store.commit('setProfile', JSON.stringify(res.data.data))
            this.$notify({
              title: 'Başarılı',
              message: 'Bültenimize başarıyla abone oldunuz.',
              type: 'success',
            })
          } else {
            this.$notify({
              title: 'Hata',
              message:
                'Bir hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz.',
              type: 'error',
            })
          }
        })
    },
  },
}
</script>

<style>
.footer-abone {
  background-color: rgba(0, 0, 0, 0.784);
  color: white;
}
</style>
