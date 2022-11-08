import Vue from 'vue'
import Element from 'element-ui'
import tr from 'element-ui/lib/locale/lang/tr-TR.js'

import locale from 'element-ui/lib/locale'
locale.use(tr)
Vue.use(Element, { locale: tr })
