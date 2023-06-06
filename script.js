//create the object to get value in funcion//
const formData={
  firstName:"",
  lastName:"",
  gender:"",
  address:"",
  pincode:"",
  foodType:[],
  state:"",
  country:"",
};

reloadTable(JSON.parse(localStorage.getItem("data")));

//To save the data in local browser storage//

function saveDataInStorage(value = {}){
  try {
    const data = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data")) : [];
    data.push(value)
    localStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
  window.location.reload();
}

//Create the function to get the values from user //

function handleInput(element){
  console.log(element.id, element.name, element.type);
  if(element.type === "radio"){
        formData[element.name] = element.id;
  }else if(element.type === "checkbox"){
    if(formData[element.name].includes(element.id)){
formData[element.name]=formData[element.name].filter(
  (d)=> d !== element.id);
      }else{
        formData[element.name].push(element.id)
      } 
  }else{
    formData[element.id]=element.value;
  }
} 

//To get the data and click to add the data using button function//
function handleSave(){
  if(formData.foodType.length >= 2){
    saveDataInStorage(formData);
    reloadTable(json.parse(localStorage.getItem("data")));
  }else{
    throw new Error("Food type should atleast 2")
  }
}

//creating the reload table to get a new form
function reloadTable(data=[]){
  const tableBody =document.querySelector("tbody");
  tableBody.append(...renderRows(data));
}

//Creating the table function to get an data from input
function renderRows(data=[]){
const rows=[];
if(data.length > 0){
  data.forEach((e)=>{
    const rowElement=document.createElement("tr");
    rowElement.append(...renderColumns(e));
    rows.push(rowElement);
  });
}
  return rows;
}

function renderColumns(data = {}) {
  const tds = [];
  if (Object.values(data).length > 0) {
    Object.values(data).forEach((d) => {
      const td = document.createElement("td");
      td.innerText = d;
      tds.push(td);
    });
  }
  return tds;
}