<template>
  <div class="header">
    <el-container>
      <!-- <el-aside width="240px">
        <div class="logo"><img :src="logoUrl"></div>
      </el-aside> -->
      <el-main>
        <h2 class="sub-title">VueFramework</h2>
        <ul class="global-menu">
            <li>
               <a href="javascript:void(0)"><i class="iconfont icon-iconfonticon2"></i></a>
            </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

export default {
  name:"Header",
}

</script>
