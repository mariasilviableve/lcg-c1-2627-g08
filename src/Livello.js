import { MC } from "./MC.js";

const LARGHEZZA = 1280;
const ALTEZZA = 720;
export const Y_TERRENO = 624;
const L_LIVELLO = 26880; // il deserto è largo 18 schermi
const ANTICIPO_CAMERA = 280;

export let terreni;

export function crea_layer(s, img) {
  let layer = PP.assets.tilesprite.add(s, img,
    0, 0, LARGHEZZA, ALTEZZA, 0, 0);
  layer.tile_geometry.scroll_factor_x = 0;
  layer.tile_geometry.scroll_factor_y = 0;
  return layer;
}

export function crea_terreno(s, img, x_terreno, l_terreno,
    alzate) {
  terreni = [];
  for (let i = 0; i < x_terreno.length; i++) {
    let y = Y_TERRENO - alzate[i];
    let t = PP.assets.tilesprite.add(s, img,
      x_terreno[i], y, l_terreno[i], ALTEZZA - y, 0, 0);
    PP.physics.add(s, t, PP.physics.type.STATIC);
    terreni.push(t);
  }
}

export function crea_camera(s) {
    PP.physics.set_world_bounds(s, 0, 0, L_LIVELLO, ALTEZZA);
    PP.camera.set_bounds(s, 0, 0, L_LIVELLO, ALTEZZA); // Espande i confini fisici e visivi al nuovo L_LIVELLO
    PP.camera.start_follow(s, MC, -ANTICIPO_CAMERA, 0); // Fa seguire il viaggiatore tenendolo decentrato di 280px
}
