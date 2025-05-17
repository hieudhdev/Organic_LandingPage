(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-150px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
        dots: true,
        nav: false,
    });

    window.changeImage = function(event, src) {
        document.getElementById('mainImage').src = src;
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        event.target.classList.add('active');
    };

    window.showProductModal = async function(product_id) {
        let products = []
        
        await import('../data/product-data.js')
        .then(data => {
            products = data.product_data;
        })
        .catch(error => {
            console.log('Import product_data fail')
        });
        
        const product = products.find(product => product.id === product_id)

        // Gán ảnh chính
        document.getElementById('mainImage').src = "./img/" + product.main_image;

        // // Cập nhật tiêu đề, giá, mô tả...
        document.querySelector('.modal .product-image').src = "./img/" + product.main_image;
        document.querySelector('.modal h2').textContent = product.title;
        document.querySelector('.modal .text-muted').textContent = 'SKU: ' + product.sku;
        document.querySelector('.modal .h4').textContent = '$' + product.price;
        document.querySelector('.modal s').textContent = '$' + product.original_price;
        document.querySelector('.modal p.mb-4').textContent = product.description;

        // Cập nhật thumbnail nếu cần...
        const thumbnailsContainer = document.querySelector('.modal .d-flex');
        thumbnailsContainer.innerHTML = ''; // Xoá các thumbnail cũ

        if (product.images && product.images.length > 0) {
            product.images.forEach((thumb, index) => {
                const img = document.createElement('img');
                img.src = "./img/" + thumb;
                img.alt = "Thumbnail " + (index + 1);
                img.className = "thumbnail rounded me-2";
                if (index === 0) img.classList.add("active");
                img.onclick = function (event) {
                    changeImage(event, img.src);
                };
                thumbnailsContainer.appendChild(img);
            });
        }

        // Hiển thị modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    };
    
})(jQuery);

