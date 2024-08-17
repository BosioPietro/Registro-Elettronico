import $ from 'jquery';

const c = console.log;

export function CambiaSchermata(num){
    const appare = $(`#schermata_${num}`);
    const scompare = $(`#schermata_${Math.abs(num-1)}`);


    let cnt = 0;
    scompare.children().each((i, ref) =>{
        setTimeout(() => {
            $(ref).addClass('scompare');
        }, 100 * cnt++)
    })

    let finale = 100 * ++cnt + 300
    
    setTimeout(() => {
        cnt = 0;
        scompare.addClass("scomparso")
        scompare.children().removeClass("scompare")
        scompare.children().removeClass("compare")
        appare.removeClass("scomparso")
        appare.children().css({transform : "translateX(-5rem)", opacity : 0}).each((i, ref) =>{
            setTimeout(() => {
                $(ref).addClass('appare');
                
            }, 100 * cnt++)
        })
        finale += 100 * cnt + 300

        setTimeout(() => {
            appare.children().css({transform : "", opacity : ""})
            appare.children().removeClass("appare")
        }, finale)

    }, 100 * cnt + 300)

    const pallini = $('.pallino')
    pallini.removeClass('corrente')
    pallini.eq(num).addClass('corrente')
}

export function ControllaInput(e){
    const input = $(e);
    const pwd = input.prop("id") == "password";
    const val = input.val().trim();
    if(!pwd)
    {
        const regex = new RegExp(/^\d{4}$/);
        return regex.test(val);
    }
    else return val.length >= 8;
}

export function ClickCheckbox(e){
    $(e.target).siblings().trigger('click')
}