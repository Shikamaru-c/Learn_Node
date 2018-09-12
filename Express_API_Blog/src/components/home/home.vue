<template>
  <div class="home">
    <div class="content-wrapper">
      <contact></contact>
      <course></course>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Contact from 'components/contact/contact'
import Course from 'components/course/course'
import Footer from 'components/footer/footer'

export default {
  components: {
    Contact,
    Course,
    VFooter: Footer
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 100px);
  }
</style>
