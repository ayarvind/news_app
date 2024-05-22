import axios from "axios";
import { API_BASE_URL, XRapidAPIKey, XRapidAPIHost } from '../app.json';

export type FetchProps = {
    endpoint: string;
    method?: string;
    body?: any;
    keywork?: string;
    headers?: any;
};

export type ResponseProps = {
    data: any;
    loading: boolean;
    error: any;
};

async function useFetch(props: FetchProps): Promise<ResponseProps> {
    const options = {
        method: props.method ? props.method : 'GET',
        url: `${API_BASE_URL}/${props.endpoint}`,
        params: { 
            lr: 'en-IN',
            keyword: props.keywork   

         },
        headers: {
            'X-RapidAPI-Key': XRapidAPIKey,
            'X-RapidAPI-Host': XRapidAPIHost,
            ...props.headers 
        },
        data: props.body 
    };

    try {
        const response = await axios.request(options);
        return {
            data: response.data,
            loading: false,
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
            loading: false,
            error: error
        };
    }
}

export default useFetch;
