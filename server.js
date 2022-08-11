const express = require("express"); //getting our express function
const cors = require("cors") //bringing our cors dependency
const app = express() //setting app to the invocation of express function
const PORT = 8000//added
let base_id = 4//added

app.use(express.json()) // allows us to use JSON
app.use(cors()) // enables us to make calls to ourselfs

// app.get
// app.post
// app.put / patch 
// app.delete
// app.get(route, a_function_to_do_things)
const magic_set = [
    { id: 1, set_name: "KTK"},
    { id: 2, set_name: "2X2"},
    { id: 3, set_name: "RAV"},
]


app.get("/api/magic_set", (request, respond) => {
    respond.send(magic_set)
});

app.post("/api/magic_set", (request, response) => {
    let new_set = {//added
        id: base_id,
        set_name: request.body.set_name
    }
    magic_set.push(new_set)
    base_id += 1
    response.status(200).send(magic_set)
});
// { id: 1, set_name: "KTK"},
app.put("/api/magic_set/:set_id", (request, response)=> {
    const set = magic_set.find( (set_object) => set_object.id === parseInt(request.params.set_id))
    console.log(set);
    set.set_name = request.body.set_name
    console.log("set after", set);
    response.status(200).send(magic_set)
});

app.delete("/api/magic_set/:set_id", (request, response) => {
    console.log(request.params.set_id);
    const set = magic_set.find( (set_object) => set_object.id === parseInt(request.params.set_id))
    magic_set.splice(request.params.set_id -1, 1)
    base_id--
    response.status(200).send(magic_set)
});

app.listen( PORT, () => {
    console.log(`we are live....${PORT}`);
});// puts our server live

//  npm init -y
// npm i express cors

