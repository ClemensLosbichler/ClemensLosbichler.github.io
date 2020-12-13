let messageBlock = $('#message-block');
let message = $('#message');
let messageParameter = findGetParameter('text');
let typeParameter = findGetParameter('type');
let showParameter = findGetParameter('show');

if(showParameter != null && showParameter == 'true') {
    message.html(messageParameter);

    while(message.first().width() * window.devicePixelRatio < messageBlock.width() * window.devicePixelRatio &&
        message.first().height() * window.devicePixelRatio < messageBlock.height() * window.devicePixelRatio) {

        if(parseFloat(message.css('font-size')) > 1500)
            break;
        message.css('font-size', parseFloat(message.css('font-size')) + 1);
    }

    // while(messageBlock.height() > message.first().height() * 2) {
    //     let number = message.html().match(/\b/g);
    //     console.log(number);
    //     if(number != 0) {

    //     }
    //     break;
    // }

    switch(typeParameter) {
        case 'magic': 
            message.css('font-family', 'Impact');   
            setInterval(doMagic(), 10); 
            break;
        case 'chantal':
            message.css('font-family', 'chantal, sans-serif');
            message.css('font-weight', '500');
            message.css('font-style', 'normal');
            break;
        case 'clean': 
        default: 
            message.css('font-family', 'titillium-web, sans-serif');
            message.css('font-weight', '700');
            message.css('font-style', 'normal');
    }

    message.css('top', messageBlock.height()/2 - (message.first().height()/2 + message.first().position().top));
    messageBlock.show();
} else {
    messageBlock.hide();
    if(messageParameter != null)
        $('#input').val(messageParameter);
    if(typeParameter != null)
        $('#type').val(typeParameter);
}

$('#submit').on('click', function (e) {
    showMessage();
});

$('#input').keydown(function(e) {
    if(e.ctrlKey && e.keyCode == 13)
        showMessage();
});

messageBlock.on('click', function(e) {
    window.location.href = '?text=' + messageParameter.replace('<br>', '%13') + '&type=' + typeParameter;
});

function showMessage() {
    let input = $('#input').val();
    let type = $('#type').val();
    if(input != '')
        window.location.href = '?text=' + input.replace(/\n/g, '<br>') + "&type=" + type + '&show=true';
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function doMagic() {
    messageBlock.css('background-color', getRandomColor());
    message.css('color', getRandomColor());
    setInterval(doMagic, 10);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }