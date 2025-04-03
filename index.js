const express = require("express");

const app = express();
const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

//  Store -

const store = [

]



app.post("/store", (req, res) => {
    const instance = req.body;
    console.log(instance);
    if (instance) {
        store.push(instance);
        res.send("Stored successfully")
        const timer = instance.ttl * 1000
        setTimeout(() => {

            store.map((item, index) => {
                if (instance.ttl === item.ttl) {
                    valueIndex = index
                    store.splice(index, 0);

                }

            })
            console.log("deleted instance ")
        }, timer)
    } else {
        res.send("Invalid Format")
    }
});

app.get("/retrieve/:key", (req, res) => {

    const key = req.params;
    console.log(key, " this is username")
    if (key) {
        console.log(store, " This is the store")
        store.map((item) => {
            if (item.key === key.key) {
                let obj = {
                    key: item.key,
                    value: item.value
                };
                res.send(obj)
            } 
            console.log("key is present ")
        })
        res.send("Key not found");
    } else {
        res.send("Key not found")
    }

})

app.delete("/remove/:key", (req, res) => {

    const key = req.params;

    if (key) {
        store.map((item, index) => {
            if (item.key === key.key) {
                store.splice(index, 1);
                res.send("Key removed")
            } else {
                res.send("Key not removed")
            }
        })
        console.log("store after the delete ", store);

    } else {
        res.send("Provide a valid key")
    }

})


app.listen(PORT, () => console.log("Server Started"));