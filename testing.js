const axios = require('axios');
const body = '/alquran |114';
const values = body.slice(9);
const value = values.split('|');
const val = value[1];
const text = Number(val);
let dataApi = {};
let data;

if(!Number.isInteger(text)){
    dataApi['method'] = 'GET'
    dataApi['url'] = `https://api-alquranid.herokuapp.com/surah/search/${val}`
    axios.request(dataApi).then(function (response) {
        data = response.data.data[0].nomor
        const dataOnApi = {
            method: 'GET',
            url: `https://api-alquranid.herokuapp.com/surah/${data}`
        }
        axios.request(dataOnApi).then(function (response) {
            data = response.data.data
            console.log(data)
        }).catch(function (error) {
            console.error(error);
        });
    }).catch(function (error) {
        console.error(error);
    });
} else {
    dataApi['method'] = 'GET'
    dataApi['url'] = `https://api-alquranid.herokuapp.com/surah/${text}`
    axios.request(dataApi).then(function (response) {
        data = response.data.data
        console.log(data)
    }).catch(function (error) {
        console.error(error);
    });
}
