const LARGHEZZA = 1280;
const ALTEZZA = 720;

const config = {
  canvas_width: LARGHEZZA,
  canvas_height: ALTEZZA,
  canvas_id: "area_gioco",
  background_color: 0x4A6FA5,
  gravity_value: 2000,
  debug_mode: false,
};

function avvia() {
  PP.game.create(config);
}
