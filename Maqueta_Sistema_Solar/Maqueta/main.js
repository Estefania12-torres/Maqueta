// funcion para abrir una trageta
function ap(a){
  // Asegura que el contenedor de tarjetas esté visible
  var ccp = document.getElementById('ccp');
  if(ccp) ccp.style.display = 'flex';
  // Oculta todas las tarjetas
  for(let i=1;i<=10;i++){
    let card = document.getElementById(`cp${i}`);
    if(card) card.style.display = 'none';
  }
  // Muestra la tarjeta seleccionada
  let cardSel = document.getElementById(`cp${a}`);
  if(cardSel) cardSel.style.display = 'block';
}

function ct(b){
  // Oculta la tarjeta seleccionada
  let cardSel = document.getElementById(`cp${b}`);
  if(cardSel) cardSel.style.display = 'none';
  // Si todas las tarjetas están ocultas, oculta el contenedor
  let anyVisible = false;
  for(let i=1;i<=10;i++){
    let card = document.getElementById(`cp${i}`);
    if(card && card.style.display === 'block') anyVisible = true;
  }
  if(!anyVisible) {
    var ccp = document.getElementById('ccp');
    if(ccp) ccp.style.display = 'none';
  }
}
 
 // funcion activar animacion
 let num = 1;
 function ba(){
  if(num == 1){
   for (i = 2;i <= 10;i++){
    document.getElementById(`co${i}`).style.animationPlayState = 'running';
    document.getElementById('btn-move').style.color = 'white'
   }
   num--;
  } else{
   for (i = 2;i <= 10;i++){
    document.getElementById(`co${i}`).style.animationPlayState = 'paused';document.getElementById('btn-move').style.color = 'gray'
   }
   num++;
  }
 }