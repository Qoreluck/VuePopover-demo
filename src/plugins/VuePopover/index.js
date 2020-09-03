import Popover from './Popover.vue'
import { subscription } from './subscription'
import { directive } from './directive'

export default Popover.install = Vue => {

    window.onresize = event => subscription.$emit('hide:click', { currentEvent: event })

    Vue.component('VuePopover',  Popover)

    Vue.directive('popover', directive())
}