export default function handler(req, res) {
    const text = req.body.text; 

    var myHeaders = new Headers();
    myHeaders.append("cookie", "_gcl_au=1.1.835881840.1631698317; user_status=not registered; _gid=GA1.2.2128840742.1632493637; _uetsid=857b73601d4311ec9b94bf807d06909e; _uetvid=c54754a0160711ec8133a15396f23173; qdid=f70a074e-4120-41ab-9e0b-8210618dc502; connect.sid=s%3AkJK1q1tZ6y2ln7FW2AkFL3lTvJMYeY9u.84ZcJBJqeDDxVt%2Fv9ewBeBv5nFebSv6M6pouAL2jihM; _ga_KQNKKHJ2B0=GS1.1.1632493647.4.0.1632493647.0; _ga=GA1.1.1296652232.1631698317; amp_6e403e=14qZF3K5-KyuLgpSd77qV4...1fgc3849o.1fgc38pcs.l.0.l; connect.sid=s%3ABgJjQ9zRW24r_tIC30YkrGgRIu19e409.9Sz2emZjPSCZkI7robq%2Bg4DitgMTCjPyHQEvMMOg2kI");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({  
        "isFluency": true,
        "text": text
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };  

    fetch("https://rest.quillbot.com/api/utils/grammar-check/", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
            res.send(result)
        })
      .catch(error => console.log('error', error));
}