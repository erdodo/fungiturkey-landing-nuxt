<template>
  <div class="etk-kayit">
    <el-dialog
      :visible.sync="dialogVisible"
      :fullscreen="odalar.length > 0"
      title="Kayıt Güncelleme"
      width="380px"
    >
      <div
        class="d-flex justify-content-between flex-column h-100"
        v-if="loading == false"
      >
        <test v-if="false">
          odalı:{{ oda_state }} etk lmt:{{ etk_limit }} etk count:{{
            etk_count
          }}
          oda sayi:{{ odalar?.length }} cadir_limit:{{
            cadir_limit
          }}
          cadir_count:{{ cadir_count }}
        </test>
        <div>
          <div
            v-if="oda_state == false && etk_limit > 0"
            class="w-100 d-flex flex-column align-items-center my-3"
          >
            <label for="">Etkinliğimize kaç kişi katılacaksınız?</label>
            <label v-if="etk_limit - etk_count < 4">
              Son
              <span class="text-danger">{{ etk_limit - etk_count }}</span>
              kişilik kotamız kalmıştır!</label
            >
            <el-input-number v-model="etk_count" :min="1" :max="etk_limit" />
          </div>
          <div v-if="oda_state == false && etk_limit <= 0">
            <h5>
              Maalesef kontenjanımız kalmadığını bildirmek zorundayız. <br />
              Sonraki etkinliklerde görüşmek üzere.
            </h5>
          </div>
          <label v-if="odalar?.length > 0"
            >Size uygun olan katılım şeklini seçebilirsiniz.</label
          >
          <div
            v-if="oda_state == true"
            class="d-flex flex-row align-items-center my-3 overflow-auto"
          >
            <el-card
              v-if="oda_state == true && cadir_limit > 0"
              style="height: 400px; overflow-y: auto; width: 280px"
              :style="
                odalar?.length <= 0
                  ? 'width: 100%  '
                  : 'width: 280px; min-width:280px;height: 600px;max-height: 70vh;'
              "
              class="mx-2"
            >
              <div class="w-100 d-flex flex-column align-items-center my-3">
                <el-image
                  alt="Mantar etkinliği"
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                >
                  <template #placeholder>
                    <div class="image-slot">
                      Yükleniyor<span class="dot">...</span>
                    </div>
                  </template>
                </el-image>
                <label class="h5 mt-2"
                  >Etkinliğimize konaklamasız kaç kişi katılmak
                  istiyorsunuz?</label
                >
                <el-input-number
                  v-model="cadir_count"
                  :min="0"
                  :max="cadir_limit"
                />
                <label v-if="cadir_limit - cadir_count < 4">
                  Son
                  <span class="text-danger">{{
                    cadir_limit - cadir_count
                  }}</span>
                  kişilik kotamız kalmıştır!</label
                >
                <label
                  >Konaklamasız kişi başı fiyatı {{ activity.cadir_fiyat }}₺
                  'dir.
                </label>
              </div>
            </el-card>
            <el-card
              v-else-if="oda_state == true && cadir_limit <= 0"
              style="
                width: 280px;
                min-width: 280px;
                height: 400px;
                overflow-y: auto;
              "
              class="mr-2"
            >
              <h5>
                Maalesef çadır kontenjanımız kalmadığını bildirmek zorundayız.
              </h5>
            </el-card>
            <el-card
              v-for="oda in odalar"
              :key="oda.id"
              style="
                width: 280px;
                min-width: 280px;
                height: 600px;
                max-height: 70vh;
                overflow-y: auto;
              "
              class="mr-2"
              :class="secilen.find((e) => e == oda.id) ? 'border-primary' : ''"
            >
              <el-image :src="oda.img" alt="Mantar etkinliği">
                <template #placeholder>
                  <div class="image-slot">
                    Yükleniyor<span class="dot">...</span>
                  </div>
                </template>
              </el-image>
              <h4>{{ oda.room_name }} - {{ oda.room_no }}</h4>
              <span> Ücret: {{ oda.price }}₺ </span>
              <br />
              <span> {{ oda.quota }} Kişilik </span>
              <hr />

              <label class="mb-1">Kaç kişi misafir olacaksınız?</label>
              <div class="d-flex justify-content-between w-100">
                <input
                  type="number"
                  class="form-control me-2"
                  v-model="oda_count[oda.id]"
                  :min="1"
                  :max="oda.quota"
                />
                <el-button
                  type="danger"
                  @click="odaSec(oda.id)"
                  v-if="secilen.find((e) => e == oda.id)"
                  >İptal</el-button
                >
                <el-button type="primary" @click="odaSec(oda.id)" v-else
                  >Seç</el-button
                >
              </div>
              <label
                class="text-primary mt-1 mb-0"
                v-if="secilen.find((e) => e == oda.id)"
                >Kiraladınız</label
              >
              <hr />
              <p v-html="oda.content"></p>
            </el-card>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center">
            <el-switch v-model="sozlesme_state" size="large" />
            <span class="ml-3"
              >Lütfen
              <a
                class="text-primary cursor-pointer"
                @click="sozlesme_state = true"
                >sözleşmeyi</a
              >
              kabul ediniz</span
            >
          </div>
          <div class="d-flex justify-content-end">
            <el-button @click="dialogVisible = false">Vazgeç</el-button>
            <el-button type="primary" @click="kayit()">Güncelle</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <sozlesme :dialogVisible="sozlesme_state"></sozlesme>
  </div>
