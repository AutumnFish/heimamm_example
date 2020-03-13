import Vue from 'vue'

// 导入省市联动
import cityCascader from './cityCascader.vue'

// 导入企业列表
import enterpriseSelect from './enterpriseSelect.vue'
// 导入学科列表
import subjectSelect from './subjectSelect.vue'

Vue.component('cityCascader',cityCascader)
Vue.component('enterpriseSelect',enterpriseSelect)
Vue.component('subjectSelect',subjectSelect)