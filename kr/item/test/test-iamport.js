var IMP = window.IMP;
IMP.init('imp14840138'); // KakaoPay ( leden_online@naver.com )
// IMP.init('imp90524050'); // NicePay ( the235style@yahoo.com )

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
  	buyer_name : '게스트(비회원) 07',
  	name : '워드프레스 상품 07'
    // pg: 'inicis', // version 1.1.0부터 지원.
    // pay_method: 'card',
    // merchant_uid: 'merchant_' + new Date().getTime(),
    // buyer_email: 'iamport@siot.do',
    // buyer_tel: '010-1234-5678',
    // buyer_addr: '서울특별시 강남구 삼성동',
    // buyer_postcode: '123-456',
    // m_redirect_url: 'https://www.yourdomain.com/payments/complete'
  }, function (rsp) {

        if (rsp.success) {

            //[1] 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
            jQuery.ajax({

                url: "./process/index.php", //cross-domain error가 발생하지 않도록 동일한 도메인으로 전송
                type: 'POST',
                dataType: 'json',
                // headers: { "Content-Type": "application/json" },
                data: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid
                }

            }).done(function(data) {

                //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
                alert("ajax done");
                console.log("ajax done");

                if (data.status=='success') {

                    var msg = '결제가 완료되었습니다.';

                    msg += '\n고유ID : ' + rsp.imp_uid;
                    msg += '\n상점 거래ID : ' + rsp.merchant_uid;
                    msg += '\결제 금액 : ' + rsp.paid_amount;
                    msg += '카드 승인번호 : ' + rsp.apply_num;

                    alert(msg);
                    console.log(msg);

                } else {

                    //[3] 아직 제대로 결제가 되지 않았습니다.
                    //[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
                    var msg = '아직 제대로 결제가 되지 않았습니다.';
                    alert(msg);
                    console.log(msg);

                }


            }).fail(function () {

                alert("ajax fail");
                console.log("ajax fail");

            }).always(function () {

                alert("ajax always");
                console.log("ajax always");

            });

        } else {

            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);

        }

    });

};
