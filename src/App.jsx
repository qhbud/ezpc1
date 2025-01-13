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
  {name: "Corsair RM750", Icon: pg80, Wattage: 750, type: "Fully Modular", Grade: "80+ Gold", cost: 100, Link : "https://amzn.to/4iEgQRG"},
  {name: "AGV Series 500", Icon: pbn80, Wattage: 500, type: "Non Modular", Grade: "80+ Bronze", cost: 50, Link : "https://amzn.to/4iA6eTP"},
  {name: "CORSAIR RM850", Icon: pg80, Wattage: 850, type: "Fully Modular", Grade: "80+ Gold", cost: 150, Link : "https://amzn.to/4gxHIkn"},
  {name: "Corsair RM1000", Icon: pg80, Wattage: 1000, type: "Fully Modular", Grade: "80+ Gold", cost: 180, Link : "https://amzn.to/4iA6gep"},
  {name: "TT SMART 600", Icon: pn80, Wattage: 600, type: "Non Modular", Grade: "80+", cost: 55, Link : "https://amzn.to/3DeHy2R"},
  {name: "AGV Series 750", Icon: pbs80, Wattage: 750, type: "Semi Modular", Grade: "80+ Bronze", cost: 80, Link : "https://amzn.to/4gBjMwn"},

]

