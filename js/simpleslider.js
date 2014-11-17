(function($, window, document, undefined){

	var defaultSettings = {

		//width of visible scroll area
		width : 'auto',

		//height of visible area
		height : '400px',

		//auto run the slider
		autorun : true, 

		// Buttons always visible
		buttonVisible : true,

		distance : '1px',

		//buttons visible only on hover on slider
		visibleOnHover : true,

		//border radius
		borderRadius: '4px',

		// sets visibility of rail
		slideSpeed: 5000,

		// Display carousel indicator

		carouselIndicator: true,

	};

	$.fn.simpleSlider = function (suppliedsettings, option){

		return this.each(function(){
			var settings = $.extend(true, {}, defaultSettings);
			var $this = $(this);
			var slidercontainer = $this.find('div.slider');
			var sliderUl = slidercontainer.find('ul');
			var imgs = sliderUl.find('img');
			var imgWidth = imgs[0].width;
			var imgLen = imgs.length;

			if (typeof suppliedsettings === "object"){
				$.extend(true, settings, suppliedsettings);
			}

			var divS = '<div></div>',timeout,
			current = 0, ulS = '<ul></ul>';
			$this.css({
				height: settings.height,
				width: settings.width,
			});

			slidercontainer.css({
				width: 'inherit',
				height: 'inherit',
				overflow: 'hidden',
				'border-radius': '5px',
			});

			var button_prev = $(divS).addClass('button-prev slider-btn').css({
				background: 'rgba(242, 242, 242, 0.7)',
				padding: '15px',
				'font-size': '20px',
				cursor: 'pointer',
				position: 'absolute',
				top: $this.outerHeight()/2 + $this.offset()['top']-20 + 'px',
				display: settings.buttonVisible ? 'block' : 'none',
				zIndex: 99,
			}).data('dir', 'prev').html('<');

			var button_next = $(divS).addClass('button-next slider-btn').css({
				background: 'rgba(242, 242, 242, 0.7)',
				padding: '15px',
				'font-size': '20px',
				cursor: 'pointer',
				position: 'absolute',
				top: $this.outerHeight()/2 + $this.offset()['top']-20 + 'px',
				display: settings.buttonVisible ? 'block' : 'none',
				zIndex: 99,
				right: '23%',
			}).data('dir', 'next').html('>');

			if(settings.carouselIndicator){
				
				var crouselWrapper = $(ulS).addClass('crousel-ul').css({
					'padding': '10px 0',
					'list-style': 'none',
					position: 'absolute',
					width: $this.width(),
					background: 'rgba(0, 0, 0, 0.16)',
					'border-top': '1px solid rgba(0, 0, 0, 0.07)',
					top: $this.offset()['top']-32 + $this.height() + 'px',
				});
				createIndicators(imgLen);
			}

			if(settings.buttonVisible){
				$this.append(button_prev);
				$this.append(button_next);
			}

			$this.find('.slider-btn').hover(function(){
					$(this).css({
						color: 'blue',
						background: 'rgba(242, 242, 242, 0.8)',
					});
				}, function(){
					$(this).css({
						color: 'black',
						background: 'rgba(242, 242, 242, 0.7)',
					});
				});

			if(settings.buttonVisible && settings.visibleOnHover){
			  button_prev.css({ display: 'none' });
					button_next.css({ display: 'none' });
			  $this.hover(function(){
					button_prev.css({ display: 'block' });
					button_next.css({ display: 'block' });
				}, function(){
					button_prev.css({ display: 'none' });
					button_next.css({ display: 'none' });
				});
			}

			if(settings.autorun) { 
				autorun();
			}

			$this.find('.slider-btn').on('click', function(){
				var direction = $(this).data('dir');
				setCurrent(direction);
				if(settings.autorun) {
					clearTimeout(timeout);
					autorun();
				}
			});

			$this.find('.clouser-li').on('click', function(){
				current = $(this).data('number');
				
				transition();
				if(settings.autorun) {
					clearTimeout(timeout);
					autorun();
				}
				$(this).siblings().removeClass('clouser-li-active');
				$(this).addClass('clouser-li-active');
			});

			function autorun(){
				timeout = setInterval(function(){   
					 setCurrent('next');
				}, settings.slideSpeed);
			}

			function setCurrent(dir){
				var pos = current;
				pos+= (~~(dir === 'next') || -1);
				current = (pos < 0 ) ? imgLen -1 : pos % imgLen;
				transition();
			}

			function transition(coords){
				sliderUl.animate({
					'margin-left': coords || -(current * imgWidth)
				});
				if(settings.carouselIndicator){
					var liS = '<li></li>';
					console.log('running');

					console.log($this.find('.clouser-li').data('number'));
				}
			}

			function createIndicators(total){
				for(i=0 ; i < total; i++){
					var liS = '<li></li>';
					var new_li = $(liS).addClass('clouser-li').data('number', i);
					crouselWrapper.append(new_li);
				}
				$this.append(crouselWrapper);
			}
		});
	}
})(jQuery, window, document)