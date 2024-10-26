export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user && to.path !== '/login') {
      return navigateTo('/login')
    }
  })