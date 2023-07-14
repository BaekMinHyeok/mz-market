async function ModifyData(status) {
  // const url = `http://localhost:3000/api/order/status/update`;
  const url = `/api/order/status/update`;
  const token = localStorage.getItem("token");
  const id = event.target.dataset.id;
  const orderModification = {
    orderId: Number(id),
    status: status,
  };
  // console.log(orderModification);
  // console.log(id);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderModification),
    });
    const result = await response.json();
    // console.log(result);
    if (result.success) {
      // console.log(result.message);
      if (status === "ready") alert("배송 상태를 준비로 변경했습니다.");
      if (status === "shipping") alert("배송 상태를 진행으로 변경했습니다.");
      if (status === "complete") alert("배송 상태를 완료로 변경했습니다.");
    } else {
      // console.log("오류");
      alert("에러가 발생했어요. 관리자에게 문의해주세요.");
    }
  } catch (err) {
    // console.log(err);
    alert("에러가 발생했어요. 관리자에게 문의해주세요.");
  }
}

export default ModifyData;
