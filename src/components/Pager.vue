<template>
  <div class="pagi">
    <el-pagination
      background
      small
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSizeData"
      :total="totalCount"
      :defaultQuery="defaultQuery"
      background
      layout="prev, pager, next,total,sizes, jumper">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "test",
        props:{
          totalCount:{type: Number, required: true},
          pageSizes:{
            type: Array,
            required: false,
            default: function(){
              return [10,20,30,40,50]
            }
          },
          pageSize:{type: Number, required: false,default:10},
          layout:{type: String, required: false, default:" prev, pager, next,total,sizes, jumper"},
          defaultQuery:true
        },
        data(){
          return {
            currentPage:1,
            pageSizeData:this.pageSize
          }
        },
        methods:{
          //每页显示数据量变更
          pageSizeChange: function(val) {
            this.pageSizeData = val;
            this.currentPage = 1;
            this.$emit("query",{pageSize:this.pageSizeData,currentPage:this.currentPage})
          },
          //页码变更
          currentPageChange: function(val) {
            this.currentPage = val;
            this.$emit("query",{pageSize:this.pageSizeData,currentPage:this.currentPage})
          },
          wrapQueryModel:function(queryModel,pagiInfo){
            if(pagiInfo==undefined||!pagiInfo.hasOwnProperty("pageSize")){
              queryModel.pageSize = this.pageSizeData
              queryModel.currentPage = this.currentPage;
              queryModel.pageNo = this.currentPage;
              //this.currentPage = 1;
            }else{
              this.currentPage = pagiInfo.currentPage;
              this.pageSizeData = pagiInfo.pageSize;

              queryModel.pageSize = pagiInfo.pageSize;
              queryModel.currentPage = pagiInfo.currentPage;
              queryModel.pageNo = pagiInfo.currentPage;
            }
            return queryModel;
          }
        },
        watch:{
          totalCount:function(newVal,oldVal){
           let totalPage = Math.floor((newVal + this.pageSizeData -1) / this.pageSizeData);
           if(totalPage<this.currentPage){
             this.$emit("query",{pageSize:this.pageSizeData,currentPage:1});
           }
          }
        },
        mounted:function(){
          if(this.defaultQuery||this.defaultQuery==undefined){
              this.$emit("query",{pageSize:this.pageSizeData,currentPage:this.currentPage});
          }

        }
    }
</script>
