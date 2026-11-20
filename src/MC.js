const L_MC = 80;
const A_MC = 80;
const VEL_CORSA = 550;
const VEL_SALTO = 900;
const SALTI_MAX = 2;
const ATTRITO_SABBIA = 3000;

const TASTO_SX = PP.key_codes.A;
const TASTO_DX = PP.key_codes.D;
const TASTO_SALTO = PP.key_codes.SPACE;

let ss_MC;

export let MC;

let animazione;
let salti;

export function carica_MC(s) {
  ss_MC = PP.assets.sprite.load_spritesheet(s,
    "assets/images/mc_spritesheet.png",
    L_MC, A_MC);
}

export function crea_MC(s, x, y) {
  animazione = "";
  MC = PP.assets.sprite.add(s, ss_MC,
    x, y - A_MC / 2, 0.5, 0.5);
  PP.physics.add(s, MC, PP.physics.type.DYNAMIC);
  PP.physics.set_collide_world_bounds(MC, true);
  PP.physics.set_collision_rectangle(MC, 54, 72, 21, 24);
  PP.assets.sprite.animation_add(MC, "fermo",
    0, 0, 1, 0);
  PP.assets.sprite.animation_add(MC, "corsa",
    1, 12, 20, -1);
  PP.assets.sprite.animation_add(MC, "salto",
    19, 19, 1, 0);
  PP.assets.sprite.animation_add(MC, "doppio",
    13, 18, 15, -1);
  }

export function muovi_MC(s) {
  cammina(s);
  salta(s);
  anima_MC();
}

function cammina(s) {
    if (PP.interactive.kb.is_key_down(s, TASTO_SX)) {
        PP.physics.set_velocity_x(MC, -VEL_CORSA);
        MC.geometry.flip_x = true;
    } else if (PP.interactive.kb.is_key_down(s, TASTO_DX)) {
        PP.physics.set_velocity_x(MC, VEL_CORSA);
        MC.geometry.flip_x = false;
    }
}

function salta(s) {
  if (PP.physics.is_on_ground(MC)) {
    salti = 0;
  }
  if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO)
      && salti < SALTI_MAX) {
    PP.physics.set_velocity_y(MC, -VEL_SALTO);
    salti += 1;
  }
}

function anima_MC() {
  let nuova = "fermo";
  if (salti === SALTI_MAX) {
    nuova = "doppio";
  } else if (!PP.physics.is_on_ground(MC)) {
    nuova = "salto";
  } else if (PP.physics.get_velocity_x(MC) !== 0) {
    nuova = "corsa";
  }
  if (nuova !== animazione) {
    animazione = nuova;
    PP.assets.sprite.animation_play(MC, animazione);
  }
}

export function frena_sabbia(s, a, b) { //a sta per il viaggiatore, b per il terreno
    PP.physics.set_drag_x(a, ATTRITO_SABBIA);
}