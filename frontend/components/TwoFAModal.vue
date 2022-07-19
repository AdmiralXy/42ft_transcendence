<template>
  <b-modal ref="modal" hide-footer centered title="Two Factor Authentication">
    <div v-if="!isActive && qr_image" class="text-center">
      <img class="img-fluid" :src="qr_image" alt="">
      <p class="mb-1">
        Scan QR code with Authenticator application
      </p>
      <p class="small">
        For example Google Authenticator
      </p>
      <input v-model="code" v-mask="'######'" placeholder="- - - - - -" class="code-input shadow-sm" type="text">
      <b-button class="mt-3" variant="outline-warning" block @click="submit">
        Submit
      </b-button>
    </div>
    <div v-else class="text-center">
      <p class="small">
        Type code from Authenticator application
      </p>
      <input v-model="code" v-mask="'######'" placeholder="- - - - - -" class="code-input shadow-sm" type="text">
      <b-button class="mt-3" variant="outline-danger" block @click="deactivate">
        Disable
      </b-button>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'app',
  data () {
    return {
      active: false as boolean,
      qr_image: null as any,
      code: '' as string,
      isActive: false as boolean
    }
  },
  methods: {
    async fetchStatus (): Promise<void> {
      await this.$axios.get('2fa').then((response: any) => {
        this.isActive = response.data.enabled
        if (!this.isActive) {
          this.generate()
        }
      })
    },
    showModal (): void {
      if (this.$refs.modal) {
        const modal = this.$refs.modal as any
        this.fetchStatus().then(() => modal.show())
      }
    },
    closeModal (): void {
      if (this.$refs.modal) {
        const modal = this.$refs.modal as any
        modal.close()
      }
    },
    generate (): void {
      this.$axios.post('2fa/generate', {}, { responseType: 'blob' as 'json' }).then((response: any) => {
        this.qr_image = URL.createObjectURL(response.data)
      }).catch(() => {
        this.qr_image = null
      })
    },
    submit (): void {
      this.$axios.post('2fa/turn-on', { code: this.code }).then(() => {
        this.$bvToast.toast('Successfully activated', {
          title: 'Two Factor Authentication',
          variant: 'success'
        })
        this.fetchStatus()
      }).catch((error) => {
        this.$bvToast.toast(error.response.data.message, {
          title: 'Two Factor Authentication',
          variant: 'danger'
        })
      })
    },
    deactivate (): void {
      this.$axios.post('2fa/turn-off', { code: this.code }).then(() => {
        this.$bvToast.toast('Successfully disabled', {
          title: 'Two Factor Authentication',
          variant: 'success'
        })
        this.fetchStatus()
      }).catch((error) => {
        this.$bvToast.toast(error.response.data.message, {
          title: 'Two Factor Authentication',
          variant: 'danger'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.code-input {
  width: 80%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 20px;
  color: #333;
  background-color: #fff;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  letter-spacing: 10px;
  text-align: center;
}

.code-input:focus {
  outline: 0;
}
</style>
