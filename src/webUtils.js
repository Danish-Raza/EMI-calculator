import axios from "axios";
import endPoint from "./Constants";

let CancelToken = axios.CancelToken;
let requestTaskStatus = false;
let source = CancelToken.source();

const cancleRequest = () => {
	source.cancel('Operation canceled.');
}

const apiRequest = {
	getData: (api, data) => {
		if (requestTaskStatus === false) {
			requestTaskStatus = true;
			return axios.get((endPoint + api + "?"), { params: { ...data }, cancelToken: source.token }).then(response => response).catch(error => error)
		} else {
			cancleRequest();
			CancelToken = axios.CancelToken;
			source = CancelToken.source();
			return axios.get((endPoint + api + "?"), { params: { ...data }, cancelToken: source.token }).then(response => response).catch(error => error)
		}
	}
}

export default apiRequest;
