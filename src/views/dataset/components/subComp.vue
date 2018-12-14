<template>

</template>

<script>
    export default {
      name: "sub-comp",
      props:['fieldId'],
      data(){
        return {

        }
      },
      watch:{
        'fieldId'(){
          console.log(this.fieldId);
        }
      },
      mounted(){
        console.log(this.fieldId);
      }
    }
</script>

<style scoped>

</style>
