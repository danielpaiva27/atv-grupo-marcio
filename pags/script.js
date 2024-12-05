document.addEventListener("DOMContentLoaded", () => {
    var timeDisplay = document.getElementById("time");
  
   function refreshTime() {
    const optionsDate = {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
  
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };
  
    const date = new Date();
    
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
    
    const formattedString = formattedDate.toLocaleLowerCase() + ' - ' + formattedTime
    
    timeDisplay.innerHTML = formattedString;
  }
  
  refreshTime()
  setInterval(refreshTime, 1000);
  });