<template>
  <div
    v-if="visible"
    class="vue-popover"
    :class="positionClass"
    :style="style"
    :data-popover="this.name"
    ref="popover"
    @click.stop
  >
    <slot />
  </div>
</template>

<script>
import { subscription } from "./subscription";
const pointerSize = 6;

const directions = {
  left: [-1, 0],
  right: [1, 0],
  top: [0, 1],
  bottom: [0, -1],
};

export default {
  name: "Popover",
  props: {
    name: {
      type: String,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
    placement: {
      type: String,
      default: "bottom",
    },
  },
  data() {
    return {
      visible: false,
      positionClass: "",
      position: {
        left: 0,
        top: 0,
      },
    };
  },
  mounted() {
    subscription.$on(this.showEventName, this.showEventListener);
    subscription.$on(this.hideEventName, this.hideEventListener);
  },
  beforeDestroy() {
    subscription.$off(this.showEventName, this.showEventListener);
    subscription.$off(this.hideEventName, this.hideEventListener);
  },
  computed: {
    showEventName: () => `show:click`,
    hideEventName: () => `hide:click`,
    style() {
      const styles = {
        ...this.position,
      };
      return styles;
    },
  },
  methods: {
    showEventListener(event) {
      if (this.visible) {
        subscription.$emit(this.hideEventName);
        return;
      }

      if (event.name !== this.name) {
        return;
      }

      subscription.$emit(this.hideEventName);

      this.positionClass = `popover-position-${this.placement}`;
      this.visible = true;
      this.$nextTick(() => {
        this.$emit("show", event);

        this.$nextTick(() => {
          const position = this.getPopoverPosition(event);
          this.position = {
            left: `${position.left}px`,
            top: `${position.top}px`,
          };
        });
      });
    },

    hideEventListener(event) {
      if (this.visible) {
        this.visible = false;

        this.$emit("hide", event);
      }
    },

    getPopoverPosition(event) {
      const $popover = this.$refs.popover;

      const targetRect = event.target.getBoundingClientRect();
      const popoverRect = $popover.getBoundingClientRect();
      const direction = directions[this.placement];

      const offsetLeft = targetRect.left;
      const offsetTop = targetRect.top;

      const shiftY = 0.5 * (popoverRect.height + targetRect.height);

      const centerX = offsetLeft - 0.5 * (popoverRect.width - targetRect.width);
      const centerY = offsetTop + targetRect.height - shiftY;

      let x = direction[0] * 0.5 * (popoverRect.width + targetRect.width);
      let y = direction[1] * shiftY;

      x += direction[0] * (pointerSize + this.offset);
      y += direction[1] * (pointerSize + this.offset);

      return {
        left: Math.round(centerX + x),
        top: Math.round(centerY - y),
      };
    },
  },
};
</script>

<style lang="scss">
$pointerSize: 6px;

.vue-popover {
  display: block;
  position: absolute;
  background: #fff;
  min-width: 150px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  &:before {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: "";
  }
}

.popover-position {
  &-bottom::before {
    border-left: $pointerSize solid transparent;
    border-right: $pointerSize solid transparent;
    border-bottom: $pointerSize solid #fff;
    top: -$pointerSize;
    left: calc(50% - #{$pointerSize});
    filter: drop-shadow(0px -2px 2px rgba(52, 73, 94, 0.1));
  }
  &-top:before {
    border-left: $pointerSize solid transparent;
    border-right: $pointerSize solid transparent;
    border-top: $pointerSize solid #fff;
    bottom: -$pointerSize;
    left: calc(50% - #{$pointerSize});
    filter: drop-shadow(0px 2px 2px rgba(52, 73, 94, 0.1));
  }
  &-left:before {
    border-top: $pointerSize solid transparent;
    border-bottom: $pointerSize solid transparent;
    border-left: $pointerSize solid #fff;
    right: -$pointerSize;
    top: calc(50% - #{$pointerSize});
    filter: drop-shadow(2px 0px 2px rgba(52, 73, 94, 0.1));
  }
  &-right:before {
    border-top: $pointerSize solid transparent;
    border-bottom: $pointerSize solid transparent;
    border-right: $pointerSize solid #fff;
    left: -$pointerSize;
    top: calc(50% - #{$pointerSize});
    filter: drop-shadow(-2px 0px 2px rgba(52, 73, 94, 0.1));
  }
}
</style>