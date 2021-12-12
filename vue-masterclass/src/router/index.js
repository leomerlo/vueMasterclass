import PageHome from '@/components/PageHome.vue';
import PageThreadShow from '@/components/PageThreadShow.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '@/data.json';

const routes = [
  {
    path: '/',
    component: PageHome,
    name: 'Home',
  },
  {
    path: '/thread/:id',
    component: PageThreadShow,
    name: 'ThreadShow',
    props: true,
    beforeEnter (to, from, next) {
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id);
      if(threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,  
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;