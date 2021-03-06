//PROTOTYPAL COMPOSITION CAVEAT
var Players = {};
var Scale = {};
var ProgressiveLevels = [1,5,10,15,20,25,30,35,40,45,50,60,70,80,90,99];
var Roster = [];
Scale.progressiveLevels = Object.create(ProgressiveLevels);
Scale.set = function(stats){
    for(var x=0; x<stats.length; x++){
        this[this.progressiveLevels[x]] = stats[x];
    }
}// {1:stats[1]} etc. etc.
var Player = {};
Player.progressiveLevels = Object.create(ProgressiveLevels);
Player.effectiveLevel = function(){
    for(var x=0; x<this.progressiveLevels.length; x++){
        if(this.level && this.level < this.progressiveLevels[x]){
            return this.progressiveLevels[(x-1)];
        }
        
    }
    return 99;
}
Player.level = 1;

Player['HP'] = function(){
    return this.HPScale[this.effectiveLevel()];
}
Player['SPEED'] = function(){
    return this.SPEEDScale[this.effectiveLevel()];
}
Player['ENDURANCE'] = function(){
    return this.ENDURANCEScale[this.effectiveLevel()];
}
Player['ATTACK'] = function(){
    return this.ATTACKScale[this.effectiveLevel()];
}
Player['PASS'] = function(){
    return this.PASSScale[this.effectiveLevel()];
}
Player['BLOCK'] = function(){
    return this.BLOCKScale[this.effectiveLevel()];
}
Player['SHOT'] = function(){
    return this.SHOTScale[this.effectiveLevel()];
}
Player['CATCH'] = function(){
    return this.CATCHScale[this.effectiveLevel()];
}
Player.getStats = function(){
    console.log(this.name);
    console.log('HP: '+this.HP());
    console.log('SPEED: '+this.SPEED());
    console.log('ENDURANCE: '+this.ENDURANCE());
    console.log('ATTACK: '+this.ATTACK());
    console.log('PASS: '+this.PASS());
    console.log('BLOCK: '+this.BLOCK());
    console.log('SHOT: '+this.SHOT());
    console.log('CATCH: '+this.CATCH());
}
//Player.HPScale = Object.create(Scale);//DON'T COMPOSE TEMPLATES OF OTHER TEMPLATES UNLESS THE DATA IS CONSTANT!
var generatePlayer = function(name,HPArray,SPEEDArray,ENDURANCEArray,ATTACKArray,PASSArray,BLOCKArray,SHOTArray,CATCHArray){
    Players[name] = Object.create(Player);
    Players[name].HPScale = Object.create(Scale);//composing top down.
    Players[name].HPScale.set(HPArray);
    Players[name].SPEEDScale = Object.create(Scale);//INSTEAD COMPOSE THE OBJECTS FROM THE TEMPLATES
    Players[name].SPEEDScale.set(SPEEDArray);
    Players[name].ENDURANCEScale = Object.create(Scale);
    Players[name].ENDURANCEScale.set(ENDURANCEArray);
    Players[name].ATTACKScale = Object.create(Scale);
    Players[name].ATTACKScale.set(ATTACKArray);
    Players[name].PASSScale = Object.create(Scale);
    Players[name].PASSScale.set(PASSArray);
    Players[name].BLOCKScale = Object.create(Scale);
    Players[name].BLOCKScale.set(BLOCKArray);
    Players[name].SHOTScale = Object.create(Scale);
    Players[name].SHOTScale.set(SHOTArray);
    Players[name].CATCHScale = Object.create(Scale);
    Players[name].CATCHScale.set(CATCHArray);
    Players[name].name = name;
    Roster.push(name);
}

    generatePlayer(
    'Tidus',
    [132,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5653,7020,8529,9999],//hp
    [60,60,60,61,61,61,62,62,63,63,64,64,65,66,67,67],//speed
    [10,12,16,19,23,27,30,34,37,41,45,52,59,66,73,80],//endurance
    [3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,23],//attack
    [3,4,6,8,10,12,14,16,18,20,23,27,32,38,44,49],//pass
    [2,2,3,4,5,6,7,8,9,10,11,12,14,16,18,19],//block
    [10,13,17,21,25,29,33,37,41,44,48,55,61,67,73,78],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Datto',
    [90,205,376,578,811,1074,1368,1693,2049,2435,2852,3779,4828,6001,7296,8567],//hp
    [60,63,67,70,74,76,79,81,84,85,87,90,91,92,91,90],//speed
    [12,15,18,21,24,27,30,32,35,38,41,46,51,56,61,65],//endurance
    [2,2,3,4,5,6,7,8,9,10,12,14,17,20,23,26],//attack
    [4,5,7,8,10,11,13,14,16,17,19,22,25,28,31,34],//pass
    [2,2,2,3,3,4,5,6,7,8,9,12,15,18,22,26],//block
    [8,10,13,16,19,21,24,27,30,32,35,41,46,52,57,62],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );

    generatePlayer(
    'Letty',
    [95,223,411,633,887,1173,1492,1843,2227,2643,3092,4087,5212,6467,7852,9209],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [7,8,10,12,14,16,19,21,24,26,29,35,41,47,54,61],//endurance
    [5,6,7,8,9,10,12,13,15,16,18,21,25,29,33,37],//attack
    [10,13,16,19,22,25,29,32,36,39,43,51,58,66,75,83],//pass
    [5,6,8,10,12,13,15,17,19,20,22,26,29,33,36,39],//block
    [4,5,6,8,9,11,12,14,16,17,19,23,27,31,35,39],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Jassu',
    [100,239,448,695,982,1307,1672,2075,2518,2999,3520,4678,5992,7462,9088,9999],//hp
    [63,63,63,63,64,64,64,64,65,65,65,66,66,67,67,67],//speed
    [7,10,13,16,19,21,24,26,28,30,31,34,36,37,37,37],//endurance
    [10,11,12,13,15,16,18,20,23,25,27,32,37,42,47,52],//attack
    [7,8,10,12,14,16,18,20,23,25,27,32,37,42,47,52],//pass
    [5,6,7,9,10,12,13,15,17,19,21,25,29,34,39,44],//block
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Botta',
    [105,304,573,864,1177,1514,1873,2254,2658,3084,3533,4498,5553,6698,7933,9121],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [3,4,5,6,7,8,10,11,12,14,16,19,22,26,30,34],//endurance
    [10,11,12,13,14,16,17,19,21,22,24,28,32,37,41,46],//attack
    [6,7,8,9,10,11,13,14,15,17,18,21,24,27,30,33],//pass
    [5,7,9,11,13,16,18,21,24,27,30,36,42,49,57,64],//block
    [1,2,3,4,5,6,7,8,9,11,12,15,17,20,23,26],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Keepa',
    [90,260,391,742,1014,1306,1619,1952,2306,2680,3075,3926,4859,5874,6971,8028],//hp
    [54,54,54,54,54,54,54,54,54,54,54,53,53,53,53,53],//speed
    [4,5,7,8,10,12,14,15,17,19,22,26,30,35,40,45],//endurance
    [2,2,2,2,2,3,3,4,5,6,7,9,12,15,18,22],//attack
    [2,3,4,5,6,7,8,9,10,11,13,15,17,19,21,23],//pass
    [4,4,4,5,6,7,8,10,12,15,17,23,30,39,48,57],//block
    [1,1,1,1,1,1,1,1,2,2,4,9,18,35,63,99],//shot
    [5,8,11,14,17,20,22,25,27,29,31,34,36,38,39,39]//catch
    );
    
    generatePlayer(
    'Bickson',
    [140,307,530,767,1020,1287,1570,1867,2180,2507,2850,3580,4370,5220,6130,7000],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [12,15,18,21,24,26,29,31,33,34,36,38,40,41,40,40],//endurance
    [3,4,5,6,7,8,9,11,12,14,15,18,22,26,29,33],//attack
    [5,6,8,9,10,12,13,14,15,16,18,20,21,23,24,25],//pass
    [2,2,3,4,5,6,7,8,9,10,11,12,14,16,18,19],//block
    [12,15,18,22,25,27,30,32,35,36,38,41,43,44,45,45],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Abus',
    [130,297,520,757,1010,1277,1560,1857,2170,2497,2840,3570,4360,5210,6120,6990],//hp
    [60,60,60,60,60,60,60,60,60,60,61,61,61,61,61,61],//speed
    [9,19,17,21,24,28,31,33,36,38,40,43,45,45,45,44],//endurance
    [3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,23],//attack
    [4,5,7,8,9,11,12,13,14,15,17,19,20,22,23,24],//pass
    [1,1,2,3,4,5,5,6,7,8,9,10,12,13,15,16],//block
    [13,15,18,21,23,26,28,30,32,34,35,38,40,41,42,43],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Graav',
    [207,302,550,812,1090,1382,1690,2012,2350,2702,3070,3850,4690,5590,6550,7465],//hp
    [60,60,60,60,60,60,60,61,61,61,61,61,62,62,62,62],//speed
    [9,10,13,16,19,22,25,27,30,32,34,38,41,43,45,46],//endurance
    [8,9,11,13,15,17,19,20,22,23,24,26,27,28,28,28],//attack
    [13,14,18,21,25,28,30,33,35,37,39,42,43,44,44,44],//pass
    [8,9,13,16,20,22,25,27,30,31,33,36,37,38,37,36],//block
    [8,9,12,14,17,19,21,22,24,26,27,29,31,32,33,33],//shot
    [2,3,4,5,6,7,8,9,10,11,12,14,16,18,20,21]//catch
    );
    
    generatePlayer(
    'Doram',
    [142,312,542,792,1062,1352,1662,1992,2342,2712,3102,3942,4862,5862,6942,7982],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [3,4,6,7,9,10,12,13,15,16,18,21,24,27,30,32],//endurance
    [9,11,14,17,19,22,24,26,28,29,31,34,37,39,41,42],//attack
    [7,9,12,15,18,20,23,25,27,29,31,34,37,39,41,42],//pass
    [5,8,11,14,17,19,22,24,26,28,29,32,34,35,36,36],//block
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Balgerda',
    [141,285,541,817,1114,1431,1769,2127,2506,2905,3325,4226,5209,6274,7421,8523],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [5,6,7,8,9,10,12,13,14,16,18,21,24,28,32,36],//endurance
    [9,11,14,17,20,23,25,27,29,31,33,35,37,38,38,38],//attack
    [9,11,14,17,20,23,25,27,29,31,32,35,36,37,37,36],//pass
    [8,9,11,14,16,18,19,21,23,24,25,27,28,23,23,23],//block
    [1,1,2,2,3,4,5,5,6,7,8,10,12,14,17,19],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Raudy',
    [142,309,532,769,1022,1289,1572,1869,2182,2509,2852,3582,4372,5222,6132,7002],//hp
    [60,60,61,61,62,62,63,63,64,64,65,66,67,68,69,69],//speed
    [4,5,6,7,9,11,13,15,18,21,24,30,37,45,54,63],//endurance
    [2,2,2,2,2,3,3,4,4,5,6,7,9,11,14,16],//attack
    [2,3,4,5,6,7,8,9,10,11,12,14,16,18,20,21],//pass
    [4,5,7,9,10,12,14,15,17,19,21,24,27,31,34,37],//block
    [1,2,4,5,7,8,10,11,13,14,16,19,22,25,28,30],//shot
    [8,10,12,14,16,19,21,23,25,27,29,33,37,41,45,48]//catch
    );
    
    generatePlayer(
    'Larbeight',
    [129,181,345,557,819,1129,1489,1897,2355,2861,3417,4675,6129,7779,9625,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [10,11,14,17,20,23,26,30,33,37,41,49,58,68,78,87],//endurance
    [2,3,6,8,11,13,16,18,21,23,26,31,36,41,46,50],//attack
    [2,3,4,5,6,7,8,9,10,11,12,14,16,18,20,22],//pass
    [2,2,2,3,3,4,5,6,7,8,9,12,15,18,22,26],//block
    [9,10,12,15,18,21,24,28,32,36,40,50,60,72,84,96],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    
    generatePlayer(
    'Isken',
    [136,189,354,565,823,1127,1478,1875,2319,2809,3346,4559,5958,7843,9314,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [11,12,15,19,22,26,29,33,38,42,47,56,67,78,91,99],//endurance
    [4,5,7,8,10,11,13,14,16,17,19,22,25,28,31,33],//attack
    [4,5,6,8,9,10,12,13,14,16,17,20,22,25,28,30],//pass
    [5,5,6,7,7,8,9,9,10,11,12,13,14,16,17,18],//block
    [8,9,11,14,17,20,23,26,30,33,37,45,53,63,72,81],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Vuroja',
    [139,191,355,567,829,139,1499,1907,2365,2871,3427,4685,6139,7789,9635,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [7,8,10,12,14,17,19,22,25,28,32,39,41,56,66,75],//endurance
    [6,7,9,11,13,15,17,20,22,25,27,32,37,43,49,54],//attack
    [9,10,13,16,20,23,27,31,36,40,45,56,67,80,93,99],//pass
    [6,7,8,9,11,13,15,17,20,23,26,32,39,47,56,65],//block
    [4,5,6,7,9,10,11,12,14,15,16,19,21,24,26,28],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
       
    generatePlayer(
    'Kulukan',
    [316,316,439,668,931,1225,1551,1909,2299,2721,3175,4179,5311,6571,7959,9317],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [4,4,4,4,5,6,6,8,9,10,12,15,20,25,30,36],//endurance
    [9,9,11,13,15,17,20,22,25,28,31,37,43,50,57,64],//attack
    [15,15,16,19,21,24,28,31,35,39,43,52,62,73,85,96],//pass
    [6,6,7,8,10,12,14,16,19,22,25,31,38,46,55,64],//block
    [1,1,2,2,3,4,4,5,6,7,8,9,11,14,16,18],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Deim',
    [122,204,374,590,849,1152,1499,1890,2325,2804,3327,4505,5859,7389,9095,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [4,5,7,9,10,12,14,15,17,19,21,24,27,31,34,37],//endurance
    [8,9,12,15,18,20,23,25,27,29,32,35,39,42,44,46],//attack
    [5,7,9,12,14,17,21,24,28,32,36,45,55,66,78,89],//pass
    [6,7,8,9,11,13,15,17,20,22,25,31,38,46,54,69],//block
    [1,1,1,2,2,3,4,4,5,6,7,8,10,12,14,16],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Nizarut',
    [90,222,410,622,860,1122,1410,1722,2060,2422,2810,3660,4610,5660,6810,7930],//hp
    [57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57],//speed
    [2,3,5,7,9,11,14,16,19,21,24,30,36,42,49,56],//endurance
    [2,2,2,3,4,5,6,8,10,12,14,20,26,34,42,51],//attack
    [6,8,10,12,14,16,18,20,22,24,26,30,34,38,42,45],//pass
    [4,4,4,5,6,7,9,11,13,16,19,25,33,42,52,62],//block
    [3,3,3,3,3,3,3,3,3,3,4,6,11,19,32,50],//shot
    [6,7,9,11,13,15,18,20,23,25,28,34,40,46,53,60]//catch
    );
    
    generatePlayer(
    'Eigaar',
    [186,258,463,704,982,1296,1647,2034,2458,2918,3415,4518,5767,7162,8703,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [13,15,19,22,24,27,28,30,32,33,35,37,40,42,44,46],//endurance
    [3,4,6,9,11,13,15,17,18,20,22,24,27,29,30,31],//attack
    [9,11,16,20,24,28,31,34,37,39,42,45,47,48,48,47],//pass
    [12,13,16,19,21,23,26,28,30,32,34,38,41,43,46,47],//block
    [12,15,20,25,28,32,34,37,39,42,44,48,52,55,58,61],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Blappa',
    [186,257,459,697,970,1277,1620,1997,2410,2857,3340,4410,5620,6970,8460,9920],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [13,14,17,21,24,27,30,33,35,38,41,45,50,54,57,60],//endurance
    [5,6,8,10,11,13,14,15,15,16,17,19,20,21,22,23],//attack
    [9,11,15,19,22,25,28,31,33,35,37,39,40,40,39,37],//pass
    [11,12,15,17,19,22,24,26,27,29,31,33,35,37,38,38],//block
    [13,16,21,25,29,32,34,37,39,41,43,47,50,54,57,59],//shot
    [1,1,1,1,2,2,2,3,3,4,5,6,8,9,11,13]//catch
    );
    
    generatePlayer(
    'Berrik',
    [205,275,473,701,962,1253,1577,1931,2318,2735,3185,4178,5297,6542,7913,9254],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [8,9,12,15,18,21,24,26,29,31,34,39,44,48,52,56],//endurance
    [10,11,14,16,19,21,23,25,27,29,31,34,37,40,42,43],//attack
    [12,14,18,22,26,30,34,37,41,44,47,53,58,62,66,69],//pass
    [11,12,15,18,21,23,25,28,30,32,34,38,41,44,46,48],//block
    [4,5,7,8,10,11,13,14,16,17,19,22,25,28,31,33],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Judda',
    [125,276,494,742,1023,1334,1678,2052,2459,2896,3366,4399,5558,6843,8254,9631],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [9,12,16,20,23,27,30,33,36,39,42,46,51,55,58,60],//endurance
    [11,13,16,19,22,24,27,29,31,33,36,39,43,46,48,50],//attack
    [7,11,15,20,24,28,32,36,39,43,47,53,60,66,71,76],//pass
    [10,10,10,11,12,14,15,17,19,21,24,30,37,44,53,61],//block
    [1,1,2,2,3,3,4,4,5,5,6,7,8,9,10,10],//shot
    [3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,22]//catch
    );
    
    generatePlayer(
    'Lakkam',
    [100,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5653,7020,5829,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [6,7,9,11,14,16,19,21,24,27,31,37,45,53,61,70],//endurance
    [10,12,15,17,20,22,25,27,29,31,33,37,41,44,47,49],//attack
    [13,20,25,30,33,37,39,42,44,47,49,53,57,60,63,66],//pass
    [10,10,11,11,13,14,16,18,20,23,26,32,40,49,59,68],//block
    [1,1,1,2,3,3,4,5,6,7,8,10,13,16,19,22],//shot
    [1,1,1,1,2,3,3,4,5,6,7,9,12,15,18,21]//catch
    );
    
    generatePlayer(
    'Nimrook',
    [95,237,439,669,927,1213,1527,1869,2239,2637,3063,3999,5047,6207,7479,8719],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [5,6,8,11,13,16,19,22,26,29,33,42,51,61,72,83],//endurance
    [10,13,16,17,18,19,20,21,22,22,23,24,25,25,26,27],//attack
    [2,3,5,6,8,9,11,12,14,15,17,20,23,26,29,31],//pass
    [4,4,4,4,5,5,6,7,8,10,11,14,18,23,28,33],//block
    [1,1,2,3,4,5,6,7,8,9,11,13,16,18,21,24],//shot
    [18,19,20,21,23,24,26,28,30,33,35,40,46,53,60,67]//catch
    );
    
    generatePlayer(
    'Basik Ronso',
    [274,421,781,1131,1471,1801,2121,2431,2731,3021,3301,3831,4321,4771,5181,5515],//hp
    [40,40,40,40,40,41,41,41,41,41,42,42,42,43,43,43],//speed
    [17,18,20,22,24,26,29,32,35,38,42,50,58,68,78,88],//endurance
    [5,6,8,10,12,15,17,19,21,23,26,30,34,39,43,47],//attack
    [3,3,4,5,5,6,7,7,8,9,10,11,12,14,15,16],//pass
    [2,3,5,6,8,9,11,12,14,15,17,20,23,26,29,31],//block
    [9,11,16,21,26,31,35,40,44,48,52,59,65,71,76,80],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Argai Ronso',
    [329,476,836,1186,1526,1856,2176,2486,2786,3076,3356,3886,4376,4826,5236,5570],//hp
    [40,40,40,40,40,40,40,41,41,41,41,41,42,42,42,42],//speed
    [16,17,19,21,23,26,28,31,34,37,41,48,56,65,75,84],//endurance
    [5,6,8,9,11,12,14,15,17,18,20,23,26,29,32,34],//attack
    [5,6,7,9,10,12,13,14,16,18,20,23,26,30,33,36],//pass
    [4,4,6,8,9,11,13,14,16,18,20,23,26,30,33,36],//block
    [10,13,19,25,31,36,41,46,50,54,58,65,70,75,78,80],//shot
    [1,1,1,2,2,3,3,4,5,5,6,8,10,12,14,16]//catch
    );
    
    generatePlayer(
    'Gazna Ronso',
    [389,547,936,1917,1691,2057,2416,2767,3111,3447,3776,4411,5016,5591,6136,6600],//hp
    [40,40,40,40,40,40,40,41,41,41,41,41,42,42,42,42],//speed
    [20,20,20,20,21,22,23,24,26,28,30,34,39,45,52,59],//endurance
    [7,8,9,10,12,13,15,17,19,22,24,29,35,42,49,56],//attack
    [11,12,15,17,20,22,25,27,30,32,35,40,45,50,55,59],//pass
    [5,5,7,9,11,13,15,17,19,21,23,28,32,37,42,47],//block
    [4,5,6,7,8,9,10,11,12,13,14,16,18,20,22,24],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Nuvy Ronso',
    [214,472,788,1098,1402,1700,1992,2278,2558,2832,3100,3618,4112,4582,5028,5408],//hp
    [40,40,40,40,40,40,40,41,41,41,41,41,42,42,42,42],//speed
    [11,12,13,15,17,19,21,24,27,30,33,41,49,59,69,79],//endurance
    [12,13,14,15,17,18,20,22,24,27,29,35,41,47,55,62],//attack
    [7,9,12,15,17,20,24,27,30,34,37,45,53,61,70,79],//pass
    [4,6,8,11,13,15,18,20,22,24,26,30,34,37,40,43],//block
    [1,1,1,2,2,3,4,4,5,6,7,8,10,12,14,16],//shot
    [1,1,1,2,3,3,4,5,5,6,7,9,11,13,16,18]//catch
    );
    
    generatePlayer(
    'Irga Ronso',
    [230,528,896,1258,1616,1968,2316,2658,2996,3328,3656,4296,4916,5516,6096,6600],//hp
    [40,40,40,40,40,40,40,41,41,41,41,41,42,42,42,42],//speed
    [14,14,14,15,17,19,21,23,26,30,34,42,53,65,78,92],//endurance
    [9,10,12,14,16,18,20,22,25,28,31,37,44,51,59,67],//attack
    [7,8,10,12,15,17,20,23,27,30,34,43,52,62,74,85],//pass
    [8,11,14,17,20,23,26,29,31,34,36,41,45,49,52,55],//block
    [1,1,2,3,4,5,6,6,7,8,9,11,12,14,16,17],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Zamzi Ronso',
    [339,488,854,1214,1568,1916,2258,2594,2924,3248,3566,4184,4778,5348,5894,6364],//hp
    [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40],//speed
    [15,15,15,15,16,16,17,18,19,21,22,25,29,34,39,44],//endurance
    [2,2,2,2,2,2,3,3,3,4,5,6,7,9,11,13],//attack
    [2,3,4,5,6,7,8,9,10,11,12,14,16,18,20,22],//pass
    [7,9,12,15,18,21,24,26,29,31,34,38,42,45,48,50],//block
    [1,1,1,1,1,1,2,2,2,3,3,4,5,6,8,9],//shot
    [9,10,11,13,15,17,19,21,23,25,27,32,37,43,49,55]//catch
    );
    
    generatePlayer(
    'Giera Guado',
    [110,245,440,665,920,1205,1520,1865,2240,2645,3080,4040,5120,6320,7640,8930],//hp
    [75,75,75,75,75,75,75,76,76,76,76,76,77,77,77,77],//speed
    [12,12,12,12,13,14,15,16,18,20,22,26,31,37,44,51],//endurance
    [3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,22],//attack
    [10,13,17,20,24,27,31,34,38,41,45,52,59,66,73,79],//pass
    [6,10,14,17,19,22,23,25,27,28,30,32,35,37,39,41],//block
    [11,14,17,20,23,26,29,32,35,38,41,47,53,59,65,70],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Zazi Guado',
    [120,253,445,669,910,1183,1485,1813,2170,2553,2965,3870,4885,6010,7245,8450],//hp
    [75,75,75,75,75,75,75,76,76,76,76,76,77,77,77,77],//speed
    [12,12,12,12,13,14,15,16,18,20,22,26,31,37,44,51],//endurance
    [3,3,4,4,5,5,6,6,7,7,8,9,10,11,12,12],//attack
    [11,14,18,22,26,29,33,36,39,42,46,51,57,62,66,70],//pass
    [7,11,14,16,18,20,22,23,24,26,27,29,31,33,35,36],//block
    [12,14,17,19,22,25,27,30,33,35,38,43,49,54,59,64],//shot
    [1,1,2,2,3,4,5,6,7,7,9,11,13,16,19,21]//catch
    );
    
    generatePlayer(
    'Navara Guado',
    [90,221,404,611,840,1091,1365,1661,1980,2321,2685,3480,4365,5340,6405,7440],//hp
    [57,57,57,57,58,58,59,60,61,62,64,67,70,74,79,84],//speed
    [7,7,7,8,9,10,12,14,16,19,22,28,36,45,55,65],//endurance
    [5,6,7,8,10,11,13,15,17,20,22,27,33,40,47,54],//attack
    [16,20,24,28,32,36,39,42,45,48,51,55,59,62,64,65],//pass
    [14,14,14,15,16,18,20,22,25,28,31,39,48,58,70,82],//block
    [4,5,7,8,10,11,13,14,16,17,19,22,25,28,31,33],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Auda Guado',
    [95,212,391,604,854,1139,1459,1815,2207,2634,3097,4129,5303,6620,8079,9513],//hp
    [70,70,70,70,70,70,70,71,71,71,71,71,72,72,72,72],//speed
    [7,7,7,8,9,10,12,14,16,19,22,28,36,45,55,65],//endurance
    [8,9,10,11,13,14,16,18,20,23,25,30,36,43,50,57],//attack
    [11,14,18,22,25,29,32,35,37,40,43,47,51,54,56,57],//pass
    [10,11,12,14,16,18,20,23,26,29,32,40,48,58,68,78],//block
    [1,1,1,2,2,3,3,4,4,5,5,6,7,8,9,9],//shot
    [4,5,6,7,8,9,10,11,12,13,14,16,18,20,22,23]//catch
    );
    
    generatePlayer(
    'Pah Guado',
    [90,190,351,554,798,1082,1408,1774,2182,2630,3120,4222,5488,6918,8512,9999],//hp
    [65,66,67,67,68,68,68,68,68,68,69,69,69,69,69,69],//speed
    [3,3,3,3,4,5,6,7,9,11,13,17,22,28,35,42],//endurance
    [10,10,10,10,11,12,13,15,17,18,21,25,31,38,45,53],//attack
    [13,16,19,23,26,29,32,34,37,39,42,46,50,53,56,58],//pass
    [7,8,9,11,13,15,17,20,23,26,29,37,45,55,65,75],//block
    [1,1,1,1,1,1,2,2,2,3,3,4,5,6,8,9],//shot
    [3,3,4,4,5,5,6,6,7,7,8,9,10,11,12,12]//catch
    );
    
    generatePlayer(
    'Noy Guado',
    [100,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5659,7020,8529,9999],//hp
    [62,62,62,62,62,62,62,63,63,63,63,63,64,64,64,64],//speed
    [2,2,2,3,4,5,7,9,11,14,17,23,31,40,50,60],//endurance
    [2,2,2,2,3,4,5,6,8,10,12,16,21,27,34,41],//attack
    [2,3,5,6,8,9,11,12,14,15,17,20,23,26,29,31],//pass
    [4,4,4,4,4,5,5,6,7,8,9,11,13,16,20,23],//block
    [1,5,9,13,16,19,21,23,24,25,25,24,21,16,9,1],//shot
    [9,11,14,16,19,21,23,25,27,29,31,34,37,40,42,43]//catch
    );
    
    generatePlayer(
    'Biggs',
    [80,217,421,659,934,1244,1589,1970,2387,2839,3327,4409,5633,7000,8509,9988],//hp
    [57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57],//speed
    [10,14,18,23,27,31,35,39,43,47,50,57,64,71,77,82],//endurance
    [5,6,8,10,11,13,15,16,18,20,22,25,28,32,35,38],//attack
    [3,3,3,3,3,3,4,5,6,7,9,13,20,28,39,51],//pass
    [2,3,5,7,9,10,12,13,14,15,17,18,20,21,21,21],//block
    [11,11,11,12,13,14,16,18,20,23,26,32,40,49,59,69],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Brother',
    [105,265,500,775,1090,1445,1840,2275,2750,3265,3820,5050,6440,7990,9700,9999],//hp
    [75,75,75,76,76,77,78,79,80,81,83,85,89,92,96,99],//speed
    [8,11,15,18,21,25,28,31,34,36,39,44,49,53,56,59],//endurance
    [6,7,9,10,12,14,16,18,21,23,25,30,36,42,48,54],//attack
    [14,17,20,23,26,29,31,33,35,37,39,41,43,44,44,44],//pass
    [13,18,21,23,26,28,29,31,32,34,35,37,40,42,44,45],//block
    [14,15,16,17,18,19,20,22,23,24,26,29,32,35,39,42],//shot
    [1,1,1,1,1,2,2,3,4,5,6,8,10,13,17,20]//catch
    );
    
    generatePlayer(
    'Durren',
    [100,235,430,655,910,1195,1510,1855,2230,2635,3070,4030,5110,6310,7630,8920],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [9,9,9,9,9,10,10,11,12,13,14,16,18,21,25,28],//endurance
    [3,3,3,3,3,4,5,5,6,7,8,11,14,17,21,25],//attack
    [5,5,5,5,5,6,6,7,8,9,10,12,14,17,21,25],//pass
    [7,10,13,15,17,19,20,21,22,24,25,27,29,30,32,33],//block
    [1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,4],//shot
    [12,14,17,19,22,24,25,27,28,29,30,30,30,29,27,24]//catch
    );
    
    generatePlayer(
    'Jumal',
    [100,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5653,7020,8529,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [8,8,9,10,10,11,12,13,14,15,16,18,21,24,26,29],//endurance
    [1,1,1,2,3,4,6,8,10,13,16,22,30,39,49,59],//attack
    [5,5,5,6,8,10,12,14,17,21,25,33,44,56,69,83],//pass
    [4,4,4,4,4,5,5,5,6,6,7,8,10,12,14,16],//block
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20],//shot
    [14,14,15,16,18,19,20,21,22,24,25,28,31,34,38,41]//catch
    );
    
    generatePlayer(
    'Kiyuri',
    [81,151,279,451,669,931,1239,1591,1989,2431,2919,4029,5319,6789,8439,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [8,10,12,14,16,19,21,24,27,30,33,39,46,54,61,69],//endurance
    [8,8,9,10,12,13,15,17,20,22,25,32,39,48,57,66],//attack
    [8,11,14,18,22,25,29,33,37,41,45,53,62,71,81,90],//pass
    [2,3,5,6,8,10,12,14,17,19,22,27,32,38,45,51],//block
    [1,2,4,6,9,11,13,16,18,21,24,29,36,42,49,56],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Kyou',
    [104,166,353,583,857,1175,1537,1943,2393,2887,3425,4633,6017,7577,9313,9999],//hp
    [63,64,65,65,66,67,67,67,68,68,69,69,70,70,71,71],//speed
    [9,12,17,22,27,31,35,38,41,44,46,48,49,48,45,41],//endurance
    [15,15,15,15,16,16,17,18,19,21,22,25,29,34,39,44],//attack
    [8,8,10,13,15,18,21,25,28,32,36,45,55,66,78,89],//pass
    [6,6,6,7,8,9,11,13,15,18,21,27,35,44,54,64],//block
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20],//shot
    [12,13,15,16,18,19,21,23,24,26,28,31,35,39,43,46]//catch
    );
    
    generatePlayer(
    'Linna',
    [314,314,441,679,954,1264,1609,1990,2407,2859,3347,4429,5653,7020,8529,9999],//hp
    [59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59],//speed
    [10,10,10,12,13,14,16,17,18,19,20,22,24,25,26,27],//endurance
    [8,8,8,9,10,11,12,14,16,18,21,27,34,42,51,60],//attack
    [8,8,9,12,15,18,22,26,30,35,40,50,62,75,89,99],//pass
    [12,12,12,13,14,15,16,18,20,22,24,30,36,44,52,61],//block
    [10,10,13,17,21,25,29,33,38,42,47,55,64,74,83,92],//shot
    [3,3,3,3,4,4,4,5,6,6,7,9,11,14,16,19]//catch
    );
    
    generatePlayer(
    'Mep',
    [60,307,630,967,1320,1687,2070,2467,2880,3307,3750,4680,5670,6720,7830,8880],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [9,10,11,12,13,15,16,18,19,21,23,27,31,36,41,46],//endurance
    [6,9,12,15,18,21,24,26,29,31,33,37,40,42,44,45],//attack
    [5,6,7,9,11,13,15,17,20,22,25,31,37,45,52,60],//pass
    [19,19,20,21,22,22,23,23,23,23,24,23,23,22,20,19],//block
    [7,11,15,19,23,27,30,33,36,39,42,46,50,53,55,56],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Mifurey',
    [85,186,338,516,723,956,1218,1506,1823,2166,2538,3363,4298,5343,6498,7631],//hp
    [20,20,20,21,22,23,24,26,28,30,32,38,44,52,60,69],//speed
    [8,11,14,17,20,24,27,31,35,39,43,51,60,70,79,88],//endurance
    [8,9,11,12,14,16,18,20,22,24,26,31,36,41,47,52],//attack
    [5,8,12,15,19,23,27,31,35,39,44,52,61,71,80,89],//pass
    [3,3,3,4,5,6,7,9,11,13,15,21,27,35,43,52],//block
    [10,14,19,23,28,31,35,38,42,44,47,52,55,58,59,59],//shot
    [2,2,2,3,3,4,4,5,6,6,7,8,10,11,13,14]//catch
    );
    
    generatePlayer(
    'Miyu',
    [100,307,580,867,1170,1487,1820,2167,2530,2907,3300,4130,5020,5970,6980,7940],//hp
    [60,60,60,60,61,61,61,62,62,62,63,63,64,64,65,65],//speed
    [15,17,19,21,23,26,28,31,34,37,40,46,52,59,67,74],//endurance
    [14,14,14,15,16,17,18,20,22,24,26,32,38,46,54,63],//attack
    [2,2,2,2,3,3,4,4,5,6,7,8,10,12,14,16],//pass
    [2,2,2,2,3,3,3,3,4,4,4,5,5,6,7,7],//block
    [4,4,5,5,6,6,7,7,8,8,9,10,11,12,13,14],//shot
    [11,13,16,19,21,23,25,27,29,31,32,34,36,37,37,37]//catch
    );
    
    generatePlayer(
    'Naida',
    [100,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5659,7020,8529,9999],//hp
    [72,72,72,72,73,73,73,74,74,74,75,75,76,76,77,77],//speed
    [6,7,9,10,12,14,15,17,19,21,23,27,31,36,41,45],//endurance
    [5,8,12,15,19,21,24,26,29,30,32,35,36,37,36,35],//attack
    [12,14,16,18,21,23,26,29,32,36,39,46,54,63,72,81],//pass
    [12,13,14,15,17,18,20,22,24,27,29,34,40,47,54,61],//block
    [4,4,5,6,6,7,8,9,10,11,12,14,17,20,22,25],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Nedus',
    [100,235,430,655,910,1195,1510,1855,2230,2635,3070,4030,5110,6310,7630,8920],//hp
    [30,30,30,30,30,30,30,31,34,38,45,76,99,99,99,99],//speed
    [12,16,20,24,28,32,36,39,43,46,49,55,60,64,68,71],//endurance
    [2,3,4,5,6,7,8,10,11,12,13,15,18,20,22,24],//attack
    [3,4,6,7,9,10,12,13,15,16,18,21,24,27,30,33],//pass
    [2,2,3,3,4,4,5,5,6,6,7,8,9,10,11,11],//block
    [10,12,15,17,20,23,26,29,32,35,38,45,52,59,67,74],//shot
    [3,3,3,3,3,4,4,4,5,5,6,7,9,11,12,14]//catch
    );
    
    generatePlayer(
    'Rin',
    [242,242,446,684,959,1269,1614,1995,2412,2864,3352,4434,5658,7025,8534,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [9,9,12,14,17,20,22,25,28,31,34,40,46,53,60,66],//endurance
    [5,5,5,5,6,7,8,9,11,13,15,19,24,30,37,44],//attack
    [12,12,15,17,20,22,25,27,30,32,35,40,45,40,55,59],//pass
    [5,5,6,8,10,12,14,17,20,23,26,34,42,52,62,72],//block
    [5,5,7,8,10,11,13,14,16,17,19,22,25,28,31,33],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Ropp',
    [191,191,365,571,810,1081,1385,1721,2090,2491,2925,3890,4985,6210,7565,8895],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [9,9,11,14,16,18,21,23,25,27,29,33,37,40,49,46],//endurance
    [11,11,12,14,15,17,20,22,25,28,31,38,46,54,64,73],//attack
    [10,10,12,15,18,20,24,27,31,35,39,49,59,71,84,96],//pass
    [15,15,16,17,18,20,21,23,25,27,29,33,37,42,48,53],//block
    [1,1,2,2,3,3,4,4,5,5,6,7,8,9,10,11],//shot
    [2,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Shaami',
    [100,235,430,655,910,1195,1510,1855,2230,2635,3070,4030,5110,6310,7630,8920],//hp
    [58,58,58,59,59,60,60,61,61,62,62,63,64,65,66,66],//speed
    [11,14,18,22,25,29,32,35,39,42,45,50,55,60,65,68],//endurance
    [4,8,12,15,17,20,21,23,25,26,28,30,33,35,37,39],//attack
    [5,5,6,6,7,8,9,10,12,13,15,18,21,25,30,34],//pass
    [2,2,3,3,4,5,6,7,9,10,12,15,18,22,27,31],//block
    [10,12,15,18,21,24,27,31,34,38,42,50,59,69,79,88],//shot
    [2,2,2,3,3,4,4,5,6,6,7,8,10,11,13,14]//catch
    );
    
    generatePlayer(
    'Shuu',
    [215,313,570,845,1138,1449,1778,2125,2490,2873,3274,4130,5058,6058,7130,8156],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [10,11,13,15,18,20,22,24,27,29,31,36,40,45,49,53],//endurance
    [4,5,8,11,14,16,19,22,25,27,30,36,41,47,52,57],//attack
    [4,5,8,11,14,16,19,22,25,27,30,36,41,47,52,57],//pass
    [9,10,11,12,13,15,16,17,18,19,21,23,25,28,30,32],//block
    [10,11,12,13,14,15,16,16,17,17,17,17,16,14,12,10],//shot
    [1,1,1,1,1,2,2,2,3,3,4,5,7,9,10,12]//catch
    );
    
    generatePlayer(
    'Svanda',
    [100,235,430,655,910,1195,1510,1855,2230,2635,3070,4030,5110,6310,7630,8920],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [10,12,14,17,20,23,26,30,33,37,41,49,57,66,76,85],//endurance
    [10,10,10,10,11,12,12,14,15,16,18,21,26,31,36,42],//attack
    [8,10,12,15,17,20,24,27,31,35,39,48,58,69,81,92],//pass
    [15,15,15,15,15,16,17,17,18,19,21,23,26,30,34,38],//block
    [14,15,17,19,21,23,25,26,28,30,32,36,39,43,47,50],//shot
    [4,4,4,4,4,5,5,5,6,6,7,8,10,12,13,15]//catch
    );
    
    generatePlayer(
    'Tatts',
    [215,215,400,625,890,1195,1540,1925,2350,2815,3320,4450,5740,7190,8800,9999],//hp
    [65,65,65,66,67,67,67,68,68,69,69,69,70,71,71,71],//speed
    [10,10,13,16,19,23,26,29,33,37,41,48,56,65,73,82],//endurance
    [6,6,7,8,10,12,13,15,17,19,21,26,30,36,41,47],//attack
    [14,14,18,22,26,29,33,36,39,42,46,51,57,62,66,70],//pass
    [6,6,9,11,14,16,19,21,24,26,29,34,39,44,49,53],//block
    [5,5,7,8,10,12,14,16,18,20,22,27,32,37,43,48],//shot
    [1,1,1,2,2,2,3,3,4,4,5,6,7,9,10,11]//catch
    );
    
    generatePlayer(
    'Vilucha',
    [201,237,441,679,954,1264,1609,1990,2407,2859,3347,4429,5653,7020,8529,9999],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [11,12,14,17,20,23,26,29,32,36,40,47,56,65,74,83],//endurance
    [9,9,9,9,9,9,10,10,11,12,12,14,16,18,21,23],//attack
    [4,5,6,7,8,10,11,13,15,17,19,23,27,32,38,43],//pass
    [10,10,13,15,17,19,20,21,22,24,25,27,29,30,32,33],//block
    [14,15,18,21,24,28,31,35,39,43,47,55,63,72,82,91],//shot
    [3,3,3,4,4,5,5,6,7,7,8,9,11,12,14,15]//catch
    );
    
    generatePlayer(
    'Wakka',
    [150,210,383,589,825,1095,1396,1729,2094,2491,2920,3874,4956,6166,7504,8817],//hp
    [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],//speed
    [11,12,15,18,21,24,27,30,33,36,40,47,54,62,70,78],//endurance
    [3,3,4,5,5,6,7,7,8,9,10,11,12,14,15,16],//attack
    [3,4,6,7,9,11,12,14,16,17,19,22,26,29,32,35],//pass
    [2,2,3,3,4,4,5,5,6,6,7,8,9,10,11,11],//block
    [13,14,17,21,24,28,32,35,39,42,46,53,60,67,74,80],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Wedge',
    [80,217,421,659,934,1244,1589,1970,2387,2839,3327,4409,5633,7000,8509,9988],//hp
    [65,65,65,65,65,65,65,65,65,65,66,66,66,66,66,66],//speed
    [9,13,17,21,25,29,33,36,40,43,46,52,57,61,65,68],//endurance
    [6,11,15,18,20,23,25,26,29,30,31,34,37,39,41,43],//attack
    [3,3,3,3,3,4,4,5,7,9,11,17,26,37,52,68],//pass
    [5,8,11,13,15,17,18,19,20,22,23,25,27,28,30,31],//block
    [17,17,18,19,20,20,21,21,21,21,22,21,21,20,18,17],//shot
    [2,2,2,3,4,6,8,10,12,15,18,24,32,42,52,62]//catch
    );
    
    generatePlayer(
    'Yuma Guado',
    [115,250,445,670,925,1210,1525,1870,2245,2650,3085,4045,5125,6325,7645,8935],//hp
    [60,60,60,60,61,61,61,62,62,62,63,63,64,64,65,65],//speed
    [8,8,8,8,8,8,9,9,9,10,11,12,13,15,17,19],//endurance
    [5,6,7,8,9,10,11,13,14,15,16,18,21,23,25,27],//attack
    [5,5,5,6,7,7,8,10,11,12,14,18,22,27,32,38],//pass
    [2,2,2,2,3,3,4,4,5,6,7,8,10,12,14,16],//block
    [4,4,5,5,6,6,7,7,8,8,9,10,11,12,13,13],//shot
    [8,10,12,15,17,19,22,24,26,28,30,34,38,42,45,48]//catch
    );
    
    generatePlayer(
    'Zalitz',
    [100,235,430,655,910,1195,1510,1855,2230,2635,3070,4030,5110,6310,7630,8920],//hp
    [59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59],//speed
    [6,6,6,6,7,8,9,10,13,14,16,20,25,31,38,45],//endurance
    [15,16,17,19,20,21,23,24,25,26,27,29,31,32,33,34],//attack
    [5,6,7,9,11,13,15,17,20,22,25,31,37,45,52,60],//pass
    [11,12,13,14,16,18,20,22,25,28,31,37,44,52,61,70],//block
    [3,4,5,6,7,8,9,10,11,12,13,15,17,19,21,22],//shot
    [1,2,3,4,5,6,7,8,9,10,11,13,15,17,19,20]//catch
    );
    
    generatePlayer(
    'Zev Ronso',
    [230,547,936,1917,1691,2057,2416,2767,3111,3447,3776,4411,5016,5591,6136,6600],//hp
    [52,52,52,52,53,53,53,54,54,54,55,55,56,56,57,57],//speed
    [12,14,16,18,20,23,25,28,31,34,37,43,50,58,65,73],//endurance
    [7,7,7,8,9,10,12,14,16,19,22,28,36,45,55,65],//attack
    [7,10,13,17,20,23,26,28,31,34,36,41,45,48,52,54],//pass
    [7,13,18,12,24,27,29,31,33,35,36,40,43,45,48,50],//block
    [11,13,15,17,19,21,22,24,25,27,28,30,32,34,35,35],//shot
    [1,1,1,2,2,3,3,4,5,5,6,7,9,10,12,13]//catch
    );

var getHighestAverage = function(skills, level){
    var playerName = '';
    var SkillSet = []
    var highestSkillAverage = 0;
    for(var i=0; i<Roster.length; i++){
        var skillTotal = 0;
        playerSkills = [];
        Players[Roster[i]].level = level;
        //console.log(Roster[i]);
        for(var x=0; x<skills.length; x++){
            //console.log(skills[x]);
            //console.log(Players[Roster[i]][skills[x]]());
            playerSkills.push(Players[Roster[i]][skills[x]]());
            skillTotal+=Players[Roster[i]][skills[x]]();
        }
        
        var skillAverage = skillTotal/skills.length;
        if(skillAverage > highestSkillAverage){
            highestSkillAverage = skillAverage;
            playerName = Roster[i];
            SkillSet = playerSkills;
        }
    }
    console.log('highest skill average: ' + highestSkillAverage);
    console.log('Player: '+ playerName);
    for(var x=0; x<skills.length; x++){
        console.log(skills[x]+': '+SkillSet[x]);
    }
}
//GOALIE
//console.log('=====GOALIE=====')
//getHighestAverage(['CATCH'],99);

//DEFENDERS
//console.log('=====DEFENDERS=====');
//getHighestAverage(['SPEED','ENDURANCE','ATTACK','PASS'],99);
//getHighestAverage(['SPEED','ENDURANCE','ATTACK','PASS','BLOCK'],99);

//MF
//console.log('=====MF=====');
//getHighestAverage(['SHOT','ENDURANCE','ATTACK','BLOCK'],99);

//ATTACKERS
//console.log('=====ATTACKERS=====');
//getHighestAverage(['SHOT','SPEED'],99);
//getHighestAverage(['SHOT','ATTACK','SPEED'],99);




console.log('=====GOALIE=====')
//Nimrook
Players['Nimrook'].level = 99;
Players['Nimrook'].getStats();
console.log('=====DEFENDERS=====');
//Mifurey
Players['Mifurey'].level = 99;
Players['Mifurey'].getStats();
//Vuroja
Players['Vuroja'].level = 99;
Players['Vuroja'].getStats();
console.log('=====MF=====');
//Larbeight
Players['Larbeight'].level = 99;
Players['Larbeight'].getStats();
console.log('=====ATTACKERS=====');
//Nedus
Players['Nedus'].level = 99;
Players['Nedus'].getStats();
//Linna
Players['Linna'].level = 99;
Players['Linna'].getStats();



var PlayerArray = [];
for(var x=0; x<Roster.length; x++){
    PlayerArray.push(Players[Roster[x]]);
}

sortBySkills = function(skills,level){
    var comparator = function(a,b){
        a.level = level;
        b.level = level;
        var askillAverage = 0;
        var askillTotal = 0;
        for(var x=0; x<skills.length; x++){
            //console.log(a[skills[x]]());
            askillTotal+=a[skills[x]]();
        }
        var bskillAverage = 0;
        var bskillTotal = 0;
        for(var x=0; x<skills.length; x++){
            bskillTotal+=b[skills[x]]();
        }
        askillAverage = askillTotal/skills.length;
        bskillAverage = bskillTotal/skills.length;
        return askillAverage < bskillAverage;
    }
    PlayerArray.sort(comparator);
    
}

sortBySkills(['HP'],99);
for(var x=0; x<PlayerArray.length; x++){
    console.log(PlayerArray[x].name);
}
/*
Players['Linna'].level = 99;
Players['Linna'].getStats();
Players['Brother'].level = 99;
Players['Brother'].getStats();//**********
Players['Isken'].level = 99;
Players['Isken'].getStats();*/