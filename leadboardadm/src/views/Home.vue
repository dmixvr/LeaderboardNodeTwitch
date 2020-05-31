<template>
  <div class="home">
    <leadboardTable  />

  </div>
</template>

<script>
// @ is an alias to /src
import leadboardTable from '@/components/leadboardTable.vue'
export default {
  name: 'Home',
  components: {
    
    leadboardTable
  }
}
</script>
