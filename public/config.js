// ═══════════════════════════════════════════════════
//  CONFIG.JS — всё меняется только здесь
// ═══════════════════════════════════════════════════
const CONFIG = {

  company: {
    name:          "Demo Logo",
    subtitle:      "Австосервис",
    tagline:       "Профессиональный ремонт за вашего автомобиля",
    description:   "Работаем 7 дней в неделю с 08:00 до 22:00. Быстро, честно, качественно.",
    phone:         "8 (999) 999-99-99",
    address:       "г. Солнечногорск",
    workHours:     "09:00 — 21:00",
    adminPassword: "admin123",
  },

  timeSlots: [
    "09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00","20:00"
  ],

  services: [
    { id:"express",      name:"1",                             desc:"",                                                                        prices:[400,500,600],   highlight:false },
    { id:"wash2",        name:"2",                             desc:"(без сушки / чернения резины)",                                           prices:[600,700,800],   highlight:false },
    { id:"wash2b",       name:"3",           desc:"",                                                                        prices:[900,1000,1100], highlight:false },
    { id:"wash2c",       name:"4",   desc:"",                                                                        prices:[1000,1300,1500],highlight:false },
    { id:"wash3",        name:"5",           desc:"",                                                                        prices:[1100,1400,1600],highlight:false },
    { id:"wash3c",       name:"6",   desc:"",                                                                        prices:[1200,1500,1700],highlight:false },
    { id:"complex_s",    name:"7",                                   desc:"8", prices:[1800,2100,2500],highlight:true  },
    { id:"complex_m",    name:"9",                                   desc:"10", prices:[2000,2300,2800],highlight:true  },
    { id:"salon",        name:"13",                                        desc:"12",                                    prices:[800,800,1000],  highlight:false },
    { id:"vacuum",       name:"14",                               desc:"",                                                                        prices:[300,300,350],   highlight:false },
    { id:"plastic",      name:"15",                            desc:"",                                                                        prices:[400,400,500],   highlight:false },
    { id:"glass",        name:"16",                                desc:"",                                                                        prices:[300,300,350],   highlight:false },
    { id:"leather",      name:"17",                             desc:"",                                                                        prices:[400,500,700],   highlight:false },
    { id:"trunk",        name:"18",        desc:"",                                                                        prices:[500,500,500],   pricePrefix:["от","от","от"], highlight:false },
  ],

  gallery: [
    { id:1, title:"demo1",   before:"gallery/1.1.webp", after:"gallery/1.2.webp" },
    { id:2, title:"demo 2",   before:"gallery/2.1.webp", after:"gallery/2.2.webp" },
    { id:3, title:"demo 3",     before:"gallery/3.1.webp", after:"gallery/3.2.webp" },
  ],
};

if (typeof module !== 'undefined') module.exports = CONFIG;
