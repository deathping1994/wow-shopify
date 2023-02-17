$(document).on(`page:load page:change`, function () {
    if ($('.order-summary__section--discount .fieldset').length > 0) {
        $('.order-summary__section--discount .fieldset').append(`<div class="field">
  <div class="commander-wrapper">
      <input placeholder="Discount Code" class="commander-input" data-discount-field="true" autocomplete="off" aria-required="true" size="30" type="text" name="checkout[reduction_code]">
      </div>
      <button name="button" type="submit" class="commander-btn" aria-busy="false">
          <span class="btn__content visually-hidden-on-mobile" aria-hidden="true">
              Apply
          </span>
          <span class="visually-hidden">
              Apply Discount Code
          </span>
          <svg class="icon-svg icon-svg--size-16 btn__icon shown-on-mobile" aria-hidden="true" focusable="false"> <use xlink:href="#arrow"></use> </svg>
          <svg class="icon-svg icon-svg--size-18 btn__spinner icon-svg--spinner-button" aria-hidden="true" focusable="false"> <use xlink:href="#spinner-button"></use> </svg>
  </button>      </div>
  </div>`)
        $('.commander-input')[0].style.display = "none";
        $('.commander-btn')[0].style.display = "none";
        var token = '';
        $.get('/cart.js').then(response => {
            token = $.parseJSON(response).token
        }
        )
        $(".order-summary__section--discount .field__input-btn").on("click touchstart", function (event) {
//             event.preventDefault();
            var basecode = $("#checkout_reduction_code")[0].value;
            $.ajax({
                type: "POST",
                url: "https://wow-api.farziengineer.co/multistore/discount",
                headers: {
                    "Content-Type": "application/json"
                },
                data: `{"code":"${basecode}", "cartId":"${token}", "storeId":1}`,
            }).then((response) => {
                if (response.status == "true" || response.status == "True") {
                    $(".commander-input")[0].value = basecode;
//                     $(".commander-btn").click();
                }
            }
            ).catch(() => {
                $(".commander-input")[0].value = basecode;
//                 $(".commander-btn").click();
                
            }
            );
        });
        $(".edit_checkout .field__input-btn.btn").eq(0).on("click touchstart", function (event) {
            event.preventDefault();
            if ($("#checkout_reduction_code_mobile").length > 0) {
                var basecode = $("#checkout_reduction_code_mobile")[0].value;
                $.ajax({
                    type: "POST",
                    url: "https://wow-api.farziengineer.co/multistore/discount",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: `{"code":"${basecode}", "cartId":"${token}", "storeId":1}`,
                }).then((response) => {
                    if (response.status == "true" || response.status == "True") {
                        $(".commander-input")[0].value = basecode;
                        $(".commander-btn").click();
                    }
                }
                ).catch(() => {
                    $(".commander-input")[0].value = basecode;
                    $(".commander-btn").click();
                }
                );
            }
        });
    }
});
