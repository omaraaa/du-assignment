<template>
  <v-app class="m-auto">
    <v-main>
      <div
        class="py-32 flex carousel bg-gray-100 overflow-x-hidden space-x-8"
        @mousedown="mouseDownHandler"
        @mousemove="mouseMoveHandler"
        @touchstart="mouseDownHandler"
        @touchmove="mouseMoveHandler"
        @scroll="handleOpacity"
        @resize="handleOpacity"
        style="pointer-events: all;"
        ref="scroll"
      >
        <div class="pl-32"></div>
        <Card v-for="plan in plans" :ref="pushCard" :plan="plan" class="flex-1 flex-grow"></Card>
        <div class="pl-32"></div>
      </div>
      <Card></Card>
    </v-main>
  </v-app>
</template>


<script lang="ts">
import Card from './components/Card.vue'
import plans from './assets/plans.json';

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
      if (e instanceof TouchEvent) {
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
        console.log(this.target.scrollLeft)
        if (e instanceof TouchEvent) {
          console.log(this.target.scrollLeft)
          const dx = e.touches[0].clientX - this.pos.x;
          const dy = e.touches[0].clientY - this.pos.y;
          this.target.scrollTop = this.pos.top - dy;
          this.target.scrollLeft = this.pos.left - dx * 3;
        } else {
          const dx = e.clientX - this.pos.x;
          const dy = e.clientY - this.pos.y;
          this.target.scrollTop = this.pos.top - dy;
          this.target.scrollLeft = this.pos.left - dx;
        }

        this.handleOpacity();
      }
    },
    step() {
      const lerp = 0.5;
      if (this.pos) return;
      if (this.$refs.scroll && this.target) {
        this.scrollx = this.$refs.scroll.scrollLeft;
        var closetEdge = 999999;
        var closetEdgeLeft = 999999;
        for (var i in this.cards) {
          var left = Math.abs(this.target.scrollLeft - this.cards[i].card.$el.offsetLeft);
          if (left < closetEdge) {
            closetEdge = left;
            closetEdgeLeft = this.cards[i].card.$el.offsetLeft;
          }
        }
        this.$refs.scroll.scrollLeft = this.$refs.scroll.scrollLeft * (1 - lerp) + closetEdgeLeft * lerp;
        window.requestAnimationFrame(() => { this.step() });
      }
    },

    handleOpacity() {
      this.cards.forEach(e => {
        console.log(e.card.$el.offsetLeft)
        var card_bounds = e.card.$el.getBoundingClientRect();
        var op = (document.body.getBoundingClientRect().right - card_bounds.left) / (document.body.getBoundingClientRect().width);
        if (op < 0.3) {
          var opacity = (document.body.getBoundingClientRect().right - card_bounds.left) / (document.body.getBoundingClientRect().width / 3);
          e.style = `opacity:${opacity * 100}%`;
        } else {
          e.style = "opacity:100%;";

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