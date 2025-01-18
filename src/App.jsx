import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createBuild } from './graphql/mutations';
import awsconfig from './aws-exports';
import { listBuilds } from './graphql/queries.js'

Amplify.configure(awsconfig);

import React, {useEffect, useState} from 'react';
import './App.css';
import Popup from './assets/components/Popup';
import PopupCPU from './assets/components/cpuPop';
import PopupRAM from './assets/components/ramPop';
import PopupCOOLER from './assets/components/coolerpop';
import PopupSTOR from './assets/components/storpop';
import PopupPSU from './assets/components/psuPop';
import PopupMOBO from './assets/components/mobopop';
import PopupCase from './assets/components/casePop';

// GPU Imports
import gtx1080 from './assets/components/gtx1080.svg';
import n3050 from './assets/components/3050.svg';
import n3060 from './assets/components/3060.svg';
import n4060 from './assets/components/4060.svg';
import n4060ti from './assets/components/4060T.svg';
import n4070 from './assets/components/4070.svg';
import n4070ti from './assets/components/4070T.svg';
import n4080 from './assets/components/4080.svg';
import n4090 from './assets/components/4090.svg';
import a7900x from './assets/components/7900 XTX.svg';
import a7900 from './assets/components/7900 XT.svg';
import a7800 from './assets/components/7800 XT.svg';
import a7700 from './assets/components/7700 XT.svg';
import a7600 from './assets/components/7600 XT.svg';
import a7600m from './assets/components/7600.svg';
import a6600 from './assets/components/6600.svg';

// CPU and Icons
import amazonicon from './assets/components/amazonicon.svg';
import corei9 from './assets/components/corei9.svg';

import i9149 from './assets/components/Core i9-14900K.svg';
import i9139 from './assets/components/Core i9-13900K.svg';
import i9129 from './assets/components/Core i9-12900K.svg';
import i9137 from './assets/components/Core i7-13700K.svg';
import i9127 from './assets/components/Core i7-12700K.svg';
import i9136 from './assets/components/Core i5-13600K.svg';
import i9126 from './assets/components/Core i5-12600K.svg';

import r55X from './assets/components/Ryzen 5 5000X.svg';
import r57M from './assets/components/Ryzen 5 7000M.svg';
import r57X from './assets/components/Ryzen 5 7000X.svg';
import r75X from './assets/components/Ryzen 7 5000.svg';
import r77X from './assets/components/Ryzen 7 7000.svg';
import r77D from './assets/components/Ryzen 7 70003D.svg';
import r95X from './assets/components/Ryzen 9 5000.svg';
import r97X from './assets/components/Ryzen 9 7000.svg';
import r97D from './assets/components/Ryzen 9 70003D.svg';
import r97M from './assets/components/Ryzen 9 7000M.svg';

import cl1616 from './assets/components/cl16 2x16.svg';
import cl1632 from './assets/components/cl16 2x32.svg';
import cl1816 from './assets/components/cl18 2x16.svg';
import cl3016 from './assets/components/Cl30 2x16.svg';
import cl3024 from './assets/components/Cl30 2x24.svg';
import cl3032 from './assets/components/Cl30 2x32.svg';
import cl3048 from './assets/components/Cl30 2x48.svg';
import cl3616 from './assets/components/Cl36 RGB 2x16.svg';
import cl3648 from './assets/components/Cl36 RGB 2x48.svg';

import nhu9s from './assets/components/NH-U9S.svg';
import nhd15 from './assets/components/NH-D15.svg';
import s212s from './assets/components/212S.svg';
import s260s from './assets/components/260S.svg';
import AF from './assets/components/Arctic Freeze III.svg';
import AFR from './assets/components/Arctic Freeze III RGB.svg';
import tl from './assets/components/TOUGHLIQUID 360 EX.svg';
import cl from './assets/components/Cooler Master MasterLiquid 360L.svg';


import hd12 from './assets/components/hd 12tb.svg';
import hd8 from './assets/components/hd 8tb.svg';
import hd4 from './assets/components/hd 4tb.svg';
import m24 from './assets/components/m2 4tb.svg';
import m22 from './assets/components/m2 2tb.svg';
import m21 from './assets/components/m2 1tb.svg';

import ss4 from './assets/components/samsung 4tb.svg';
import ss2 from './assets/components/samsung 2tb.svg';
import ss1 from './assets/components/samsung 1tb.svg';
import ss05 from './assets/components/samsung 0.5tb.svg';

import sl4 from './assets/components/silicon 4tb.svg';
import sl2 from './assets/components/silicon 2tb.svg';
import sl1 from './assets/components/silicon 1tb.svg';
import sl05 from './assets/components/silicon 0.5tb.svg';
import sl02 from './assets/components/silicon 0.2tb.svg';

import magb550 from './assets/components/MAG B550 TOMAHAWK.svg';
import msib550 from './assets/components/MSI B550-A PRO.svg';
import b650 from './assets/components/GIGABYTE B650M.svg';
import b760p from './assets/components/MSI B760 Gaming Plus.svg';
import bp760p from './assets/components/MSI PRO B760-P.svg';
import bp760m from './assets/components/MSI PRO B760M-P.svg';
import a790 from './assets/components/ASUS TUF Gaming Z790-Plus.svg';

import aprime from './assets/components/ASUS Prime B450M-A.svg';
import b650m from './assets/components/ASRock B650M-H.svg';
import b660m from './assets/components/ASRock B660M Pro .svg';

import pbn80 from './assets/components/80+ Bronze non modular.svg'
import pbs80 from './assets/components/80+ Bronze semi.svg'
import pg80 from './assets/components/80+ Gold.svg'
import pn80 from './assets/components/80+ non modular.svg'

import Treemap from './assets/components/treemap.jsx';
import ParticlesBackground from './assets/components/Particles.jsx';



const PSU = [
  {name: "Corsair RM750", Icon: pg80, Wattage: 750, type: "Fully Modular", Grade: "80+ Gold", cost: 119, Link : "https://amzn.to/4hcXNNj", disc: 0, asin: "B0DJ1M18CY"},
  {name: "AGV Series 500", Icon: pbn80, Wattage: 500, type: "Non Modular", Grade: "80+ Bronze", cost: 50, Link : "https://amzn.to/4iA6eTP", disc: 38, asin: "B0BDCKFJJT"},
  {name: "CORSAIR RM850", Icon: pg80, Wattage: 850, type: "Fully Modular", Grade: "80+ Gold", cost: 150, Link : "https://amzn.to/4gxHIkn", disc: 0, asin: "B08R5JPTMZ"},
  {name: "Corsair RM1000", Icon: pg80, Wattage: 1000, type: "Fully Modular", Grade: "80+ Gold", cost: 189, Link : "https://amzn.to/4akyNAQ", disc: 0, asin: "B08R5PH1VY"},
  {name: "TT SMART 600", Icon: pn80, Wattage: 600, type: "Non Modular", Grade: "80+", cost: 55, Link : "https://amzn.to/3DeHy2R", disc: 45, asin: "B014W3EMAO"},
  {name: "AGV Series 750", Icon: pbs80, Wattage: 750, type: "Semi Modular", Grade: "80+ Bronze", cost: 80, Link : "https://amzn.to/4gBjMwn", disc: 62, asin: "B0B4N4T8VW"},

]

