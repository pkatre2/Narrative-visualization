
function svg_slides(svg,delay) {
    var slides={},
        slide = 0,
        delay = delay ? delay : 3500;

    svg.attr("preserveAspectRatio","xMidYid meet");

    rects = svg.selectAll("rect")[0];

    for (i=0;i<rects.length;i++) {
        id = rects[i].id;
        console.log(id);
        if (id.slice(0,6)=='slide_') {
            slides[id.slice(6)]=rects[i]
            rects[i].scale_x = d3.scale.linear().range([rects[i].x.baseVal.value,rects[i].x.baseVal.value+rects[i].width.baseVal.value]).domain([0,1000]);
            rects[i].scale_y = d3.scale.linear().range([rects[i].y.baseVal.value,rects[i].y.baseVal.value+rects[i].height.baseVal.value]).domain([0,1000]);
        }

    }

    keys = Object.keys(slides).sort();
    slides.keys = keys;

    function next_slide()  {
        svg.transition().duration(delay).attr("viewBox",slides[keys[slide]].x.baseVal.value+" "+slides[keys[slide]].y.baseVal.value+" "+slides[keys[slide]].width.baseVal.value+" "+slides[keys[slide]].height.baseVal.value);
    }

    d3.select("body").on("touchmove", function() { if(slide<keys.length-1) {slide++; console.log(slide);}});

    d3.select(window).on("keydown", function() {
        switch (d3.event.keyCode) {
            case 37: {if (slide>0) {slide=slide-1; console.log(slide);next_slide()};break}
            case 39: {if(slide<keys.length-1) {slide++; console.log(slide);next_slide()};break}
            case 36: {slide = 0;next_slide();break}
            case 35: {slide = keys.length -1; next_slide();break}
        }

    });

    // Start with the first slide
    next_slide();
    return slides
}