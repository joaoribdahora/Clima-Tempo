document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); // Essa função para o 'submit', não deixa a informação colocada no input ser enviada

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clear();
        showWarning('Carregando...');

        let nameURL = encodeURI(input); // Essa função transforma todos os nomes para uma versão que possa ser usada em uma URL
        
        //pegando uma API
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameURL}&units=metric&lang=pt_br&appid=faafcceae698848d02aa16a2b3e823a0&`);
        
        let json = await result.json(); // transformando a informação em JSON

        if(json.cod === 200){ // json.cod = 200 significa que achamos a cidade inserida

                let importantInfo = {
                    temp: json.main.temp, 
                    sTermica: json.main.feels_like,
                    cidade: json.name, 
                    pais: json.sys.country,
                    vVento: json.wind.speed,
                    dVento: json.wind.deg,
                    icone: json.weather[0].icon, 
                    iLegenda: json.weather[0].description  
                }; // criamos um objeto no qual selecionamos somente as informações que queriamos do JSON original

            showInfo(importantInfo);
            showWarning('');

        } else{ 
            clear();
            showWarning('Desculpe, cidade não encontrada');
        }
    } else{
        clear();
    } 

});


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg; 
}

function showInfo(json){
    // a seguir estão os codigos que coloca as imformações, que pegamos pela API, no HTML
    // informação de local 
    document.querySelector('.titulo').innerHTML = `${json.cidade}, ${json.pais}`;

    //informação de temperatura
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.tempLegenda').innerHTML = `${json.iLegenda}`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icone}@2x.png`);
    document.querySelector('.feelsLikeTemp').innerHTML =`${json.sTermica} <sup>ºC</sup>`;

    //informação do vento
    document.querySelector('.ventoInfo').innerHTML = `${json.vVento} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.dVento -90}deg)`;
    document.querySelector('.feelsLikeTemp').innerHTML =`${json.sTermica} <sup>ºC</sup>`;
    
    //abre a área que o resultado vai ser mostrado
    document.querySelector('.resultado').style.display ='block';
}

//função para apagar tudo da tela
function clear(){
    showWarning('');
    document.querySelector('.resultado').style.display ='none';
}