var XboxRotator = function(rotatorId, rotationDelay) {

    this.rotatorId = rotatorId;
    this.delay = rotationDelay || 5000;

    this.rotator = this.slides = $("#" + rotatorId);
    this.slides = $("#" + rotatorId + " .slide");
    this.currentSlide = 1;

    this.businessTracking = BusinessTracking;
    this.heroImpressionsReported = [];

    var scope = this;

    var directions = {
        left: "left",
        right: "right"
    };
    
    $("#" + rotatorId + " .nextButton").click(function () {
        clearTimeout(scope.timeout);
        scope.slide(directions.right);
    });

    $("#" + rotatorId + " .prevButton").click(function () {
        clearTimeout(scope.timeout);
        scope.slide(directions.left);
    });

    $(function() {
        var currentSlideDiv = $("#" + scope.rotatorId + " .slide[data-slideid=" + scope.currentSlide + "]");
        var data = currentSlideDiv.attr("data-hero-metro");
        if (!scope.heroImpressionsReported[data]) {
            scope.heroImpressionsReported[data] = true;

            s.products = (s.products || "") + ";" + data + ":" + s.pageName + ",";

            if (s.events) {
                s.events = s.events + ",event4";
            } else {
                s.events = "event4";
            }
        }
    });

    this.slide = function (direction) {
        var nextSlide;
        if (direction == directions.left) {
            var nextSlide = this.currentSlide - 1;
            if (nextSlide == 0) {
                nextSlide = this.slides.length;
            }
        } else if (direction == directions.right) {
            var nextSlide = this.currentSlide + 1;
            if (nextSlide == this.slides.length + 1) {
                nextSlide = 1;
            }
        }
        var currentSlideDiv = $("#" + this.rotatorId + " .slide[data-slideid=" + this.currentSlide + "]");
        var nextSlideDiv = $("#" + this.rotatorId + " .slide[data-slideid=" + nextSlide + "]");

        var data = nextSlideDiv.attr("data-hero-metro");
        if (!this.heroImpressionsReported[data]) {
            this.heroImpressionsReported[data] = true;
            BusinessTracking.recordImpression(data);
        }

        if (direction == directions.left) {
            nextSlideDiv[0].style["left"] = "-100%";
            currentSlideDiv.animate({ left: "100%" }, { duration: 400 });
        } else if (direction == directions.right) {
            nextSlideDiv[0].style["left"] = "100%";
            currentSlideDiv.animate({ left: "-100%" }, { duration: 400 });
        }
        nextSlideDiv.animate({ left: "0%" }, { duration: 400 });
        this.currentSlide = nextSlide;
    };

    var autoSlide = function(slideNow) {
        if (slideNow) {
            scope.slide(directions.right);
        }
        scope.timeout = setTimeout(function() { autoSlide(true); }, scope.delay);
    };

    autoSlide(false);
};
