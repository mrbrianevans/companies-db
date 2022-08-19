import http from "http";

const baseUrl = 'https://developer-specs.company-information.service.gov.uk'

const corsHeaders = origin => [['Access-Control-Allow-Origin', origin??'*'], ['Access-Control-Allow-Methods','*'], ['Vary','Origin']]

const requestListener = function (req, res) {
    console.log(new Date(), 'Proxying', req.url)
    fetch(baseUrl + req.url).then(r=> {
        if(res.statusCode !== 200) console.error('Non OK status code:', res.statusCode, req.url)
        const headers = Object.fromEntries(Array.from(r.headers.entries()).concat(corsHeaders(req.headers.origin)))
        res.writeHead(res.statusCode, headers)
        r.text().then(t=>res.end(t))
    })
}


export const startServer = () => new Promise(resolve => {
    const s = http.createServer(requestListener).listen(31428, ()=>resolve(s))

});