const MOBO = [
  {name: "MAG B550 TOMAHAWK", Icon: magb550, Chipset: "AM4", Wifi: "Yes", Ram: "DDR4", Form: "ATX", cost: 179, Link: "https://amzn.to/4g00sZO"},
  {name: "MSI B550-A PRO", Icon: msib550, Chipset: "AM4", Wifi: "No", Ram: "DDR4", Form: "ATX", cost: 120, Link: "https://amzn.to/4fiMh17"},
  {name: "MAG B650 TOMAHAWK", Icon: b650, Chipset: "AM5", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 219, Link: "https://amzn.to/3OCHgFH"},
  {name: "GIGABYTE B650M", Icon: b650, Chipset: "AM5", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 159, Link: "https://amzn.to/3OJNseM"},
  {name: "MSI B760 Gaming Plus", Icon: b760p, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 169, Link: "https://amzn.to/3VqOHTZ"},
  {name: "MSI PRO B760-P", Icon: bp760p, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR4", Form: "ATX", cost: 159, Link: "https://amzn.to/4faFq9W"},
  {name: "ASUS TUF Gaming Z790", Icon: a790, Chipset: "LGA 1700", Wifi: "Yes", Ram: "DDR5", Form: "ATX", cost: 249, Link: "https://amzn.to/4f0PWQS"},
  {name: "MSI PRO B760M-P", Icon: bp760m, Chipset: "LGA 1700", Wifi: "No", Ram: "DDR4", Form: "ATX", cost: 99, Link: "https://amzn.to/3OJNEuw"},
  {name: "ASUS Prime B450M-A", Icon: aprime, Chipset: "AM4", Wifi: "No", Ram: "DDR4", Form: "mATX", cost: 89, Link: "https://amzn.to/4gjI3a2"},
  {name: "ASRock B660M Pro ", Icon: b660m, Chipset: "LGA 1700", Wifi: "No", Ram: "DDR4", Form: "mATX", cost: 79, Link: "https://amzn.to/3ZD9gPE"},
  {name: "ASRock B650M-H", Icon: b650m, Chipset: "AM5", Wifi: "No", Ram: "DDR5", Form: "mATX", cost: 109, Link: "https://amzn.to/3ZCuA7N"},
]



// CPU & GPU Arrays

const RAMs = [
  {
    name: 'V16 2x16',
    Icon: cl1616,
    cost: 80,
    Link: 'https://amzn.to/3YVqSVx',
    DDR: "DDR4",
    RR: 3200,
  },
  {
    name: 'V16 2x32',
    Icon: cl1632,
    cost: 105,
    Link: 'https://amzn.to/3CA6pOx',
    DDR: "DDR4",
    RR: 3200,
  },
  {
    name: 'V18 2x16',
    Icon: cl1816,
    cost: 65,
    Link: 'https://amzn.to/3YYbBmE',
    DDR: "DDR4",
    RR: 3600,
  },
  {
    name: 'V30 2x16',
    Icon: cl3016,
    cost: 120,
    Link: 'https://amzn.to/3YYbBmE',
    DDR: "DDR5",
    RR: 6000,
  },
  {
    name: 'V30 2x24',
    Icon: cl3024,
    cost: 165,
    Link: 'https://amzn.to/3Ohho1Q',
    DDR: "DDR5",
    RR: 6000,
  },
  {
    name: 'V30 2x32',
    Icon: cl3032,
    cost: 220,
    Link: 'https://amzn.to/40Q6irZ',
    DDR: "DDR5",
    RR: 6000,
  },
  {
    name: 'V30 2x48',
    Icon: cl3048,
    cost: 330,
    Link: 'https://amzn.to/4fvUdg5',
    DDR: "DDR5",
    RR: 6000,
  },
  {
    name: 'R36 2x16',
    Icon: cl3616,
    cost: 130,
    Link: 'https://amzn.to/3ZbrdV8',
    DDR: "DDR5",
    RR: 6400,
  },
  {
    name: 'R36 2x48',
    Icon: cl3648,
    cost: 363,
    Link: 'https://amzn.to/3ZabmGq',
    DDR: "DDR5",
    RR: 6400,
  },
];

const Coolers = [
  {
    name: 'Noctua  NH-U9S',
    Icon: nhu9s,
    Type: 'Small Air',
    cost: 60,
    Link: 'https://amzn.to/497NqXF',
  },
  {
    name: 'Noctua  NH-D15',
    Icon: nhd15,
    Type: 'Large Air',
    cost: 120,
    Link: 'https://amzn.to/40WiJCA',
  },
  {
    name: 'Cooler Master Hyper 212S',
    Icon: s212s,
    Type: 'Small Air',
    cost: 19,
    Link: 'https://amzn.to/40WiJCA',
  },
  {
    name: 'Cooler Master Hyper  260s',
    Icon: s260s,
    Type: 'Large Air',
    cost: 50,
    Link: 'https://amzn.to/4fHQlc3',
  },
  {
    name: 'Arctic Freeze III',
    Icon: AF,
    Type: 'Liquid',
    cost: 140,
    Link: 'https://amzn.to/4eFbPF6',
  },
  {
    name: 'Arctic Freeze III RGB',
    Icon: AFR,
    Type: 'Liquid',
    cost: 108,
    Link: 'https://amzn.to/4i04hzO',
  },
  {
    name: 'TOUGHLIQUID 360 EX',
    Icon: tl,
    Type: 'Liquid',
    cost: 140,
    Link: 'https://amzn.to/4hRxUmV',
  },
  {
    name: 'Cooler Master ML 360L',
    Icon: cl,
    Type: 'Liquid',
    cost: 100,
    Link: 'https://amzn.to/4eFPGql',
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
  },
  {
    name: 'Core I9-12900K',
    Icon: i9129,
    cost: 276,
    Single: 87,
    Multi: 70,
    Threads: 24,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/3UOs37I',
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
  },
  {
    name: 'Core I7-12700K',
    Icon: i9127,
    cost: 225,
    Single: 84,
    Multi: 60,
    Threads: 20,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/4hKDR4P',
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
  },
  {
    name: 'Core I5-12600K',
    Icon: i9126,
    cost: 342,
    Single: 83,
    Multi: 46,
    Threads: 16,
    Release: 2021,
    Chipset: "LGA 1700",
    Design: 'Intel',
    Link: 'https://amzn.to/4hI1Txq',
  },

  {
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
  },
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
    Link: 'https://amzn.to/48N0UYT',
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
  },
  {
    name: 'Ryzen 9 7900',
    Icon: r97M,
    cost: 413,
    Single: 84.1,
    Multi: 69.97,
    Threads: 24,
    Release: 2023,
    Chipset: "AM5",
    Design: 'AMD',
    Link: 'https://amzn.to/4euYSxw',
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
  },
  {
    name: 'Ryzen 9 5900X',
    Icon: r95X,
    cost: 569,
    Single: 71.5,
    Multi: 58.02,
    Threads: 24,
    Release: 2020,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/4etDqJn',
  },
  {
    name: 'Ryzen 7 5700X',
    Icon: r75X,
    cost: 319,
    Single: 67.8,
    Multi: 39.77,
    Threads: 16,
    Release: 2022,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/4etv44i',
  },
  {
    name: 'Ryzen 5 5600X',
    Icon: r55X,
    cost: 127,
    Single: 67.3,
    Multi: 32.5,
    Threads: 12,
    Release: 2020,
    Chipset: "AM4",
    Design: 'AMD',
    Link: 'https://amzn.to/3UNtvam',
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
    Link: 'https://amzn.to/3UEjQ64',
    Icon: n4090,
    cost: 1949,
  },
  {
    name: '4080 SUPER',
    vram: 16,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 320,
    Bench: 148,
    Link: 'https://amzn.to/3CjZicV',
    Icon: n4080,
    cost: 999,
  },
  {
    name: '4070 TI SUPER',
    vram: 16,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 290,
    Bench: 142,
    Link: 'https://amzn.to/48Ez5BU',
    Icon: n4070ti,
    cost: 820,
  },
  {
    name: '4070 SUPER',
    vram: 12,
    Design: 'Nvidia',
    Release: 2024,
    Watts: 220,
    Bench: 138,
    Link: 'https://amzn.to/3Z06L8L',
    Icon: n4070,
    cost: 820,
  },
  {
    name: '4060 TI (16gb)',
    vram: 16,
    Design: 'Nvidia',
    Release: 2023,
    Watts: 165,
    Bench: 101,
    Link: 'https://amzn.to/3NWu3ae',
    Icon: n4060ti,
    cost: 449,
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
    cost: 419,
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
    cost: 297,
  },
  {
    name: '3060',
    vram: 12,
    Design: 'Nvidia',
    Release: 2021,
    Watts: 170,
    Bench: 54,
    Link: 'https://amzn.to/4fnajc8',
    Icon: n3060,
    cost: 284,
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
  },
  {
    name: '7900 XTX',
    vram: 22,
    Design: 'AMD',
    Release: 2022,
    Watts: 355,
    Bench: 149,
    Link: 'https://amzn.to/3O5FU5L',
    Icon: a7900x,
    cost: 899,
  },
  {
    name: '7900 XT',
    vram: 20,
    Design: 'AMD',
    Release: 2022,
    Watts: 300,
    Bench: 144,
    Link: 'https://amzn.to/3YWWV8E',
    Icon: a7900,
    cost: 649,
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
    cost: 480,
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
    cost: 389,
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
  },
  {
    name: '6600',
    vram: 8,
    Design: 'AMD',
    Release: 2021,
    Watts: 132,
    Bench: 31,
    Link: 'https://amzn.to/4epHYQS',
    Icon: a6600,
    cost: 199,
  },
];


