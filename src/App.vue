<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue';
import UserLayout from '../layouts/UserLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
export default {
  components:{
    AdminLayout,
    UserLayout,
  },
  computed:{
    layout () {
      console.log(this.$route)
      var result = null
      if(this.$route.meta.layout === "UserLayout"){
        result =  UserLayout
      }
      if(this.$route.meta.layout === "AdminLayout"){
        result =  AdminLayout
      }
      if(this.$route.meta.layout === "AuthLayout"){
        result =  AuthLayout
      }
      return result
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
