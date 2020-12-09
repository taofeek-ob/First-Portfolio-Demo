$('li').on('click', function() {
  $('.active').removeClass('active');
  $(this).addClass('active');
}).has("a[href*='" + location.pathname + "']").addClass("active");

$(document).ready(function(){
  $('.header').height($(window).height());
})
if ($('.typed').length) {
  var typed_strings = $(".typed").data('typed-items');
  typed_strings = typed_strings.split(',')
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}

$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});

$(".navbar a").click(function(){
  $("body,html").animate({
   scrollTop:$("#" + $(this).data('value')).offset().top
  },1000)
  
 })


 //smooth scrolling 
 
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


//TWITTER



//// ===== Scroll to Top ==== 
$(window).scroll(function() {
  if ($(this).scrollTop() > 50 ) {
      $('.scrolltop:hidden').stop(true, true).fadeIn();
  } else {
      $('.scrolltop').stop(true, true).fadeOut();
  }
});
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".top").offset().top},"1000");return false})})

		

// # seconds to animation end
var animTime = 78009; // ~8 minutes for all tweets with pics, reduce for text-only tweets

$(function() {
  loadTwitterWidget();
});

function loadTwitterWidget() {
  var timelineData = [
    {
      sourceType: "profile",
      screenName: "taofeek_ob"
    },
    $("#twit")[0],
    {
      chrome: "noheader nofooter noscrollbar noborders transparent",
      height: 300,
      width: 400
    }
  ];

  // injected iframe element(s) after twitter API finds widgets
  var iframe;

  // element(s) we want to scroll
  var viewport;

  // initial scroll distance
  var initialDistance;

  // restart scroll on new tweet since twttr does not have a new tweet event
  var newTweetObserver = new MutationObserver(scroll);

  // hide elements we do not want to see
  function getElemsToHide() {
    return [
      $(".timeline-InformationCircle", iframe),
      $(".timeline-LoadMore", iframe),
      $(".timeline-NewTweetsNotification", iframe)
    ];
  }

  function hideElements(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].hide();
    }
  }

  function scroll() {
    // reset to top
    viewport.stop().scrollTop(0);

    hideElements(getElemsToHide());

    // calculate new distance assuming height is varied
    var distance =
      viewport.prop("scrollHeight") -
      viewport.prop("scrollTop") -
      viewport.height();

    // calculate duration based on initial speed to ensure uniform scroll speed
    var duration = animTime * (distance / initialDistance);

    // if there is something to scroll
    if (viewport.prop("scrollHeight") > viewport.height()) {
      viewport.animate(
        {
          scrollTop: distance
        },
        {
          easing: "linear",
          duration: duration,
          done: scroll
        }
      );
    }
  }

  twttr.ready(function(twttr) {
    // create twitter timeline
    // IE11 can't handle Rest parameters. If you want to support IE11, use the following line instead:
    // twttr.widgets.createTimeline.apply(this, timelineData);
    twttr.widgets.createTimeline(...timelineData);

    // twitter widgets are rendered
    twttr.events.bind("rendered", function(event) {
      // hide "more tweets" links/info buttons that may be injected
      hideElements(getElemsToHide());

      // injected iframe element(s) after twitter API finds widgets
      iframe = $(event.target).contents();

      // element(s) we want to scroll
      viewport = $(".timeline-Viewport", iframe);

      // initial scroll distance
      initialDistance = viewport.prop("scrollHeight") - viewport.height();

      // pass in the target node, as well as the observer options
      newTweetObserver.observe($(".timeline-TweetList", iframe)[0], {
        childList: true
      });

      scroll();
    });
  });
}