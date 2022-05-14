import Vue from "vue";
import VueCompositionApi, {
  computed,
  defineComponent,
  onMounted,
  ref,
} from "@vue/composition-api";
import { watchDebounced, watchThrottled } from '@vueuse/core'

// import "@picocss/pico/css/pico.classless.min.css"
import "./style.less";

import { api } from "./anno/@fetch";
import { emojiUrls } from "./anno/@img";

import unifiedParser from "./utils/unifiedParserUtil";
import { watch } from "less";
import { trim } from "lodash";

const weatherApi = api.weather


// const content = `@until('20220513')`

// const content1 = `

// @img(https://luo0412.oss-cn-hangzhou.aliyuncs.com/static/images/index/xiong.gif) @nice
// @img https://luo0412.oss-cn-hangzhou.aliyuncs.com/static/images/index/xiong.gif

// `;

const content = `#### 世界很大, 而我又是靓仔 @nice @rate 3.3

虽然说了句正确的废话 @del 

@dog @cat @tiger

@doc https://procomponents.ant.design/components/editable-table @hot 20221223 

@until(22120309){tipText: '📣新发布', createDate: '20211212'}

@bvid BV1YT4y1Q7xx

@abbr(HTML, "Hyper Text Markup Language") 

@emoji{help} @emoji{java}

\`\`\`
@emoji{safe} 
@emoji{ichange} 
\`\`\`
`

const content3 = `# 世界很大, 而我又是靓仔 @nice    

---

说点正确的废话 @del    

---

- 相关链接 
  - @code{title = coolma演示} https://github.com/ui-javascript/demo-coolma-202205
  - @doc https://procomponents.ant.design/components/editable-table

---

@emoji{xiong}
@img ${emojiUrls.dog}
@img("${emojiUrls.cat}"){style: "width: 150px;"}
@emoji("${emojiUrls.cool}")
@emoji{src: "${emojiUrls.tiger}"}

---

A lovely language know as @abbr[namespace](HTML, "HTML的全称"){.red #id} @abbr(HTML, "HTML的全称"){.bg-blue.border-orange-lighter.border-solid}

---

@weather

@fetch("${weatherApi}"){includeKeys: '[*]'}

@fetch{weather}

@fetch{weather: true}

数组属性没有引号包裹, 注解直接摆烂, 原地显示 --> @fetch{weather: true, includeKeys: ['date']}

@fetch{weather: true, includeKeys: "['date']"}

@fetch{weather: false}

---

hello @nice
  
@nice hello

hello hi @nice @nice

hello hi *暂时跳过这种标签* @abbr(HTML, "HTML的全称"){.bg-blue} @nice @nice

hello @nice @nice hi

hello @nice test *em* @nice ssss *em* sss @nice xxx
`




