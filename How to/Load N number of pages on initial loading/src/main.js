import Vue from 'vue'
import App from './App.vue'
import { PdfViewerPlugin } from '@syncfusion/ej2-vue-pdfviewer';

Vue.use(PdfViewerPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
})
