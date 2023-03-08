export default (to, from, next) => {
  if (localStorage.getItem('msiAppAnggota') != null && localStorage.getItem('msiAppAnggota').length > 0) {
    next()
  } else {
    localStorage.removeItem('msiAppAnggota')
    next('/login')
  }
}
