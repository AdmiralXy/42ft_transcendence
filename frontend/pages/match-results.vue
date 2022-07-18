<template>
  <div v-if="Object.keys(match).length !== 0" class="results-container">
    <div class="results-container__title">
      <svg fill="#c9e5e7" width="47" height="47" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.514 6.636c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508zm15.986 2.115v7.525l-6.75 3.722v-7.578zm-14.264-1.344 6.764-3.813 6.801 3.834-6.801 3.716z" fill-rule="nonzero"/></svg>
      <h4>
        Pong match #{{ match.id }}
      </h4>
    </div>
    <div class="results-info-container container row">
      <div class="col-md-5">
        <p class="results-info-container__username">
          <svg fill="#dada09" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10c-3.865 0-7 3.134-7 7s3.135 7 7 7 7-3.134 7-7-3.135-7-7-7zm0 12c-2.762 0-5-2.239-5-5s2.238-5 5-5 5 2.239 5 5-2.238 5-5 5zm1.484-4.315l1.516-1.457-2.083-.287-.917-1.892-.917 1.892-2.083.287 1.516 1.457-.369 2.07 1.853-.992 1.854.992-.37-2.07zm.058-11.918l-.919-1.233 3.377-4.534h1.867l-4.325 5.767zm5.574-5.767l-4.952 6.603.939 1.26 5.897-7.863h-1.884zm-6.986 8h1.828l-5.958-8h-1.869l5.999 8zm-7.249-8h-1.881l6 8h1.881l-6-8z"/></svg>
          {{ match.player1.username }}
        </p>
      </div>
      <div class="col-md-2">
        <svg fill="#c9e5e7" xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24"><path d="M21.062 13.875l-1.625-5.979 3.367-1.092c-1.939-4.022-6.04-6.804-10.804-6.804-4.779 0-8.894 2.801-10.824 6.845l3.386 1.051-1.625 5.979-2.937-.767c.56 6.108 5.747 10.892 12 10.892s11.439-4.784 12-10.892l-2.938.767zm-14.826 1.845c-.314-.231-.382-.673-.151-.987l.806-1.088c.23-.313.67-.383.986-.151.316.231.383.672.152.987l-.807 1.087c-.217.298-.687.37-.986.152zm1.424 1.04c-.313-.232-.387-.664-.156-.978l.812-1.096c.229-.313.67-.381.984-.151.315.23.385.673.152.986l-.812 1.097c-.212.292-.672.366-.98.142zm1.426 1.04c-.313-.231-.383-.673-.151-.988l.805-1.086c.233-.315.674-.382.987-.152.314.231.383.673.151.987l-.805 1.088c-.218.296-.686.372-.987.151zm3.217-.201l-.807 1.092c-.215.294-.682.374-.986.151-.314-.231-.383-.672-.152-.986l.809-1.092c.229-.311.67-.382.986-.149.314.228.382.671.15.984zm.743 1.401c-.142 0-.296-.033-.451-.113.235-.318.579-.742.707-1.044l.159.159c.487.487.127.998-.415.998zm4.922-2.979c-.275.276-.723.276-.998 0l-2.025-2.025c-.065-.067-.174-.069-.243-.005-.075.067-.078.184-.006.255l1.875 1.876c.276.276.276.722 0 .998-.275.276-.723.276-.998 0l-1.523-1.524c-.068-.068-.178-.069-.247-.002-.072.069-.072.183-.003.252l1.264 1.265c.276.276.276.722 0 .999-.274.275-.722.276-.997 0l-.654-.654c.17-1.042-.595-1.891-1.53-1.972-.248-.591-.803-.985-1.422-1.039-.238-.571-.784-.984-1.424-1.04-.506-1.208-2.158-1.432-2.95-.351l-.44.595c-.449-.169-.934-.31-1.489-.441l1.273-4.685c1.899-.017 3.396-1.817 5.149-.709-.574.71-1.045 1.277-1.755 1.691-.567.332-.833.981-.66 1.616.216.797 1.024 1.354 1.968 1.354 1.248 0 2.54-1.025 3.521-1.761.578.577 3.831 3.775 4.315 4.31.274.274.274.72-.001.997zm.495-1.954s-3.125-3.084-4.053-4.013c-.496-.494-.838-.562-1.41-.101-.728.586-1.619 1.182-2.277 1.413-1.291.452-1.996-.647-1.396-.999 1.22-.711 1.814-1.737 2.839-2.898.284-.322.623-.441.969-.441.376 0 .761.14 1.095.312 1.517.784 2.897 1.319 4.351 1.212l1.296 4.768c-.464.208-.931.45-1.414.747z"/></svg>
      </div>
      <div class="col-md-5">
        <p class="results-info-container__username">
          {{ match.player2.username }}
        </p>
      </div>
    </div>
    <div>
      <p class="result-container__metainfo text-center">
        Type:
        <span v-if="match.type === 'MATCHMAKING'">Matchmaking</span>
        <span v-else>Custom</span>
      </p>
      <p class="result-container__metainfo text-center">Finished: {{ new Date(match.updated_at).toDateString() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  layout: 'app',
  computed: {
    ...mapGetters({
      match: 'matches/match'
    })
  },
  mounted (): void {
    this.fetchMatch(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      fetchMatch: 'matches/fetchMatch'
    })
  }
})
</script>

<style lang="scss" scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.results-container__title {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 25px;
  color: #c9e5e7;
  text-align: center;
}

.results-info-container div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.results-info-container__username {
  font-size: 1.4em;
  font-weight: bold;
  color: #c9e5e7;
  text-decoration: none;
}

.result-container__metainfo {
  color: #c9e5e7;
}
</style>
