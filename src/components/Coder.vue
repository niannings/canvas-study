<template>
  <div class="webgl-wrap">
    <div class="coder-container">
      <el-tabs class="section editor" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="JS" name="JS" ref="JS"></el-tab-pane>
        <el-tab-pane label="HTML" name="HTML" ref="HTML"></el-tab-pane>
        <el-tab-pane label="CSS" name="CSS" ref="CSS"></el-tab-pane>
      </el-tabs>
      <iframe class="section result" ref="iframe"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createComponent, ref, onMounted } from "@vue/composition-api";
import * as monaco from "monaco-editor";
import { debounce } from "@/utils";

const instances = new WeakMap();
const testCode = `
  const { container } = global;
  const a = global.container.querySelector('.container');
  a.innerHTML = '<h1>Hello World!</h1>';
`;

function init(editor: any, result: any, { code, lang }: { code: string; lang: string }) {
  Vue.nextTick(() => {
    result.srcdoc = `<div class="container"></div>`;

    const instance = monaco.editor.create(editor.$el, {
      value: code,
      language: lang,
      theme: "vs-dark"
    });

    const debounceFn = debounce(e => {
      new Function(
        "global",
        `
              ${instance.getValue()}
          `
      )({ container: result.contentDocument });
    }, 1000);

    debounceFn();
    instance.onDidChangeModelContent(debounceFn);
    instances.set(editor, instance);
  });
}

export default createComponent({
  name: "Coder",
  props: {
    code: {
      type: String,
      default: ""
    },
    lang: {
      type: String
    }
  },
  setup(props) {
    const JS = ref(null);
    const HTML = ref(null);
    const CSS = ref(null);
    const iframe = ref(null);
    const activeName = ref("JS");
    const handleClick = () => {
      switch (activeName.value) {
        case 'JS':
          return !instances.has(JS.value!) && init(JS.value, iframe.value, {
            code: `${testCode}${props.code}`,
            lang: props.lang || "javascript"
          });
        case 'HTML':
          return !instances.has(HTML.value!) && init(HTML.value, iframe.value, {
            code: props.code,
            lang: props.lang || "html"
          });
        case 'CSS':
          return !instances.has(CSS.value!) && init(CSS.value, iframe.value, {
            code: props.code,
            lang: props.lang || "css"
          });
        default:
          return;
      }
    };

    onMounted(() => {
      handleClick();
    });

    return {
      JS,
      HTML,
      CSS,
      iframe,
      activeName,
      handleClick
    };
  }
});
</script>

<style scoped>
.coder-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 320px;
}
.coder-container .section {
  width: 50%;
  height: 100%;
}
</style>

<style>
.coder-container .el-tabs__content,
.coder-container .el-tab-pane {
  height: 100%;
}
</style>