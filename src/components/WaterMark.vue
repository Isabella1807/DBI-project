<script setup lang="ts">

</script>

<template>

  <RouterLink to="/" class="link">
    <p>
      Egenkontrollen
    </p>
  </RouterLink>
</template>

<style scoped lang="scss">
.link{
  @include noLinkDeco;
}
p {
  position: absolute;
  padding-top: 16px;
  margin-left: 24px;
  color: hsla(200, 3%, 83%, 1);
}
</style>
