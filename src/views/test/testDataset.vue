<template>
  <div>
    <input type="text" v-focus="{text: 'aaaa'}">
    <button v-demo="styleCtrl">请点击我</button>
    <button @click="changeColor">改变颜色</button>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          styleCtrl:'red'
        }
      },
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          },
          bind: function (el, binding, vnode) {
            // alert(binding.value.text);
          }
        },
        click:{
          inserted(el){
            // alert(1);
          },
          bind(el, binding, vnode){

          }
        },
        demo:{
          inserted(el, binding){
            el.style.color = 'green';
          },
          bind(el, binding){
            el.style.color = binding.value;
          },
          update(el, binding){
            el.style.color = binding.value;
          }
        }
      },
      methods:{
        changeColor(){
          this.styleCtrl = 'yellow'
        },
        /*
        以下6个方法均为ES6语法，IE9及以上才支持。不过可以通过babel转意支持IE低版本。
        以上均不改变原数组。
        some、every返回true、false。
        map、filter返回一个新数组。
        reduce让数组的前后两项进行某种计算，返回最终操作的结果。
        forEach 无返回值。
        */
        testForEach(){
          var arr = [1,2,3,4];
          let indexVal = 0;
          arr.forEach((item,index,arr) => {
            console.log(item)
          })
          // console.log('completed', arr);
          //forEach遍历数组，无返回值，不改变原数组，仅仅只是遍历、常用于注册组件、指令等等。 return 无效
        },
        testMap(){
          var arr = [1,2,3,4];
          var newArr = arr.map((item,index,arr) => {
            return item*10 //新数组为10,20,30,40
          })
          console.log('test map ', newArr);
          //map遍历数组，返回一个新数组，不改变原数组的值。 return 有效
        },
        testFilter(){
          var arr = [1,2,3,4];
          let newArr = arr.filter((item,index,arr) => {
            return item > 2 //新数组为[3,4]
          })
          console.log(newArr);
          //filter过滤掉数组中不满足条件的值，返回一个新数组，不改变原数组的值。 return 有效
        },
        testReduce(){
          var arr = [1,2,3,4];
          arr.reduce((result,item,index,arr) => {
            console.log('result', result) // 1  3  6  result为上次一计算的结果
            console.log('item', item)  // 2  3  4
            console.log('index', index) // 1  2  3
            return result+item //最终结果为10
          })
          console.log(arr);
          //reduce 让数组的前后两项进行某种计算。然后返回其值，并继续计算。不改变原数组，返回计算的最终结果，从数组的第二项开始遍历。
        },
        testSome(){
          var arr = [1,2,3,4];
          let res = arr.some((item,index,arr) => {
            return item > 5 //结果为true
          })
          console.log(res);
          //遍历数组每一项，有一项返回true,则停止遍历，结果返回true。不改变原数组
        },
        testEvery(){
          var arr = [1,2,3,4];
          let res = arr.every((item,index,arr) => {
            return item > 2 //结果为false
          })
          console.log(res)
          //遍历数组每一项，每一项返回true,则最终结果为true。当任何一项返回false时，停止遍历，返回false。不改变原数组
        },
        testHuo(){
          let a = ""
          let b = a || 5
          alert(b);
        }
      },
      mounted(){
        // this.testMap();
      }
    }
</script>

<style scoped>

</style>
