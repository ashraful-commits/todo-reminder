const date_time = document.getElementById('date_time');
const result = document.querySelector('.result')
const audio_one = document.getElementById('audio')
const output = document.getElementById('output');
const msg = document.querySelector('.msg');

      
let setInt = setInterval(() => {
   
    getAllTodo()
}, 1000);

const getAllTodo = () => {
    let allData = getLsData('todo');
    let list = ''
    if (!allData || allData == '') {
       msg.innerHTML= setAlert('No reminder Found','primary')
    }
    if (allData) {
       
        allData.map((item, index) => {
           
            list += `
            <li class=" w-100 shadow my-3 bg-primary text-white">
            <div class="d-flex justify-content-between align-items-center w-100 h-100">

              <div class="bg-warning d-flex justify-content-center align-items-center" style="width:30px;height:50px;"><span class="text-capitalize">${index + 1}</span> </div>

                <div class="d-flex w-100 ms-1 flex-column h-25">
                <div class="d-flex justify-content-between">
                    <span class="text-capitalize w-75">Order : ${item.order}</span> 
                    <span class="text-capitalize  w-75  ">Clint : ${item.clint}</span> 
                    <span class="text-capitalize   w-100  ">${
                    timerFunction(item.time_cur,item.date, item.time,setInt,audio_one)
                    }</span>
                </div>
                <div class="progress mt-1 rounded-0 text-center">
                <div class="progress-bar bg-white h-100 text-center" style="width:${
                       progressBar(item.date, item.time,setInt,item.time_cur)
                     };">
                      <span class="sr-only bg-warning text-dark"> Complate ${progressBar(item.date, item.time,setInt,item.time_cur)}</span>
                      </div>
                  </div>
                  </div>
                  
         
                  <div style="width:40px; height:50px" class="bg-warning ms-1 d-flex justify-content-center align-items-center ">  <button  index = "${index}" class=" btn btn-sm btn-white d-block">Stop</button></div>
          </div>
        </li>  
            `
        })
    }
    result.innerHTML = list;
}
getAllTodo();
 



date_time.addEventListener('submit', (e) => {
    e.preventDefault();
    let curTime = {
       'time_cur':Date.now() 
    } 
    const form_data = new FormData(e.target);
    let object_data =Object.fromEntries(form_data.entries());
   
    let { order, clint, date, time } = object_data;
    let newObj = {
        ...object_data,...curTime
    }

    if (!order|| !clint ||!date || !time) {
        msg.innerHTML =setAlert('All fields are required !');
    } else {
        msg.innerHTML = '';
        setLsData('todo', newObj);
        
        e.target.reset();
        getAllTodo();
      
    }
        
})  


output.onclick = (e) => {
    e.preventDefault();
   
    if (e.target.classList.contains('btn-close')) {
        let data = getLsData('todo');
        let index = e.target.getAttribute('index');
        data.splice(index, 1);
        updateLsData('todo', data);
        getAllTodo();
        audio_one.pause();
     
    }
}
