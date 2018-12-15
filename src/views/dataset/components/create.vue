<template>
    <div>
      <!--<el-button @click="changeValue">点我</el-button>-->
      <SubComp :fieldId="fieldId"></SubComp>
    </div>
</template>

<script>
    import SubComp from './subComp'
    export default {
      name: "datasetCreate",
      components:{
        SubComp
      },
      data(){
        return {
          fieldId: '5'
        }
      },
      methods:{
        changeValue(){
          this.fieldId = ++this.fieldId;
        }
      }
    }
</script>

<style scoped>

</style>
