<template>
    <div>
      <div ref="editor"></div>
    </div>
</template>

<script>
  import E from 'wangeditor'
  var editor

  export default {
    name: 'editor',
    props: {
      propEditorContent: {
        type: String,
        default: ''
      }
    },
    computed: {
      editorContent: {
        get(){
          return this.propEditorContent
        },
        set(value){
          this.$emit('dochange', value)
        }
      }
    },
    watch:{
      propEditorContent(){
        this.$emit('dochange', this.editorContent)
        editor.txt.html(this.editorContent)
      }
    },
    mounted() {
      editor = new E(this.$refs.editor)
      editor.customConfig.uploadImgShowBase64 = true
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.menus=[
        "bold", // 加粗
        // "head", // 标题

        // "fontName", // 字体
        "italic", // 斜体
        // "strikeThrough", // 中线
        "underline",  //下划线
        "fontSize", // 字号
        "foreColor", // 字体颜色
        "backColor", // 背景颜色
        "link",  // 链接
        "list", // 有序无序列表
        "justify", // 字体位置
        // "quote",  // 段落引用
        // "redo", // 下一步
        // "undo" // 倒退
        // "code",  // 插入代码
        // "emoticon", //表情
        // "table",  // 表格
        // "video",  // 视频
        // "image", // 图片
      ];
      // editor.customConfig.colors=[
      //   '#000000',
      //   '#800080',
      //   '#FF0000',
      //   '#FFFF33',
      //   '#FF6633',
      //   '#33FF33',
      //
      // ]
      editor.customConfig.fontSize = [
        '10px',
        '13px',
        '16px',
        '19px',
        '22px',
        '25px',
        '28px'
      ]
        // 格式：'value': 'title'

      editor.create()
      editor.txt.html(this.editorContent)
    }
  }
</script>

<style scoped>

</style>
