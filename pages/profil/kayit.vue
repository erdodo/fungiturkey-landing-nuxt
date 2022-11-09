<template>
  <div>
    <Header></Header>
    <section class="single-page-header mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Etkinlik Kayıtlarınız</h2>
            <ol class="breadcrumb header-bradcrumb justify-content-center">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-white">Ana Sayfa</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Etkinlik Kayıtlarınız
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div class="container" v-loading="load" style="min-height: 550px">
      <div class="row">
        <template v-for="a in activityRecords">
          <div :key="a.id" class="col-12">
            <div class="p-2 mt-2 card">
              <div class="row">
                <div class="col-12 col-lg-7">
                  <div
                    class="d-flex align-items-center h-100 flex-wrap justify-content-start justify-content-md-left"
                  >
                    <el-image
                      :src="activities[a.activity_id]?.img"
                      style="height: 130px"
                      :alt="activities[a.activity_id]?.title"
                    >
                      <template #placeholder>
                        <div class="image-slot">
                          Yükleniyor<span class="dot">...</span>
                        </div>
                      </template>
                    </el-image>
                    <div class="mx-1">
                      <h5 class="text-wrap">
                        {{ activities[a.activity_id]?.title }}
                      </h5>
                      <p class="my-0">
                        Koordinatör:
                        <a class="text-warning ml-2">
                          {{ activities[a.activity_id]?.director }}
                        </a>
                      </p>
                      <p class="text-nowrap">
                        Toplam Ücret:
                        <a class="text-warning ml-2">
                          <oda
                            class="text-dark"
                            v-if="
                              activities[a.activity_id]?.room_status == 1 &&
                              a.room_id != null
                            "
                          >
                            {{
                              activities[a.activity_id]?.price * a.people_count
                            }}
                            TL (Etkinlik) +
                            {{ odalar[a.room_id]?.['price'] }} TL (Oda) <br />
                            <span class="text-warning"
                              >Genel Toplam:
                              {{
                                parseFloat(
                                  activities[a.activity_id]?.price *
                                    a.people_count
                                ) + parseFloat(odalar[a.room_id]?.['price'])
                              }}TL
                            </span>
                          </oda>
                          <cadir
                            v-else-if="
                              activities[a.activity_id]?.room_status == 1 &&
                              a.room_id == null
                            "
                          >
                            {{
                              activities[a.activity_id]?.cadir_fiyat *
                              a.people_count
                            }}
                            TL
                          </cadir>
                          <div v-else>
                            {{
                              activities[a.activity_id]?.price * a.people_count
                            }}
                            TL
                          </div>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-5">
                  <div class="d-flex flex-column text-center text-md-left">
                    <h3 class="mt-3">{{ a.name }} {{ a.surname }}</h3>
                    <h5>
                      Bilet sayısı:
                      <a class="text-warning ml-2">
                        {{ a.people_count }} Kişi</a
                      >
                    </h5>
                    <p>
                      Kayıt tarihi:
                      <a class="text-warning">
                        {{ dateTimeParser(a.added_date) }}</a
                      >
                    </p>
                    <div class="w-100 mb-2">
                      <div v-if="a.status == 1 && a.price_status != 1">
                        IBAN:
                        <a class="text-dark">
                          {{ activities[a.activity_id].iban }}</a
                        >
                      </div>
                      <div
                        v-if="a.price_status == 1"
                        v-html="activities[a.activity_id].location_url"
                      ></div>
                    </div>
                    <div class="d-flex">
                      <el-button
                        size="small"
                        type="primary"
                        v-if="
                          a.price_status != 1 &&
                          (activities[a.activity_id]?.room_status == 0 ||
                            activities[a.activity_id]?.room_status == null)
                        "
                        @click=";(record = a), (editStatus = true)"
                        >Düzenle</el-button
                      >
                      <el-button
                        type="default"
                        size="small"
                        v-if="
                          activities[a.activity_id]?.room_status == 1 &&
                          a.room_id != null
                        "
                        @click=";(room = a.room_id), (roomStatus = true)"
                        >Oda Detayları</el-button
                      >
                      <el-tag
                        v-if="
                          activities[a.activity_id]?.room_status == 1 &&
                          a.room_id == null
                        "
                        class="mx-1"
                        size="large"
                        type="info"
                        >Çadır</el-tag
                      >
                      <el-tag
                        class="mx-1"
                        size="large"
                        type="success"
                        v-if="a.price_status == 1"
                        >Ödeme alındı</el-tag
                      >
                      <el-tag class="mx-1" size="large" type="danger" v-else
                        >Ödeme alınmadı</el-tag
                      >
                      <div>
                        <el-tag
                          class="mx-1"
                          size="large"
                          type="success"
                          v-if="a.status == 1"
                          >Onaylı</el-tag
                        >
                        <el-tag class="mx-1" size="large" type="danger" v-else
                          >Onay Bekliyor</el-tag
                        >
                      </div>

                      <el-popconfirm
                        confirm-button-text="Evet"
                        cancel-button-text="Hayır"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="Silmek istediğinize emin misiniz?"
                        @confirm="kayitSil(a)"
                        @cancel="cancelEvent"
                        v-if="a.price_status != 1"
                      >
                        <template #reference>
                          <el-button size="small" type="danger">Sil</el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-empty
          class="col-12"
          description="Buralar boş gibi görünüyor"
          v-if="activityRecords?.length <= 0"
        />
      </div>
    </div>
    <div>
      <room
        :dialogVisible="roomStatus"
        @state="roomStatus = $event"
        :room="room"
      ></room>
      <activity-record-edit
        :visible="editStatus"
        @visible="editStatus = $event"
        :activity="activities[record.activity_id]"
      />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import dateTimeParser from '@/hooks/dateTimeParser'