const App = {
  template: `

    <main class="container-fluid">

  
    <div class="grid">

      <textarea style="display: block;min-height: 350px" v-model="before"></textarea>
      <!-- 
      
 
      <coolma :html="after" />  
      -->
      
      <div v-html="after"></div> 
         

  
  
    </div>

   
    </main>

  `,
  components: {
    'coolma': {
      props: {
        html: String
      },
      render: (h, data) => {


        // const test = `<h4>世界很大, 而我又是靓仔<span></span>
        //   <el-rate star="3.3" disabled show-score text-color="#ff9900" value="3.3" score-template="{value}" style="display: inline-block"></el-rate><span></span>
        // </h4>
        // <p><del tagName="del">虽然说了句正确的废话</del><span></span></p>
        // <p>
        //   <img style="width: 150px;" dog src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249579841-Yty6cpQs34pj.jpeg">
        //   <img style="width: 150px;" cat src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652243827370-DjxeEK7YYXXp.jpeg">
        //   <img style="width: 150px;" tiger src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249821637-cT4N4NAhHzcX.jpeg">
        // </p>
        // <p><a href="https://procomponents.ant.design/components/editable-table" target="_blank">editable-table</a><span></span><span tipText="📌热文" deadline="20221223">📌热文</span><span></span></p>
        // <p><span tipText="📣新发布" createDate="20211212" deadline="22120309">📣新发布(5 months ago)</span></p>
        // <p>
        //   <iframe vid="BV1YT4y1Q7xx" src="https://player.bilibili.com/player.html?bvid=BV1YT4y1Q7xx" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe><span></span>
        // </p>
        // <p><abbr abbrName="HTML" fullName="Hyper Text Markup Language" data-tooltip="Hyper Text Markup Language">HTML</abbr></p>
        // <p>
        //   <img style="width: 150px;" help src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332602412-By7AEtwwyKe4.jpeg">
        //   <img style="width: 150px;" java src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332680187-rF5Xj86GGQTz.png">
        // </p>
        // <pre><code>@emoji{safe} 
        // @emoji{ichange} 
        // </code></pre>
        // `

        // console.log('输出前')
        // console.log(this.html)
        // console.log('输出后')

        // const test2 = '\n<h4>世界很大, 而我又是靓仔<span></span>\n  <el-rate star="3.3" disabled show-score text-color="#ff9900" value="3.3" score-template="{value}" style="display: inline-block"></el-rate><span></span>\n</h4>\n<p><del tagName="del">虽然说了句正确的废话</del><span></span></p>\n<p>\n  <img style="width: 150px;" dog src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249579841-Yty6cpQs34pj.jpeg">\n  <img style="width: 150px;" cat src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652243827370-DjxeEK7YYXXp.jpeg">\n  <img style="width: 150px;" tiger src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249821637-cT4N4NAhHzcX.jpeg">\n</p>\n<p><a href="https://procomponents.ant.design/components/editable-table" target="_blank">editable-table</a><span></span><span tipText="📌热文" deadline="20221223">📌热文</span><span></span></p>\n<p><span tipText="📣新发布" createDate="20211212" deadline="22120309">📣新发布(5 months ago)</span></p>\n<p>\n  <iframe vid="BV1YT4y1Q7xx" src="https://player.bilibili.com/player.html?bvid=BV1YT4y1Q7xx" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe><span></span>\n</p>\n<p><abbr abbrName="HTML" fullName="Hyper Text Markup Language" data-tooltip="Hyper Text Markup Language">HTML</abbr></p>\n<p>\n  <img style="width: 150px;" help src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332602412-By7AEtwwyKe4.jpeg">\n  <img style="width: 150px;" java src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332680187-rF5Xj86GGQTz.png">\n</p>\n<pre><code>@emoji{safe} \n@emoji{ichange} \n</code></pre>\n'

        const component = Vue.extend({
          // template: `<div>${this.html}</div>`,
          template: '<div>' + String(this.html) + '</div>',
        //   template: "<div>" + `<h4>世界很大, 而我又是靓仔<span></span>
        //   <el-rate star="3.3" disabled show-score text-color="#ff9900" value="3.3" score-template="{value}" style="display: inline-block"></el-rate><span></span>
        // </h4>
        // <p><del tagName="del">虽然说了句正确的废话</del><span></span></p>
        // <p>
        //   <img style="width: 150px;" dog src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249579841-Yty6cpQs34pj.jpeg">
        //   <img style="width: 150px;" cat src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652243827370-DjxeEK7YYXXp.jpeg">
        //   <img style="width: 150px;" tiger src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249821637-cT4N4NAhHzcX.jpeg">
        // </p>
        // <p><a href="https://procomponents.ant.design/components/editable-table" target="_blank">editable-table</a><span></span><span tipText="📌热文" deadline="20221223">📌热文</span><span></span></p>
        // <p><span tipText="📣新发布" createDate="20211212" deadline="22120309">📣新发布(5 months ago)</span></p>
        // <p>
        //   <iframe vid="BV1YT4y1Q7xx" src="https://player.bilibili.com/player.html?bvid=BV1YT4y1Q7xx" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe><span></span>
        // </p>
        // <p><abbr abbrName="HTML" fullName="Hyper Text Markup Language" data-tooltip="Hyper Text Markup Language">HTML</abbr></p>
        // <p>
        //   <img style="width: 150px;" help src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332602412-By7AEtwwyKe4.jpeg">
        //   <img style="width: 150px;" java src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332680187-rF5Xj86GGQTz.png">
        // </p>
        // <pre><code>@emoji{safe} @emoji{ichange}</code></pre>` + "</div>",

//           template: `<div>`
          
//           + `<h4>世界很大, 而我又是靓仔<span></span>
//           <el-rate class="inline-block" star="3.3" disabled show-score text-color="#ff9900" value="3.3" score-template="{value}"></el-rate><span></span>
//          </h4>
//          <p><del tagName="del">虽然说了句正确的废话</del><span></span></p>`

//  + `<p>
//       <img style="width: 150px;" dog src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249579841-Yty6cpQs34pj.jpeg">
//      <img style="width: 150px;" cat src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652243827370-DjxeEK7YYXXp.jpeg">
//      <img style="width: 150px;" tiger src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249821637-cT4N4NAhHzcX.jpeg">
//       </p>`

//       + 

//       `  <p>
//           <iframe vid="BV1YT4y1Q7xx" src="https://player.bilibili.com/player.html?bvid=BV1YT4y1Q7xx" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe><span></span>
//     </p>`

//          + `<div>`
        })

        return h(component, {})

        // return h('div', {
        //   domProps: {
        //     innerHTML: '<el-rate class="text-center mb-5" star="4.7" disabled="" show-score="" text-color="#ff9900" value="4.7" score-template="{value}"></el-rate>'
        //   }
        // })

        // return h('div', {
        //   domProps: {
        //     // innerHTML: `<div>hello</div>`,
        //     innerHTML: `<div>${this.html}</div>`,

        //   //   innerHTML: `<div><h4>世界很大, 而我又是靓仔<span></span>
        //   //   <el-rate star="3.3" disabled show-score text-color="#ff9900" value="3.3" score-template="{value}"></el-rate><span></span>
        //   // </h4>
        //   // <p><del tagName="del">虽然说了句正确的废话</del><span></span></p>
        //   // <p>
        //   //   <img style="width: 150px;" dog src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249579841-Yty6cpQs34pj.jpeg">
        //   //   <img style="width: 150px;" cat src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652243827370-DjxeEK7YYXXp.jpeg">
        //   //   <img style="width: 150px;" tiger src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652249821637-cT4N4NAhHzcX.jpeg">
        //   // </p>
        //   // <p><a href="https://procomponents.ant.design/components/editable-table" target="_blank">editable-table</a><span></span><span tipText="📌热文" deadline="20221223">📌热文</span><span></span></p>
        //   // <p><span tipText="📣新发布" createDate="20211212" deadline="22120309">📣新发布(5 months ago)</span></p>
        //   // <p>
        //   //   <iframe vid="BV1YT4y1Q7xx" src="https://player.bilibili.com/player.html?bvid=BV1YT4y1Q7xx" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen></iframe><span></span>
        //   // </p>
        //   // <p><abbr abbrName="HTML" fullName="Hyper Text Markup Language" data-tooltip="Hyper Text Markup Language">HTML</abbr></p>
        //   // <p>
        //   //   <img style="width: 150px;" help src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332602412-By7AEtwwyKe4.jpeg">
        //   //   <img style="width: 150px;" java src="https://luo0412.oss-cn-hangzhou.aliyuncs.com/1652332680187-rF5Xj86GGQTz.png">
        //   // </p>
        //   // <pre><code>@emoji{safe} 
        //   // @emoji{ichange} 
        //   // </code></pre></div>`

        //   }
        // })


      }
    }
  },
  setup() {

    const before = ref("");
    const after = ref("");
  
    watchDebounced(before, async () => {
        const res = await unifiedParser(before.value);

        console.log(String(res));
        after.value = String(res);
    }, { 
      debounce: 200, 
      maxWait: 1000
    });

    const coolmaVal = computed(() => {
      debugger
      return after.value
    });

    onMounted(() => {
      before.value = content
    })

    const getAfter = () => {
      return after.value
    }


    return {
      before,
      after,
      getAfter,
      weatherApi,
      emojiUrls,
      coolmaVal
    };
  },
};

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
