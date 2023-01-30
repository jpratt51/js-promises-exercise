// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

const url = 'http://numbersapi.com/7';
const promise = axios.get(url);
promise.then((res) => console.log(res.data));

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

const url2 = 'http://numbersapi.com/7,8,9';
const promise2 = axios.get(url2);
promise2.then((res) => console.log(res.data));

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

const four_facts = [];

const url3 = 'http://numbersapi.com/7';
axios.get(url3)
    .then(p1 => {
        four_facts.push(p1.data);
        return axios.get(url3);
    })
    .then(p2 => {
        four_facts.push(p2.data);
        return axios.get(url3);
    })
    .then(p3 => {
        four_facts.push(p3.data);
        return axios.get(url3);
    })
    .then(p4 => {
        four_facts.push(p4.data);
    })
    .then(() => {
        for (let i in four_facts) {
            const new_li = document.createElement("li");
            new_li.innerText = four_facts[i];
            fact_list.append(new_li)
        }
    })
    .catch(err => {
        console.log(err);
    });