import sisterlyMenuPoster from "../assets/sisterly_bites_menu.jpg";
import classicFriesImg from "../assets/items/classic_fries.jpg";
import periPeriFriesImg from "../assets/items/peri_peri_fries.jpg";
import loadedFriesImg from "../assets/items/loaded_fries.jpg";
import chickenZingerBurgerImg from "../assets/items/chicken_zinger_burger.jpg";
import chickenPopcornImg from "../assets/items/chicken_popcorn.jpg";
import malaiChickenTikkaImg from "../assets/items/malai_chicken_tikka.jpg";
import biryaniImg from "../assets/items/biryani.jpg";

export const menuHeader = {
  title: "Sisterly Bites Cloud Kitchen",
  openingTime: "Daily: 1 PM - 10:30 PM",
  tagline: "HOMEMADE GOODNESS, ALWAYS ♡",
  phone: "7007130132",
  posterImage: sisterlyMenuPoster,
};

export const pizzaMenuItems = [
  {
    id: "classic-fries",
    name: "Classic Fries",
    description: "Golden crispy classic salted french fries with dipping sauce",
    isVeg: true,
    category: "fries",
    image: classicFriesImg,
    price: 89,
    prices: {
      regular: 89,
      portion: 89,
    },
  },
  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    description: "Crispy french fries generously tossed in zesty peri-peri spice mix",
    isVeg: true,
    category: "fries",
    image: periPeriFriesImg,
    price: 109,
    prices: {
      regular: 109,
      portion: 109,
    },
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Golden fries drenched in melted cheese, secret signature sauce & savory herbs",
    isVeg: true,
    category: "fries",
    image: loadedFriesImg,
    price: 149,
    prices: {
      regular: 149,
      portion: 149,
    },
  },
  {
    id: "burger-zinger",
    name: "Chicken Zinger Burger",
    description: "Extra crispy chicken fillet patty, fresh crunchy lettuce & rich mayo spread",
    isVeg: false,
    category: "burger",
    image: chickenZingerBurgerImg,
    price: 99,
    prices: {
      regular: 99,
      portion: 99,
    },
  },
  {
    id: "chicken-popcorn",
    name: "Chicken Popcorn",
    description: "Bite-sized crunchy spiced chicken pops fried to golden perfection with dip",
    isVeg: false,
    category: "chicken",
    image: chickenPopcornImg,
    price: 99,
    prices: {
      regular: 99,
      portion: 99,
    },
  },
  {
    id: "malai-chicken-tikka",
    name: "Malai Chicken Tikka",
    description: "Juicy tender boneless chicken roasted with creamy malai and mild aromatic spices",
    isVeg: false,
    category: "chicken",
    image: malaiChickenTikkaImg,
    price: 70,
    prices: {
      half: 70,
      full: 120,
    },
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with succulent spiced chicken, caramelized onions & authentic herbs",
    isVeg: false,
    category: "biryani",
    image: biryaniImg,
    price: 70,
    prices: {
      half: 70,
      full: 120,
    },
  },
];

export const extraAddons = [
  // {
  //   id: "extra-cheese-dip",
  //   name: "Extra Cheese Dip",
  //   price: 20,
  // },
  {
    id: "extra-peri-peri",
    name: "Peri Peri Seasoning",
    price: 15,
  },
  {
    id: "campa-drink",
    name: "Chilled Cold Drink",
    price: 10,
  },
];
