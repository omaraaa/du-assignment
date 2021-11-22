<template>
  <div v-bind="$attrs">
    <span class="px-2 pb-8 ml-4 -top-2">
      <span
        class="rounded-lg mb-4 font-bold text-sm px-4 mostpop text-white pb-8"
        v-if="plan.popular"
      >Most popular</span>
    </span>
    <v-card
      outlined
      class="rounded-lg border flex card h-full"
      style="pointer-events: stroke;"
      ref="card"
    >
      <div class="card-bg-grad p-1"></div>
      <div class="m-4 w-full flex flex-col">
        <div class="pb-4 leading-none">
          <span class="pink-text text-m antialiased leading-none">You Pay</span>
          <br />
          <span class="pink-text-bold text-xl antialiased leading-none">{{ plan.payment }}</span>
          <span class="pink-text text-m antialiased leading-none">/month</span>
          <br />
          <span class="grey-text text-sm antialiased">For 12 months + 5% VAT</span>
        </div>
        <v-divider></v-divider>
        <div class="py-3 leading-none">
          <span class="cyan-text text-m leading-none">You Get</span>
          <br />
          <span class="cyan-text-bold text-xl font-bold leading-none">{{ plan.name }}</span>
        </div>
        <v-divider></v-divider>
        <div class="py-3 leading-none">
          <div>
            <span
              v-if="plan.data_was != null"
              class="text-gray-300 text-2xl font-bold leading-none strike"
            >{{ plan.data_was }}</span>
            <span class="grey-text text-2xl font-bold leading-none">{{ plan.data }}</span>
            <span class="ml-2"></span>
            <span class="text-sm grey-text truncate" v-if="plan.double">Double&nbsp;</span>
            <span class="text-sm grey-text truncate">National data</span>
          </div>
          <div>
            <span class="grey-text text-2xl font-bold leading-none">{{ plan.mins }}</span>
            <span class="ml-2 text-sm grey-text truncate">Flexi minutes</span>
          </div>
        </div>

        <v-divider></v-divider>
        <div
          class="flex-grow flex flex-col space-y-2 m-2 overflow-y-scroll md:overflow-y-hidden sm:max-h-32 md:max-h-full"
        >
          <div v-for="benfit in plan.benfits">
            <v-icon class="text-sm grey-text">mdi-check</v-icon>
            <span class="ml-2 text-sm grey-text">{{ benfit }}</span>
          </div>
        </div>
        <div v-if="plan.limited_offer">
          <v-divider></v-divider>
          <div class="my-2">
            <span class="limitedtime px-2 text-xs font-bold">Limited time offer</span>
            <br />
            <span class="text-sm font-bold">The Entertainer</span>
            <span class="text-sm grey-text">&nbsp;on us for 12 months</span>
          </div>
        </div>
        <div>
          <v-divider></v-divider>
          <div class="mt-2 flex items-center">
            <a class="text-sm grey-text underline font-semibold">What you get</a>
            <button class="border rounded selectbtn px-4 py-2 flex-1 ml-4">
              <span class="pink-text-bold text-m leading-none m-8 font-semibold">Select</span>
            </button>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">import { ref } from "@vue/runtime-core";

class PlanData {
  name: String = "Test";
  payment: String = "AED 120";
  data: String = "10 GB";
  data_was: String = "25";
  doube: Boolean = true;
  mins: String = "100";
  benfits: String[] = [
    "dfasdf",
    "asdfasdf"
  ];
  limited_offer: boolean = true;
  popular: boolean = true;
}

export default {
  props: {
    plan: Object,
  },
  setup(props: any) {
    const card = ref(null)
    const plan = ref(props.plan ? props.plan : new PlanData())
    if (props.plan == null) props.plan = new PlanData()

    return {
      card,
      plan
    }
  }
};
</script>

<style>
.strike {
  position: relative;
  color: #666666;
  font-weight: bold;
}

.strike:before {
  position: absolute;
  content: "";
  left: 0;
  top: 50%;
  right: 0;
  border-top: 4px solid;
  border-color: inherit;
  -webkit-transform: skewY(45deg);
  -moz-transform: skewY(45deg);
  transform: skewY(45deg);
}

.mostpop {
  background-color: #00205b;
}

v-icon {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-size: 0.9rem;
}
.pink-text {
  color: #e063d0;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-size: 0.9rem;
}

.pink-text-bold {
  color: #c22bae;
  font-weight: bolder;
}

.cyan-text {
  color: #37c0df;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-size: 0.9rem;
}

.cyan-text-bold {
  color: #00add4;
}

.card {
  min-width: 300px;
  max-width: 400px;
}

.card-bg-grad {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 50%,
    rgba(199, 36, 177, 1) 100%
  );
}
.grey-text {
  letter-spacing: -0.05em;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
}

.selectbtngrad {
  background: rgb(132, 74, 199);
  background: linear-gradient(
    90deg,
    rgba(132, 74, 199, 1) 0%,
    rgba(217, 44, 193, 1) 100%
  );
  padding: 2px;
  width: fit-content;
  height: fit-content;
}

.selectbtn {
  background: rgb(255, 255, 255);
}

.selectbtn:hover {
  background: rgb(132, 74, 199);
  background: linear-gradient(
    90deg,
    rgba(132, 74, 199, 1) 0%,
    rgba(217, 44, 193, 1) 100%
  );
}
.selectbtn:hover > span {
  color: rgb(255, 255, 255);
}

.limitedtime {
  background: rgb(132, 74, 199);
  background: linear-gradient(
    90deg,
    rgba(132, 74, 199, 1) 0%,
    rgb(255, 0, 221) 100%
  );
  color: white;
  border-radius: 1.5rem;
  text-align: center;
}
</style>