const loadData = async (id = "allBtn") => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  // fetch(url).then(response => response.json()).then(data => {
  //     // console.log(data);
  showData(id, data.data);
  // showIssueNumber(data.data);
};

// const clicked = (id) => {

//     const btn = document.getElementById(id);

//     const btnAll = document.getElementById("allBtn");
//     const btnClosed = document.getElementById("clossedBtn");
//     const btnOpen = document.getElementById("openBtn");

//     btnAll.classList.remove("btn-primary");
//     btnClosed.classList.remove("btn-primary");
//     btnOpen.classList.remove("btn-primary");

//     btn.classList.add("btn-primary");

// }
const clicked = (id) => {
  const buttons = document.querySelectorAll(".nonActivebtn");
  buttons.forEach((btn) => btn.classList.remove("btn-primary"));

  id.classList.add("btn-primary");

};

const showWarningLables = (lables) => {
  return lables
    .map(
      (l) =>
        `<button class="${l === "bug" ? "btn btn-sm btn-soft btn-secondary rounded-4xl border border-red-300" : l === "help wanted" ? "btn btn-sm  btn-soft btn-warning rounded-4xl border border-yellow-300" : l === "enhancement" ? "btn btn-sm  btn-soft btn-success  rounded-4xl border border-green-300" : "btn  btn-sm btn-soft btn-success  rounded-4xl border border-green-300"}">
      ${l}
    </button>`,
    )
    .join(" ");
};

const modalBadge = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.labels);
  const mod = document.getElementById("modalContainer");
  mod.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = ` 
  
   <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box space-y-6 p-6">
          <h3 class="text-lg font-bold">${data.data.title}</h3>
           <div class="flex items-center gap-2">
        <button class="btn btn-xs btn-success text-white">Opened</button>
        <i class="fa-solid fa-circle-dot"></i>
        <p class="font-normal text-xs text-[#64748B]">Opened By ${data.data.author}</p>
        <i class="fa-solid fa-circle-dot"></i>
        <p class="font-normal text-xs text-[#64748B]">${data.data.updatedAt}</p>
      </div>
           <div id="modalLable">  
${showWarningLables(data.data.labels)}
          </div>  
          <p class="py-4 font-normal text-xs text-[#64748B]">
           ${data.data.description};
          </p>
         <div class="flex justify-between px-9 shadow-sm py-3">
        <div>
          <p class="font-normal text-xs text-[#64748B]">Assign:</p>
          <p>${data.data.assignee}</p>
        </div>

        <div>
          <p class="font-normal text-xs text-[#64748B]">Priority:</p>
          <button class="btn btn-xs btn-soft btn-info">${data.data.priority}</button>
        </div>
      </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  
`;

  mod.append(div);
  const dialog = div.querySelector("#my_modal_5");
  dialog.showModal();
};

// const labelsClass = (label) => {

//     const classToAdd = document.getElementById("labelBtn");
//     label.map(l => {
//         if (l === "bug") {
//             classToAdd.classList.add("btn btn-soft btn-secondary rounded-4xl border border-red-300");
//         }
//     })

// }

const showIssueNumber = (data) => {
  const h1 = document.getElementById("IssueNumber");
  h1.innerText = `${data.length} Issues`;
};
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

const showData = (id, datas) => {
  const cardContainer = document.getElementById("issuesContainer");
  cardContainer.innerHTML = "";

  let filterDAta;

  if (id === "allBtn") {
    filterDAta = datas;
  } else {
    filterDAta = datas.filter((data) => data.status === id);
  }

  showIssueNumber(filterDAta);
  filterDAta.forEach((data) => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
          <div onclick="modalBadge(${data.id})"
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
  ${showWarningLables(data.labels)}
          </div>

            <div class="border-t border-gray-200 space-y-3 p-3">
              <p class="text-[#64748B] font-normal text-xs">#1 by ${data.author}</p>
              <p class="text-[#64748B] font-normal text-xs">${data.createdAt}</p>
            </div>
          </div>
        `;

    cardContainer.append(newCard);
  });
};

loadData();


document.getElementById("searchBtn").addEventListener("click", () => {

  const input = document.getElementById("search");
  const searchValue = input.value.trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
      const allResults = data.data;
      const filterResults = allResults.filter(word => word.title.toLowerCase().includes(searchValue) || word.description.toLowerCase().includes(searchValue))

      filterResults.length > 0 ? showData("allBtn", filterResults) : alert("No Results Found");
    })


})