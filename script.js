'use strict';
function validateForm(obj) {

    var form = document.getElementById(obj.formId);

    form.addEventListener('blur', function (event) {
        let elem=event.target;
        if (elem.tagName === 'INPUT' && elem.dataset.validator==='letters') {
            let pattern = /^[a-zA-zа-яА-Я]+$/;
            if (!pattern.test(elem.value)) {
                elem.classList.add(obj.inputErrorClass);
            }
            else{
                elem.classList.remove(obj.inputErrorClass);
            }
        }
        if (elem.tagName === 'INPUT' && elem.dataset.validator==='number'){
            //console.log(isNaN(parseInt(elem.value)));
            let minAge=parseInt(elem.dataset.validatorMin);
            let maxAge=parseInt(elem.dataset.validatorMax);
            if  (parseInt(elem.value)<minAge|| parseInt(elem.value)>maxAge
                || isNaN(parseInt(elem.value)) && elem.value!=''){
                elem.classList.add(obj.inputErrorClass);
            }
            else{
                elem.classList.remove(obj.inputErrorClass);
            }
        }
        if (elem.tagName === 'INPUT' && elem.dataset.validator==='regexp'){
            let pt=new RegExp(elem.dataset.validatorPattern);
            if (!pt.test(elem.value) && elem.value!=""){
                elem.classList.add(obj.inputErrorClass);
            }
            else{
                elem.classList.remove(obj.inputErrorClass);
            }
        }
    },true);

    form.addEventListener('submit', function(event){

        var elems=form.elements;
        var res=0;
        for (var i in elems) {

            if (elems[i].tagName === 'INPUT') {
                if(elems[i].dataset.required!=undefined && elems[i].value==''){
                    elems[i].classList.add(obj.inputErrorClass);
                }
                console.log(elems[i].dataset.required!=undefined);
                //console.log(elems[i].dataset.required&&elems[i].value=='');
                //res += (elems[i].dataset.required && elems[i].value=='');
                res += elems[i].classList.contains(obj.inputErrorClass);
            }
        }
        //console.log(res);

        if(res===0){
            form.classList.remove(obj.formInvalidClass);
            form.classList.add(obj.formValidClass);
        }
        else{
            event.preventDefault();
            form.classList.remove(obj.formValidClass);
            form.classList.add(obj.formInvalidClass);
        }

    });

}
// Код валидации формы
