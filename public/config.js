// ═══════════════════════════════════════════════════
//  CONFIG.JS — всё меняется только здесь
// ═══════════════════════════════════════════════════
const CONFIG = {

  company: {
    name:          "Akkuratno",
    subtitle:      "Автомойка & Детейлинг",
    tagline:       "Профессиональный уход за вашим автомобилем",
    description:   "Работаем 7 дней в неделю с 08:00 до 22:00. Быстро, честно, качественно.",
    phone:         "8 (999) 560-99-90",
    address:       "г. Екатеринбург, ул. Предельная, 63/5",
    workHours:     "09:00 — 21:00",
    adminPassword: "admin123",
  },

  timeSlots: [
    "09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00","20:00"
  ],

  services: [
    { id:"express",      name:"Экспресс с пеной",                             desc:"",                                                                        prices:[400,500,600],   highlight:false },
    { id:"wash2",        name:"Двухфазная мойка",                             desc:"(без сушки / чернения резины)",                                           prices:[600,700,800],   highlight:false },
    { id:"wash2b",       name:"Двухфазная мойка / чернение резины",           desc:"",                                                                        prices:[900,1000,1100], highlight:false },
    { id:"wash2c",       name:"Двухфазная мойка / ковры / чернение резины",   desc:"",                                                                        prices:[1000,1300,1500],highlight:false },
    { id:"wash3",        name:"Трёхфазная мойка / чернение резины",           desc:"",                                                                        prices:[1100,1400,1600],highlight:false },
    { id:"wash3c",       name:"Трёхфазная мойка / ковры / чернение резины",   desc:"",                                                                        prices:[1200,1500,1700],highlight:false },
    { id:"complex_s",    name:"КОМПЛЕКС S",                                   desc:"Двухфазная мойка кузова, пылесос, полироль пластика, стекла, чернение резины", prices:[1800,2100,2500],highlight:true  },
    { id:"complex_m",    name:"КОМПЛЕКС M",                                   desc:"Трехфазная мойка кузова, пылесос, полироль пластика, стекла, чернение резины", prices:[2000,2300,2800],highlight:true  },
    { id:"salon",        name:"Салон",                                        desc:"(полироль пластика, пылесос, стёкла)",                                    prices:[800,800,1000],  highlight:false },
    { id:"vacuum",       name:"Пылесос салона",                               desc:"",                                                                        prices:[300,300,350],   highlight:false },
    { id:"plastic",      name:"Полироль пластика",                            desc:"",                                                                        prices:[400,400,500],   highlight:false },
    { id:"glass",        name:"Чистка стёкол",                                desc:"",                                                                        prices:[300,300,350],   highlight:false },
    { id:"leather",      name:"Кондиционер кожи",                             desc:"",                                                                        prices:[400,500,700],   highlight:false },
    { id:"trunk",        name:"Багажник: пылесос и полироль пластика",        desc:"",                                                                        prices:[500,500,500],   pricePrefix:["от","от","от"], highlight:false },
  ],

  gallery: [
    { id:1, title:"Химчистка салона",   before:"gallery/1.1.webp", after:"gallery/1.2.webp" },
    { id:2, title:"Полировка кузова",   before:"gallery/2.1.webp", after:"gallery/2.2.webp" },
    { id:3, title:"Комплекс S",         before:"gallery/3.1.webp", after:"gallery/3.2.webp" },
    { id:4, title:"Нанокерамика",       before:"gallery/4.1.webp", after:"gallery/4.2.webp" },
  ],
};

if (typeof module !== 'undefined') module.exports = CONFIG;
