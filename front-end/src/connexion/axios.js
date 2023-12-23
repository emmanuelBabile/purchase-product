import axios from "axios";

const apiProduct = axios.create({
    baseURL:"http://localhost:8080/api/product"
})
export default apiProduct;