import { createRouter, createWebHistory } from 'vue-router';
import Enter from '@/views/enter_login/Enter';
import Dashboard from '@/views/Dashboard';
import AllItems from '@/views/children/AllItems';
import AllThemes from '@/views/children/AllThemes';
import ContentChapters from '@/views/children/ContentChapters';
import NewItem from '@/views/children/NewItem';
import EditItem from '@/views/children/EditItem';
import Register from '@/views/enter_login/Register';
import BadUser from '@/views/BadUser';
import CustomTheme from '@/views/children/CustomTheme';

const routes = [
  { path: '/', component: Enter, meta : { title: 'CRM Inmobiliario' } },
  { path: '/register', component: Register, meta: { title: 'Registrarse, CRM Inmobiliario' }},
  {
    path: '/dashboard', component: Dashboard,
    children: [
      {
        path: 'themes', component: AllThemes, meta : { title: 'All Themes | Developer Santander' }
      },
      {
        path: 'theme/:id', component: CustomTheme, meta : { title: 'Theme | Developer Santander' }
      },
      {
        path: 'chapters', component: ContentChapters, meta : { title: 'All Chapters | Developer Santander' }
      },
      {
        path: 'all-items', component: AllItems, meta : { title: 'All Items | Developer Santander' }
      },
      {
        path: ':id/new-item', component: NewItem, meta: { title: 'New Item | Developer Santander' }
      },
      {
        path: 'item/:id', component: EditItem, meta: { title: 'Edit Item | Developer Santander' }
      },
    ]
  },
  {
    path: '/bad-user', component: BadUser, meta: { title: 'Bad User | Developer Santander' }
  },
  {
    path: '/:catchAll(.*)', redirect: '/bad-user'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to) => { console.log(to.params.id)
  let moreInfo = to.params.id;
  if(moreInfo) document.title = to.meta.title + ' ' + moreInfo;
  else document.title = to.meta.title;
  document.getElementsByTagName('meta').namedItem('description').setAttribute('content',to.meta.title + ' ' + 'Diseño Web Cantabria - Santander - Alexei Suzdalenko - Santa Maria de Cayon, Saron')
});

export default router;
