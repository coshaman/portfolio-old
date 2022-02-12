/* ===================================================================
 * Howdy - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000           // stats animation duration
	},	
	$WIN = $(window);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

	      // will first fade out the loading animation 
	    	$("#loader").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	}; 


	/* FitVids
	------------------------------------------------------ */ 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	};  		

   
	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function() {

		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {
			containerBricks.masonry( {	
			  	itemSelector: '.brick',
			  	resize: true
			});
		});
	};


	/*	Light Gallery
	------------------------------------------------------- */
	var ssLightGallery = function() {

		$('#folio-wrap').lightGallery({  
			showThumbByDefault: false,
			hash: false,
			selector: ".item-wrap"		
		});
	};


  	/* Menu on Scrolldown
	 * ------------------------------------------------------ */
	var ssMenuOnScrolldown = function() {

		var menuTrigger = $('#header-menu-trigger');

		$WIN.on('scroll', function() {

			if ($WIN.scrollTop() > 150) {				
				menuTrigger.addClass('opaque');
			}
			else {				
				menuTrigger.removeClass('opaque');
			}

		}); 
	};

	
  	/* OffCanvas Menu
	 * ------------------------------------------------------ */
   var ssOffCanvas = function() {

	       var menuTrigger = $('#header-menu-trigger'),
	       nav             = $('#menu-nav-wrap'),
	       closeButton     = nav.find('.close-button'),
	       siteBody        = $('body'),
	       mainContents    = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function(e){
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function(e){
			e.preventDefault();
			menuTrigger.trigger('click');	
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function(e){		
			if( !$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span') ) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

   };


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};


  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};


  /* Stat Counter
  	*------------------------------------------------------- */
  	var ssStatCounter = function() {

	   var statSection = $("#stats"),
	   stats           = $(".stat-count");

	   statSection.waypoint({
	   	handler: function(direction) {

	      	if (direction === "down") { 
				   stats.each(function () {
					   var $this = $(this);

					   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
					   	duration: cfg.statsDuration,
					   	easing: 'swing',
					   	step: function (curValue) {
					      	$this.text(Math.ceil(curValue));
					    	}
					  	});
					});
	       	} 

	       	// trigger once only
	       	this.destroy(); 
			},	
			offset: "90%"	
		});

  	};


  	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	

  /* Animations
	* ------------------------------------------------------- */
	var ssAnimations = function() {

		if (!$("html").hasClass('no-cssanimations')) {
			$('.animate-this').waypoint({
				handler: function(direction) {

					var defAnimationEfx = cfg.defAnimation;

					if ( direction === 'down' && !$(this.element).hasClass('animated')) {
						$(this.element).addClass('item-animate');

						setTimeout(function() {
							$('body .animate-this.item-animate').each(function(ctr) {
								var el       = $(this),
								animationEfx = el.data('animate') || null;	

	                  	if (!animationEfx) {
			                 	animationEfx = defAnimationEfx;	                 	
			               }

			              	setTimeout( function () {
									el.addClass(animationEfx + ' animated');
									el.removeClass('item-animate');
								}, ctr * 50);

							});								
						}, 100);
					}

					// trigger once only
	       		this.destroy(); 
				}, 
				offset: '95%'
			}); 
		}

	};
	

  /* Intro Animation
	* ------------------------------------------------------- */
	var ssIntroAnimation = function() {

		$WIN.on('load', function() {
		
	     	if (!$("html").hasClass('no-cssanimations')) {
	     		setTimeout(function(){
	    			$('.animate-intro').each(function(ctr) {
						var el = $(this),
	                   animationEfx = el.data('animate') || null;		                                      

	               if (!animationEfx) {
	                 	animationEfx = cfg.defAnimation;	                 	
	               }

	              	setTimeout( function () {
							el.addClass(animationEfx + ' animated');
						}, ctr * 300);
					});						
				}, 100);
	     	} 
		}); 

	};


  /* Contact Form
   * ------------------------------------------------------ */
   var ssContactForm = function() {   	

   	/* local validation */   	
		$('#contactForm').validate({

			/* submit via ajax */
			submitHandler: function(form) {				
				var sLoader = $('#submit-loader');			

				$.ajax({   	
			      type: "POST",
			      url: "inc/sendEmail.php",
			      data: $(form).serialize(),

			      beforeSend: function() { 
			      	sLoader.fadeIn(); 
			      },
			      success: function(msg) {
		            // Message was sent
		            if (msg == 'OK') {
		            	sLoader.fadeOut(); 
		               $('#message-warning').hide();
		               $('#contactForm').fadeOut();
		               $('#message-success').fadeIn();   
		            }
		            // There was an error
		            else {
		            	sLoader.fadeOut(); 
		               $('#message-warning').html(msg);
			            $('#message-warning').fadeIn();
		            }
			      },
			      error: function() {
			      	sLoader.fadeOut(); 
			      	$('#message-warning').html("Something went wrong. Please try again.");
			         $('#message-warning').fadeIn();
			      }
		      });    		
	  		}

		});
   };	

 
  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	



  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssFitVids();
		ssMasonryFolio();
		ssLightGallery();
		ssMenuOnScrolldown();
		ssOffCanvas();
		ssSmoothScroll();
		ssPlaceholder();
		ssStatCounter();
		ssAlertBoxes();
		ssAnimations();
		ssIntroAnimation();		
		ssContactForm();
		ssBackToTop();

	})();
 

})(jQuery);



