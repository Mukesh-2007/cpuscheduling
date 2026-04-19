let processes = [];
let pid = 1;

function addProcess() {
    let at = +document.getElementById("at").value;
    let bt = +document.getElementById("bt").value;
    let pr = +document.getElementById("priority").value || 0;

    processes.push({ id: pid++, at, bt, pr, rt: bt });

    displayTable();
}

function displayTable() {
    let html = `
    <tr>
    <th>PID</th><th>AT</th><th>BT</th><th>PR</th>
    <th>CT</th><th>TAT</th><th>WT</th>
    </tr>`;

    processes.forEach(p => {
        html += `<tr>
        <td>P${p.id}</td>
        <td>${p.at}</td>
        <td>${p.bt}</td>
        <td>${p.pr}</td>
        <td>${p.ct || "-"}</td>
        <td>${p.tat || "-"}</td>
        <td>${p.wt || "-"}</td>
        </tr>`;
    });

    document.getElementById("table").innerHTML = html;
}

function calculate() {
    fcfs(); // you can switch based on dropdown
    showStats();
}

function fcfs() {
    let time = 0, gantt = "";

    processes.sort((a,b)=>a.at-b.at);

    processes.forEach(p => {
        if (time < p.at) time = p.at;

        p.ct = time + p.bt;
        p.tat = p.ct - p.at;
        p.wt = p.tat - p.bt;

        time = p.ct;
        gantt += `<div class="block">P${p.id}</div>`;
    });

    document.getElementById("gantt").innerHTML = gantt;
    displayTable();
}

function showStats() {
    let totalWT = 0, totalTAT = 0;

    processes.forEach(p => {
        totalWT += p.wt;
        totalTAT += p.tat;
    });

    let avgWT = (totalWT / processes.length).toFixed(2);
    let avgTAT = (totalTAT / processes.length).toFixed(2);

    document.getElementById("avg").innerHTML =
        `📊 Avg WT: ${avgWT} | Avg TAT: ${avgTAT}`;
}

function clearAll() {
    processes = [];
    pid = 1;
    document.getElementById("table").innerHTML = "";
    document.getElementById("gantt").innerHTML = "";
    document.getElementById("avg").innerHTML = "";
}