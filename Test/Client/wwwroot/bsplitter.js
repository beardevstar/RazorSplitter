// JavaScript source code

$(function () {
    const LEFT_ID = 'left-section';
    const RIGHT_ID = 'right-section';
    const TOP_ID = 'top-section';
    const BOTTOM_ID = 'bottom-section';
    const SPLITTER_ID = 'splitter';

    var startPos = 0, startValue = 0;
    var container = {};
    var prefix = "";

    var bsplitter = window['bsplitter'] || {};
    bsplitter.mouseDownEventHandler = function (_prefix, e, _container, flag /*Horizontal*/) {
        if (container == undefined || _container == null) return;
        if (flag == undefined || flag == null) return;

        container = _container;
        prefix = _prefix;

        if (flag == true) HorizontalSplitterPressed(e);
        else VerticalSplitterPressed(e);
    }
    function VerticalSplitterPressed(e) {
        var left = $(container).find("#" + prefix + LEFT_ID)[0];

        startPos = e.pageX;
        startValue = $(left).width();

        $(document).mousemove(WidthResize);
        $(document).mouseup(stopResize);
    }

    function WidthResize(e) {
        var newWidth = startValue + (e.pageX - startPos);
        var left = $(container).find("#" + prefix + LEFT_ID)[0];
        var right = $(container).find("#" + prefix + RIGHT_ID)[0];
        var middle = $(container).find("#" + prefix + SPLITTER_ID)[0];

        $(left).width(newWidth);
        $(right).width($(container).width() - newWidth - $(middle).width());
    }

    function HorizontalSplitterPressed(e) {
        var top = $(container).find("#" + prefix + TOP_ID)[0];

        startPos = e.pageY;
        startValue = $(top).height();
        
        $(document).mousemove(HeightResize);
        $(document).mouseup(stopResize);
    }
    function HeightResize(e) {
        var newHeight = startValue + (e.pageY - startPos);
        var top = $(container).find("#" + prefix + TOP_ID)[0];
        var bottom = $(container).find("#" + prefix + BOTTOM_ID)[0];
        var middle = $(container).find("#" + prefix + SPLITTER_ID)[0];

        $(top).height(newHeight);
        $(bottom).height($(container).height() - newHeight - $(middle).height());
    }

    function stopResize() {
        $(document).unbind('mousemove', HeightResize);
        $(document).unbind('mousemove', WidthResize);
    }
    window['bsplitter'] = bsplitter;
});