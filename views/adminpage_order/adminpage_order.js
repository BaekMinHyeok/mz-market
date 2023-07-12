import fetchData from "./order_getdata.js";
import deleteData from "./order_deletedata.js";

document.addEventListener("DOMContentLoaded", async function () {
  try{
        //주문 조회
       await fetchData();

        //주문 수정

        const selectElement = document.querySelectorAll("#shipping");
        console.log(selectElement);
        selectElement.forEach((select,index)=>{
          select.addEventListener("change", async function(event) {
            const status = selectElement[index].value;
            const url = `http://localhost:3000/api/order/${status}`
            const token =localStorage.getItem("token");
            const id = event.target.dataset.id;
            const orderModification={
              orderId : Number(id),
              status : status
            }
            console.log(id);
            try{
                const result = await fetch(url,  {
                   method: "PUT",
                   headers:{
                     authorization: `Bearer ${token}`,
                     "Contetn-Type": "application/json"
                   },
                   body: JSON.stringify(orderModification)
                })
                if(result.success){
                  console.log(result.message);
                }else{
                  console.log("오류")
                }
            }catch(err){
              console.log(err);
            }

          });
        })

 

  
    
        //삭제 기능

        const deleteBtn = document.querySelectorAll(".delete-btn");
        deleteBtn.forEach(button => {
        button.addEventListener("click", async function (event) {
        const orderId = event.target.dataset.orderid;
        console.log(orderId);
        const trElement = this.parentNode.parentNode;
        trElement.remove();
        await deleteData(orderId);
        });

    });
  }catch(err){
    console.log(err);
  }
});