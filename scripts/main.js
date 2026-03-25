const loadData = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    // fetch(url).then(response => response.json()).then(data => {
    //     // console.log(data);
    showData(data.data);
    showIssueNumber(data.data);

}

const showWarningLables = (lables) => {
    return lables.map(l =>
        `<button class="btn btn-soft btn-secondary rounded-4xl border border-red-300">${l}</button>`
    ).join(" ");
}

const showIssueNumber = (data) => {
    const h1 = document.getElementById("IssueNumber");
    h1.innerText = `${data.length} Issues`;
}
// id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": 
// [
//     bug",
//     "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"

const showData = (datas) => {

    const cardContainer = document.getElementById('issuesContainer');
    cardContainer.innerHTML = "";

    datas.forEach(data => {

        const newCard = document.createElement('div');
        newCard.innerHTML = `
          <div
            class="shadow-sm max-w-72 p-4 space-y-4 rounded-md border-t-[3px] border-green-400"
          >
            <div class="flex justify-between">
              <div class="">
              
                <img src="./assets/${data.status}-Status.png" alt="" />
              </div>
           <button class="btn btn-xs btn-soft btn-secondary">${data.priority}</button>
              <!-- <button class="btn btn-xs  btn-soft btn-warning">Warning</button> -->
              <!-- <button class="btn btn-xs  btn-soft">Default</button> -->
            </div>
            <h1 class="font-semibold text-base">
              ${data.title}
            </h1>
            <p class="text-[#64748B] font-normal text-xs">
              ${data.description}
            </p>
          <div>
  <!-- <button
    id="labelsShow"
    class="btn btn-soft btn-secondary rounded-4xl border border-red-300"
  >
    Bug
  </button>
  <button class="btn btn-soft btn-warning rounded-4xl border border-yellow-300">
    help wanted
  </button> -->
  <!-- <button class="btn btn-soft btn-success  rounded-4xl border border-green-300">Enhancement</button> -->
  ${showWarningLables(data.labels)}
</div>

            <div class="border-t border-gray-200 space-y-3 p-3">
              <p class="text-[#64748B] font-normal text-xs">#1 by ${data.author}</p>
              <p class="text-[#64748B] font-normal text-xs">${data.createdAt}</p>
            </div>
          </div>
        `

        cardContainer.append(newCard);

    })

}

loadData();