export interface Building {
  name: string;
  osm_id: string;
  heading: number;
  href: string;
  height: number;
}

export const Buildings: Building[] = [
  {
    name: "Biserica Romano-Catolică din Elisabetin",
    osm_id: "152474227",
    heading: 45,
    href: "http://localhost:3000/church.glb",
    height: 100,
  },
  {
    name: "Catedrala Mitropolitană Ortodoxă",
    osm_id: "194450516",
    heading: 135,
    href: "http://localhost:3000/church.glb",
    height: 100,
  },
  {
    name: "Biserica Adormirea Maicii Domnului",
    heading: 100,
    height: 100,
    href: "http://localhost:3000/church.glb",
    osm_id: "418821198",
  },
];
