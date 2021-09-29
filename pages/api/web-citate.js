export default function handler(req, res) {

    if(req.method === "POST") {

        const link = req.body.link; 

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://citation-generator.scribbr.com/v2/webpages?q=" + link, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                res.json( result)
            })
            .catch(error => console.log('error', error));
    }
}