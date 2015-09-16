$(function() {

    var banners;

    var renderControls = function(activeType, activeSize) {
        // set up a tempalte
        var ddTemplate = _.template($('#dropdown-template').html());
        var dom = '';
        var variations = _.findWhere(banners, { name: activeType }).variations;
        // type dropdown
        var type = ddTemplate({
            id: 'type',
            name: 'Banner Type',
            active: activeType,
            options: _.pluck(banners, 'name')
        });
        dom += type;
        // size dropdown
        var size = ddTemplate({
            id: 'size',
            name: 'Size',
            active: activeSize,
            options: _.pluck(variations, 'name').concat('all')
        });
        dom += size;
        // render and init pretty selects
        $('.controls').html(dom);
        $('select').material_select();
        // create events
        $('select').on('change', function() {
            var value = $(this).val();
            var type = $('select[data-id="type"]').val();
            var size = $('select[data-id="size"]').val();
            renderBanner(type, size);
            renderControls(type, size);
        });
    };

    // helper function for getting the DOM for one banner
    var bannerDom = function(activeType, activeSize) {
        var dom = '';
        var sizes = activeSize.split('x');
        var banner =  _.findWhere(banners, { name: activeType });
        var filepath = _.findWhere(banner.variations, { name: activeSize }).path;
        filepath = filepath.split('/public').join('');
        dom += '<iframe src="' + filepath + '" frameborder="0"';
        dom += ' width="' + sizes[0] + '" height="' + sizes[1] + '"';
        dom += '></iframe>';
        return dom;
    };

    var renderBanner = function(activeType, activeSize) {
        var dom = '';
        if (activeSize == 'all') {
            var banner = _.findWhere(banners, { name: activeType });
            _.each(banner.variations, function(variation) {
                dom += bannerDom(activeType, variation.name);
            });
        } else {
            dom = bannerDom(activeType, activeSize);
        }
        $('.banners').html(dom);
    };

    // refresh function
    $('.refresh-btn').on('click', function() {
        _.each($('.banners iframe'), function(iframe) {
            $(iframe).attr('src', $(iframe).attr('src'));
        });
    });

    $.ajax({
        dataType: 'json',
        url: '/banners'
    }).done(function(data) {
        banners = data;
        renderControls(banners[0].name, banners[0]['variations'][0].name);
        renderBanner(banners[0].name, banners[0]['variations'][0].name);
    });

});
