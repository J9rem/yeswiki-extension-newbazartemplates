/*
 * This file is part of the YesWiki Extension newbazartemplates.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import SpinnerLoader from '../../../../bazar/presentation/javascripts/components/SpinnerLoader.js'

// allow usage of wiki in templates
Vue.prototype.wiki = wiki
// const isVueJS3 = (typeof Vue.createApp == 'function')

Vue.component('BazarVisNetwork', {
  props: ['params'],
  components: { 'spinner-loader': SpinnerLoader },
  data() {
    return {
      nodes: null,
      edges: null,
      network: null,
      options: {
        autoResize: true,
        height: '100%',
        width: '100%',
        locale: wiki.locale
      }
    }
  },
  computed: {
    entries() {
      return this.$root.entriesToDisplay
    }
  },
  methods: {
    arraysEqual(a, b) {
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false

      a.sort(); b.sort()
      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
      }
      return true
    },
    isModalDisplay() {
      return (this.params.entrydisplay != undefined && this.params.entrydisplay == 'modal')
    },
    isNewTabDisplay() {
      return (this.params.entrydisplay != undefined && this.params.entrydisplay == 'newtab')
    },
    isDirectLinkDisplay() {
      return (this.params.entrydisplay != undefined && this.params.entrydisplay == 'direct')
    },
    getNode(entryId) {
      if (entryId.length == 0) return null
      return this.nodes.get(entryId)
    },
    clearOldEntries(){
      let nodeIds = this.nodes.getIds();
      let currentIds = this.entries.map((entry)=>entry.id_fiche)
      nodeIds.forEach((entryId)=>{
        if (!currentIds.includes(entryId)){
          this.nodes.remove(entryId)
        }
      })
    },
    addNodeOnlyIfNew(entry) {
      const previousEntry = this.getNode(entry.id_fiche)
      if (typeof previousEntry === 'undefined' || !previousEntry) {
        this.nodes.add({ id: entry.id_fiche, label: entry.markerhover || entry.bf_titre })
      }
    },
  },
  watch: {
    entries(newVal, oldVal) {
      const newIds = newVal.map((e) => e.id_fiche)
      const oldIds = oldVal.map((e) => e.id_fiche)
      if (!this.arraysEqual(newIds, oldIds)) {
        this.clearOldEntries()
        this.entries.forEach((entry) => this.addNodeOnlyIfNew(entry))
      }
      this.network.stabilize();
    },
    params(){
      let height = this.params.height || '100%'
      if (this.network){
        this.network.setOptions({
          height: height
        })
      } else {
        this.options.height = height
      }
    }
  },
  mounted() {
    // let baseEl = $(isVueJS3 ? this.$el.parentNode : this.$el);
    const container = this.$refs['vis-container']
    this.nodes = new vis.DataSet([]);
    this.edges = new vis.DataSet([]);
    this.network = new vis.Network(container, {
      nodes: this.nodes,
      edges: this.edges
    }, this.options)
  },
  template: `
    <div class="bazar-vis-network-container" :style="{height: params.height}">
      <div ref="vis-container"></div>
      <spinner-loader v-if="this.$root.isLoading || !this.$root.ready" class="overlay super-overlay"></spinner-loader>
    </div>
  `
})