export default {
  data() {
    return {
      activityRecords: [],
      activities: {},
      editStatus: false,
      roomStatus: false,
      room: null,
      odalar: {},
      record: {},
      load: false,
      activityRecordsCount: {},
    }
  },
  mounted() {
    this.getData()
  },
  computed: {},
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
        .$post(this.$store.state.fungi + '/ActivityRecord', params)
        .then(async (response) => {
          this.activityRecords = response.data
          for (const val of Object.values(this.activityRecords)) {
            if (this.activityRecordsCount[val.activity_id] == undefined) {
              this.activityRecordsCount[val.activity_id] = 0
            }
            if (val.room_id != null) {
              await this.getRoom(val.room_id)
            }
            await this.getActivity(val.activity_id)
            await this.getLimit(val.activity_id)
          }
        })
        .finally(() => {
          this.load = false
        })
    },
    async getActivity(id) {
      if (this.activities[id] == undefined) {
        this.load = true
        return await this.$axios
          .$post(this.$store.state.fungi + '/Activity/' + id + '/get')
          .then((response) => {
            this.activities[id] = response.data
            for (const [key, val] of Object.entries(this.activities)) {
              this.activities[key]['img'] =
                this.$store.state.img_base + val.image
            }

            console.log(this.activities)
          })
          .finally(() => {
            this.load = false
          })
      }
    },
    async getLimit(id) {
      const params = {
        filter: {
          activity_id: id,
          status: '1',
        },
      }
      return await this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params)
        .then((response) => {
          let activityRecords = response.data
          this.activityRecordsCount[id] = 0
          for (const val of Object.values(activityRecords)) {
            console.log(val)

            this.activityRecordsCount[val.activity_id] =
              parseFloat(this.activityRecordsCount[val.activity_id]) +
              parseFloat(val.people_count)
          }
          this.load = false
        })
    },
    async kayitSil(val) {
      console.log(this.activities[val.activity_id])
      if (this.activities[val.activity_id].room_status == 1) {
        const params = {
          rent_status: 0,
        }
        return await this.$axios
          .$post(
            this.$store.state.fungi +
              '/ActivityRoom/' +
              val.room_id +
              '/update',
            params
          )
          .finally(() => {
            this.load = false
          })
      }
      await this.$axios
        .$post(
          this.$store.state.fungi + '/ActivityRecord/' + val.id + '/delete'
        )
        .then((res) => {
          if (res.status == 'success') {
            this.$notify({
              title: 'Başarılı',
              message: 'Kayıt başarıyla silindi',
              type: 'success',
            })
          }
        })
        .finally(() => {
          this.getData()
          this.load = false
        })
    },
    async getRoom(id) {
      this.load = true

      await this.$axios
        .$post(this.$store.state.fungi + '/ActivityRoom/' + id + '/get')
        .then((res) => {
          this.odalar[id] = res.data

          this.load = false
        })
    },
    dateTimeParser,
  },
}
</script>

<style>
.image-card {
  height: 200px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
