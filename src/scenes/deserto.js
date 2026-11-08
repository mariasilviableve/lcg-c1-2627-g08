const L_LIVELLO = 3840; // il deserto è largo 3 schermi
const ANTICIPO_CAMERA = 200;

// il terreno
const TERRA = "0xB96E54"; 
const A_TERRENO = 96;
const Y_TERRENO = 624;

// il viaggiatore
const BLU = "0x0000FF";
const X_VIAGGIATORE = 200;
const L_VIAGGIATORE = 80;
const A_VIAGGIATORE = 80;

//gli ostacoli da saltare
const ROSSO = "0xE44A4A";
const L_OSTACOLO = 80;
const A_OSTACOLO = 80;
const X_OSTACOLI = [900, 1500, 2200]; // Punti in cui appariranno

// definire i tasti e le velocità
const VEL_CORSA = 400;
const VEL_SALTO = 1000;
const TASTO_SX = PP.key_codes.LEFT;
const TASTO_DX = PP.key_codes.RIGHT;
const TASTO_SALTO = PP.key_codes.SPACE; //forse va cambiato con la freccia in alto?

//definire l'attrito
const ATTRITO_SABBIA = 3000;

let viaggiatore;
let terreno;

function preload(s) {

}

function create(s) {
    crea_terreno(s);
    crea_viaggiatore(s);
    crea_ostacoli(s)
    crea_camera(s);
}

function crea_terreno(s) {
   terreno = PP.shapes.rectangle_add(s, L_LIVELLO / 2, Y_TERRENO + A_TERRENO / 2, L_LIVELLO, A_TERRENO, TERRA, 1);
    PP.physics.add(s, terreno, PP.physics.type.STATIC);
}

function crea_viaggiatore(s) {
    viaggiatore = PP.shapes.rectangle_add(s, X_VIAGGIATORE, Y_TERRENO - A_VIAGGIATORE / 2, L_VIAGGIATORE, A_VIAGGIATORE, BLU, 1);
    
    PP.physics.add(s, viaggiatore, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(viaggiatore, true); // per non farlo andare fuori dallo schermo
    PP.physics.add_collider_f(s, viaggiatore, terreno, frena_sabbia); 
    // collider tra viaggiatore e terreno + l'attrito con la sabbia dato dalla function frena_sabbia
}

function crea_ostacoli(s) {
    for (let i = 0; i < X_OSTACOLI.length; i++) {
        let ostacolo = PP.shapes.rectangle_add(s, X_OSTACOLI[i], Y_TERRENO - A_OSTACOLO / 2, L_OSTACOLO, A_OSTACOLO, ROSSO, 1);
        PP.physics.add(s, ostacolo, PP.physics.type.STATIC);
        PP.physics.add_collider(s, viaggiatore, ostacolo); // Genera la collisione tra il giocatore e questo ostacolo
    }
}

function crea_camera(s) {
    PP.physics.set_world_bounds(s, 0, 0, L_LIVELLO, ALTEZZA);
    PP.camera.set_bounds(s, 0, 0, L_LIVELLO, ALTEZZA); // Espande i confini fisici e visivi al nuovo L_LIVELLO
    PP.camera.start_follow(s, viaggiatore, -ANTICIPO_CAMERA, 0); // Fa seguire il viaggiatore tenendolo decentrato di 200px
}

function update(s) { //per ricalcolare la velocità a ogni frame
    cammina(s);
    salta(s);
}

function cammina(s) {
    if (PP.interactive.kb.is_key_down(s, TASTO_SX)) {
        PP.physics.set_velocity_x(viaggiatore, -VEL_CORSA);
    } else if (PP.interactive.kb.is_key_down(s, TASTO_DX)) {
        PP.physics.set_velocity_x(viaggiatore, VEL_CORSA);
    }
}

function salta(s) {
    if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO) && PP.physics.is_on_ground(viaggiatore)) { 
        // con la funzione is_on_ground evitiamo il doppio salto in aria, se vogliamo aggiungerlo poi modifichiamo da qua
        PP.physics.set_velocity_y(viaggiatore, -VEL_SALTO);
    }
}

function frena_sabbia(s, a, b) { //a sta per il viaggiatore, b per il terreno
    PP.physics.set_drag_x(a, ATTRITO_SABBIA);
}

function destroy(s) {

}

PP.scenes.add("deserto", preload, create, update, destroy);

