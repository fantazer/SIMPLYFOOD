$(document).ready(function () {

	var body = $('body')

	// watch window resize
	var windowSize = $(window).width()
	$(window).resize(function(){
		windowSize = $(window).width();
		return windowSize;
	});
	// watch window resize === end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight:scrollWidth
			});

		}
		modalState.isMofdalShow = true;
	};

	//openModal()

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight:0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function(){
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		},600);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-close, .modal-hide').click(function () {
		closeModal();
	});

	$('.modal-wrap').click(function(e){
		e.target.className === 'modal-wrap' ? closeModal() : false
	});

	//modals===end

	// fix top-menu
		var shrinkHeader = 250;
	var head = $('.header-wrap');
	var heightHeader = head.height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				body.css('paddingTop',heightHeader);
				head.addClass('shrink');
			}
			else {
					body.css('paddingTop',0);
					head.removeClass('shrink');
			}
	});
	// fix top-menu === end


	// toggle single
	body.on('click','.js-toggle',function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	// slide toggle
	body.on('click','.js-slide',function(){
		$(this).toggleClass('active')
		$(this).closest('.js-slide-wrap').toggleClass('active').find('.js-slide-cont').slideToggle(500);
	});
	// slide toggle === end

	// toggle class one from list
	var actionTick;
	(
		actionTick = function(){
				$('body').on('click','.js-tick',function(){
					var parent = $(this).closest('.js-tick-cont');
					parent.find('.js-tick').removeClass('active');
					$(this).addClass('active')
				});
			}
	)()
	// toggle class one from list === end

	//toggle class + neighbor
	body.on('click','.js-commutator-el', function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).toggleClass('active');
			}else{
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	// switch
	body.on('click', '.js-switch', function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
			var hasParent = $(this).closest('.js-switch-wrap').length
			if (hasParent < 1) {
				var groupItem = $(this).data("group");
				var selector = $('.js-switch[data-group=' + groupItem + ']');
				var size = selector.size()
				selector.each(function () {
					$(this).removeClass("active");
				});
				$('.js-switch-cont').each(function () {
					var hasParentInner = $(this).closest('.js-switch-wrap').length
					if ($(this).data("group") === groupItem && $(this).data("group") != undefined) {
						console.log('inner');
						if ($(this).data("item") === typeItem) {
							if (size === 1) {
								$(this).toggleClass("hidden")
							} else {
								$(this).removeClass("hidden")
							}
						} else {
							$(this).addClass("hidden");
						}
					} else {
						if ($(this).data("item") === typeItem) {
							$(this).toggleClass("hidden");
						}
					}
				});
			} else {
				var parent = $(this).closest('.js-switch-wrap');
				parent.find('.js-switch').removeClass('active')
				parent.find('.js-switch-cont').each(function () {
					if ($(this).data("item") === typeItem) {
						$(this).removeClass("hidden")
					} else {
						$(this).addClass("hidden");
					}
				});
			}
			$(this).addClass("active");
		}
	});
	// switch === end

	// toggle program types list
	var actionTab;
	(
		actionTab = function(){
			$('body').on('click','.js-tab',function(){
				var current = $(this).index();
				var parent = $(this).closest('.js-tab-wrap')
				parent.find('.js-tab-cont').removeClass('active')
				parent.find('.js-tab-cont').eq(current).addClass('active')
			});
		}
	)()
	// toggle program types list  === end

	// accordion row toggle
	body.on('click','.js-accordion-head', function(e){
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function(){
			if($(this).index()!=current){
				 $(this).find('.js-accordion-head').removeClass('active')
				 $(this).find('.js-accordion-content').slideUp('active')
			}else{
				 $(this).find('.js-accordion-content').slideToggle('active')
				 $(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end

	// dropdown
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// animate placeholder
	$('.input').each(function(){
		var current = $(this);
		if(current.data('placeholder')){
		var dataString = "<span class='input-placeholder-val'>"+current.data('placeholder')+"</span>";
			current.after(dataString);
			if ($(this).val()){
				$(this).attr('data-empty', !this.value);
			}
		}
	});

	$('.input').on('input', function (e) {
		$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
	});

	$('.input-placeholder-val').click(function(){
		$(this).parent().find('.input').focus(); //найти Input и повесить focus
	});
	// animate placeholder === end

	// === slick ===

	// review slider
	$('.slider-review').slick({
		slidesToShow: 4,
		speed: 800,
		dots:false,
		arrows:false,
		rows:0,
		responsive: [
			{
				breakpoint: 1200,
					settings: {
						slidesToShow: 3.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 769,
					settings: {
						slidesToShow: 2.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			},
			{
				breakpoint: 640,
					settings: {
						slidesToShow: 1.2,
						slidesToScroll: 1,
						infinite: false,
						arrows:false,
						dots: false,

				}
			}
		]
	});
	// review slider === end

	// === custom arrow el ===
	$('.js-control-right').click(function(){
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickNext');
	});

	$('.js-control-left').click(function(){
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickPrev');
	});
	// custom arrow el === end

	// === slick === end

	// animate scroll to id
	$(".js-scroll-to").mPageScroll2id({
		offset:100,
	});
	$(".slide-nav .js-scroll-to").click(function(){
		$('.slide-block').removeClass('slide-block--open');
		$('.head-toggle').removeClass('slide-block-toggle--open');
	});
	// animate scroll to id === end

	// drop click on contract
	body.on('click','.js-contract-el', function(e){
		$(this).find('input[type="radio"]').prop('checked', true);
	});
	// drop click on contract === end*/

	// slide menu
	body.on('click','.js-slide-block-toggle', function(event){
		$(".js-slide-block-toggle").not(this).removeClass('slide-block-toggle--open');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("slide-block--open")
			} else {
				$(this).removeClass("slide-block--open")
			}
		})
		$(this).toggleClass('slide-block-toggle--open');
	});
	// slide menu === end

		// phone mask
	var isFieldStart= true;
	var phoneMaskOption = {
			onKeyPress: function (cep, event, currentField, options) {
				if(cep == '+7(8' && isFieldStart){
					$('.input-mask--phone').val("+7(")
					return isFieldStart = false;
				}
				if(currentField.val().length<4){
					isFieldStart = true
				}
			}
		}
	$('.input-mask--phone').bind('paste', function(e) {
		$(this).unmask()
  	var data = e.originalEvent.clipboardData.getData('Text');
   	$(this).val(data.replace(new RegExp('\\+7\\(|8\\(', 'g'),"")).mask('+7(000)000-00-00', phoneMaskOption);
	});
	$('.input-mask--phone').mask('+7(000)000-00-00',phoneMaskOption);
	// phone mask === end

	// paralax
	if ($('.paralax-el').length > 0 && windowSize>1023) {
		$(window).scroll(function() {
			$('.paralax-el').each(function(){
				var depth = - $(window).scrollTop() / $(this).data('depth')*1;
				//depth = depth || 40
				$(this).css({
					"-webkit-transform" : "translate3d(0px, " + depth  + "%, 100px)",
				});
			})
		})
	}
	// paralax === end

	window.condition = {};
	window.condition.closeModal = closeModal
	window.condition.initModal = initModal


});