</template>
<script>
export default {
  props: ['visible', 'activity'],
  data() {
    return {
      dialogVisible: this.visible,
      sozlesme_state: false,
      oda_state: false,
      etk_limit: 0,
      etk_count: 0,
      cadir_limit: 0,
      cadir_count: 0,
      odalar: [],
      oda_count: {},
      secilen: [],
      odalarim: [],
      my_records: [],
      oda_records: {},
      islem_count: 0,
      islem_success: 0,
      loading: true,
    }
  },
  watch: {
    dialogVisible() {
      this.$emit('visible', this.dialogVisible)
    },
    visible() {
      this.dialogVisible = this.visible
      if (this.visible == true) {
        this.odalar = []
        this.secilen = []
        this.odalarim = []
        this.my_records = []
        this.loading = true
        if (this.activity.room_status == 1) {
          this.oda_state = true

          this.getCadirRecords()
          this.getOdaRecords()
        } else {
          this.getEtkinlikRecords()
        }
      }
    },
    activity() {
      this.odalar = []
      this.secilen = []
      this.odalarim = []
      this.my_records = []
      this.loading = true
      if (this.activity.room_status == 1) {
        this.oda_state = true

        this.getCadirRecords()
        this.getOdaRecords()
      } else {
        this.getEtkinlikRecords()
      }
    },
    islem_success(val) {
      if (val == this.islem_count) {
        window.location.reload()
      }
    },
    cadir_count() {
      this.limitReturn()
    },
    etk_count() {
      this.limitReturn()
    },
    odalarim(v) {
      this.limitReturn()
    },
    secilen(v) {},
    my_records(v) {},
  },
  methods: {
    limitReturn() {
      let state =
        this.etk_count > 0 || this.cadir_count > 0 || this.odalarim.length > 0

      this.$emit('countState', state)
    },
    getEtkinlikRecords() {
      const params = {
        filter: {
          activity_id: this.activity.id,
          room_id: null,
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params)
        .then((res) => {
          let limit = 0
          for (const val of Object.values(res.data)) {
            limit += parseFloat(val.people_count)
          }
          this.etk_limit = parseInt(this.activity.quota) - limit
        })
      const params1 = {
        filter: {
          own_id: this.$auth.$storage.getUniversal('profile')?.id,
          activity_id: this.activity.id,
          room_id: null,
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params1)
        .then((res) => {
          let limit = 0
          for (const val of Object.values(res.data)) {
            limit += parseFloat(val.people_count)
            this.my_records.push(val)

            if (val.status == '1') {
              this.etk_limit += parseFloat(val.people_count)
            }
          }

          this.etk_count = limit
          this.etk_limit += limit
          this.loading = false
        })
    },
    getCadirRecords() {
      const params = {
        filter: {
          activity_id: this.activity.id,
          room_id: null,
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params)
        .then((res) => {
          let limit = 0
          for (const val of Object.values(res.data)) {
            limit += parseFloat(val.people_count)
          }
          this.cadir_limit = parseInt(this.activity.cadir_kota) - limit
        })
      const params1 = {
        filter: {
          own_id: this.$auth.$storage.getUniversal('profile').id,
          activity_id: this.activity.id,
          room_id: null,
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRecord', params1)
        .then((res) => {
          let limit = 0
          for (const val of Object.values(res.data)) {
            limit += parseFloat(val.people_count)
            this.my_records.push(val)
            if (val.status == '1') {
              this.cadir_limit += parseFloat(val.people_count)
            }
          }
          this.cadir_count = limit
          this.cadir_limit += limit
        })
    },
    getOdaRecords() {
      const params = {
        filter: {
          rent_status: '0',
          activity_id: this.activity.id,
          status: '1',
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRoom', params)
        .then((res) => {
          for (const val of Object.values(res.data)) {
            this.odalar.push(val)

            this.oda_count[val.id] = 0
          }
          for (const [key, val] of Object.entries(this.odalar)) {
            this.odalar[key]['img'] = this.$store.state.img_base + val.image
          }
        })
      const params1 = {
        filter: {
          member_id: this.$auth.$storage.getUniversal('profile').id,
          activity_id: this.activity.id,
        },
      }
      this.$axios
        .$post(this.$store.state.fungi + '/ActivityRoom', params1)
        .then((res) => {
          for (const val of Object.values(res.data)) {
            this.odalar.push(val)
            this.secilen.push(val.id)
            this.odalarim.push(val.id)
            this.my_records.push(val)
          }
          for (const [key, val] of Object.entries(this.odalar)) {
            this.odalar[key]['img'] = this.$store.state.img_base + val.image
          }

          for (const odam of Object.values(this.odalarim)) {
            if (odam > 0) {
              const params3 = {
                filter: {
                  room_id: odam,
                },
              }
              this.$axios
                .$post(this.$store.state.fungi + '/ActivityRecord', params3)
                .then((res) => {
                  
                  for (const val of Object.values(res.data)) {
                    this.oda_records[odam] = val
                    this.oda_count[odam] = parseInt(val.people_count)
                  }
                  
                })
            }
          }
          this.loading = false
        })
    },
    odaSec(id) {
      if (this.secilen.find((e) => e == id)) {
        //delete this.secilen[this.secilen.indexOf(id)]
        this.secilen.splice(this.secilen.indexOf(id), 1)
      } else {
        this.secilen.push(id)
      }
    },
    kayit() {
      if (this.sozlesme_state == true) {
        for (const record of Object.values(this.my_records)) {
          if (this.oda_state == false) {
            const params = {
              people_count: this.etk_count,
              room_id: null,
              status: '0',
            }
            this.$axios
              .$post(
                this.$store.state.fungi +
                  '/ActivityRecord/' +
                  record.id +
                  '/update',
                params
              )
              .then((res) => {
                if (res.status == 'success') {
                  this.$notify({
                    title: 'Başarılı',
                    message: 'Kayıt başarıyla güncellendi.',
                    type: 'success',
                  })
                  window.location.reload()
                }
              })
          } else if (record.room_id == null) {
            this.islem_count += 1
            if (this.cadir_count == 0) {
              this.$axios
                .$post(
                  this.$store.state.fungi +
                    '/ActivityRecord/' +
                    record.id +
                    '/delete'
                )
                .then((res) => {
                  if (res.status == 'success') {
                    this.islem_success += 1
                    this.$notify({
                      title: 'Başarılı',
                      message: 'Kayıt başarıyla güncellendi.',
                      type: 'success',
                    })
                  }
                })
            } else {
              const params = {
                people_count: this.cadir_count,
                room_id: null,
                status: '0',
              }
              this.$axios
                .$post(
                  this.$store.state.fungi +
                    '/ActivityRecord/' +
                    record.id +
                    '/update',
                  params
                )
                .then((res) => {
                  if (res.status == 'success') {
                    this.islem_success += 1
                    this.$notify({
                      title: 'Başarılı',
                      message: 'Kayıt başarıyla güncellendi.',
                      type: 'success',
                    })
                  }
                })
            }
          }
        }
        if (this.oda_state == true) {
          this.odaKayit()
        }
      } else {
        this.$notify({
          title: 'Dikkat',
          message: 'Lütfen sözleşmeyi kabul ediniz.',
          type: 'warning',
        })
      }
    },
    odaKayit() {
      for (const ekle of Object.values(this.secilen)) {
        if (this.odalarim.find((e) => e == ekle)) {
          this.islem_count += 1
          //yeni seçilenler
          const params0 = {
            people_count: this.oda_count[ekle], //this.odalar.find((e) => e.id == ekle).quota,
            status: '0',
          }
          
          this.$axios
            .$post(
              this.$store.state.fungi +
                '/ActivityRecord/' +
                this.oda_records[ekle].id +
                '/update',
              params0
            )
            .then((res) => {
              if (res.status == 'success') {
                this.$notify({
                  title: 'Başarılı',
                  message: 'Kayıt başarıyla güncellendi.',
                  type: 'success',
                })
                const oda = {
                  rent_status: true,
                  member_id: this.$auth.$storage.getUniversal('profile').id,
                }
                this.$axios
                  .$post(
                    this.$store.state.fungi +
                      '/ActivityRoom/' +
                      ekle +
                      '/update',
                    oda
                  )
                  .then((res) => {
                    if (res.status == 'success') {
                      this.islem_success += 1
                      /*this.$notify({
                    title: "Başarılı",
                    message: "Oda başarıyla kiralandı.",
                    type: "success",
                  });*/
                    }
                  })
              }
            })
        } else {
          this.islem_count += 1
          //yeni seçilenler
          const params = {
            activity_id: this.activity.id,
            email: this.$auth.$storage.getUniversal('profile').email,
            name: this.$auth.$storage.getUniversal('profile').name,
            people_count: this.oda_count[ekle], //this.odalar.find((e) => e.id == ekle).quota,
            phone: this.$auth.$storage.getUniversal('profile').phone,
            room_id: ekle,
            surname: this.$auth.$storage.getUniversal('profile').surname,
            status: '0',
          }
          this.$axios
            .$post(this.$store.state.fungi + '/ActivityRecord/store', params)
            .then((res) => {
              if (res.status == 'success') {
                this.$notify({
                  title: 'Başarılı',
                  message: 'Kayıt başarıyla oluşturuldu.',
                  type: 'success',
                })
                const oda = {
                  rent_status: true,
                  member_id: this.$auth.$storage.getUniversal('profile').id,
                }
                this.$axios
                  .$post(
                    this.$store.state.fungi +
                      '/ActivityRoom/' +
                      ekle +
                      '/update',
                    oda
                  )
                  .then((res) => {
                    if (res.status == 'success') {
                      this.islem_success += 1
                      /*this.$notify({
                    title: "Başarılı",
                    message: "Oda başarıyla kiralandı.",
                    type: "success",
                  });*/
                    }
                  })
              }
            })
        }
      }
      for (const sil of Object.values(this.odalarim)) {
        if (this.secilen.find((e) => e == sil)) return
        else {
          //silinecek
          this.islem_count += 1
          
          this.$axios
            .$post(
              this.$store.state.fungi +
                '/ActivityRecord/' +
                this.oda_records[sil]['id'] +
                '/delete'
            )
            .then((res) => {
              if (res.status == 'success') {
                const oda = {
                  rent_status: false,
                  member_id: null,
                }
                this.$axios
                  .$post(
                    this.$store.state.fungi +
                      '/ActivityRoom/' +
                      sil +
                      '/update',
                    oda
                  )
                  .then((res) => {
                    if (res.status == 'success') {
                      this.islem_success += 1
                      sil
                    }
                  })
              }
            })
        }
      }
    },
  },
}
</script>

<style></style>
