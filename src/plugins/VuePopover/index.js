import Popover from './Popover.vue'
import { subscription } from './subscription'

export default Popover.install = Vue => {

    window.onresize = event => subscription.$emit('hide:click', { currentEvent: event })

    Vue.component('VuePopover',  Popover)

}