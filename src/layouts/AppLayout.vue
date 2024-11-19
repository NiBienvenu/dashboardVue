<template>
    <div>
        <app-header/>
        <router-view></router-view>
        <app-side-bar/>
    </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppSideBar from './AppSideBar.vue'
export default {
  components: { AppHeader, AppSideBar },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>