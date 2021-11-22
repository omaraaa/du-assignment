<template>
  <div
    class="pt-8 pb-24 flex carousel bg-gray-100 overflow-x-scroll space-x-8 lg:px-96"
    @mousedown="mouseDownHandler"
    @mousemove="mouseMoveHandler"
    @touchstart="mouseDownHandler"
    @touchmove="mouseMoveHandler"
    @scroll="handleOpacity"
    @resize="handleOpacity"
    style="pointer-events: all;"
    ref="scroll"
  >
    <Card v-for="plan in plans" :ref="pushCard" :plan="plan"></Card>
    <div class="ml-96 px-96"></div>
  </div>
</template>


<script lang="ts">
import Card from './Card.vue'
import plans from '../assets/plans.json';

function mouseUpHandler(e: any) {

}

export default {
  components: {
    Card,
  },
  methods: {
    pushCard(el: any) {
      this.cards.push(el);
    },
    mouseDownHandler(e: any) {
      e.target.style.userSelect = 'none';
      this.target = this.$refs.scroll;

      const remove = (e: any) => {
        window.requestAnimationFrame(() => { this.step() });
        this.target.style.removeProperty('user-select');

        this.pos = null;
      };

      if (e instanceof MouseEvent) {
        this.pos = {
          // The current scroll
          left: this.target.scrollLeft,
          top: this.target.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };
        this.target.onmouseup = remove;
        this.target.onmouseleave = remove;
      }
      else if (window.TouchEvent && e instanceof TouchEvent) {
        this.pos = {
          // The current scroll
          left: this.target.scrollLeft,
          top: this.target.scrollTop,
          // Get the current mouse position
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        this.target.ontouchend = remove;
        this.target.ontouchcancel = remove;
      }
    },

    mouseMoveHandler(e: any) {
      if (this.pos) {
        if (window.TouchEvent && e instanceof TouchEvent) {
          const dx = e.touches[0].clientX - this.pos.x;
          const dy = e.touches[0].clientY - this.pos.y;
          this.target.scrollTop = this.pos.top - dy;
          this.target.scrollLeft = this.pos.left - dx;
        } else {
          const dx = e.clientX - this.pos.x;
          const dy = e.clientY - this.pos.y;
          this.target.scrollTop = this.pos.top - dy;
          this.target.scrollLeft = this.pos.left - dx * 2.5;
        }

      }
    },
    step() {
      const lerp = 0.1;
      if (this.pos) return;
      if (this.$refs.scroll && this.target) {
        this.scrollx = this.$refs.scroll.scrollLeft;
        var closetEdge = 999999;
        if (this.closetEdgeLeftLost != null && !this.closetEdgeLeftLost) {
          var left = Math.abs(this.target.scrollLeft - this.closetEdgeLeft);
          if (left > 100) {
            this.closetEdgeLeftLost = true;
          }

        }
        if (this.closetEdgeLeftLost == null || this.closetEdgeLeftLost) {
          this.closetEdgeLeft = 0;
          for (var i in this.cards) {
            var left = Math.abs(this.target.scrollLeft - this.cards[i].card.$el.offsetLeft);
            if (left < closetEdge) {
              closetEdge = left;
              this.closetEdgeLeft = this.cards[i].card.$el.offsetLeft;
              this.closetEdgeLeftLost = false;
            }
          }
        }
        this.$refs.scroll.scrollLeft = this.$refs.scroll.scrollLeft * (1 - lerp) + (this.closetEdgeLeft) * lerp;

        this.handleOpacity();
        window.requestAnimationFrame(() => { this.step() });
      }
    },

    handleOpacity() {
      this.cards.forEach(e => {
        var card_left = e.card.$el.getBoundingClientRect().left;
        var op = (document.body.getBoundingClientRect().right - card_left) / (document.body.getBoundingClientRect().width);
        if (op < 0.3 && document.body.getBoundingClientRect().width > 640) {
          var opacity = (document.body.getBoundingClientRect().right - card_left) / (document.body.getBoundingClientRect().width / 3);
          e.card.$el.style = `opacity:${opacity * 100}%`;
        } else {
          e.card.$el.style = "opacity:100%;";

        }
      });

    }

  },
  mounted() {
    window.requestAnimationFrame(() => { this.step() });
    this.handleOpacity();
  },
  data() {
    return {
      plans: plans,
      cards: [],
    }
  },
}
</script>

<style>
.carousel {
}
</style>