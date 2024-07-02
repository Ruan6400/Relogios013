let num =0;
let clicked=false;
let Produtos = [
    ["G-Shock GA Ferrari - preto",99.90,"img/relogios/gshockpreto.jpg"],
    ["G-Shock Caixa de Aço Dourado",150.00,"img/relogios/gshockgold.jpg"],
    ["G-Shock Batman Verde 45MM - A Prova d'água 10ATM",150.00,"img/relogios/gshockgreen.jpg"],
    ["G-Shock GBX-100 Preto-Transparente",150.00,"img/relogios/gshockquadrado.jpg"],
    ["G-Shock GBD-500 Areia",150.00,"img/relogios/begegshock.jpg"],
    ["Casio G-Shock GA-2000-5ADR Carbon Core Guard",150.00,"img/relogios/brancoredondo.jpg"],
    ["Casio G-Shock GA100 - Cinza",150.00,"img/relogios/cinza.jpg"],
    ["G-Shock Frogman - Preto",150.00,"img/relogios/preto.jpg"]
]

function ShowMenu(){
    let quickmenu=document.querySelector('nav:first-of-type ul')
    if(quickmenu.style.display == "none"){
        this.style.backgroundColor="#000"
        this.style.backgroundImage="url(../img/menusdw_branco.png)"
        quickmenu.style.display = "block"
        clicked=true
    }else{
        this.style.backgroundColor="#ddd"
        this.style.backgroundImage="url(../img/menusdw.png)"
        quickmenu.style.display = "none"
        clicked=false
    }
}
function windowcheck(){
    let quickmenu=document.querySelector('nav:first-of-type ul') 
    if(window.innerWidth>=530){
       quickmenu.style.display = "inline-block"
    }else{
        if(clicked == false){
            quickmenu.style.display = "none"
        }
    }
    requestAnimationFrame(windowcheck)
}
function ProdClick(){
    let links = document.querySelectorAll(".Produtos>div:not(:has(>button))")
    if(links != null){
        links.forEach(x=>{
            x.addEventListener('click',()=>{
                let Dados = localStorage;
                Dados.setItem('Produto',x.children[1].innerHTML);
                Dados.setItem('Imagem',x.children[0].src)
                Dados.setItem('Preco',x.children[2].innerHTML)
                window.location.assign('produto.html')
            })
        })
    }
    
    let txtProd = document.querySelector('#ProdutoSelecionado h4');
    let imgProd = document.querySelector('#ProdutoSelecionado img');
    let prcProd = document.querySelector('#ProdutoSelecionado h5');
    let Dados = localStorage;
    let Txtsalvo = Dados.getItem('Produto')
    let Urlimg = Dados.getItem('Imagem')
    let txtPrc = Dados.getItem('Preco')
    if(Txtsalvo != null && txtProd != null && Urlimg != null){
        txtProd.innerHTML = Txtsalvo
        imgProd.src=Urlimg
        prcProd.innerHTML = txtPrc
    }
    
}
function ShowSearch(){
    let searchbar = document.querySelector('div:has(>input[type="search"])')
    let logo = document.querySelector('header h1')
    let btnsearch = document.getElementById("Buscar")
    let outros = document.querySelectorAll("#Instagram,#Whatsapp")
    logo.addEventListener('click',()=>window.location.assign('index.html'))
    document.body.addEventListener('click',ev=>{
        if(ev.clientY >= 65){
            searchbar.style.display="none";
            btnsearch.style.display="inline-block";
            outros.forEach(x=>x.style.display="inline-block")
        }
    })
    btnsearch.addEventListener('click',()=>{
        
        searchbar.style.display="flex";
        btnsearch.style.display="none";
        if(window.innerWidth<1150)
            outros.forEach(x=>x.style.display="none")
    })
}
function Buscar(){
    let btnsearch = document.querySelector('input[type="search"]+button')
    let searchbox = document.querySelector('input[type="search"]')
    let Dados = localStorage;
    let resultados = document.getElementById('Resultados')
    if(resultados!=null){
        let busca = Dados.getItem("Busca")
        Produtos.forEach(x=>{
            if(x[0].toLowerCase().includes(busca)){
                resultados.insertAdjacentHTML('beforeend',
                    "<div>"
                        +'<img src="'+x[2]+'">'
                        +'<h4>'+x[0]+'</h4>'
                        +'<p>'+x[1]+'</p>'
                    +'</div>'
                )}
        })
        if(resultados.children.length == 0){
            resultados.innerHTML="Resultado não encontrado"
        }else{
            for(let i=0;i<resultados.children.length;i++){
                resultados.children[i].addEventListener('click',()=>{
                    let Dados = localStorage;
                    Dados.setItem('Produto',resultados.children[i].children[1].innerHTML);
                    window.location.assign('produto.html')
                })
            }
        }
    }
    btnsearch.addEventListener('click',()=>{
        if(searchbox.value==""){
            alert("Digite o que você está procurando")
        }else{
            Dados.setItem("Busca",searchbox.value.toLowerCase())
            window.location.assign('resultados.html')
        }
    })
}






function Initialize(){
    let btnmenu = document.querySelector('nav:first-of-type button')
    btnmenu.addEventListener('click',ShowMenu)
    ProdClick()
    ShowSearch()
    Buscar()
    windowcheck()
    
}
document.addEventListener('DOMContentLoaded',Initialize);