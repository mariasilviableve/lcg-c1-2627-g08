import { MC } from "./MC.js";
import { Y_TERRENO } from "./Livello.js";

const ROSSO = "0xE44A4A";
const L_OSTACOLO = 80;
const A_OSTACOLO = 80;
export const X_OSTACOLI = [900, 1500, 2200]; // Punti in cui appariranno 


export function crea_ostacoli(s) {
    for (let i = 0; i < X_OSTACOLI.length; i++) {
        let ostacolo = PP.shapes.rectangle_add(s, X_OSTACOLI[i], Y_TERRENO - A_OSTACOLO / 2, L_OSTACOLO, A_OSTACOLO, ROSSO, 1);
        PP.physics.add(s, ostacolo, PP.physics.type.STATIC);
        PP.physics.add_collider(s, MC, ostacolo);
    }
}