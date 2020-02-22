import { QueryFetcher } from "gqless";

/*
Listener code:
const listener = m => {
    if (m.data === "DATA_FETCHED") {
        this.$forceUpdate();
        window.removeEventListener("message", listener);
    }
};
window.addEventListener("message", listener);
*/

const vueFetch: QueryFetcher = async (endpoint: string) => {
    return async function (query: any, variables: any) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            mode: 'cors'
        });
        if (!response.ok) throw new Error(`Network error, received status code ${response.status}`);
        const json = await response.json();
        window.postMessage("DATA_FETCHED", window.location.href);
        return json;
    }
}