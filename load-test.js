
import autocannon from "autocannon";

const test = autocannon(

    {
        url: "http://localhost:8000",
        connections: 75,
        duration: 10,
        pipelining: 1,
        requests: [
            {
                method: "GET",
                path: "/api/v1/matches"
            }
        ]
    }, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("\nLoad test completed!");
        console.log("Requests:", result.requests);
        console.log("Latency:", result.latency);
        console.log("Errors:", result.errors);
        console.log("Timeouts:", result.timeouts);
    });

autocannon.track(test, {
    renderProgressBar: true,
    renderResultsTable: true
});
