$(window).resize(function(event) {
	$('.slide').slick('setPosition');
	pageScrollDown();
});

$(document).ready(initPage);
function initPage(){
	mobileMenu();
	header_fixed_class();
	customForm();
	slider();
	validateFields();
	pageScrollDown();
}

function customForm() {
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: false,
	});
	jcf.replaceAll();
}

function mobileMenu(){
	$('<span class="open-menu"><span></span><span></span><span></span><span></span></span>').appendTo('.header-page > .container');
	$('<span class="fader"/>').appendTo('.header-page > .container');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
}

function header_fixed_class(){
	let header = $('.header-page');
	let heightEl  = 0;
	$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
	$(window).scroll(function(event){
		$(window).scrollTop() > heightEl ? header.addClass('modify') : header.removeClass('modify');
	});
}

function pageScrollDown(){
	$(".btn-down").click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top - $('.header-page').outerHeight();
		$("html, body").stop().animate({
			scrollTop: offsetTop
		}, 600);
		e.preventDefault();
	});
}

function slider(){
	$('.slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		arrows: false,
		fade: true,
		infinite: true,
		autoplaySpeed: 2500
	});
}

function validateFields(){
	let form = document.querySelector('.formWithValidation');
	let fields = form.querySelectorAll('.js-field');

	function validateEmail(data) {
		let testData = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(testData.test(data)) {
			return true;
		}
		return false;
	}

	var generateError = function(text) {
		var error = document.createElement('label')
		error.classList.add('error');
		error.innerHTML = text;
		return error;
	}

	var removeValidation = function() {
		var errors = form.querySelectorAll('.error');
		for (var i = 0; i < errors.length; i++) {
			errors[i].remove();
		}
	}

	function checkFields() {
		for (var i = 0; i < fields.length; i++) {
			if (!fields[i].value) {
				var error = generateError('Field is empty');
				form[i].parentElement.classList.add('form__box_error');
				form[i].parentElement.insertBefore(error, fields[i]);
			}
		}
	};

	document.getElementById('username').onblur = function() {
		let status = document.getElementById('username').value;
		let error = generateError('');
		if (status.length <= 0) {
			if (this.parentElement.querySelector('.error') == null) {
				this.parentElement.prepend(error);
			}
			this.parentElement.querySelector('.error').innerHTML = 'Field is empty';
			this.parentElement.classList.add('form__box_error');
		} else {
			if (this.parentElement.querySelector('.error') !== null) {
				this.parentElement.querySelector('.error').remove();
			}
			this.parentElement.classList.remove('form__box_error');
		}
	};

	document.getElementById('email').onblur = function() {
		let status = document.getElementById('email').value;
		let error = generateError('');
		if (status.length <= 0) {
			if (this.parentElement.querySelector('.error') == null) {
				this.parentElement.prepend(error);
			}
			this.parentElement.querySelector('.error').innerHTML = 'Field is empty';
			this.parentElement.classList.add('form__box_error');
		} else if (!validateEmail(status)) {
			this.parentElement.querySelector('.error').innerHTML = 'Invalid email address!';
			this.parentElement.classList.add('form__box_error');
		} else {
			if (this.parentElement.querySelector('.error') !== null) {
				this.parentElement.querySelector('.error').remove();
			}
			this.parentElement.classList.remove('form__box_error');
		}
	};

	document.getElementById('select').onchange = function() {
		let status = document.getElementById('select').value;
		let error = generateError('');
		if (status.length <= 0) {
			if (this.parentElement.querySelector('.error') == null) {
				this.parentElement.prepend(error);
			}
			this.parentElement.querySelector('.error').innerHTML = 'Field is empty';
			this.parentElement.classList.add('form__box_error');
		} else {
			if (this.parentElement.querySelector('.error') !== null) {
				this.parentElement.querySelector('.error').remove();
			}
			this.parentElement.classList.remove('form__box_error');
		}
	};

	document.getElementById('message').onblur = function() {
		let status = document.getElementById('message').value;
		let error = generateError('');
		if (status.length <= 0) {
			if (this.parentElement.querySelector('.error') == null) {
				this.parentElement.prepend(error);
			}
			this.parentElement.querySelector('.error').innerHTML = 'Field is empty';
		} else {
			if (this.parentElement.querySelector('.error') !== null) {
				this.parentElement.querySelector('.error').remove();
			}
			this.parentElement.classList.remove('form__box_error');
		}
	};

	form.addEventListener('submit', function(e){
		e.preventDefault();

		removeValidation();
		checkFields();
	});
}
