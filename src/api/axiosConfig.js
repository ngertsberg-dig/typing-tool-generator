import axios from "axios";

const init = () =>{
    return axios.create({
        baseURL: process.configs.apiPath
    })
}

export default init;