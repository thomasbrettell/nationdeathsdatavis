// Collapsing sidebar code obtained from: https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp
function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openButton").style.display = 'none';
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("openButton").style.display = "inline-block";
  }