import http from 'k6/http';
import { sleep, check } from 'k6';
import {Rate} from 'k6/metrics';

export let errorRate = new Rate('error');

// configurations
export let options = {
    vus : 100,
    duration : '1m',
    // thresholds : {
    //     'errors' : ['rate<0.01'],    // we want errors to be less than 1%
    //     'http_req_duration' : ['p(95)<500']     // 95% req should be complete within 500ms
    // }

}

export default function(){
    let res = http.get("http://localhost:3000/api/v1/todos/allTodos");
 
    let success = res.status === 200;

    error.Rate.add(!success);   // counting error rate

    sleep(1/100);   // sleep(0.01), meaning the VU will pause for 0.01 seconds before starting the next iteration
}