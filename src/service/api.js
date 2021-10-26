export const API_URL = 'https://djts.eshopee.com.br/api'
export const GET_ITENS = (uri) => {
    return {
        url: `${API_URL}${uri}`,
        options: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    }
}
/*
            headers: {
                'Content-Type': 'application/json',
            },
*/
export const POST_ITENS = (body, uri, method) => {
    return {
        url: `${API_URL}${uri}`,
        options: {
            method: method,
            // headers: {
            //     'Content-Type': 'multipart/form-data; application/json',
            // },
            body: body,
        },
    }
}
export const GET_CEP = (uri) => {
    return {
        url: `https://viacep.com.br/ws/${uri}/json/`,
        options: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    }
}
export const GET_FRETE = (uri) => {
    return {
        url: `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&${uri}&StrRetorno=xml`,
        options: {
            method: 'GET',
        }
    }
}