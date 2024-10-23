import http from 'k6/http';
import { sleep, check } from 'k6';

// rampup-steady-rampdown
export let options = {
    stages: [
        { duration: '30s', target: 30 },  // Ramp-up: from 0 to 30 VUs in 30 seconds
        { duration: '1m', target: 20 },   // Steady-state: keep 20 VUs for 1 minute
        { duration: '30s', target: 5 },   // Ramp-down: reduce to 5 VUs in 30 seconds
    ],
};

export default function(){
    let res = http.get("http://localhost:3000/api/v1/todos/allTodos");
 
    let success = res.status === 200;

    error.Rate.add(!success);   // counting error rate

    sleep(1/100);   // sleep(0.01), meaning the VU will pause for 0.01 seconds before starting the next iteration
}