const Case = [
  {name: "Corsair 5000D", cost: 175, rgb: "no", Link: "https://amzn.to/3VErttR"},
  {name: "CORSAIR 4000D RGB", cost: 105, rgb: "yes", Link: "https://amzn.to/3Bn0agP"},
  {name: "CORSAIR 4000D", cost: 149, rgb: "no", Link: "https://amzn.to/3Dtskak"},
  {name: "CORSAIR 3500X RGB", cost: 110, rgb: "yes", Link: "https://amzn.to/3DwfbNG"},
  {name: "NZXT H5", cost: 95, rgb: "no", Link: "https://amzn.to/3P1O9Au"},
  {name: "NZXT H5 RGB", cost: 120, rgb: "yes", Link: "https://amzn.to/4fhNDck"},
  {name: "NZXT H9", cost: 165, rgb: "no", Link: "https://amzn.to/41DpmKt"},
  {name: "NZXT H9 RGB", cost: 196, rgb: "yes", Link: "https://amzn.to/3VK0c9r"},




]

const Storage = [
  { name: '870 EVO 4tb', Icon: ss4, cost: 287, size: 4, type: "sata ssd", Link: 'https://amzn.to/49b07kD'},
  { name: '870 EVO 2tb', Icon: ss2, cost: 165, size: 2, type: "sata ssd", Link: 'https://amzn.to/4gbep7a' },
  { name: '870 EVO 1tb', Icon: ss1, cost: 98, size: 1, type: "sata ssd", Link: 'https://amzn.to/4eZsOlz' },
  { name: '870 EVO 0.5tb', Icon: ss05, cost: 53, size: 0.5, type: "sata ssd", Link: 'https://amzn.to/49h02fm' },
  { name: '990 EVO 4tb', Icon: m24, cost: 345, size: 4, type: "m.2 ssd", Link: 'https://amzn.to/49cbZ5E' },
  { name: '990 EVO 2tb', Icon: m22, cost: 184, size: 2, type: "m.2 ssd", Link: 'https://amzn.to/3OyWdse' },
  { name: '990 EVO 1tb', Icon: m21, cost: 110, size: 1, type: "m.2 ssd", Link: 'https://amzn.to/3Z9QkGR' },
  { name: 'Seagate 12tb', Icon: hd12, cost: 229, size: 12, type: "hard drive", Link: 'https://amzn.to/4eVN1Jg'  },
  { name: 'Seagate 8tb', Icon: hd8, cost: 135, size: 8, type: "hard drive", Link: 'https://amzn.to/4fPciWO'  },
  { name: 'Seagate 4tb', Icon: hd4, cost: 95, size: 4, type: "hard drive", Link: 'https://amzn.to/3ZbLetF' },
  { name: 'SPower 0.25tb', Icon: sl02, cost: 18, size: 0.25, type: "sata ssd", Link: 'https://amzn.to/3ZgdgnV' },
  { name: 'SPower 0.5tb', Icon: sl05, cost: 29, size: 0.5, type: "sata ssd", Link: 'https://amzn.to/3OyIf9C' },
  { name: 'SPower 1tb', Icon: sl1, cost: 54, size: 1, type: "sata ssd", Link: 'https://amzn.to/4fOBL2r' },
  { name: 'SPower 2tb', Icon: sl2, cost: 86, size: 2, type: "sata ssd", Link: 'https://amzn.to/3ZwFUCF' },
  { name: 'SPower 4tb', Icon: sl4, cost: 179, size: 4, type: "sata ssd", Link: 'https://amzn.to/3Zvhnhk' },
];

