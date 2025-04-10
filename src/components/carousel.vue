<script setup lang="ts">
import Test from '@/components/test.vue';
</script>

<template>
  <ul class="womp">
    <li class="test-item">
      <test/>
    </li>
    <li class="test-item">
      <test/>
    </li>
    <li class="test-item">
      <test/>
    </li>
  </ul>
  <!--  <div class="carousel">
      <ul class="carousel-indicators">
        <li class="carousel-item">
          <test/>
        </li>
        <li class="carousel-item">
          <test/>
        </li>
        <li class="carousel-item">
          <test/>
        </li>
      </ul>
    </div>-->
</template>

<style scoped lang="scss">
.womp {
  border: 2px solid blue;
  display: flex;
  overflow-x: auto;
  list-style: none;
  //scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  &:first-child {
    border: 5px solid red;
  }

  //scroll-snap-type: x mandatory;
  .test-item {
    margin-right: 80px;
    scroll-snap-align: center;

  }
}

/*.carousel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  border: 1px solid red;
  overflow-x: auto;
  //scroll-snap-type: x mandatory;
  .carousel-indicators{
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    border: 1px solid green;
    transform: translateX(28%);
  }
  > li {
    scroll-snap-align: center;
  }
  .carousel-item{
    margin-right: 80px;
  }
}*/
</style>