function animation(){
		   document.getElementById('credentials').innerHTML = `
		   <div class="row narrow section-intro with-bottom-sep">
   		<div class="col-twelve">
   			<h3>Animation</h3>
	   		<h1>애니메이션</h1>  			
	   		
	   		<p class="lead">와타시(쑻) 사실은 애니메이션도 좋아한다능... 이게 다 내가 봤던 애니메이션이라능...<span class="lead" style="color:blue;">매우 좋음</span>	
			<span class="lead" style="color:green;">좋음</span>		
			<span class="lead" style="color:orange;">보통</span>
			<span class="lead" style="color:brown;">별로</span>	
			<span class="lead"  style="color:black;">평가 거부</span></p>
   		</div>   		
   	</div> <!-- end row section-intro -->

        <div class="box2" style="text-align: center; font-size: 2.5rem; font-family: 'Black Han Sans', sans-serif; line-height: 5rem;width:80%; margin:0 auto;">
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">프리큐어 시리즈</p>
            <p style="font-family : '고딕';">입☆덕☆계☆기입니다. 남주가 적은 걸 좋아하는 제 애니 평가의 기준이자 지금도 보는 시리즈입니다. 최애는 무인편, 예프파, 허그프리입니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">소녀종말여행</p>
            <p style="font-family : '고딕';">개인적으로 좋아하는 애니메이션입니다. 철학과 개그 사이의 미묘한 긴장감을 놓치 않은 내용과 연출이 좋습니다. 하지만 동인지가 없으면 의미가 없습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">케모노프렌즈 1기</p>
            <p style="font-family : '고딕';">보는 동안 즐거웠습니다. 한국어 더빙도 좋아합니다. 2기가 좋았다면 아직도 기억에 남았을테지요.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">프리코네 1기</p>
            <p style="font-family : '고딕';">저런 종류의 게임은 깔지고 해보지도 않았지만 애니메이션은 재밌게 봤습니다. 그치만 캬루쨩 배신자잖아?</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">코노스바</p>
            <p style="font-family : '고딕';">1기와 2기 모두 제 취향의 훌륭한 애니메이션이었습니다. 주연에 남주가 있는 애니메이션으로는 유일하게 매우 좋음 평가를 주고 싶습니다. 감독과 아쿠아와 작화의 환장의 콜라보가 기가 막혔습니다. 익스플로젼</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:black;">리제로</p>
            <p style="font-family : '고딕';">잘 봤고 사실 여러모로 마음에는 들었지만 남주라 평가를 거부합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">사카모토입니다만</p>
            <p style="font-family : '고딕';">개그애니로서는 수작이라고 생각합니다. 컨셉도 그렇고 내용도 그렇고 꽤 괜찮지만 남주인데다가 다른 좋음 등급 애니메이션보다는 조금 별로인 것 같아서 보통등급입니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">무능한 나나</p>
            <p style="font-family : '고딕';">1화가 너무나 충격적이었습니다만, 연출을 조금만 더 신경썼다면 훨씬 좋았을 것 같습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">괴롭히지 말아요, 나가토로양</p>
            <p style="font-family : '고딕';">나가토로가 호불호가 갈린다는데, 전 호입니다. 물론 M은 아니고요. 타카기보다 선호하는 편이었는데 요새는 타카기가 더 좋습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">신세기 에반게리온</p>
            <p style="font-family : '고딕';">에반게리온은 명작이었습니다. 특히 엔드오브에바의 강렬함과 파의 처절함을 좋아합니다. 파보다 엔드오브에바를 좀 더 선호하는 편입니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:brown;">BTOOOM!</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:brown;">학원묵시록</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">해피 슈가 라이프</p>
            <p style="font-family : '고딕';">주제, 연출, 효과, 캐릭터성, 대사 무엇 하나 마음에 들지 않는 것이 없습니다. 치명적 유해물 사이에 백합 치유물로 시청에 전혀 부담이 없었으며 결말의 강렬함은 개인적으로 엔드오브에바, 마마마 반역의 이야기와 함께 가장 좋아합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">보석의 나라</p>
            <p style="font-family : '고딕';">개인적으로 케모노 프렌즈와 비슷한 느낌이 들었습니다. 캐릭터성과 내용도 좋지만, 무엇보다 3d 애니메이션으로서 훌륭한 영상미가 인상적입니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:black;">기생수</p>
            <p style="font-family : '고딕';">주제와 함께 제목의 의미가 끝에 가서 밝혀진다는 십덕들이 좋아서 환장하는 클리셰가 훌륭했습니다. 하지만 남주니까 의미 없습니다. 평가 거부합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">카구야님은 고백받고 싶어!</p>
            <p style="font-family : '고딕';">러브 코미디로서는 가장 좋아하는 애니메이션입니다. 캐릭터성과 함께 내용의 치밀함, 짧고 가벼운 분위기와 함께 훌륭한 연출, 무엇보다 후지와라 서기가 마음에 들었습니다. 심심할때마다 보고 있습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">미래일기</p>
            <p style="font-family : '고딕';">얀데레 무서워요.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">샤를로트/엔젤비트</p>
            <p style="font-family : '고딕';">제가 보기에 둘 다 거기서 거기인 것 같습니다. 호불호 갈리고 불호가 좀 많은데, 전 둘 다 좀 감동적이라고 생각해서 좋음 평가 드립니다. 실제로는 보통과 좋음 사이의 어딘가죠.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">어나더</p>
            <p style="font-family : '고딕';">공포 애니라는 생소한 장르를 잘 살린 수작입니다. 한 번 볼 가치가 있습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">사이다처럼 말이 톡톡 솟아올라</p>
            <p style="font-family : '고딕';">내용도 뻔하고 갈등을 좀 욱여넣는 느낌이지만, 뇌 비우고 보기 좋은 청춘 연애물입니다. 저같은 모쏠 아다한테는 희망고문이죠. 죽어라 인싸들</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:black;">인류는 쇠퇴했습니다.</p>
            <p style="font-family : '고딕';">이건 분명 봤는데 기억이 안나고 op의 딴딴따라~ 딴딴따라~ 하는 비트만 생각나서 평가가 불가능했습니다. 하지만 꽤 좋았던 걸로 기억합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">마녀의 여행</p>
            <p style="font-family : '고딕';">개인적으로 매우 좋음을 주고 싶었지만 2기가 안나왔으므로 좋음입니다. 각 에피소드 별 주제에 맞는 연출과 분위기, 특히 그 에피소드의 충격적인 연출이 인상적이었습니다. 무엇보다 남주가 없습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">러키☆스타</p>
            <p style="font-family : '고딕';">이건 남주도 없고 개그도 내취향이고 다 좋았는데 코나타 볼 때마다 자꾸 지인 중 누군가가 생각나는 바람에 도저히 더 볼 수가 없었습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">청춘 돼지는 바니걸 선배의 꿈을 꾸지 않는다.</p>
            <p style="font-family : '고딕';">만약 이 작품을 보셨다면 스스로가 십덕이라고 자부할 수 있을겁니다. 제목의 강렬함을 이겨낸 다음의 훌륭하고 짜임새 있는 내용, 개성 있는 캐릭터들이 좋은 작품입니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">어쨌든 귀여워</p>
            <p style="font-family : '고딕';">저도 귀엽습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">우에노 선배는 서툴러</p>
            <p style="font-family : '고딕';">전체적으로 사카모토랑 비슷한 평가입니다만, 남주가 고자고 여주가 심하게 나사가 빠진 게 문제입니다. 애니에서 보면 고자들한테 여자가 꼬이던데, 고자라 꼬이는지 여자가 꼬이는데 고자인건지 모르겠습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">불꽃소방대</p>
            <p style="font-family : '고딕';">개인적으로 귀칼, 진격거, 나루토 수준은 아니지만 꽤 볼만했습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:blue;">마법소녀 마도카☆마기카</p>
            <p style="font-family : '고딕';">제 인생에 있어 마지막 명작 애니이자 프리큐어 이후 가장 저를 불태웠던 애니였습니다. 프리큐어 같은 깜찍함 속에 에반게리온을 뛰어넘는 잔혹함과 해슈라를 집어삼키는 강렬한 엔딩, 마녀의 여행을 넘어서는 연출과 호무호무가 있었습니다. 개인적으로 그냥 명작 애니가 있고, 역사에 길이 남을 명작 애니가 있다면, 이건 후자라고 확신합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">가브릴 드롭아웃</p>
            <p style="font-family : '고딕';">캐릭터, 연출, 내용, 다 좋았습니다. 무엇보다 가브릴이 십덕 되기 이전과 이후의 저를 보는 느낌이 들어서 뭔가 몰입이 됐습니다. 비네도 귀엽고, 남주도 없고, 여러모로 제 취향의 애니메이션을 묻는다면 거론할만한 애니였습니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:green;">플라워링 하트</p>
            <p style="font-family : '고딕';">뽀로로를 제외하면 제가 처음으로 본 애니메이션입니다. 개인적으로 레전드히어로 삼국전, 미라큘러스와 함께 ebs가 수신료의 가치를 가장 훌륭하게 지켜냈을 때가 아닐까 생각됩니다. 개인적으로 아쉬운 부분이 없지는 않지만 연출, 내용 면에서 훌륭하고 제 취향에도 맞는 작품이었습니다. 3기까지 나와서 잘 끝맺었다면 허긋토 프리큐어 또는 그 이상의 작품이었으리라고 생각합니다.</p>
			<p style="text-decoration: none; font-size: 4.5rem; color:orange;">경녀!!!!!</p>
            <p style="font-family : '고딕';">십덕의 길에 들어서기도 전에 유튜브로 접한 애니메이션입니다. 이걸 거부감 없이 본걸 보면 전 이미 싹수가 노랬죠. 참고로 당시 전생슬, 투러브트러블 등도 봤습니다. 미친놈이지 내가</p>
         </div>
		   
		   
		   `;
	document.getElementById('portfolio').innerHTML = `
<div class="row narrow section-intro with-bottom-sep">
   		<div class="col-twelve">
   			<h3>Project</h3>
	   		<h1>프로젝트</h1>  			
	   		
	   		<p class="lead">진행한 프로젝트들입니다. 대회 참가용 프로젝트, 진행 중인 프로젝트, 소실된 프로젝트 등은 없습니다.</p>	   			
   		</div>   		
   	</div> <!-- end row section-intro -->

        <div class="box2" style="text-align: center; font-size: 2.5rem; font-family: 'Black Han Sans', sans-serif; line-height: 5rem">
            <a href="https://coshaman.github.io/Coogle/index.html" target="_blank" style="text-decoration: none; font-size: 4.5rem;"><span style="color: rgb(64, 129, 237, 1)">C</span><span style="color: rgb(228, 65, 52, 1)">o</span><span style="color: rgb(244, 183, 5, 1)">o</span><span style="color: rgb(64, 129, 237, 1)">g</span><span style="color: rgb(51, 163, 81, 1)">l</span><span style="color: rgb(228, 65, 52, 1)">e</span></a>
            <p style="font-family : '고딕';">구글, 네이버, 다음, 픽사베이, SNS, 멜론 등의 검색엔진을 모은 사이트 입니다.</p>
            <a href="https://coshaman.github.io/dorichat/index.html" target="_blank" style="text-decoration: none; font-size: 4.5rem;">도리 Chat</a>
            <p style="font-family : '고딕';">심심해서 만든 채팅 프로그램 입니다. 간단한 채팅과 시간, 포인트, 검색, 로또, 가르치기 기능이 있습니다.</p>
            <a href="https://coshaman.github.io/ajaeC/index.html" target="_blank" style="text-decoration: none; font-size: 5rem; font-family: webisfree; color: saddlebrown;">AjaeC</a>
            <p style="font-family : '고딕';">아재 양성 사이트입니다. 아재개그 출석 체크, 상점, 아재 개그 스피드퀴즈, 도리 Chat으로 이루어져 있습니다.</p>
            <a href="https://coshaman.github.io/testLove/" target="_blank" style="text-decoration: none; font-size: 5rem; color : #F781F3; font-family: 'Single Day', cursive;">짝사랑 테스트!</a>
            <p style="font-family : '고딕';">모쏠은 외롭네요...그래서 만든 짝사랑 테스트 입니다.</p>
            <a href="https://coshaman.github.io/hackertyper/" target="_blank" style="text-decoration: none; font-size: 5rem; color : #40FF00; font-family: webisfree, cursive;">HackerTyper</a>
            <p style="font-family : '고딕';">개인 유튜브 촬영을 위해 만든 해커 타이퍼입니다. 속도 조절/테마 기능이 있고 엔터, esc를 눌러 해커가 된 기분을 낼 수도 있습니다.</p>
            <a href="https://coshaman.github.io/book/" target="_blank" style="text-decoration: none; font-size: 5rem; color : saddlebrown; font-family: 'Black And White Picture', sans-serif;">독서기록장</a>
            <p style="font-family : '고딕';">그동안 읽은 100권 이상의 도서에 대한 간단한 기록과 평점입니다.</p>
            <a href="https://coshaman.github.io/testLove/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">중2병 문구 제조기!</a>
            <p style="font-family : '고딕';">심심해서 짝사랑 테스트!를 재탕해봤습니다. 라노벨을 쓰고 계시다면 주문 영창에 활용하시기 좋겠군요.</p>
<a href="https://coshaman.github.io/testrepository1/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">터미널 테마</a>
<a href="https://coshaman.github.io/testrepository1/fun.html" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">전화번호 입력기</a>
<a href="https://coshaman.github.io/games/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">게임</a>
<a href="https://coshaman.github.io/teamdelta/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">팀 델타</a>
<a href="https://coshaman.github.io/memo/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">메모장</a>
<a href="https://coshaman.github.io/keyboard/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">뭔지 모르겠음</a>
<a href="https://coshaman.github.io/cupon/news.html" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">낚시</a>
<a href="https://coshaman.github.io/card/" target="_blank" style="text-decoration: none; font-size: 5rem; color : black; font-family: 'Single Day', cursive;">카드 생성기</a>

        </div>`
		   var offset = $("#credentials").offset();
        $('html, body').animate({scrollTop : offset.top}, 400);
	   }
