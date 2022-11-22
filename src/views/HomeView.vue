<template>
  <div class="common-layout">
    {{ this.$route.params.id }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  mounted(){
    console.log(this.$route.params.id)
  }
}
</script>
