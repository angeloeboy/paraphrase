export default function handler(req, res) {

    if(req.method === "POST") {

        const text = req.body.text; 
        

        var myHeaders = new Headers();
        myHeaders.append("content-type", "application/x-www-form-urlencoded");
        myHeaders.append("x-rapidapi-host", "grammarbot.p.rapidapi.com");
        myHeaders.append("x-rapidapi-key", "28fde27943mshf749278252f326ep138d68jsn4b59edac8160");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("text", text);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("https://grammarbot.p.rapidapi.com/check", requestOptions)
          .then(response => response.json())
          .then(result => {
                res.send({grammarResult: result.matches})
            })
          .catch(error => console.log('error', error));

    }else{
      res.send("Add text to request")
    }
}