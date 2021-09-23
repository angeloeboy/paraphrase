
export default function handler(req, res) {


    if(req.method === "POST") {
        const text = req.body.text; 
        // const mode = req.body.mode;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "text": text,
          "mode": "creative"
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://paraphraser.prod.hipcv.com/paraphrase", requestOptions)
            .then(response => response.json())
            .then(result => {
                let textResult = result.data;
                res.send({text: textResult, data: text})
            })
            .catch(error => console.log('error', error));

        }
    
}

