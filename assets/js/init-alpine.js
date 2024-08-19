function data() {

  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem('dark')) {
      return JSON.parse(window.localStorage.getItem('dark'))
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', value)
  }

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.dark = !this.dark
      setThemeToLocalStorage(this.dark)
      }
    },
    isSideMenuOpen: false,
    toggleSideMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isSideMenuOpen = !this.isSideMenuOpen
      }
    },
    closeSideMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isSideMenuOpen = false
      }
    },
    isNotificationsMenuOpen: false,
    toggleNotificationsMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
      }
    },
    closeNotificationsMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isNotificationsMenuOpen = false
      }
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isProfileMenuOpen = !this.isProfileMenuOpen
      }
    },
    closeProfileMenu() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        this.isProfileMenuOpen = false
      }
    },
    isPagesMenuOpen: false,
    togglePagesMenu() {
      this.isPagesMenuOpen = !this.isPagesMenuOpen
    },
    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      if(!navigator.onLine){
        showMessage("msg",'<i class="bi bi-wifi-off icon"></i>'+" Aucune connexion, veillez vous connecté à l'internet");
      }else{
        $(document).on('click', 'a[data-role=delete]', function(){
          let id =$(this).data('id');
          $('#idSup').val(id);
          let Nom=$('#'+id).children('td[data-target=label]').text();
          document.getElementById('idSup').innerHTML = Nom;
      });
        this.isModalOpen = true
        this.trapCleanup = focusTrap(document.querySelector('#modal'))
      }
    },
    closeModal() {
      this.isModalOpen = false
      this.trapCleanup()
    },
  }
}

// La fonction qui permet d'afficher le message pour l"'utilisateur
function showMessage(object, content){
  msg.classList.add(object);
  msg.innerHTML = content;
  setTimeout(()=>{
      msg.classList.remove(object);
      msg.innerHTML="";
  }, 5000);
}
