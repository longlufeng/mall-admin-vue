import { createRouter, createWebHashHistory } from 'vue-router';
import login from '../views/login/login.vue';
import index from '../views/index/index.vue';
import register from '../views/login/register.vue';
import userIndex from '../views/user/userIndex.vue';
import userPwdMng from '../views/user/userPwdMng.vue';
import commodityIndex from '../views/commodity/commodityIndex.vue';
import commodityDetail from '../views/commodity/commodityDetail.vue';
import commodityClientIndex from '../views/commodity/client/commodityClientIndex.vue';
import commodityClientDetail from '../views/commodity/client/commodityClientDetail.vue';
import merchantIndex from '../views/merchant/merchantIndex.vue';
import merchantDetail from '../views/merchant/merchantDetail.vue';
import orderIndex from '../views/order/orderIndex.vue';
import orderDetail from '../views/order/orderDetail.vue';
import payIndex from '../views/pay/payIndex.vue';
import payResult from '../views/pay/payResult.vue';
 
const routes = [
  { path: '/', component: login ,meta: { title: "登录" }},
  { path: '/index', component: index ,meta: { title: "首页" }},
  { path: '/register', component: register ,meta: { title: "注册" }},
  { path: '/userIndex', component: userIndex },
  { path: '/userPwdMng', component: userPwdMng },
  { path: '/commodityIndex', component: commodityIndex },
  { path: '/commodityDetail', component: commodityDetail },
  { path: '/commodityClientIndex', component: commodityClientIndex ,meta: { title: "商品首页" }},
  { path: '/commodityClientDetail', component: commodityClientDetail ,meta: { title: "商品详情" }},
  { path: '/merchantIndex', component: merchantIndex },
  { path: '/merchantDetail:/', component: merchantDetail },
  { path: '/orderIndex', component: orderIndex ,meta: { title: "订单首页" }},
  { path: '/orderDetail:/', component: orderDetail ,meta: { title: "订单详情" }},
  { path: '/payIndex', component: payIndex ,meta: { title: "支付首页" }},
  { path: '/payResult:/', component: payResult ,meta: { title: "支付结果" }}
];
 
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
 
export default router;