const MOBO = [
  {name: "MAG B550 TOMAHAWK", Icon: magb550, Chipset: "AM4", Wifi: "Yes", Ram: "DDR4", Form: "ATX", cost: 179, Link: "https://amzn.to/4g00sZO", disc: 165, watts: 30, asin: "B09ZJ73LDY"},
  {name: "MSI B550-A PRO", Icon: msib550, Chipset: "AM4", Wifi: "No", Ram: "DDR4", Form: "ATX", cost: 119, Link: "https://amzn.to/4fiMh17", disc: 109, watts: 25, asin: "B089CZSQB4"},
  {name: "MAG B650 TOMAHAWK", Icon: b650, Chipset: "AM5", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 219, Link: "https://amzn.to/3OCHgFH", disc: 178, watts: 40, asin: "B0BHCCNSRH"},
  {name: "GIGABYTE B650M", Icon: b650, Chipset: "AM5", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 159, Link: "https://amzn.to/3OJNseM", disc: 139, watts: 35, asin: "B0D2V4VH2C"},
  {name: "MSI B760 Gaming Plus", Icon: b760p, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 169, Link: "https://amzn.to/3VqOHTZ", disc: 143, watts: 35, asin: "B0C15THTK7"},
  {name: "MSI PRO B760-P", Icon: bp760p, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR4", Form: "ATX", cost: 159, Link: "https://amzn.to/4faFq9W", disc: 149, watts: 30, asin: "B0BRQSWSFQ"},
  {name: "ASUS TUF Gaming Z790", Icon: a790, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 249, Link: "https://amzn.to/4f0PWQS", disc: 198, watts: 40, asin: "B0BQD58D96"},
  {name: "MSI PRO B760M-P", Icon: bp760m, Chipset: "LGA 1700", Wifi: "No", Ram: "DDR4", Form: "ATX", cost: 99, Link: "https://amzn.to/3OJNEuw", disc: 0, watts: 25, asin: "B0BZ9T4KF6"},
  {name: "ASUS Prime B450M-A", Icon: aprime, Chipset: "AM4", Wifi: "No", Ram: "DDR4", Form: "mATX", cost: 89, Link: "https://amzn.to/4gjI3a2", disc: 0, watts: 20, asin: "B08KH12V25"},
  {name: "ASRock B660M Pro ", Icon: b660m, Chipset: "LGA 1700", Wifi: "No", Ram: "DDR4", Form: "mATX", cost: 79, Link: "https://amzn.to/3ZD9gPE", disc: 0, watts: 20, asin: "B09NZPD6WD"},
  {name: "ASRock B650M-H", Icon: b650m, Chipset: "AM5", Wifi: "No", Ram: "DDR5", Form: "mATX", cost: 109, Link: "https://amzn.to/3ZCuA7N", disc: 99, watts: 30, asin: "B0CJTB2QV2"},
]



// CPU & GPU Arrays

const RAMs = [
  {
    name: 'V16 2x16',
    Icon: cl1616,
    cost: 79,
    Link: 'https://amzn.to/3YVqSVx',
    DDR: "DDR4",
    RR: 3200,
    disc: 50,
    watts: 5,
    asin: "B07RW6Z692"
  },
  {
    name: 'V16 2x32',
    Icon: cl1632,
    cost: 155,
    Link: 'https://amzn.to/3CA6pOx',
    DDR: "DDR4",
    RR: 3200,
    disc: 99,
    watts: 6,
    asin: "B07Y4ZZ7LQ"

  },
  {
    name: 'V18 2x16',
    Icon: cl1816,
    cost: 84,
    Link: 'https://amzn.to/3YYbBmE',
    DDR: "DDR4",
    RR: 3600,
    disc: 67,
    watts: 5,
    asin: "B07ZPLM1R1"

  },
  {
    name: 'V30 2x16',
    Icon: cl3016,
    cost: 139,
    Link: 'https://amzn.to/4jmxvcA',
    DDR: "DDR5",
    RR: 6000,
    disc: 119,
    watts: 7,
    asin: "B0C3RYHZJQ"

  },
  {
    name: 'V30 2x24',
    Icon: cl3024,
    cost: 165,
    Link: 'https://amzn.to/3Ohho1Q',
    DDR: "DDR5",
    RR: 6000,
    disc: 150,
    watts: 9,
    asin: "B0C5XL5XDS"

  },
  {
    name: 'V30 2x32',
    Icon: cl3032,
    cost: 229,
    Link: 'https://amzn.to/40Q6irZ',
    DDR: "DDR5",
    RR: 6000,
    disc: 209,
    watts: 12,
    asin: "B0C5M6SJYW"

  },
  {
    name: 'V30 2x48',
    Icon: cl3048,
    cost: 344,
    Link: 'https://amzn.to/4fvUdg5',
    DDR: "DDR5",
    RR: 6000,
    disc: 0,
    watts: 14,
    asin: "B0CCXQF414"

  },
  {
    name: 'R36 2x16',
    Icon: cl3616,
    cost: 130,
    Link: 'https://amzn.to/3ZbrdV8',
    DDR: "DDR5",
    RR: 6400,
    disc: 99,
    watts: 7,
    asin: "B0BXHC74WD"

  },
  {
    name: 'R36 2x48',
    Icon: cl3648,
    cost: 394,
    Link: 'https://amzn.to/3ZabmGq',
    DDR: "DDR5",
    RR: 6400,
    disc: 349,
    watts: 14,
    asin: "B0CCXT8FX2"

  },
];

const Coolers = [
  {
    name: 'Noctua  NH-U9S',
    Icon: nhu9s,
    Type: 'Small Air',
    cost: 60,
    Link: 'https://amzn.to/497NqXF',
    disc: 0,
    watts: 2,
    asin: "B00TBHYYFK"


  },
  {
    name: 'Noctua  NH-D15',
    Icon: nhd15,
    Type: 'Large Air',
    cost: 110,
    Link: 'https://amzn.to/40WiJCA',
    disc: 0,
    watts: 5,
    asin: "B00L7UZMAK"


  },
  {
    name: 'Cooler Master Hyper 212S',
    Icon: s212s,
    Type: 'Small Air',
    cost: 29,
    Link: 'https://amzn.to/40cxi36',
    disc: 0,
    watts: 2,
    asin: "B07H25DYM3"


  },
  {
    name: 'Cooler Master Hyper 622',
    Icon: s260s,
    Type: 'Large Air',
    cost: 65,
    Link: 'https://amzn.to/40nTkA3',
    disc: 0,
    watts: 5,
    asin: "B0BX6JJHLJ"


  },
  {
    name: 'Arctic Freeze III',
    Icon: AF,
    Type: 'Liquid',
    cost: 140,
    Link: 'https://amzn.to/4eFbPF6',
    disc: 0,
    watts: 5,
    asin: ""


  },
  {
    name: 'Arctic Freeze III RGB',
    Icon: AFR,
    Type: 'Liquid',
    cost: 139,
    Link: 'https://amzn.to/4i04hzO',
    disc: 99,
    watts: 10,
    asin: "B09VH34TB8"


  },
  {
    name: 'TOUGHLIQUID 360 EX',
    Icon: tl,
    Type: 'Liquid',
    cost: 140,
    Link: 'https://amzn.to/4hRxUmV',
    disc: 109,
    watts: 10,
    asin: "B0D4WWSKGQ"


  },
  {
    name: 'Cooler Master ML 360L',
    Icon: cl,
    Type: 'Liquid',
    cost: 100,
    Link: 'https://amzn.to/4eFPGql',
    disc: 0,
    watts: 9,
    asin: "B0C4C421RZ"

  },
];

const CPUs = [
  // { name: 'Core I9-14900K', Icon: i9149, cost: 436, Single: 0, Multi: 0}, add this with rest of gen 14
  {
    name: 'Core I9-13900K',
    Icon: i9139,
    cost: 629,
    Single: 98,
    Multi: 98,
    Threads: 32,
    Release: 2022,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/48ICeRb',
    disc: 499,
    watts: 253,
    asin: "B0BCF54SR1"


  },
  {
    name: 'Core I9-12900K',
    Icon: i9129,
    cost: 287,
    Single: 87,
    Multi: 70,
    Threads: 24,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/3UOs37I',
    disc: 0,
    watts: 241,
    asin: "B09FXDLX95"


  },
  {
    name: 'Core I7-13700K',
    Icon: i9137,
    cost: 419,
    Single: 90,
    Multi: 80,
    Threads: 24,
    Release: 2022,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/3UQQhhJ',
    disc: 301,
    watts: 253,
    asin: "B0BCF57FL5"


  },
  {
    name: 'Core I7-12700K',
    Icon: i9127,
    cost: 207,
    Single: 84,
    Multi: 60,
    Threads: 20,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/4hKDR4P',
    disc: 0,
    watts: 190,
    asin: "B09FXNVDBJ"


  },
  {
    name: 'Core I5-13600K',
    Icon: i9136,
    cost: 329,
    Single: 86,
    Multi: 61,
    Threads: 20,
    Release: 2022,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/3UNNia1',
    disc: 220,
    watts: 181,
    asin: "B0BCDR9M33"


  },
  {
    name: 'Core I5-12600K',
    Icon: i9126,
    cost: 173,
    Single: 83,
    Multi: 46,
    Threads: 16,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/4hI1Txq',
    disc: 0,
    watts: 150,
    asin: "B09FX4D72T"


  },

  /*{
    name: 'Ryzen 9 7950X',
    Icon: r97X,
    cost: 699,
    Single: 87.9,
    Multi: 100.0,
    Threads: 32,
    Release: 2022,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/4hI1POc',
    disc: 517,
    watts: 170,
    asin: "B0BBHD5D8Y"


  },*/
  {
    name: 'Ryzen 9 7950X3D',
    Icon: r97D,
    cost: 699,
    Single: 83.8,
    Multi: 94.7,
    Threads: 32,
    Release: 2023,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/42h5z3K',
    disc: 517,
    watts: 120,
    asin: "B0BBHD5D8Y"


  },
  {
    name: 'Ryzen 9 7900X',
    Icon: r97X,
    cost: 549,
    Single: 86.8,
    Multi: 79.51,
    Threads: 24,
    Release: 2022,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/4hGBosf',
    disc: 391,
    watts: 170,
    asin: "B0BBJ59WJ4"


  },
  {
    name: 'Ryzen 9 7900',
    Icon: r97M,
    cost: 429,
    Single: 84.1,
    Multi: 69.97,
    Threads: 24,
    Release: 2023,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/4euYSxw',
    disc: 401,
    watts: 65,
    asin: "B0BMQK718H"


  },
  {
    name: 'Ryzen 7 7800X3D',
    Icon: r77D,
    cost: 459,
    Single: 74.1,
    Multi: 52.3,
    Threads: 16,
    Release: 2023,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/3CkuvMS',
    disc: 0,
    watts: 120,
    asin: "B0BTZB7F88"


  },
  {
    name: 'Ryzen 7 7700X',
    Icon: r77X,
    cost: 399,
    Single: 85.8,
    Multi: 56.15,
    Threads: 16,
    Release: 2022,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/3AOWiVg',
    disc: 303,
    watts: 105,
    asin: "B0BBHHT8LY"


  },
  {
    name: 'Ryzen 5 7600X',
    Icon: r57X,
    cost: 299,
    Single: 84.1,
    Multi: 43.89,
    Threads: 12,
    Release: 2022,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/3YNf6fC',
    disc: 197,
    watts: 105,
    asin: "B0BBJDS62N"


  },
  {
    name: 'Ryzen 5 7600',
    Icon: r57M,
    cost: 229,
    Single: 78.5,
    Multi: 40.61,
    Threads: 12,
    Release: 2023,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/3ABJSQF',
    disc: 198,
    watts: 65,
    asin: "B0BMQJWBDM"


  },
  {
    name: 'Ryzen 9 5900X',
    Icon: r95X,
    cost: 299,
    Single: 71.5,
    Multi: 58.02,
    Threads: 24,
    Release: 2020,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/4etDqJn',
    disc: 0,
    watts: 105,
    asin: "B08164VTWH"


  },
  {
    name: 'Ryzen 7 5700X',
    Icon: r75X,
    cost: 149,
    Single: 67.8,
    Multi: 39.77,
    Threads: 16,
    Release: 2022,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/4etv44i',
    disc: 0,
    watts: 65,
    asin: "B09VCHQHZ6"


  },
  {
    name: 'Ryzen 5 5600X',
    Icon: r55X,
    cost: 119,
    Single: 67.3,
    Multi: 32.5,
    Threads: 12,
    Release: 2020,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/3UNtvam',
    disc: 0,
    watts: 65,
    asin: "B08166SLDF"


  },
];

const GPUs = [
  {
    name: '4090',
    vram: 24,
    Design: 'Nvidia',
    Release: 2022,
    Watts: 450,
    Bench: 154,
    Link: 'https://amzn.to/4hjbYj8',
    Icon: n4090,
    cost: 2949,
    disc: 0,
    watts: 450,
    asin: "B0BHD8MTST"

  },
  {
    name: '4080 SUPER',
    vram: 16,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 320,
    Bench: 148,
    Link: 'https://amzn.to/40jgV4P',
    Icon: n4080,
    cost: 1498,
    disc: 0,
    watts: 320,
    asin: "B0BHDXCXXF"

  },
  {
    name: '4070 TI SUPER',
    vram: 16,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 290,
    Bench: 142,
    Link: 'https://amzn.to/3PEc21h',
    Icon: n4070ti,
    cost: 926,
    disc: 720,
    watts: 290,
    asin: "B0CSG8NYT3"

  },
  {
    name: '4070 SUPER',
    vram: 12,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 220,
    Bench: 138,
    Link: 'https://amzn.to/3PGnmtQ',
    Icon: n4070,
    cost: 659,
    disc: 0,
    watts: 220,
    asin: "B0CSHFM3D5"

  },
  {
    name: '4060 TI (16gb)',
    vram: 16,
    Design: 'Nvidia',
    Release: 2023,
    Watts: 165,
    Bench: 101,
    Link: 'https://amzn.to/40j8XbN',
    Icon: n4060ti,
    cost: 489,
    disc: 0,
    watts: 165,
    asin: "B0CBVXZDDL"

  },
  {
    name: '4060 TI (8gb)',
    vram: 8,
    Design: 'Nvidia',
    Release: 2023,
    Watts: 160,
    Bench: 101,
    Link: 'https://amzn.to/40E1NAF',
    Icon: n4060ti,
    cost: 439,
    disc: 0,
    watts: 160,
    asin: "B0C5BBWWJP"

  },
  {
    name: '4060',
    vram: 8,
    Design: 'Nvidia',
    Release: 2023,
    Watts: 115,
    Bench: 85,
    Link: 'https://amzn.to/3YVrlIn',
    Icon: n4060,
    cost: 299,
    disc: 0,
    watts: 115,
    asin: "B0C8JZNLZL"

  },
  {
    name: '3060',
    vram: 12,
    Design: 'Nvidia',
    Release: 2021,
    Watts: 170,
    Bench: 54,
    Link: 'https://amzn.to/40BEoQ2',
    Icon: n3060,
    cost: 289,
    disc: 0,
    watts: 170,
    asin: "B0985X2YR1"

  },
  {
    name: '3050',
    vram: 6,
    Design: 'Nvidia',
    Release: 2022,
    Watts: 115,
    Bench: 52,
    Link: 'https://amzn.to/4hwOkAK',
    Icon: n3050,
    cost: 179,
    disc: 169,
    watts: 115,
    asin: "B0D4XZXLL7"

  },
  {
    name: '7900 XTX',
    vram: 22,
    Design: 'AMD',
    Release: 2022,
    Watts: 355,
    Bench: 149,
    Link: 'https://amzn.to/40z6rzI',
    Icon: a7900x,
    cost: 957,
    disc: 0,
    watts: 355,
    asin: "B0BR6HZZ6Z"

  },
  {
    name: '7900 XT',
    vram: 20,
    Design: 'AMD',
    Release: 2022,
    Watts: 300,
    Bench: 144,
    Link: 'https://amzn.to/40Bve63',
    Icon: a7900,
    cost: 799,
    disc: 691,
    watts: 300,
    asin: "B0BNLT17XQ"

  },
  {
    name: '7800 XT',
    vram: 16,
    Design: 'AMD',
    Release: 2023,
    Watts: 286,
    Bench: 78,
    Link: 'https://amzn.to/3AvdpLU',
    Icon: a7800,
    cost: 499,
    disc: 0,
    watts: 286,
    asin: "B0CGM92TW8"

  },
  {
    name: '7700 XT',
    vram: 12,
    Design: 'AMD',
    Release: 2023,
    Watts: 245,
    Bench: 68,
    Link: 'https://amzn.to/3AmxzI1',
    Icon: a7700,
    cost: 399,
    disc: 0,
    watts: 245,
    asin: "https://amzn.to/3AmxzI1"

  },
  {
    name: '7600 XT',
    vram: 16,
    Design: 'AMD',
    Release: 2024,
    Watts: 190,
    Bench: 44,
    Link: 'https://amzn.to/40xmNJv',
    Icon: a7600,
    cost: 329,
    disc: 314,
    watts: 190,
    asin: "B0CSVJZNNX"

  },
  {
    name: '7600',
    vram: 8,
    Design: 'AMD',
    Release: 2023,
    Watts: 165,
    Bench: 38,
    Link: 'https://amzn.to/40VYGEH',
    Icon: a7600m,
    cost: 269,
    disc: 0,
    watts: 165,
    asin: "B0C59RVD98"

  },
  {
    name: '6600',
    vram: 8,
    Design: 'AMD',
    Release: 2021,
    Watts: 132,
    Bench: 31,
    Link: 'https://amzn.to/4h2OTSs',
    Icon: a6600,
    cost: 199,
    disc: 0,
    watts: 132,
    asin: "B09H3PY14M"

  },
];


const Case = [
  {name: "Corsair 5000D", cost: 119, rgb: "no", Link: "https://amzn.to/3VErttR", disc: 0, watts: 10, asin: "B08M49WW51"},
  {name: "CORSAIR 4000D RGB", cost: 149, rgb: "yes", Link: "https://amzn.to/3Bn0agP", disc: 104, watts: 15, asin: "B0BKBV7QMM"},
  {name: "CORSAIR 4000D", cost: 104, rgb: "no", Link: "https://amzn.to/3Dtskak", disc: 84, watts: 10, asin: "B08C7BGV3D"},
  {name: "CORSAIR 3500X RGB", cost: 109, rgb: "yes", Link: "https://amzn.to/3DwfbNG", disc: 0, watts: 15, asin: "B0CZV1KPXL"},
  {name: "NZXT H5", cost: 95, rgb: "no", Link: "https://amzn.to/3P1O9Au", disc: 79, watts: 10, asin: "B0B6Y15C5L"},
  {name: "NZXT H5 RGB", cost: 120, rgb: "yes", Link: "https://amzn.to/4fhNDck", disc: 0, watts: 15, asin: "B0BQSJWFQM"},
  {name: "NZXT H9", cost: 165, rgb: "no", Link: "https://amzn.to/41DpmKt", disc: 0, watts: 10, asin: "B0BFZZ3ZWZ"},
  {name: "NZXT H9 RGB", cost: 239, rgb: "yes", Link: "https://amzn.to/3VK0c9r", disc: 220, watts: 15, asin: "B0BG196XDP"},
]

const Storage = [
  { name: '870 EVO 4tb', Icon: ss4, cost: 489, size: 4, type: "sata ssd", Link: 'https://amzn.to/49b07kD', disc: 299, watts: 5, asin: "B08QBL36GF"},
  { name: '870 EVO 2tb', Icon: ss2, cost: 254, size: 2, type: "sata ssd", Link: 'https://amzn.to/4gbep7a', disc: 169, watts: 5, asin: "B08QB93S6R"},
  { name: '870 EVO 1tb', Icon: ss1, cost: 145, size: 1, type: "sata ssd", Link: 'https://amzn.to/4eZsOlz', disc: 89, watts: 5, asin: "B08QBJ2YMG"},
  { name: '870 EVO 0.5tb', Icon: ss05, cost: 84, size: 0.5, type: "sata ssd", Link: 'https://amzn.to/49h02fm', disc: 55, watts: 5, asin: "B08QBMD6P4"},
  { name: '990 EVO 4tb', Icon: m24, cost: 345, size: 4, type: "m.2 ssd", Link: 'https://amzn.to/3PGdLTG', disc: 249, watts: 8, asin: "B0DHLBDSP7"},
  { name: '990 EVO 2tb', Icon: m22, cost: 184, size: 2, type: "m.2 ssd", Link: 'https://amzn.to/3OyWdse', disc: 139, watts: 8, asin: "B0DHLCRF91"},
  { name: '990 EVO 1tb', Icon: m21, cost: 149, size: 1, type: "m.2 ssd", Link: 'https://amzn.to/3Z9QkGR', disc: 74, watts: 8, asin: "B0CRCC9863"},
  { name: 'Seagate 12tb', Icon: hd12, cost: 580, size: 12, type: "hard drive", Link: 'https://amzn.to/4gilOkN', disc: 0, watts: 12, asin: "B07H557CHQ"},
  { name: 'Seagate 8tb', Icon: hd8, cost: 135, size: 8, type: "hard drive", Link: 'https://amzn.to/4fPciWO', disc: 0, watts: 10, asin: "B07H289S7C"},
  { name: 'Seagate 4tb', Icon: hd4, cost: 95, size: 4, type: "hard drive", Link: 'https://amzn.to/3ZbLetF', disc: 0, watts: 9, asin: "B09NHV3CK9"},
  { name: 'SPower 0.25tb', Icon: sl02, cost: 18, size: 0.25, type: "sata ssd", Link: 'https://amzn.to/3ZgdgnV', disc: 0, watts: 6, asin: "B0CQCH4RSD"},
  { name: 'SPower 0.5tb', Icon: sl05, cost: 27, size: 0.5, type: "sata ssd", Link: 'https://amzn.to/3DVZYWt', disc: 0, watts: 6, asin: "B07997QV4Z"},
  { name: 'SPower 1tb', Icon: sl1, cost: 47, size: 1, type: "sata ssd", Link: 'https://amzn.to/4fOBL2r', disc: 0, watts: 6, asin: "B0C69NT8RX"},
  { name: 'SPower 4tb', Icon: sl4, cost: 179, size: 4, type: "sata ssd", Link: 'https://amzn.to/3Zvhnhk', disc: 0, watts: 6, asin: "B0BVLRFFWQ"},
];




function App() {
  const generateAmazonCart = ({ gPU, cPU, cOOL, rAM, rAM2, sTOR, sTOR2, pSU, mOBO, cASE }, affiliateId, marketplaceId = 'com') => {
  // Base URL for Amazon cart
  const baseUrl = `https://www.amazon.${marketplaceId}/gp/aws/cart/add.html`;

  // Filter out undefined/null components
  const components = [gPU, cPU, cOOL, rAM, rAM2, sTOR, sTOR2, pSU, mOBO, cASE].filter(component => component?.asin);

  // Create URL parameters for each item
  const itemParams = components.map((component, index) => {
    const quantity = 1;
    return `ASIN.${index + 1}=${component.asin}&Quantity.${index + 1}=${quantity}`;
  });

  // Add affiliate tag
  const affiliateParam = `&AssociateTag=${affiliateId}`;

  // Combine all parameters
  const queryString = itemParams.join('&') + affiliateParam;

  // Return complete URL
  return `${baseUrl}?${queryString}`;
  };





  const [storageComponents, setStorageComponents] = useState([
    {id: 1, isExtra: false},
  ]);

  const handleAddStorage = () => {
    setStorageComponents((prev) => [
      ...prev,
      {id: prev.length + 1, isExtra: true},
    ]);
  };

  const handleRemoveStorage = (id) => {
    setStorageComponents((prev) =>
        prev.filter((component) => component.id !== id)
    );
  };

  const [selectedGPU, setSelectedGPU] = useState(GPUs[0]);
  const [selectedCPU, setSelectedCPU] = useState(CPUs[0]);
  const [selectedRAM, setSelectedRAM] = useState(RAMs[0]);
  const [selectedCOOLER, setSelectedCOOLER] = useState(Coolers[0]);
  const [selectedSTOR, setSelectedSTOR] = useState(Storage[0]);
  const [selectedSTOR2, setSelectedSTOR2] = useState(Storage[3]);
  const [selectedPSU, setSelectedPSU] = useState(PSU[0])
  const [selectedMOBO, setSelectedMOBO] = useState(MOBO[0]);
  const [selectedCASE, setSelectedCASE] = useState(Case[0]);


  const [isPopupOpen, setIsPopupOpen] = useState(false); // GPU Popup State
  const [CPUisPopupOpen, setCPUIsPopupOpen] = useState(false); // CPU Popup State
  const [RAMisPopupOpen, setRAMIsPopupOpen] = useState(false); // CPU Popup State
  const [COOLERisPopupOpen, setCOOLERIsPopupOpen] = useState(false); // CPU Popup State
  const [STORisPopupOpen, setSTORIsPopupOpen] = useState(false); // CPU Popup State
  const [STORisPopupOpen2, setSTORIsPopupOpen2] = useState(false); // CPU Popup State
  const [PSUisPopupOpen, setPSUIsPopupOpen] = useState(false)
  const [MOBOisPopupOpen, setMOBOIsPopupOpen] = useState(false);
  const [CASEisPopupOpen, setCASEIsPopupOpen] = useState(false);

  const [ramcount, setramcount] = useState(1); // GPU Selected Toggle
  const [storcount, setstorcount] = useState(1);

  const [selected, setSelected] = useState(false); // GPU Selected Toggle
  const [YCPUselected, setYCPUSelected] = useState(false); // CPU Selected Toggle
  const [YRAMselected, setYRAMSelected] = useState(false); // CPU Selected Toggle
  const [YCOOLERselected, setYCOOLERSelected] = useState(false); // CPU Selected Toggle
  const [YSTORselected, setYSTORSelected] = useState(false); // CPU Selected Toggle
  const [YPSUselected, setYPSUSelected] = useState(false);
  const [YMOBOselected, setYMOBOSelected] = useState(false);
  const [YCASEselected, setYCASESelected] = useState(false);

  const handleSelectGPU = (option) => {
    const selected = GPUs.find((gpu) => gpu.name === option);
    if (selected) setSelectedGPU(selected);
    setSelected(true); // Mark GPU as selected
    setIsPopupOpen(false);
  };

  const handleSelectCPU = (option) => {
    const selected = CPUs.find((cpu) => cpu.name === option);
    if (selected) setSelectedCPU(selected);
    setYCPUSelected(true); // Mark CPU as selected
    setCPUIsPopupOpen(false);
  };

  const handleSelectPSU = (option) => {
    const selected = PSU.find((psu) => psu.name === option);
    if (selected) setSelectedPSU(selected);
    setYPSUSelected(true); // Mark GPU as selected
    setPSUIsPopupOpen(false);
  };

  const handleSelectCASE = (option) => {
    const selected = Case.find((casse) => casse.name === option);
    if (selected) setSelectedCASE(selected);
    setYCASESelected(true); // Mark GPU as selected
    setCASEIsPopupOpen(false);
  };

  const handleSelectCOOLER = (option) => {
    const selected = Coolers.find((cool) => cool.name === option);
    if (selected) setSelectedCOOLER(selected);
    setYCOOLERSelected(true); // Mark CPU as selected
    setCOOLERIsPopupOpen(false);
  };

  const handleSelectRAM = (option) => {
    const selected = RAMs.find((rm) => rm.name === option);
    if (selected) setSelectedRAM(selected);
    setYRAMSelected(true); // Mark CPU as selected
    setRAMIsPopupOpen(false);
  };

  const handleSelectSTOR = (option) => {
    const selected = Storage.find((stor) => stor.name === option);
    if (selected) setSelectedSTOR(selected);
    setYSTORSelected(true); // Mark CPU as selected
    setSTORIsPopupOpen(false);
  };

  const handleSelectSTOR2 = (option) => {
    const selected = Storage.find((stor) => stor.name === option);
    if (selected) setSelectedSTOR2(selected);
    setSTORIsPopupOpen2(false);
  };

  const handleSelectMOBO = (option) => {
    const selected = MOBO.find((mobo) => mobo.name === option);
    if (selected) setSelectedMOBO(selected);
    setYMOBOSelected(true); // Mark CPU as selected
    setMOBOIsPopupOpen(false);
  };

  const [builds, setBuilds] = useState([])

  useEffect(() => {
    fetchBuilds()
  }, [])

  const client = generateClient();

  const fetchBuilds = async () => {
    try {
      const buildData = await client.graphql({ query: listBuilds });
      console.log(buildData);
      setBuilds(buildData.data.listBuilds.items);
      console.log(builds[0]);
    } catch (error) {
      console.log(error);
    }

  };

  const addBuild = async () => {
    try {
      const result = await client.graphql({
        query: createBuild,
        variables: {
          input: {
            gpu: selectedGPU.name,
            gpuCost: selectedGPU.cost,
            cpu: selectedCPU.name,
            cpuCost: selectedCPU.cost,
            cooler: selectedCOOLER.name,
            coolerCost: selectedCOOLER.cost,
            ram: selectedRAM.name,
            ramCost: selectedRAM.cost,
            numram: selectedRAM.RR,
            bootDrive: selectedSTOR.name,
            bootDriveCost: selectedSTOR.cost,
            drive: selectedSTOR2.name,
            driveCost: selectedSTOR2.cost, //Second Drive
            numstorage: selectedSTOR.size,
            mobo: selectedMOBO.name,
            moboCost: selectedMOBO.cost,
            psu: selectedPSU.name,
            psuCost: selectedPSU.cost,
            case: selectedCASE.name,
            caseCost: selectedCASE.cost
          }
        }
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }

  };

  const [showModal, setShowModal] = React.useState(false);



  return (

    <div className="container">




      <ParticlesBackground/>

       <div className="case">




        <div className="App">
        </div>

        {CASEisPopupOpen && (
            <PopupCase
                CPUs={Case}
                onClose={() => setCASEIsPopupOpen(false)}
                onSelect={handleSelectCASE}
            />
        )}


        <div className="colored-box">
          {/* GPU Section */}
          <div className="gpu-container">
            {selected ? (
                <div className="gray-box">
                  <img
                      src={selectedGPU.Icon}
                      alt="gpu"
                      className="gpu-background"
                  />
                  <button
                      className="select-gpu-btn"
                      onClick={() => setIsPopupOpen(true)}
                  >
                    {selectedGPU.name}
                  </button>
                  <a href={selectedGPU.Link}>
                    <img src={amazonicon} className="amazonIcon" alt="Amazon"/>
                    <div className="gpu-cost">${selectedGPU.cost}</div>
                  </a>
                  <div className="gpu-vram">{selectedGPU.vram}gbvram</div>
                </div>
            ) : (
                <button
                    className="select-gpu-btn2"
                    onClick={() => setIsPopupOpen(true)}
                >
                  Select GPU
                </button>
            )}
          </div>
          {isPopupOpen && (
              <Popup
                  GPUs={GPUs}
                  onClose={() => setIsPopupOpen(false)}
                  onSelect={handleSelectGPU}
              />
          )}
        </div>

        <span style={{display: 'inline-block', width: '20px'}}></span>

      <div className="colored-boxCPU">
        {/* CPU Section */}
        <div className="cpu-container">
          {YCPUselected ? (
            <div className="cpu-box">
              <img
                src={selectedCPU.Icon}
                alt="cpu"
                className="cpu-background"
              />
              <button
                className="select-cpu-btn"
                onClick={() => setCPUIsPopupOpen(true)}
              >
                {selectedCPU.name}
              </button>
              <a href={selectedCPU.Link} target="_blank" rel="noopener noreferrer">
                <img src={amazonicon} className="amazonIconCPU" alt="Amazon" />
                <div className="cpu-cost">${selectedCPU.cost}</div>
              </a>
              <div className="cpu-threads">{selectedCPU.Threads} threads </div>
            </div>
          ) : (
            <button
              className="select-cpu-btn2"
              onClick={() => setCPUIsPopupOpen(true)}
            >
              Select CPU
            </button>
          )}
        </div>
        {CPUisPopupOpen && (
          <PopupCPU
          CPUs={CPUs}
          onClose={() => setCPUIsPopupOpen(false)}
          onSelect={handleSelectCPU}
          selectedMOBO={selectedMOBO}
          YMOBOselected={YMOBOselected}
        />
        )}
      </div>

        <span style={{display: 'inline-block', width: '20px'}}></span>

        <div className="colored-boxCOOLER">
          {/* CPU Section */}
          <div className="COOLER-container">
            {YCOOLERselected ? (
                <div className="COOLER-box">
                  <img
                      src={selectedCOOLER.Icon}
                      alt="COOLER"
                      className="COOLER-background"
                  />
                  <button
                      className="select-COOLER-btn"
                      onClick={() => setCOOLERIsPopupOpen(true)}
                  >
                    {selectedCOOLER.name}
                  </button>
                  <a href={selectedCOOLER.Link}>
                    <img
                        src={amazonicon}
                        className="amazonIconCOOLER"
                        alt="Amazon"
                    />
                    <div className="COOLER-cost">${selectedCOOLER.cost}</div>
                  </a>
                </div>
            ) : (
                <button
                    className="select-COOLER-btn2"
                    onClick={() => {
                      console.log('Cooler button clicked');
                      setCOOLERIsPopupOpen(true);
                    }}
                >
                  Select Cooler
                </button>
            )}
          </div>
          {COOLERisPopupOpen && (
              <PopupCOOLER
                  CPUs={Coolers}
                  onClose={() => setCOOLERIsPopupOpen(false)}
                  onSelect={handleSelectCOOLER}
              />
          )}
        </div>

        <div style={{height: "20px"}}></div>

        <div className="colored-boxRAM">
          {/* CPU Section */}
          <div className="RAM-container">
            {YRAMselected ? (
                <div className="RAM-box">
                  <img
                      src={selectedRAM.Icon}
                      alt="cpu"
                      className="RAM-background"
                  />
                  <button
                      className="select-RAM-btn"
                      onClick={() => setRAMIsPopupOpen(true)}
                  >
                    {selectedRAM.name}
                  </button>
                  <a href={selectedRAM.Link}>
                    <img src={amazonicon} className="amazonIconRAM" alt="Amazon"/>
                    <div className="RAM-cost">${selectedRAM.cost}</div>
                  </a>
                  <div className="RAM-threads">{selectedRAM.RR} MHz</div>

              <button
                className="ramCount"
                onClick={() => setramcount(ramcount === 1 ? 2 : 1)}
              >
                ({ramcount}x)
              </button>
            </div>
          ) : (
            <button
              className="select-RAM-btn2"
              onClick={() => setRAMIsPopupOpen(true)}
            >
              Select RAM
            </button>
          )}
        </div>
        {RAMisPopupOpen && (
          <PopupRAM
            CPUs={RAMs}
            onClose={() => setRAMIsPopupOpen(false)}
            onSelect={handleSelectRAM}
            selectedMOBO={selectedMOBO}
            YMOBOselected={YMOBOselected}
          />
        )}
      </div>

        <span style={{display: 'inline-block', width: '20px'}}></span>

      <div className="colored-boxSTOR">
        {/* CPU Section */}

        <div className="STOR-container">
          {YSTORselected ? (
            <div className="STOR-box">

              <img
                src={selectedSTOR.Icon}
                alt="cpu"
                className="STOR-background"
                style={{
                  transition: "clip-path 0.3s ease-in-out",
                  zIndex: 1,
                  clipPath: storcount === 2
                    ? "polygon(100% 0, 100% 0%, 100% 100%, 0 100%)"
                    : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              <img
                src={selectedSTOR2.Icon}
                alt="cpu"
                className="STOR-background2"
                style={{
                  transform: 'translateX(-100%)',
                  top: '-45px',
                  position: 'absolute',
                  width: '320px',
                  height: 'auto',
                  clipPath: 'polygon(0 22%, 100% 22%, 100% 77%, 0 77%)',
                  zIndex: 0,
                  opacity: 0.5
                }}
              />



              <button
                className="select-STOR-btn"
                onClick={() => setSTORIsPopupOpen(true)}
              >
                {selectedSTOR.name}
              </button>

              {(storcount === 2 &&
                <>
                <button
                  className="select-newSTOR-btn"
                  onClick={() => setSTORIsPopupOpen2(true)}
                >
                  {selectedSTOR2.name}
                </button>

                   <a href={selectedSTOR2.Link} target="_blank" rel="noopener noreferrer">
                   <img src={amazonicon} className="amazonIconSTOR2" alt="Amazon" />
                   <div className="STOR-cost2">${selectedSTOR2.cost}</div>
                 </a>
                </>
              )}

              <a href={selectedSTOR.Link} target="_blank" rel="noopener noreferrer">
                <img src={amazonicon} className="amazonIconSTOR" alt="Amazon" />
                <div className="STOR-cost">${selectedSTOR.cost}</div>
              </a>



              <button
                className="ramCount"
                onClick={() => setstorcount(storcount === 1 ? 2 : 1)}
              >
                {storcount === 1 ? "+" : "-"}
              </button>
            </div>
          ) : (
            <button
              className="select-STOR-btn2"
              onClick={() => setSTORIsPopupOpen(true)}
            >
              Select Storage
            </button>
          )}
        </div>
        {STORisPopupOpen && (
          <PopupSTOR
            CPUs={Storage}
            onClose={() => setSTORIsPopupOpen(false)}
            onSelect={handleSelectSTOR}
          />
        )}
         {STORisPopupOpen2 && (
          <PopupSTOR
            CPUs={Storage}
            onClose={() => setSTORIsPopupOpen(false)}
            onSelect={handleSelectSTOR2}
          />
        )}
      </div>


        <div style={{height: "20px"}}></div>



      <div className="colored-boxMOBO">
        {/* CPU Section */}
        <div className="MOBO-container">
          {YMOBOselected ? (
            <div className="MOBO-box">
              <img
                src={selectedMOBO.Icon}
                alt="cpu"
                className="MOBO-background"
              />
              <button
                className="select-MOBO-btn"
                onClick={() => setMOBOIsPopupOpen(true)}
              >
                {selectedMOBO.name}
              </button>
              <a href={selectedMOBO.Link} target="_blank" rel="noopener noreferrer">
                <img src={amazonicon} className="amazonIconMOBO" alt="Amazon" />
                <div className="MOBO-cost">${selectedMOBO.cost}</div>
              </a>
            </div>
          ) : (
            <button
              className="select-MOBO-btn2"
              onClick={() => setMOBOIsPopupOpen(true)}
            >
              Select MOBO
            </button>
          )}
        </div>
        {MOBOisPopupOpen && (
          <PopupMOBO
          CPUs={MOBO}
          onClose={() => setMOBOIsPopupOpen(false)}
          onSelect={handleSelectMOBO}
          selectedCPU={selectedCPU}
          selectedRAM={selectedRAM}
          YRAMselected={YRAMselected}
          YCPUselected={YCPUselected}
        />
        )}
      </div>

        <span style={{display: 'inline-block', width: '30px'}}></span>

      <div className="colored-boxPSU">
        {/* CPU Section */}
        <div className="PSU-container">
          {YPSUselected ? (
            <div className="PSU-box">
              <img
                src={selectedPSU.Icon}
                alt="PSU"
                className="PSU-background"
              />
              <button
                className="select-PSU-btn"
                onClick={() => setPSUIsPopupOpen(true)}
              >
                {selectedPSU.name}
              </button>
              <a href={selectedPSU.Link} target="_blank" rel="noopener noreferrer">
                <img src={amazonicon} className="amazonIconPSU" alt="Amazon" />
                <div className="PSU-cost">${selectedPSU.cost}</div>
              </a>
            </div>
          ) : (
            <button
              className="select-PSU-btn2"
              onClick={() => setPSUIsPopupOpen(true)}
            >
              Select PSU
            </button>
          )}
        </div>
        {PSUisPopupOpen && (
          <PopupPSU
            CPUs={PSU}
            onClose={() => setPSUIsPopupOpen(false)}
            onSelect={handleSelectPSU}
          />
        )}
      </div>

              <div 
            className="buildInfo" 
            style={{ 
                maxWidth: "950px",
                backgroundColor:
                          (selectedMOBO.Ram !== selectedRAM.DDR && YMOBOselected && YRAMselected) ||
                          (selectedCPU.Chipset !== selectedMOBO.Chipset && YCPUselected && YMOBOselected)
                            ? 'maroon'
                            : '#00A36C' // Default color
            }}
        >
          {(selectedMOBO.Ram !== selectedRAM.DDR && YMOBOselected && YRAMselected ) || (selectedCPU.Chipset !== selectedMOBO.Chipset && YCPUselected && YMOBOselected) ? (
            <p style={{ color: 'white' }}>
              Compatibility issues detected:
              <ul>
                {selectedMOBO.Ram !== selectedRAM.DDR  && YMOBOselected && YRAMselected && (
                  <li>RAM type mismatch: MOBO requires {selectedMOBO.Ram}, but selected RAM is {selectedRAM.DDR}.</li>
                )}
                {selectedCPU.Chipset !== selectedMOBO.Chipset && YCPUselected && YMOBOselected && (
                  <li>Chipset mismatch: CPU chipset is {selectedCPU.Chipset}, but MOBO requires {selectedMOBO.Chipset}.</li>
                )}
              </ul>
            </p>
          ) : (
            <p style={{ color: 'white' }}>All components are compatible!</p>
          )}
          <br />
          {(YCPUselected || 
            YCOOLERselected || 
            YMOBOselected || 
            YPSUselected || 
            YRAMselected || 
            YSTORselected || 
            selected) && (
              <div>
                <hr className="build-divider"/>

                Total Cost: 
                { 
                  (YCPUselected ? Number(selectedCPU.cost) : 0) +
                  (YCOOLERselected ? Number(selectedCOOLER.cost) : 0) +
                  (YMOBOselected ? Number(selectedMOBO.cost) : 0) +
                  (YPSUselected ? Number(selectedPSU.cost) : 0) +
                  (YRAMselected ? Number(selectedRAM.cost) * Number(ramcount) : 0) +
                  (YSTORselected ? Number(selectedSTOR.cost) : 0) +
                  (storcount === 2 ? Number(selectedSTOR2.cost) : 0) +
                  (selected ? Number(selectedGPU.cost) : 0)
                }

                  <button
                    className="cart-button"
                    onClick={() => {
                      const cartParams = {};

                      if (selected) cartParams.gPU = selectedGPU;
                      if (YCPUselected) cartParams.cPU = selectedCPU;
                      if (YCOOLERselected) cartParams.cOOL = selectedCOOLER;
                      if (YRAMselected) cartParams.rAM = selectedRAM;
                      if (ramcount == 2) cartParams.rAM2 = selectedRAM;
                      if (YSTORselected) cartParams.sTOR = selectedSTOR;
                      if (storcount == 2) cartParams.sTOR2 = selectedSTOR2;
                      if (YPSUselected) cartParams.pSU = selectedPSU;
                      if (YMOBOselected) cartParams.mOBO = selectedMOBO;
                      if (YCASEselected) cartParams.cASE = selectedCASE;

                      const cartUrl = generateAmazonCart(cartParams, 'quinnhenry4-20');
                      window.open(cartUrl, '_blank');
                    }}
                  >
                    Open Amazon Cart
                  </button>


                <div className="estWATT">
                  Estimaged Wattage:
                  {
                    (YCPUselected ? Number(selectedCPU.watts) : 0) +
                    (YCOOLERselected ? Number(selectedCOOLER.watts) : 0) +
                    (YMOBOselected ? Number(selectedMOBO.watts) : 0) +
                    (YRAMselected ? Number(selectedRAM.watts) * Number(ramcount) : 0) +
                    (YSTORselected ? Number(selectedSTOR.watts) : 0) +
                    (storcount === 2 ? Number(selectedSTOR2.watts) : 0) +
                    (selected ? Number(selectedGPU.watts) : 0)
                  }
                </div>
              </div>
          )}

          <div>
            <button
                className={"dataBaseButtons"}
                onClick={addBuild}>Submit Build
            </button>
            <button
                className={"dataBaseButtons"}
                onClick={() => setShowModal(true)}>
              View All Builds
            </button>

          </div>
        </div>


        <button
            className="select-case-btn"
            onClick={() => setCASEIsPopupOpen(true)}
          >

          {YCASEselected ? selectedCASE.name : "Select Case"}
          </button>


            {YCASEselected && (
              <a href={selectedCASE.Link} target="_blank" rel="noopener noreferrer">
                <img src={amazonicon} className="amazonIconCASE" alt="Amazon" />
                <div className="CASE-cost">${selectedCASE.cost}</div>
              </a>
            )}
                          {selected &&
                          YCOOLERselected &&
                          YCPUselected &&
                          YMOBOselected &&
                          YPSUselected &&
                          YRAMselected &&
                          YSTORselected && (
                  <>
                    <div className="r2" style={{
                      width: '100%',
                      display: 'block'
                    }}>
                      <div style={{
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto',
                        display: 'block'
                      }}>
                        <Treemap data={[
                          { label: "GPU", value: selectedGPU.cost },
                          { label: "CPU", value: selectedCPU.cost },
                          { label: "Cooler", value: selectedCOOLER.cost },
                          { label: "RAM", value: selectedRAM.cost },
                          { label: "Storage", value: selectedSTOR.cost },
                          { label: "Motherboard", value: selectedMOBO.cost },
                          { label: "PSU", value: selectedPSU.cost },
                          { label: "Case", value: selectedCASE.cost }
                        ]} />
                      </div>
                    </div>

                    <div className="r1" style={{
                      width: '100%',
                      display: 'block'
                    }}>
                      <div style={{ 
                        width: '100%',
                        maxWidth: '800px',
                        margin: '0 auto',
                        display: 'block'
                      }}>
                        <Treemap data={[
                          { label: "GPU", value: 1 },
                          { label: "CPU", value: 1 },
                          { label: "Cooler", value: 1 },
                          { label: "RAM", value: 1 },
                          { label: "Storage", value: 1 },
                          { label: "Motherboard", value: 1 },
                          { label: "PSU", value: 1 },
                          { label: "Case", value: 1 }
                        ]} />
                      </div>
                    </div>
                  </>
              )}
       </div>
        {showModal ? (
            <div style={{
                position: "absolute",
                top: "5%",
                left: "10%",
                right: "10%",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                color: "#333",
                border: "2px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                padding: "1%",
                zIndex: "10",
                minHeight: "10%", // Allow height to expand dynamically
            }}>
                <button
                    className={"closeButton"}
                    onClick={() => setShowModal(false)}>X
                </button>
                <h1>Builds</h1>
                <table border="1" style={{width: "100%", textAlign: "left"}}>
                    <thead>
                    <tr>
                        <th>GPU</th>
                        <th>CPU</th>
                        <th>Cooler</th>
                        <th>RAM</th>
                        <th>Number of RAM Sticks</th>
                        <th>Drive</th>
                        <th>Number of Storage Drives</th>
                        <th>Motherboard</th>
                        <th>PSU</th>
                        <th>Case</th>
                    </tr>
                    </thead>
                    <tbody>
                    {builds.map((build, index) => (
                        <tr key={index}>
                            <td>{build.gpu}</td>
                            <td>{build.cpu}</td>
                            <td>{build.cooler}</td>
                            <td>{build.ram}</td>
                            <td>{build.numram}</td>
                            <td>{build.drive}</td>
                            <td>{build.numstorage}</td>
                            <td>{build.mobo}</td>
                            <td>{build.psu}</td>
                            <td>{build.case}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        ) : null}

        <br/>

    </div>



  );
}


export default App;
