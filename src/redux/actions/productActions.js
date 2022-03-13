import * as actionTypes from './actionTypes';

export function getProductsSuccess(products) {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: products
    }
}

export function getProducts(categoryId) {
    return function (dispatch) {
        let url = "http://localhost:3000/products"
        if (categoryId) {
            url = url + "?categoryId=" + categoryId;
        }
        return fetch(url).then((response) => {
            return response.json()
        }).then((response) => {
            return dispatch(getProductsSuccess(response))
        })
    }
}

export function createProductSuccess(product) {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: product
    }
}

export function updateProductSuccess(product) {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: product
    }
}

export function saveProductApi(product) {
    return fetch("http://localhost:3000/products/" + (product.id || ""), {
        method: product.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveProduct(product) {
    return function dispatch(dispatch) {
        return saveProductApi(product).then((savedProduct) => {
            product.id ? dispatch(updateProductSuccess(savedProduct)) : dispatch(createProductSuccess(savedProduct))
            .catch((error) => {
                throw error
            })
        })
    }
}

export async function handleResponse(response){
    if(response.ok){
        return response.json()
    }

    const error = await response.text();
    throw new Error(error);
}

export function handleError(error){
    throw error;
}