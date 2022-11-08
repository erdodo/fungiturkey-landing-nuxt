<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      v-loading="loading"
      title="Etkinlik Takvimi"
      fullscreen
      width="30%"
    >
      <span
        >*Etkinlik tarihlerimiz sizin için uygun değil mi? Etkinlik istediğiniz
        güne tıklayarak bize bildirebilirsiniz.</span
      >
      <el-calendar v-model="tarih">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="position-relative">
            <h5 class="mb-0">
              {{ new Date(date).getDate() }}
            </h5>
            <div v-for="e in events" :key="e" class="font-size:12px">
              <div
                v-if="
                  new Date(e.start).toDateString() ==
                  new Date(data.day).toDateString()
                "
                style="background-color: #ecf5ff"
                class="rounded ellipsis-2 p-1"
              >
                {{ e.title }}
              </div>
              <div
                v-if="
                  new Date(e.start).toDateString() >
                    new Date(data.day).toDateString() &&
                  new Date(e.end).toDateString() <
                    new Date(data.day).toDateString()
                "
                style="background-color: #ecf5ff"
                class="rounded ellipsis-2 p-1"
              >
                {{ e.title }}
              </div>
              <div
                v-if="
                  new Date(e.end).toDateString() ==
                  new Date(data.day).toDateString()
                "
                style="background-color: #ecf5ff"
                class="rounded ellipsis-2 p-1"
              >
                {{ e.title }}
              </div>
              <div
                v-if="
                  new Date(e.kayit).toDateString() ==
                  new Date(data.day).toDateString()
                "
                style="background-color: #fdf6ec"
                class="rounded ellipsis-2 p-1"
              >
                {{ e.title }}
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Kapat</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="activityFeedback"
      title="Etkinlik İsteği"
      width="300px"
    >
      {{
        new Date(this.tarih).toLocaleDateString('tr-TR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}
      <el-input
        v-model="message"
        :rows="4"
        type="textarea"
        class="mt-1"
        placeholder="Nasıl bir etkinlik talep ediyorsunuz?"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="activityFeedback = false">Vazgeç</el-button>
          <el-button type="primary" @click="newFeedback()">Gönder</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['state'],
  data() {
    return {
      dialogVisible: false,
      activity: {},
      count: 0,
      loading: true,
      activityFeedback: false,
      tarih: null,
      message: '',
      events: [],
    }
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  watch: {
    dialogVisible() {
      this.$emit('state', this.dialogVisible)
    },
    state() {
      this.dialogVisible = this.state
      console.log(this.state)
      if (this.state == true) {
        this.getData()
      }
    },
    tarih() {
      console.log(this.$auth.$storage.getUniversal('profile'))
      if (this.$auth.$storage.getUniversal('profile')?.id != undefined) {
        this.activityFeedback = true
      } else {
        this.$notify({
          title: 'Dikkat',
          message: 'Geri bildirim göndermek için giriş yapmalısınız!',
          type: 'info',
        })
      }
    },
  },
  methods: {
    getData() {
      this.loading = true
      const params = {
        page: 1,
        limit: 1000,
        filter: {
          status: '1',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/Activity', params)
        .then((response) => {
          this.activity = response.data
          this.count = response.count
          this.loading = false
          this.events = []
          for (const val of Object.values(this.activity)) {
            this.events.push({
              title: val.title,
              start: val.start_date,
              end: val.finish_date,
              kayit: val.last_record_date,
              url: '/etkinlik/' + val.id + '-' + val.title.replace(' ', '-'),
            })
          }
        })
    },
    newFeedback() {
      const params = {
        member_id: this.$auth.$storage.getUniversal('profile').id,
        name:
          this.$auth.$storage.getUniversal('profile').name +
          ' ' +
          this.$auth.$storage.getUniversal('profile').surname,
        phone: this.$auth.$storage.getUniversal('profile').phone,
        message: this.message,
        activity_date: this.tarih,
      }
      this.activityFeedback = false
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityFeedback/store', params)
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: 'Geri bildirim başarıyla gönderildi.',
              type: 'success',
            })
          }
        })
    },
  },
  components: {},
}
</script>

<style></style>
