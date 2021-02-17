/**
 * This file contains data and functions used by multiple classes.
 */

 /**
 * Performs a deep copy of an object without complex types.
 * Note to self: don't reinvent the wheel.
 */
export function copyObject (obj) {
    
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns true if a waste sample is a solid type, false if liquid.
 * Used to determine which default tests are assigned.
 */
export function isSolidWaste(code) {
    return waste_codes_solid.includes(code);
}

/**
 * Returns the array of all possible tests for a given sample type.
 */
export function getAllTests(type) {

    if (type === "Plant") return all_plant_tests;
    if (type === "Waste") return all_waste_tests;
    if (type === "Solution") return all_solution_tests;
    if (type === "Media") return all_media_tests;
}

/**
 * Returns a formatted lab ID number with the appropriate letter in front.
 */
export function getStyledLabId(type, number) {

    switch(type)
    {
        case "Plant": return ("P" + number);
        case "Waste":  return ("W" + number);
        case "Solution":  return ("S" + number);
        case "Media":  return ("M" + number);
        default: return number;
    }

}

/**
 * Returns a formatted lab report number with the appropriate letter
 * and leading zeroes.
 */
export function getStyledReportNumber(type, number) {

    let styledNumber = "R";

    switch(type)
    {
        case "Plant": styledNumber += "P "; break;
        case "Waste": styledNumber += "W "; break;
        case "Solution": styledNumber += "S "; break;
        case "Media": styledNumber += "M "; break;
        default: break;
    }

    // if (number < 10) styledNumber += "00000";
    // else if (number < 100) styledNumber += "0000";
    // else if (number < 1000) styledNumber += "000";
    // else if (number < 1000) styledNumber += "00";
    // else if (number < 10000) styledNumber += "0";

    styledNumber += number;

    return styledNumber;
}


/** All plant codes */
export const plant_codes = [

    "Apple",
    "Apricot",
    "Arugula",
    "Asparagus",
    "Barley",
    "Basil",
    "Beans",
    "Beets",
    "Blackberry",
    "Blueberry",
    "Broccoli",
    "Cabbage",
    "Cantaloupe",
    "Carinata",
    "Carrot",
    "Cauliflower",
    "Cedar",
    "Celery",
    "Chard",
    "Cherry",
    "Chrysanthemum",
    "Collards",
    "Corn",
    "Cotton",
    "Crepe myrtle",
    "Cucumber",
    "Dandelion",
    "Dogwood",
    "Elm",
    "Fennel",
    "Fig",
    "Fir, Fraser",
    "Garlic",
    "Grape, Muscadine",
    "Grape, Vinifera",
    "Honeydew",
    "Kale",
    "Kohlrabi",
    "Lettuce",
    "Maple",
    "Oak",
    "Oats",
    "Okra",
    "Onion",
    "Parsley",
    "Peach",
    "Peanut",
    "Pear",
    "Pecan",
    "Pepper",
    "Persimmon",
    "Pine",
    "Plum",
    "Poinsettia",
    "Pomegranate",
    "Potato",
    "Raspberry",
    "Rice",
    "Rye",
    "Sorghum",
    "Soybean",
    "Spinach",
    "Squash",
    "Strawberry",
    "Sweet potato",
    "Tobacco",
    "Tomato",
    "Turnip",
    "Watermelon",
    "Wheat",
    "Zucchini"

];

/** All liquid waste codes */
export const waste_codes_liquid = [

    "ALS - Swine Lagoon Liquid",
    "ALP - Poultry Lagoon Liquid",
    "BID - Domestic septage",
    "GTL - Grease trap water",
    "LSB - Beef Slurry",
    "LSD - Dairy Slurry",
    "LSS - Swine Slurry",
    "NLF - Food/beverage by-products (liquid)",
    "NLO - Non-composted liquid",

];

/** All solid waste codes */
export const waste_codes_solid = [

    "BCO - Biosolids, composted",
    "BIX - Biosolids, mixed",
    "CSW - Wood ash",
    "CSC - Coal ash",
    "FCD - Composted manure - Dairy",
    "FCP - Composted manure - Poultry",
    "FCS - Composted manure - Swine",
    "FCW - Compost, plant material",
    "FCV - Vermicompost",
    "HLL - Chicken litter",
    "HLT - Turkey litter",
    "IOC - Paper fiber/pulp",
    "IOL - Lime by-products",
    "NBS - Wood waste/sawdust",
    "NCR - Raw plant material/crop residues",
    "NSF - Food/beverage by-products (solid)",
    "NSO - Non-composted solid",
    "SSD - Dairy Surface Scraped/Stockpiled",
    "SSS - Swine Surface Scraped/Stockpiled",

];


/** All waste codes */
export const waste_codes = waste_codes_liquid.concat(waste_codes_solid).sort();



/** All solution codes */
export const solution_codes = [

    "AS - Source Water",
    "AP - Pond Water",
    "FP - Fish Production/Recreation",
    "QG - Ground Water",
    "QS - Surface Water",
    "NS - General Nutrient Solution",
    "NT - Tobacco Nutrient Solution",
    "LC - Cattle Water",
    "LH - Horse Water",
    "LS - Swine Water",
    "IW - General Irrigation",
    "IO - Overhead Irrigation",
    "IT - Trickle Irrigation",
    "HT - Hydroponic Tomato",
    "HC - Hydroponic Cucumber",
    "HL - Hydroponic Lettuce",
    "SP - Pesticide Solution",
    "SH - Hydroponic Nutrient",
    "SF - Floriculture Production",
    "ST - Tobacco Transplant Production",
    "SV - Vegetable Transplant Production",

];


/** All media codes */
export const media_codes = [

    "GHF - GH Floriculture",
    "GHV - GH Vegetable",
    "NUR - Nursery Crop",
    "TOB - Tobacco Transplants",
    "OTH - Other"

];

/** All possible tests that can be assigned to each type, used in the checkbox menus and the worklist. */
export const all_plant_tests = [
    "Al",
    "Biomass",
    "C",
    "Cl",
    "Dry Weight",
    "Mg",
    "K",
    "NO3",
    "N",
];
    
export const all_waste_tests = [
    "C",
    "Dry Matter",
    "Lime", 
    "Metals",
    "NH4",
    "NO3",
    "pH",
    "Salts",
    "Urea",
];

export const all_solution_tests = [
    "Carbonate",
    "Chloride",
    "Metals",
    "Mg",
    "NH4",
    "NO3",
    "pH",
    "Salts",
    "Urea"
];

export const all_media_tests = [
    "Cl",
    "Density",
    "K",
    "Iron",
    "NH4",
    "NO3",
    "pH",
    "Salts",
    "Zinc",
];


/** Default tests assigned to every sample of a particular type. */
export const default_plant_tests = ["Mg", "N"];
export const default_waste_liquid_tests = ["pH", "Salts"];
export const default_waste_solid_tests = ["Dry Matter", "Salts"];
export const default_solution_tests = ["NH4", "NO3", "pH"];
export const default_media_tests = ["Density", "pH"];


/** An object mapping a sample to the extra, non-default tests it gets automatically assigned. */
export const extra_tests = {

    /*
    "Alfalfa": ["Mo"],
    "Broccoli": ["Mo"],
    "Brussels sprouts": ["Mo"],
    "Cauliflower": ["Mo"],
    "Cabbage": ["Mo"],
    "Canola": ["Mo"],
    "Collards": ["Mo"],
    "Kale": ["Mo"],
    "Kohlrabi": ["Mo"],
    "Poinsettia": ["Mo"],
    "Spinach": ["Mo"],
    "Turnip": ["Mo"],

    "Strawberry": ["NO3"],
    "Cotton": ["NO3"],

    "BID - Domestic septage": ["pH", "EC"],
    "BCO - Biosolids, composted": ["C", "pH", "EC"],
    "BIO - Biosolids, other": ["C", "pH", "EC"],
    "BIX - Biosolids, mixed": ["C", "pH", "EC"],
    "BLL - Leachates/effluents or reclaimed water": ["pH", "EC"],

    "CSW - Wood ash": ["C", "pH", "EC"],
    "CSC - Coal ash": ["C", "pH", "EC"],
    "CSB - Biochar": ["C", "pH", "EC"],
    "CSO - Ash, mixed or other": ["C", "pH", "EC"],

    "FCB - Composted manure - Beef": ["C", "pH", "EC"],
    "FCD - Composted manure - Dairy": ["C", "pH", "EC"],
    "FCH - Composted manure - Horse": ["C", "pH", "EC"],
    "FCP - Composted manure - Poultry": ["C", "pH", "EC"],
    "FCS - Composted manure - Swine": ["C", "pH", "EC"],
    "FCO - Composted manure - Other": ["C", "pH", "EC"],
    "FPM - Compost, poultry mortality": ["C", "pH", "EC"],
    "FSM - Compost, swine mortality": ["C", "pH", "EC"],
    "FCW - Compost, plant material": ["C", "pH", "EC"],
    "FCX - Compost, mixed materials": ["C", "pH", "EC"],
    "FCV - Vermicompost": ["C", "pH", "EC"],

    "GTL - Grease trap water": ["pH", "EC"],

    "IOC - Paper fiber/pulp": ["C", "pH", "EC"],
    "IOL - Lime by-products": ["CCE", "pH", "EC"],

    "NBS - Wood waste/sawdust": ["C", "pH", "EC"],
    "NCR - Raw plant material/crop residues": ["C", "pH", "EC"],
    "NSF - Food/beverage by-products (solid)": ["C", "pH", "EC"],
    "NLF - Food/beverage by-products (liquid)": ["pH", "EC"],
    "NSA - Animal by-products (solid)": ["C", "pH", "EC"],
    "NLA - Animal by-products (liquid)": ["pH", "EC"],
    "NSO - Non-composted solid, other": ["C", "pH", "EC"],
    "NLO - Non-composted liquid, other": ["pH", "EC"]
    */

};



/** Emptry arrays that will be used to store report data created by the user. */
export let saved_reports = [];
export let saved_report_ids = [];

export let saved_plant_report_numbers = [];
export let saved_waste_report_numbers = [];
export let saved_solution_report_numbers = [];
export let saved_media_report_numbers = [];

export let saved_plant_lab_ids = [];
export let saved_waste_lab_ids = [];
export let saved_solution_lab_ids = [];
export let saved_media_lab_ids = [];

export const refreshArrays = () => {

    while (saved_report_ids.length > 0) saved_report_ids.pop();
    while (saved_plant_report_numbers.length > 0) saved_plant_report_numbers.pop();
    while (saved_waste_report_numbers.length > 0) saved_waste_report_numbers.pop();
    while (saved_solution_report_numbers.length > 0) saved_solution_report_numbers.pop();
    while (saved_media_report_numbers.length > 0) saved_media_report_numbers.pop();
    while (saved_plant_lab_ids.length > 0) saved_plant_lab_ids.pop();
    while (saved_waste_lab_ids.length > 0) saved_waste_lab_ids.pop();
    while (saved_solution_lab_ids.length > 0) saved_solution_lab_ids.pop();
    while (saved_media_lab_ids.length > 0) saved_media_lab_ids.pop();


}

export const deleteReport = (number) => {
    saved_reports = saved_reports.filter(report => {
        return report.styledReportNumber !== number;
    });

    refreshArrays();
}

/** Something to export */
const myConstant = 4242;
export default myConstant;