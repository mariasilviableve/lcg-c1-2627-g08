import { MC, carica_MC, crea_MC, muovi_MC, frena_sabbia } from "./MC.js";
import { Y_TERRENO, terreni, crea_layer, crea_terreno, crea_camera } from "./Livello.js";
import { crea_ostacoli } from "./ostacolo.js";

const X_TERRENO = [0];
const L_TERRENO = [2560];

let img_sabbia;
let img_sfondo;

function preload(s) {
    carica_MC(s);
    img_sabbia = PP.assets.image.load(s, "assets/images/sand.png");
    img_sfondo = PP.assets.image.load(s, "assets/images/background.png");
}

function create(s) {
    crea_layer(s, img_sfondo);
    crea_terreno(s, img_sabbia, X_TERRENO, L_TERRENO, [0]);
    crea_MC(s, 100, Y_TERRENO);
    crea_camera(s);
    crea_ostacoli(s);
    for (const terreno of terreni) {
        PP.physics.add_collider_f(s, MC, terreno, frena_sabbia);
    }
}

function update(s) {
    muovi_MC(s);
}

function destroy(s) {}

PP.scenes.add("deserto", preload, create, update, destroy);

