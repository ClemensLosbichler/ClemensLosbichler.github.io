$('#search').on('input', function() {
    let fileContainer = $('#filebrowser');

    for(let i=0 ; i<fileContainer.children().length ; i++) {
        let name = fileContainer.find('.filename')[i].innerHTML;
        let path = fileContainer.find('.filename')[i].dataset.path;
        
        if(name.search($('#search').val()) != -1 || path.search($('#search').val()) != -1 || $('#search').val() == "")
            fileContainer.find('a')[i].style.display = "initial";
        else
            fileContainer.find('a')[i].style.display = "none";
    }
});