setTimeout(function () {
    var cartInterval = setInterval(function () {
        if ($('.ucd-discount-code-grid').length > 0 && $('.ucd-discount-code-grid-farzipromo').length == 0) {
            $('.ucd-discount-code-grid').after(`<div class="ucd-discount-code-grid-farzipromo"> <div class="ucd-discount-code-container-farzipromo"> <input type="text" name="discount" placeholder="Gift Card or Discount Code" class="ucd-discount-field-farzipromo" value=""> <button type="button" class="ucd-apply-discount-code-farzipromo upside-ucd-apply-discount-code-farzipromo">Apply</button> </div> <span class="ucd-discount-error-farzipromo"></span> </div>`)
            $('.ucd-discount-code-grid').hide()
            $('.ucd-discount-code-grid-farzipromo').css({
                "border-bottom": "1px solid #f7f8f9",
                "padding": "20px",
                "line-height": "1.3",
                "margin": "0",
                "box-sizing": "border-box",
                "font-family": "inherit"
            })
            $('.ucd-discount-code-container-farzipromo').css({
                "position": "relative",
                "line-height": "1.3",
                "margin": "0",
                "padding": "0",
                "box-sizing": "border-box",
                "font-family": "inherit"
            })
            $('.ucd-discount-field-farzipromo').css({
                "-webkit-appearance": "none",
                "border-radius": "0",
                "box-shadow": "none",
                "line-height": "1.6",
                "font-family": "inherit",
                "display": "block",
                "padding": "10px 130px 10px 10px",
                "width": "100%",
                "border": "1px solid #ccc",
                "font-size": "14px",
                "outline": "none",
                "float": "none",
                "cursor": "pointer",
                "margin": "0",
            })
            $('.ucd-apply-discount-code-farzipromo').css({
                "position": " absolute",
                "top": " 0",
                "right": " 0",
                "bottom": " 0",
                "padding": " 10px 40px",
                "line-height": " normal",
                "width": " auto",
                "min-width": " 0",
                "height": " auto !important",
                "min-height": " 0",
                "outline": " none",
                "float": " none",
                "margin": " 0",
                "color": " var(--ucd-button-color, #fff)",
                "background-color": " var(--ucd-button-background-color, #64cf7d)",
                "border": " 0",
                "font-size": " 12px",
                "font-weight": " var(--ucd-button-font-weight, normal)",
                "border-radius": " 0",
                "cursor": " pointer",
                "text-transform": " uppercase",
                "visibility": " visible",
            })
            $(".ucd-discount-error-farzipromo").css({
                "font-size": "12px",
                "font-weight": "bold",
                "color": "#A40000",
                "text-transform": "uppercase",
                "line-height": "1.3",
            })
            var token = ""
            $.getJSON('/cart.js', function (cart) {
                token = cart.token
            });
            $(".ucd-apply-discount-code-farzipromo").on("click touchstart", function (event) {
                event.preventDefault();
                var basecode = $(".ucd-discount-field-farzipromo")[0].value;
                $.ajax({
                    type: "POST",
                    url: "https://farzipromo-api-stage.farziengineer.co/discount",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: `{"code":"${basecode}", "cartId":"${token}"}`,
                }).then((response) => {
                    if (response == "true" || response == "True") {
                        $(".ucd-discount-field")[0].value = basecode;
                        $(".ucd-apply-discount-code").click();
                        setTimeout(function () {
                            var couponlog_postrequest = {
                                url: "https://farzipromo-api-stage.farziengineer.co/couponlog",
                                method: "POST",
                                timeout: 0,
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            };
                            var v = setInterval(function () {
                                if ($(".upside-ucd-discount-grid .ucd-discount-label strong").text().length != 0 && $(".ucd-discount-error-farzipromo").text().length == 0) {
                                    couponlog_postrequest.data = JSON.stringify({
                                        coupon: basecode,
                                        log: $(".upside-ucd-discount-grid .ucd-discount-label strong").text(),
                                    });
                                    $.ajax(couponlog_postrequest).done(function (response) {
                                        console.log(response);
                                    });
                                    clearInterval(v);
                                }
                                else if ($(".upside-ucd-discount-grid .ucd-discount-label strong").text().length == 0 && $(".ucd-discount-error-farzipromo").text().length != 0) {
                                    couponlog_postrequest.data = JSON.stringify({
                                        coupon: basecode,
                                        log: $(".ucd-discount-error-farzipromo").text(),
                                    });
                                    $.ajax(couponlog_postrequest).done(function (response) {
                                        console.log(response);
                                    });
                                    clearInterval(v);
                                }
                            }, 500);
                        }, 2000);
                    }
                }).fail((response) => {
                    $(".ucd-discount-field")[0].value = basecode;
                    $(".ucd-apply-discount-code").click();
                    setTimeout(function () {
                        var couponlog_postrequest = {
                            url: "https://farzipromo-api-stage.farziengineer.co/couponlog",
                            method: "POST",
                            timeout: 0,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };
                        var v = setInterval(function () {
                            if ($(".upside-ucd-discount-grid .ucd-discount-label strong").text().length != 0 && $(".ucd-discount-error-farzipromo").text().length == 0) {
                                couponlog_postrequest.data = JSON.stringify({
                                    coupon: basecode,
                                    log: $(".upside-ucd-discount-grid .ucd-discount-label strong").text(),
                                });
                                $.ajax(couponlog_postrequest).done(function (response) {
                                    console.log(response);
                                });
                                clearInterval(v);
                            }
                            else if ($(".upside-ucd-discount-grid .ucd-discount-label strong").text().length == 0 && $(".ucd-discount-error-farzipromo").text().length != 0) {
                                couponlog_postrequest.data = JSON.stringify({
                                    coupon: basecode,
                                    log: $(".ucd-discount-error-farzipromo").text(),
                                });
                                $.ajax(couponlog_postrequest).done(function (response) {
                                    console.log(response);
                                });
                                clearInterval(v);
                            }
                        }, 500);
                    }, 2000);
                });
            });

            var interval = setInterval(() => {
                if ($(".ucd-discount-code-grid").length != 0 && $(".upside-ucd-discount-grid").length == 0) {
                    $(".ucd-discount-code-grid-farzipromo").show()
                    $(".ucd-discount-code-grid").hide()
                }
                if ($(".upside-ucd-discount-grid").length != 0) {
                    $(".ucd-discount-code-grid").show()
                    $(".ucd-discount-code-grid-farzipromo").hide()
                }
                $(".ucd-discount-error-farzipromo").text($(".ucd-discount-error").text());
            }, 200);
        }
    }, 1000);
}, 5000);
