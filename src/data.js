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
        case "Plant": styledNumber += "P"; break;
        case "Waste": styledNumber += "W"; break;
        case "Solution": styledNumber += "S"; break;
        case "Media": styledNumber += "M"; break;
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

    "Acacia",
    "Ailanthus",
    "Alfalfa",
    "Apple",
    "Asparagus",
    "Basil",
    "Beans",
    "Bentgrass",
    "Bermudagrass",
    "Blackberry",
    "Blueberry",
    "Broccoli",
    "Brussels sprouts",
    "Cabbage",
    "Canola",
    "Cantaloupe",
    "Carinata",
    "Cauliflower",
    "Cedar",
    "Collards",
    "Corn",
    "Cotton",
    "Cucumber",
    "Dandelion",
    "Dogwood",
    "Elm",
    "Fescue",
    "Fig",
    "Fir, Fraser",
    "GH Hemp",
    "GH Strawberry",
    "GH Tomato",
    "Grape, Muscadine",
    "Grape, Vinifera",
    "Honeydew",
    "Kale",
    "Kohlrabi",
    "Lettuce",
    "Oats",
    "Okra",
    "Peach",
    "Pear",
    "Pepper",
    "Pine",
    "Poinsettia",
    "Raspberry",
    "Rice",
    "Soybean",
    "Spinach",
    "Squash",
    "Strawberry",
    "Tobacco",
    "Tomato",
    "Turfgrass",
    "Turnip",
    "Watermelon",
    "Wheat",
    "Zucchini"

];

/** All liquid waste codes */
export const waste_codes_liquid = [

    "ALS - Swine Lagoon Liquid",
    "ALF - Swine Farrow to Wean",
    "ALP - Poultry Lagoon Liquid",
    "ALO - Other Lagoon Liquid",
    "ASP - Poultry Lagoon Sludge",
    "ASS - Swine Lagoon Sludge",
    "ASO - Other Lagoon Sludge",
    "BID - Domestic septage",
    "BLL - Leachates/effluents or reclaimed water",
    "GTL - Grease trap water",
    "LSB - Beef Slurry",
    "LSD - Dairy Slurry",
    "LSS - Swine Slurry",
    "LSO - Other Slurry",
    "NLF - Food/beverage by-products (liquid)",
    "NLA - Animal by-products (liquid)",
    "NLO - Non-composted liquid, other",

];

/** All solid waste codes */
export const waste_codes_solid = [

    "BCO - Biosolids, composted",
    "BIO - Biosolids, other",
    "BIX - Biosolids, mixed",
    "CSW - Wood ash",
    "CSC - Coal ash",
    "CSB - Biochar",
    "CSO - Ash, mixed or other",
    "FCB - Composted manure - Beef",
    "FCD - Composted manure - Dairy",
    "FCH - Composted manure - Horse",
    "FCP - Composted manure - Poultry",
    "FCS - Composted manure - Swine",
    "FCO - Composted manure - Other",
    "FPM - Compost, poultry mortality",
    "FSM - Compost, swine mortality",
    "FCW - Compost, plant material",
    "FCX - Compost, mixed materials",
    "FCV - Vermicompost",
    "HBB - Broiler breeder litter",
    "HBP - Broiler pullet litter",
    "HLB - Broiler litter",
    "HLL - Layer litter",
    "HLT - Turkey litter",
    "IOC - Paper fiber/pulp",
    "IOL - Lime by-products",
    "NBS - Wood waste/sawdust",
    "NCR - Raw plant material/crop residues",
    "NSF - Food/beverage by-products (solid)",
    "NSA - Animal by-products (solid)",
    "NSO - Non-composted solid, other",
    "SSB - Beef Surface Scraped/Stockpiled",
    "SSD - Dairy Surface Scraped/Stockpiled",
    "SSH - Horse Surface Scraped/Stockpiled",
    "SSS - Swine Surface Scraped/Stockpiled",
    "SSO - Other Surface Scraped/Stockpiled",

];


/** All waste codes */
export const waste_codes = waste_codes_liquid.concat(waste_codes_solid).sort();



/** All solution codes */
export const solution_codes = [

    "AS - Source Water",
    "AP - Pond Water",
    "AO - Other Aquaculture",
    "FP - Fish Production/Recreation",
    "QG - Ground Water",
    "QH - Household (nonpotable",
    "QS - Surface Water",
    "QO - Other Water",
    "NS - General Nutrient Solution",
    "NT - Tobacco Nutrient Solution",
    "NL - Pour-thru Leachate",
    "NO - Other Nutrient Solution",
    "LC - Cattle Water",
    "LH - Horse Water",
    "LS - Swine Water",
    "LO - Other Livestock Water",
    "IW - General Irrigation",
    "IO - Overhead Irrigation",
    "IT - Trickle Irrigation",
    "HT - Hydroponic Tomato",
    "HC - Hydroponic Cucumber",
    "HL - Hydroponic Lettuce",
    "HH - Hydroponic Herb",
    "HH - Other Hydroponic",
    "SP - Pesticide Solution",
    "SH - Hydroponic Nutrient",
    "SF - Floriculture Production",
    "ST - Tobacco Transplant Production",
    "SV - Vegetable Transplant Production",
    "SO - Other Solution Source"

];


/** All media codes */
export const media_codes = [

    "GHF - GH Floriculture",
    "GHV - GH Vegetable",
    "NUR - Nursery Crop",
    "TOB - Tobacco Transplants",
    "OTH - Other"

];

/** All possible tests that can be assigned to each type, used in the checkbox menus. */
export const all_plant_tests = [ "Biomass", "C", "Cl", "DW", "ICP", "Mo", "N", "NO3"];
export const all_waste_tests = [ "C", "CCE", "DM", "EC", "HM", "HM - All", "ICP", "Mo", "N", "NH4/NO3", "pH", "TKN"];
export const all_solution_tests = [ "CBC", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];
export const all_media_tests = [ "Bulk Density", "Cl", "EC", "ICP", "Mo", "NH4/NO3", "pH", "Urea" ];


/** Default tests assigned to every sample of a particular type. */
export const default_plant_tests = ["ICP", "N"];
export const default_waste_liquid_tests = ["ICP", "pH", "TKN"];
export const default_waste_solid_tests = ["DM", "ICP", "N"];
export const default_solution_tests = ["CBC", "EC", "ICP", "NH4/NO3", "pH"];
export const default_media_tests = ["EC", "ICP", "pH"];


/** An object mapping a sample to the extra, non-default tests it gets automatically assigned. */
export const extra_tests = {

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


};



/** Emptry arrays that will be used to store report data created by the user. */
export const saved_reports = [];
export const saved_report_ids = [];

export const saved_plant_report_numbers = [];
export const saved_waste_report_numbers = [];
export const saved_solution_report_numbers = [];
export const saved_media_report_numbers = [];

export const saved_plant_lab_ids = [];
export const saved_waste_lab_ids = [];
export const saved_solution_lab_ids = [];
export const saved_media_lab_ids = [];



/** Something to export */
const myConstant = 4242;
export default myConstant;