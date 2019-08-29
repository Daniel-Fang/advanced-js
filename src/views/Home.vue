<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="box" @click="clickHandler('name')" @mousemove="overHandler('daniel')"></div>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce-throttle/debounce.js';
import { throttle } from '@/utils/debounce-throttle/throttle.js';

export default {
  name: 'home',
  data() {
    return {
      count: 0,
      name: 'daniel'
    }
  },
  methods: {
    clickHandler: debounce(function() {
      this.count++;
      console.log(this.count);
      console.log(arguments);
    }, 1000),
    overHandler: throttle(function() {
      this.count++;
      console.log(this.count);
      console.log(arguments);
    }, 1000)
  }
}
</script>

<style scoped>
.box {
  width: 600px;
  height: 400px;
  margin: 100px auto;
  background: rgba(0,0,0,0.3);
}
</style>