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
    <div class="container" v-loading="load">
      <div class="row justify-content-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      columns: {
        image: {
          name: 'image',
          display: 'Resim',
          type: 'file',
          length: '255',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        name: {
          name: 'name',
          display: 'İsim',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        surname: {
          name: 'surname',
          display: 'Soyisim',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },

        phone: {
          name: 'phone',
          display: 'Telefon',
          type: 'varchar',
          length: '30',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        email: {
          name: 'email',
          display: 'Eposta',
          type: 'varchar',
          length: '100',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
        city: {
          name: 'city',
          display: 'Şehir',
          type: 'varchar',
          length: '50',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        job: {
          name: 'job',
          display: 'Meslek',
          type: 'varchar',
          length: '100',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        about: {
          name: 'about',
          display: 'Hakkınızda',
          type: 'text',
          length: '65535',
          null: 'YES',
          default: 'NULL',
          privileges: 'select,insert,update,references',
          key: '',
        },
        instagram: {
          name: 'instagram',
          display: 'Instagram',
          type: 'varchar',
          length: '200',
          null: 'NO',
          default: null,
          privileges: 'select,insert,update,references',
          key: '',
        },
      },
    }
  },
}
</script>

<style></style>