function App() {
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
  const [selectedPSU, setSelectedPSU] = useState(PSU[0])
  const [selectedMOBO, setSelectedMOBO] = useState(MOBO[0]);
  const [selectedCASE, setSelectedCASE] = useState(Case[0]);


  const [isPopupOpen, setIsPopupOpen] = useState(false); // GPU Popup State
  const [CPUisPopupOpen, setCPUIsPopupOpen] = useState(false); // CPU Popup State
  const [RAMisPopupOpen, setRAMIsPopupOpen] = useState(false); // CPU Popup State
  const [COOLERisPopupOpen, setCOOLERIsPopupOpen] = useState(false); // CPU Popup State
  const [STORisPopupOpen, setSTORIsPopupOpen] = useState(false); // CPU Popup State
  const [PSUisPopupOpen, setPSUIsPopupOpen] = useState(false)
  const [MOBOisPopupOpen, setMOBOIsPopupOpen] = useState(false);
  const [CASEisPopupOpen, setCASEIsPopupOpen] = useState(false);

  const [ramcount, setramcount] = useState(1); // GPU Selected Toggle

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
            drive: selectedSTOR.name,
            driveCost: selectedSTOR.cost,
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


        <div className="App">
        </div>

        {CASEisPopupOpen && (
            <PopupCase
                CPUs={Case}
                onClose={() => setCASEIsPopupOpen(false)}
                onSelect={handleSelectCASE}
            />
        )}
        {selected && YCOOLERselected && YCPUselected && YMOBOselected && YPSUselected && YPSUselected && YRAMselected && YSTORselected ? (
            <div className="case">


              <button
                  className="select-case-btn"
                  onClick={() => setCASEIsPopupOpen(true)}
              >

                {selectedCASE ? selectedCASE.name : "Select Case"}
              </button>

              <a href={selectedCASE.Link}>
                <img src={amazonicon} className="amazonIconCASE" alt="Amazon"/>
                <div className="CASE-cost">${selectedCASE.cost}</div>
              </a>


              <div className="r2" style={{
                width: '100%',
                display: 'flex'  // Override flex display
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '800px',
                  margin: '0 auto',
                  display: 'block'  // Override flex display
                }}>
                  <h1>Selected Build</h1>
                  <Treemap data={[
                    {label: "GPU", value: selectedGPU.cost},
                    {label: "CPU", value: selectedCPU.cost},
                    {label: "Cooler", value: selectedCOOLER.cost},
                    {label: "RAM", value: selectedRAM.cost},
                    {label: "Storage", value: selectedSTOR.cost},
                    {label: "Motherboard", value: selectedMOBO.cost},
                    {label: "PSU", value: selectedPSU.cost},
                    {label: "Case", value: selectedCASE.cost}
                  ]}/>
                </div>
              </div>

              <div className="r1" style={{
                width: '100%',
                display: 'block'  // Override flex display
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '800px',
                  margin: '0 auto',
                  display: 'block'  // Override flex display
                }}>
                  <h1>Average Build</h1>
                  <Treemap data={[
                    {label: "GPU", value: builds.reduce((sum, build) => sum + build.gpuCost, 0) / builds.length},
                    {label: "CPU", value: builds.reduce((sum, build) => sum + build.cpuCost, 0) / builds.length},
                    {label: "Cooler", value: builds.reduce((sum, build) => sum + build.coolerCost, 0) / builds.length},
                    {label: "RAM", value: builds.reduce((sum, build) => sum + build.ramCost, 0) / builds.length},
                    {label: "Storage", value: builds.reduce((sum, build) => sum + build.driveCost, 0) / builds.length},
                    {
                      label: "Motherboard",
                      value: builds.reduce((sum, build) => sum + build.moboCost, 0) / builds.length
                    },
                    {label: "PSU", value: builds.reduce((sum, build) => sum + build.psuCost, 0) / builds.length},
                    {label: "Case", value: builds.reduce((sum, build) => sum + build.caseCost, 0) / builds.length}
                  ]}/>
                </div>
              </div>


            </div>
        ) : (null)}


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
                  <a href={selectedCPU.Link}>
                    <img src={amazonicon} className="amazonIconCPU" alt="Amazon"/>
                    <div className="cpu-cost">${selectedCPU.cost}</div>
                  </a>
                  <div className="cpu-threads">{selectedCPU.Threads} threads</div>
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
                  />
                  <button
                      className="select-STOR-btn"
                      onClick={() => setSTORIsPopupOpen(true)}
                  >
                    {selectedSTOR.name}
                  </button>
                  <a href={selectedSTOR.Link}>
                    <img src={amazonicon} className="amazonIconSTOR" alt="Amazon"/>
                    <div className="STOR-cost">${selectedSTOR.cost}</div>
                  </a>
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
                  <a href={selectedMOBO.Link}>
                    <img src={amazonicon} className="amazonIconMOBO" alt="Amazon"/>
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
                  <a href={selectedPSU.Link}>
                    <img src={amazonicon} className="amazonIconPSU" alt="Amazon"/>
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
        <div>
          <button
              className={"dataBaseButtons"}
              onClick={addBuild}>Submit Build</button>
          <button
              className={"dataBaseButtons"}
              onClick={() => setShowModal(true)}>
            View All Builds
          </button>

        </div>
        <div
            className="buildInfo"
            style={{
              maxWidth: (selected &&
                  YCOOLERselected &&
                  YCPUselected &&
                  YMOBOselected &&
                  YPSUselected &&
                  YRAMselected &&
                  YSTORselected) ? "950px" : "300px"
            }}
        >
          {selectedMOBO.Ram === selectedRAM.DDR && selectedCPU.Chipset === selectedMOBO.Chipset ? (
              <p style={{color: 'green'}}>All components are compatible!</p>
          ) : (
              <p style={{color: 'maroon'}}>
                Compatibility issues detected:
                <ul>
                  {selectedMOBO.Ram !== selectedRAM.DDR && (
                      <li>RAM type mismatch: MOBO requires {selectedMOBO.Ram}, but selected RAM
                        is {selectedRAM.DDR}.</li>
                  )}
                  {selectedCPU.Chipset !== selectedMOBO.Chipset && (
                      <li>Chipset mismatch: CPU chipset is {selectedCPU.Chipset}, but MOBO
                        requires {selectedMOBO.Chipset}.</li>
                  )}
                </ul>
              </p>
          )}
          <br/>
          {(
              YCPUselected ||
              YCOOLERselected ||
              YMOBOselected ||
              YPSUselected ||
              YRAMselected ||
              YSTORselected ||
              selected
          ) && (

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
                    (selectedGPU ? Number(selectedGPU.cost) : 0)
                }
              </div>
          )}
        </div>

        {showModal ? (
            <div style={{
              position: "fixed",
              left: "auto",
              top: "20%",
              backgroundColor: "#ffffff",
              color: "#333",
              border: "2px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: "1%",
              zIndex: "10"
            }}>
              <button
                  className={"closeButton"}
                  onClick={() => setShowModal(false)}>X</button>
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


      </div>


  );
}


export default App;
