import $ from 'jquery';


export const aggiungiStile = (path) => {
    $(`<link rel='stylesheet' href='${path}' type='text/css'/>`).attr("aggiunto", true).appendTo('head');
};

export const rimuoviStili = () => {
    $("head link[rel='stylesheet']").each(function (i, ref) {
        if($(ref).attr("aggiunto"))
            $(ref).remove();
    });
};