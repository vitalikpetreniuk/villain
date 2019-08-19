$(function () {

    $('select').customSelect();

    $(window).on('load scroll', function () {

        if ($(this).scrollTop() > 1) {
            $('.header').addClass('sticky');
        }else{
            $('.header').removeClass('sticky');
        }

    }).on('load resize', function () {
        if (window.matchMedia('(min-width: 1200px)').matches) {
            $('body').removeClass('with-header-open');
        }
        if (window.matchMedia('(min-width: 798px)').matches) {
            $('body').removeClass('with-filter-open');
            $('.product-page-name').prependTo('.product-page-info');
            $('.product-page-reviews').insertAfter('.product-page-info-block');
            $('.cart-item-img').each(function () {
                $(this).prependTo($(this).closest('.cart-item'));
            });
        }else{
            $('.product-page-reviews').prependTo('.product-page-wrap');
            $('.product-page-name').prependTo('.product-page-wrap');
            $('.cart-item-img').each(function () {
                $(this).prependTo($(this).siblings('.cart-item-cont'));
            });
        }

        var alertHeight = $('.header-alert').outerHeight();
        $('body.with-alert').css('margin-top', alertHeight);
    });

    $('.slider-banner').owlCarousel({
        items: 1,
        nav: true
    });

    $('.lang-current').on('click', function () {
        $('.lang').toggleClass('open');
    });

    $('.search-toggle').on('click', function (e) {
        $('.search').toggleClass('open');
        $('body').toggleClass('with-search-open');
        e.stopPropagation();
    });

    $('.search').on('click', function (e) {
        e.stopPropagation();
    })

    $(document).click(function() {
        $('.search').removeClass('open');
        $('body').removeClass('with-search-open');
    });

    $('.filter-item-title').on('click', function () {
        $(this).closest('.filter-item').toggleClass('open');
    });

    $('.qty').each(function () {
       $(this).append('<button class="qty-less"></button><div class="qty-val"></div><button class="qty-more"></button>');
       var numInput = $(this).find('input');
       var inputVal = numInput.val();
       var qtyLess = $(this).find('.qty-less');
       var qtyMore = $(this).find('.qty-more');
       var qtyVal = $(this).find('.qty-val');
        qtyVal.text(inputVal);
        qtyLess.on('click', function () {
            if(parseInt(inputVal) !== 1){
                inputVal = inputVal - 1;
            }
            numInput.val(inputVal);
            qtyVal.text(inputVal);
        });
        qtyMore.on('click', function () {
            inputVal = parseInt(inputVal) + 1;
            numInput.val(inputVal);
            qtyVal.text(inputVal);
        });
    });

    $('.shipping-item-cont-form input').on('focus', function () {
        $(this).closest('.form-block').addClass('focused');
    }).on('blur', function () {
        if($(this).val().length === 0){
            $(this).closest('.form-block').removeClass('focused');
        }
    });

    if($('.header-alert').length){
        $('body').addClass('with-alert');
    }

    $('.header-alert-close').on('click', function () {
        $('.header-alert').slideUp('fast');
        $('body').removeClass('with-alert');
    });

    var productSlider = $('.product-slider > div');
    var productSliderMain = $('.product-slider-main');
    var productSliderNav = $('.product-slider-nav');

    productSlider.find('.item').each(function () {
        var productId = $(this).index();
        $(this).attr('data-id', productId);
    });

    productSliderMain.owlCarousel({
        items:1,
        margin: 10,
        dots: true,
        loop: true,
        mouseDrag: false,
        autoHeight: true,
        responsive:{
            0:{
                smartSpeed: 250
            },
            1230:{
                smartSpeed: 1
            }
        }
    })

    productSliderNav.owlCarousel({
        items:5,
        dots: true,
        nav: true,
        loop: true,
        center: true,
        mouseDrag: false,
        touchDrag: false,
        responsive:{
            0:{
                margin: 22
            },
            1200:{
                margin: 30
            }
        }
    }).on('translated.owl.carousel', function() {
        var slideActive = $(this).find('.owl-item.center').attr('data-id');
        productSliderMain.find('.owl-dot[data-target="' + slideActive + '"]').trigger('click');
    });

    productSliderNav.find('.owl-item').on('click', function () {
        var slideClicked = $(this).attr('data-id');
        productSliderNav.find('.owl-dot[data-target="' + slideClicked +'"]').trigger('click');
        var slideActive = productSliderNav.find('.owl-item.center').attr('data-id');
        productSliderMain.find('.owl-dot[data-target="' + slideActive +'"]').trigger('click');
    });

    productSlider.find('.item').each(function(){
        $(this).parent().attr('data-id', $(this).attr('data-id'));
    });

    productSlider.find('.owl-dot').each(function () {
        $(this).attr('data-target', $(this).index());
    });

    productSliderMain.find('.owl-dot').on('click', function () {
        var dotClicked = $(this).attr('data-target');
        productSliderNav.find('.owl-dot[data-target="' + dotClicked +'"]').trigger('click');
    });


    $('.tabs-nav-item').on('click', function () {
        var tabIndex = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.tabs').find('.tabs-cont-item').each(function () {
           if($(this).index() === tabIndex){
               $(this).addClass('active').siblings().removeClass('active');
           }
        });
    });

    $('.accordion-item-title').on('click', function () {
       $(this).closest('.accordion-item').toggleClass('active').siblings().removeClass('active');
    });

    $('.header-mob-select-current').on('click', function () {
        $(this).closest('.header-mob-select-in').toggleClass('open');
    });

    $('.header-toggle').on('click', function () {
       $('body').addClass('with-header-open');
    });

    $('.header-mob-close, .shadow').on('click', function () {
       $('body').removeClass('with-header-open');
    });

    $('.catalog-filter-open, .catalog-choice').on('click', function () {
        $('body').addClass('with-filter-open');
    });

    $('.catalog-filter-close').on('click', function () {
        $('body').removeClass('with-filter-open');
    });
});
