const loadData = (options, cb) => {

  let statusIndicator = document.getElementById('status');
  if (statusIndicator){
    statusIndicator.innerHTML = 'Loading data...';
  }
  function loadDataFromUrl(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                if (statusIndicator){
                  statusIndicator.parentNode.removeChild(statusIndicator);
                }

                if (data){
                  if (typeof Storage !== 'undefined'){
                    /* Set how long we want to cache the data for, in minutes. */
                    const expirationMinutes = 10;
                    let inXMinutes = new Date(new Date().getTime() + expirationMinutes * 60 * 1000);

                    localStorage.setItem('data', JSON.stringify(data));
                    localStorage.setItem('data_expiration', inXMinutes);
                  }

                  if (cb){
                    cb(null, data);
                  }
                }
                else{
                  throw 'data not loaded';
                }                    
            } else {
                if (cb){
                  cb(xhr);
                }
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  
  if (typeof Storage !== 'undefined'){
    let data = localStorage.getItem('data');
    const dataExpiration = Date.parse(localStorage.getItem('data_expiration')),
          dateNow = new Date();

    if (dataExpiration && data){
      if (dateNow > dataExpiration){
        loadDataFromUrl(options.url, cb);
      } else {
        try{
          data = JSON.parse(data);
          if (statusIndicator){
            statusIndicator.parentNode.removeChild(statusIndicator);
          }
          if (cb){
            cb(null, data);
          }
        } catch (err){
          if (cb){
            cb(err, null);
          }        
        }
      }
    }
    else{
      loadDataFromUrl(options.url, cb);
    }      
  } else {
    loadDataFromUrl(options.url, cb);
  }
}

export default loadData;
