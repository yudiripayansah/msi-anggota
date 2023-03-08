<template>
  <div class="pg-dashboard pg-page">
    <div class="pg-header pt-5 pb-3">
      <img :src="app.koperasi_logo" alt="">
      <!-- <h1>Mobile {{app.koperasi_name}}</h1> -->
      <h6>Dashboard</h6>
      <!-- <div class="pg-header-nav-btn">
        <router-link to="/profile">
          <i class="fas fa-cog"></i>
        </router-link>
      </div> -->
    </div>
    <div class="pg-content">
      <div class="pg-profile-box d-flex align-items-center justify-content-between">
        <div class="d-flex">
          <img src="/assets/images/profile.png" alt="">
          <div class="pg-profile-box-text">
            <h2>Hi, {{profile.nama_anggota}}</h2>
            <h3>{{profile.no_anggota}}</h3>
            <h3>{{profile.nama_rembug}} <small>({{profile.nama_desa}})</small></h3>
          </div>
        </div>
        <div @click="doLogout()" class="d-flex justify-content-center align-items-center pg-btn-logout">
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div class="pg-dashboard-nav">
        <b-row>
          <b-col col="6">
            <router-link to="/saldo/simpok">
              <div class="py-2">
                <span>Simpok</span>
                Rp {{thousand(profile.simpok)}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="6">
            <router-link to="/saldo/simwa" class="color-1">
              <div class="py-2">
                <span>Simwa</span>
                Rp {{thousand(profile.simwa)}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="6">
            <router-link to="/saldo/sukarela" class="color-2">
              <div class="py-2">
                <span>Sukarela</span>
                Rp {{thousand(profile.simsuk)}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="6">
            <router-link to="/saldo/pembiayaan" class="color-4">
              <div class="py-2">
                <span>Pembiayaan</span>
                Rp {{thousand(profile.saldo_outstanding)}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="12" class="pb-3">
            <hr class="m-0">
          </b-col>
          <b-col cols="12">
            <router-link to="/saldo/berencana" class="" v-for="(stb, stbIndex) in profile.saldo_tab_berencana" :key="`stb-${stbIndex}`">
              <div class="py-2">
                <span>{{stb.product_name}}</span>
                Rp {{thousand(stb.saldo)}}
              </div>
            </router-link>
          </b-col>
          <!-- <b-col cols="6">
            <router-link :to="Number(user.tipe_user) == 2 ? `#` : `/saldo/qurban`" class="color-2">
              <div class="py-2">
                <span>Qurban</span>
                Rp {{profile.qurban}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="6">
            <router-link :to="Number(user.tipe_user) == 2 ? `#` : `/saldo/pendidikan`">
              <div class="py-2">
                <span>Pendidikan</span>
                Rp {{profile.pendidikan}}
              </div>
            </router-link>
          </b-col>
          <b-col cols="6">
            <router-link :to="Number(user.tipe_user) == 2 ? `#` : `/saldo/tabungan-berjangka`" class="color-3">
              <div class="py-2">
                <span>Berjangka</span>
                Rp {{profile.saldo_deposito}}
              </div>
            </router-link>
          </b-col> -->
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import axios from 'axios'
import {baseUrl,settings} from '../config'
export default {
  data(){
    return {
      app : settings,
      profile : {
        nama: null,
        noanggota: null,
        majelis: null,
        desa: null,
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout"]),
    getProfile(){
      this.profile.loading = true
      let url = `${baseUrl}member/information/dashboard`
      let payloadData = {
        nama_user : this.user.nama_user
      }
      let payload = new FormData()
      for(let key in payloadData){
        payload.append(key,payloadData[key])
      }
      let config = {
        headers: {
          'token': this.user.token
        }
      }
      axios
      .post(url,payload,config)
      .then((res)=>{
        this.profile.loading = false
        const { data } = res.data
        this.profile = data
      })
      .catch((res)=>{
        this.profile.loading = false
        this.notif('Error',res.message,'danger')
      })
    },
    doLogout(){
      this.logout()
      this.$router.push('/login').catch(()=>{})
    },
    thousand(num) {
      if (num) {
        let num_parts = num.toString().split(",");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return num_parts.join(",");
      } else {
        return 0
      }
    },
    notif(title,msg,type){
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 5000,
        variant: type,
        toaster: 'b-toaster-bottom-center'
      })
    }
  },
  mounted(){
    this.getProfile()
  }
}
</script>