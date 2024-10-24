<template>
  <div>
    <NuxtLayout>
      <HeaderBlock />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script>
import HeaderBlock from '@/components/UI/HeaderBlock.vue';

export default {
  components: { HeaderBlock },
}
</script>
