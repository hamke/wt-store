var IMP = window.IMP; // 생략가능
IMP.init('imp21028697'); // "가맹점 식별코드(CID)"를 사용

function pay() {

  var product_price = document.getElementById('price');
  var product_option = document.getElementById('selectBox');

  if ( product_price !== null ) {
    var product_amount = product_price.innerHTML;
  } else if ( product_price == null && product_option !== null ) {
    var product_amount = product_option.options[selectBox.selectedIndex].value;
  } else {
    var product_amount = 1000;
  }

  IMP.request_pay({
    amount : product_amount,
  	buyer_name : '게스트(비회원)',
  	name : '워드프레스 상품 08'
    // pg: 'inicis', // version 1.1.0부터 지원.
    // pay_method: 'card',
    // merchant_uid: 'merchant_' + new Date().getTime(),
    // buyer_email: 'iamport@siot.do',
    // buyer_tel: '010-1234-5678',
    // buyer_addr: '서울특별시 강남구 삼성동',
    // buyer_postcode: '123-456',
    // m_redirect_url: 'https://www.yourdomain.com/payments/complete'
  }, function(rsp) {
    if (rsp.success) {
      var msg = '결제가 완료되었습니다. ';
      msg += '고유ID : ' + rsp.imp_uid;
      msg += '상점 거래ID : ' + rsp.merchant_uid;
      msg += '결제 금액 : ' + rsp.paid_amount;
      msg += '카드 승인번호 : ' + rsp.apply_num;
    } else {
      var msg = rsp.error_msg;
      // var msg = '결제에 실패하였습니다. ';
      // msg += '에러내용 : ' + rsp.error_msg;
    }
    alert(msg);
    $("#product_info")[0].reset();
  });

};
