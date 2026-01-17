import { Country, Region } from './types';

export const REGIONS_DATA: Record<Country, Region[]> = {
  [Country.POLAND]: [
    { 
      id: 'dolnoslaskie', 
      name: 'Dolnośląskie', 
      subRegions: ["Wrocław", "Jelenia Góra", "Legnica", "Wałbrzych", "bolesławiecki", "dzierżoniowski", "głogowski", "górowski", "jaworski", "kamiennogórski", "kłodzki", "legnicki", "lubański", "lubiński", "lwówecki", "milicki", "oleśnicki", "oławski", "polkowicki", "strzeliński", "średzki", "świdnicki", "trzebnicki", "wałbrzyski", "wołowski", "wrocławski", "ząbkowicki", "zgorzelecki", "złotoryjski"] 
    },
    { 
      id: 'kujawsko-pomorskie', 
      name: 'Kujawsko-Pomorskie', 
      subRegions: ["Bydgoszcz", "Toruń", "Włocławek", "Grudziądz", "aleksandrowski", "brodnicki", "bydgoski", "chełmiński", "golubsko-dobrzyński", "grudziądzki", "inowrocławski", "lipnowski", "mogileński", "nakielski", "radziejowski", "rypiński", "sępoleński", "świecki", "toruński", "tucholski", "wąbrzeski", "włocławski", "żniński"] 
    },
    { 
      id: 'lubelskie', 
      name: 'Lubelskie', 
      subRegions: ["Lublin", "Biała Podlaska", "Chełm", "Zamość", "bialski", "biłgorajski", "chełmski", "hrubieszowski", "janowski", "krasnostawski", "kraśnicki", "lubartowski", "lubelski", "łęczyński", "lubartowski", "łęczyński", "łukowski", "opolski", "parczewski", "puławski", "radzyński", "rycki", "świdnicki", "tomaszowski", "włodawski", "zamojski"] 
    },
    { 
      id: 'lubuskie', 
      name: 'Lubuskie', 
      subRegions: ["Gorzów Wielkopolski", "Zielona Góra", "gorzowski", "krośnieński", "międzyrzecki", "nowosolski", "słubicki", "strzelecko-drezdenecki", "sulęciński", "świebodziński", "wschowski", "zielonogórski", "żagański", "żarski"] 
    },
    { 
      id: 'lodzkie', 
      name: 'Łódzkie', 
      subRegions: ["Łódź", "Piotrków Tryunalski", "Skierniewice", "bełchatowski", "brzeziński", "kutnowski", "łaski", "łęczycki", "łowicki", "łódzki wschodni", "opoczyński", "pabianicki", "pajęczański", "piotrkowski", "poddębicki", "radomszczański", "rawski", "sieradzki", "skierniewicki", "tomaszowski", "wieluński", "wieruszowski", "zduńskowolski", "zgierski"] 
    },
    { 
      id: 'malopolskie', 
      name: 'Małopolskie', 
      subRegions: ["Kraków", "Nowy Sącz", "Tarnów", "bocheński", "brzeski", "chrzanowski", "dąbrowski", "gorlicki", "krakowski", "limanowski", "miechowski", "myślenicki", "nowosądecki", "nowotarski", "olkuski", "oświęcimski", "proszowicki", "suszki", "tarnowski", "tatrzański", "wadowicki", "wielicki"] 
    },
    { 
      id: 'mazowieckie', 
      name: 'Mazowieckie', 
      subRegions: ["Warszawa", "Ostrołęka", "Płock", "Radom", "Siedlce", "białobrzeski", "ciechanowski", "garwoliński", "gostyniński", "grodziski", "grójecki", "kozienicki", "legionowski", "lipski", "łosicki", "makowski", "miński", "mławski", "nowodworski", "ostrołęcki", "ostrowski", "otwocki", "piaseczyński", "płocki", "płoński", "pruszkowski", "przasnyski", "przysuski", "pułtuski", "radomski", "siedlecki", "sierpecki", "sochaczewski", "sokołowski", "szydłowiecki", "warszawski zachodni", "węgrowski", "wołożyński", "wyszkowski", "zwoleński", "żuromiński", "żyrardowski"] 
    },
    { 
      id: 'opolskie', 
      name: 'Opolskie', 
      subRegions: ["Opole", "brzeski", "głubczycki", "kędzierzyńsko-kozielski", "kluczborski", "krapkowicki", "namysłowski", "nyski", "oleski", "opolski", "prudnicki", "strzelecki"] 
    },
    { 
      id: 'podkarpackie', 
      name: 'Podkarpackie', 
      subRegions: ["Rzeszów", "Krosno", "Przemyśl", "Tarnobrzeg", "bieszczadzki", "brzozowski", "dębicki", "jarosławski", "jasielski", "kolbuszowski", "krośnieński", "leski", "leżajski", "lubaczowski", "łańcucki", "mielecki", "niżański", "przemyski", "przeworski", "ropczycko-sędziszowski", "rzeszowski", "sanocki", "stalowowolski", "strzyżowski", "tarnobrzeski"] 
    },
    { 
      id: 'podlaskie', 
      name: 'Podlaskie', 
      subRegions: ["Białystok", "Łomża", "Suwałki", "augustowski", "białostocki", "bielski", "grajewski", "hajnowski", "kolneński", "łomżyński", "moniecki", "sejneński", "siemiatycki", "sokólski", "suwalski", "wysokomazowiecki", "zambrowski"] 
    },
    { 
      id: 'pomorskie', 
      name: 'Pomorskie', 
      subRegions: ["Gdańsk", "Gdynia", "Słupsk", "Sopot", "bytowski", "chojnicki", "człuchowski", "gdański", "kartuski", "kościerski", "kwidzyński", "lęborski", "malborski", "nowodworski", "pucki", "słupski", "starogardzki", "sztumski", "tczewski", "wejherowski"] 
    },
    { 
      id: 'slaskie', 
      name: 'Śląskie', 
      subRegions: ["Katowice", "Bielsko-Biała", "Bytom", "Chorzów", "Częstochowa", "Dąbrowa Górnicza", "Gliwice", "Jastrzębie-Zdrój", "Jaworzno", "Mysłowice", "Piekary Śląskie", "Ruda Śląska", "Rybnik", "Siemianowice Śląskie", "Sosnowiec", "Świętochłowice", "Tychy", "Zabrze", "Żory", "będziński", "bielski", "bieruńsko-lędziński", "cieszyński", "częstochowski", "gliwicki", "kłobucki", "lubliniecki", "mikołowski", "myszkowski", "pszczyński", "raciborski", "rybnicki", "tarnogórski", "wodzisławski", "zawierciański", "żywiecki"] 
    },
    { 
      id: 'swietokrzyskie', 
      name: 'Świętokrzyskie', 
      subRegions: ["Kielce", "buski", "jędrzejowski", "kazimierski", "kielecki", "konecki", "opatowski", "ostrowiecki", "pińczowski", "sandomierski", "skarżyski", "starachowicki", "staszowski", "włoszczowski"] 
    },
    { 
      id: 'warminsko-mazurskie', 
      name: 'Warmińsko-Mazurskie', 
      subRegions: ["Olsztyn", "Elbląg", "bartoszycki", "braniewski", "działdowski", "elbląski", "ełcki", "giżycki", "gołdapski", "iławski", "kętrzyński", "lidzbarski", "mrągowski", "nidzicki", "nowomiejski", "olecki", "olsztyński", "ostródzki", "piski", "szczycieński", "węgorzewski"] 
    },
    { 
      id: 'wielkopolskie', 
      name: 'Wielkopolskie', 
      subRegions: ["Poznań", "Kalisz", "Konin", "Leszno", "chodzieski", "czarnkowsko-trzcianecki", "gnieźnieński", "gostyński", "grodziski", "jarociński", "kaliski", "kępiński", "kolski", "koniński", "kościański", "krotoszyński", "leszczyński", "międzychodzki", "nowotomyski", "obornicki", "ostrowski", "ostrzeszowski", "pilski", "pleszewski", "poznański", "rawicki", "słupecki", "szamotulski", "średzki", "śremski", "turecki", "wągrowiecki", "wolsztyński", "wrzesiński", "złotowski"] 
    },
    { 
      id: 'zachodniopomorskie', 
      name: 'Zachodniopomorskie', 
      subRegions: ["Szczecin", "Koszalin", "Świnoujście", "białogardzki", "choszczeński", "drawski", "goleniowski", "gryficki", "gryfiński", "kamieński", "kołobrzeski", "koszaliński", "myśliborski", "policki", "pyrzycki", "sławieński", "stargardzki", "szczecinecki", "świdwiński", "wałecki"] 
    }
  ],
  [Country.GERMANY]: [
    { 
      id: 'baden-wuerttemberg', 
      name: 'Baden-Württemberg', 
      subRegions: ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg", "Heilbronn", "Ulm", "Pforzheim", "Alb-Donau-Kreis", "Biberach", "Böblingen", "Bodenseekreis", "Breisgau-Hochschwarzwald", "Calw", "Emmendingen", "Enzkreis", "Esslingen", "Freudenstadt", "Göppingen", "Heidenheim", "Heilbronn", "Hohenlohekreis", "Karlsruhe", "Konstanz", "Lörrach", "Ludwigsburg", "Main-Tauber-Kreis", "Neckar-Odenwald-Kreis", "Ortenaukreis", "Ostalbkreis", "Rastatt", "Ravensburg", "Rems-Murr-Kreis", "Reutlingen", "Rhein-Neckar-Kreis", "Rottweil", "Schwäbisch Hall", "Sigmaringen", "Tübingen", "Tuttlingen", "Waldshut", "Zollernalbkreis"] 
    },
    { 
      id: 'bayern', 
      name: 'Bayern', 
      subRegions: ["München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt", "Fürth", "Würzburg", "Erlangen", "Bamberg", "Bayreuth", "Landshut", "Passau", "Aichach-Friedberg", "Altötting", "Amberg-Sulzbach", "Ansbach", "Aschaffenburg", "Bad Kissingen", "Bad Tölz-Wolfratshausen", "Berchtesgadener Land", "Cham", "Coburg", "Dachau", "Deggendorf", "Dillingen a.d. Donau", "Dingolfing-Landau", "Donau-Ries", "Ebersberg", "Eichstätt", "Erding", "Forchheim", "Freising", "Freyung-Grafenau", "Fürstenfeldbruck", "Garmisch-Partenkirchen", "Günzburg", "Haßberge", "Hof", "Kelheim", "Kitzingen", "Kronach", "Kulmbach", "Landsberg am Lech", "Lichtenfels", "Lindau", "Main-Spessart", "Miesbach", "Miltenberg", "Mühldorf a. Inn", "München", "Neu-Ulm", "Neuburg-Schrobenhausen", "Neumarkt i.d. OPf.", "Neustadt a.d. Aisch-Bad Windsheim", "Neustadt a.d. Waldnaab", "Nürnberger Land", "Oberallgäu", "Ostallgäu", "Passau", "Pfaffenhofen a.d. Ilm", "Regen", "Regensburg", "Rhön-Grabfeld", "Rosenheim", "Roth", "Rottal-Inn", "Schwandorf", "Schweinfurt", "Starnberg", "Straubing-Bogen", "Tirschenreuth", "Traunstein", "Unterallgäu", "Weißenburg-Gunzenhausen", "Wunsiedel i. Fichtelgebirge", "Würzburg"] 
    },
    { 
      id: 'berlin', 
      name: 'Berlin', 
      subRegions: ["Berlin (Stadtstaat)"] 
    },
    { 
      id: 'brandenburg', 
      name: 'Brandenburg', 
      subRegions: ["Potsdam", "Cottbus", "Brandenburg an der Havel", "Frankfurt (Oder)", "Barnim", "Dahme-Spreewald", "Elbe-Elster", "Havelland", "Märkisch-Oderland", "Oberhavel", "Oberspreewald-Lausitz", "Oder-Spree", "Ostprignitz-Ruppin", "Potsdam-Mittelmark", "Prignitz", "Spree-Neiße", "Teltow-Fläming", "Uckermark"] 
    },
    { 
      id: 'bremen', 
      name: 'Bremen', 
      subRegions: ["Bremen", "Bremerhaven"] 
    },
    { 
      id: 'hamburg', 
      name: 'Hamburg', 
      subRegions: ["Hamburg (Stadtstaat)"] 
    },
    { 
      id: 'hessen', 
      name: 'Hessen', 
      subRegions: ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach am Main", "Bergstraße", "Darmstadt-Dieburg", "Fulda", "Giessen", "Groß-Gerau", "Hersfeld-Rotenburg", "Hochtaunuskreis", "Kassel", "Lahn-Dill-Kreis", "Limburg-Weilburg", "Main-Kinzig-Kreis", "Main-Taunus-Kreis", "Marburg-Biedenbopf", "Odenwaldkreis", "Offenbach", "Rheingau-Taunus-Kreis", "Schwalm-Eder-Kreis", "Vogelsbergkreis", "Waldeck-Frankenberg", "Werra-Meißner-Kreis", "Wetteraukreis"] 
    },
    { 
      id: 'mecklenburg-vorpommern', 
      name: 'Mecklenburg-Vorpommern', 
      subRegions: ["Rostock", "Schwerin", "Ludwigslust-Parchim", "Mecklenburgische Seenplatte", "Nordwestmecklenburg", "Rostock", "Vorpommern-Greifswald", "Vorpommern-Rügen"] 
    },
    { 
      id: 'niedersachsen', 
      name: 'Niedersachsen', 
      subRegions: ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Wolfsburg", "Göttingen", "Salzgitter", "Ammerland", "Aurich", "Celle", "Cloppenburg", "Cuxhaven", "Diepholz", "Emsland", "Friesland", "Gifhorn", "Goslar", "Göttingen", "Grafschaft Bentheim", "Hameln-Pyrmont", "Harburg", "Heidekreis", "Helmstedt", "Hildesheim", "Holzminden", "Leer", "Lüchow-Dannenberg", "Lüneburg", "Nienburg/Weser", "Northeim", "Oldenburg", "Osnabrück", "Osterholz", "Peine", "Rotenburg (Wümme)", "Schaumburg", "Stade", "Uelzen", "Vechta", "Verden", "Wesermarsch", "Wittmund", "Wolfenbüttel"] 
    },
    { 
      id: 'nordrhein-westfalen', 
      name: 'Nordrhein-Westfalen', 
      subRegions: ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", "Gelsenkirchen", "Mönchengladbach", "Aachen", "Borken", "Coesfeld", "Düren", "Ennepe-Ruhr-Kreis", "Euskirchen", "Gütersloh", "Heinsberg", "Herford", "Hochsauerlandkreis", "Höxter", "Kleve", "Lippe", "Märkischer Kreis", "Mettmann", "Minden-Lübbecke", "Oberbergischer Kreis", "Olpe", "Paderborn", "Recklinghausen", "Rhein-Erft-Kreis", "Rhein-Kreis Neuss", "Rhein-Sieg-Kreis", "Rheinisch-Bergischer Kreis", "Siegen-Wittgenstein", "Soest", "Steinfurt", "Unna", "Viersen", "Warendorf", "Wesel"] 
    },
    { 
      id: 'rheinland-pfalz', 
      name: 'Rheinland-Pfalz', 
      subRegions: ["Mainz", "Ludwigshafen", "Koblenz", "Trier", "Kaiserslautern", "Ahrweiler", "Altenkirchen", "Alzey-Worms", "Bad Dürkheim", "Bad Kreuznach", "Bernkastel-Wittlich", "Birkenfeld", "Cochem-Zell", "Donnersbergkreis", "Eifelkreis Bitburg-Prüm", "Germersheim", "Kaiserslautern", "Kusel", "Mainz-Bingen", "Mayen-Koblenz", "Neuwied", "Rhein-Hunsrück-Kreis", "Rhein-Lahn-Kreis", "Rhein-Pfalz-Kreis", "Südliche Weinstraße", "Südwestpfalz", "Trier-Saarburg", "Vulkaneifel", "Westerwaldkreis"] 
    },
    { 
      id: 'saarland', 
      name: 'Saarland', 
      subRegions: ["Saarbrücken", "Merzig-Wadern", "Neunkirchen", "Saarlouis", "Saarpfalz-Kreis", "St. Wendel"] 
    },
    { 
      id: 'sachsen', 
      name: 'Sachsen', 
      subRegions: ["Leipzig", "Dresden", "Chemnitz", "Bautzen", "Erzgebirgskreis", "Görlitz", "Leipzig", "Meißen", "Mittelsachsen", "Nordsachsen", "Sächsische Schweiz-Osterzgebirge", "Vogtlandkreis", "Zwickau"] 
    },
    { 
      id: 'sachsen-anhalt', 
      name: 'Sachsen-Anhalt', 
      subRegions: ["Magdeburg", "Halle (Saale)", "Dessau-Roßlau", "Altmarkkreis Salzwedel", "Anhalt-Bitterfeld", "Börde", "Burgenlandkreis", "Harz", "Jerichower Land", "Mansfeld-Südharz", "Saalekreis", "Salzlandkreis", "Stendal", "Wittenberg"] 
    },
    { 
      id: 'schleswig-holstein', 
      name: 'Schleswig-Holstein', 
      subRegions: ["Kiel", "Lübeck", "Flensburg", "Neumünster", "Dithmarschen", "Herzogtum Lauenburg", "Nordfriesland", "Ostholstein", "Pinneberg", "Plön", "Rendsburg-Eckernförde", "Schleswig-Flensburg", "Segeberg", "Steinburg", "Stormarn"] 
    },
    { 
      id: 'thueringen', 
      name: 'Thüringen', 
      subRegions: ["Erfurt", "Jena", "Gera", "Weimar", "Altenburger Land", "Eichsfeld", "Gotha", "Greiz", "Hildburghausen", "Ilm-Kreis", "Kyffhäuserkreis", "Nordhausen", "Saale-Holzland-Kreis", "Saale-Orla-Kreis", "Saalfeld-Rudolstadt", "Schmalkalden-Meiningen", "Sömmerda", "Sonneberg", "Unstrut-Hainich-Kreis", "Wartburgkreis", "Weimarer Land"] 
    }
  ],
  [Country.ROMANIA]: [
    {
      id: 'romania-judete',
      name: 'Regiony (Județe)',
      subRegions: [
        "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", "Brăila", "București",
        "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", 
        "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureś", "Mehedinți", 
        "Mureś", "Neamț", "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiś", 
        "Tulcea", "Vaslui", "Vâlcea", "Vrancea"
      ]
    }
  ],
  [Country.AUSTRIA]: [
    { id: 'burgenland', name: 'Burgenland', subRegions: ["Eisenstadt", "Rust", "Eisenstadt-Umgebung", "Güssing", "Jennersdorf", "Mattersburg", "Neusiedl am See", "Oberpullendorf", "Oberwart"] },
    { id: 'kaernten', name: 'Kärnten', subRegions: ["Klagenfurt am Wörthersee", "Villach", "Feldkirchen", "Hermagor", "Klagenfurt-Land", "St. Veit an der Glan", "Spittal an der Drau", "Villach-Land", "Völkermarkt", "Wolfsberg"] },
    { id: 'niederoesterreich', name: 'Niederösterreich', subRegions: ["St. Pölten", "Krems an der Donau", "Waidhofen an der Ybbs", "Wiener Neustadt", "Amstetten", "Baden", "Bruck an der Leitha", "Gänserndorf", "Gmünd", "Hollabrunn", "Horn", "Korneuburg", "Krems", "Lilienfeld", "Melk", "Mistelbach", "Mödling", "Neunkirchen", "St. Pölten-Land", "Scheibbs", "Tulln", "Waidhofen an der Thaya", "Wiener Neustadt-Land", "Zwettl"] },
    { id: 'oberoesterreich', name: 'Oberösterreich', subRegions: ["Linz", "Steyr", "Wels", "Braunau am Inn", "Eferding", "Freistadt", "Gmunden", "Grieskirchen", "Kirchdorf an der Krems", "Linz-Land", "Perg", "Ried im Innkreis", "Rohrbach", "Schärding", "Steyr-Land", "Urfahr-Umgebung", "Vöcklabruck", "Wels-Land"] },
    { id: 'salzburg', name: 'Salzburg', subRegions: ["Salzburg", "Hallein", "Salzburg-Umgebung", "St. Johann im Pongau", "Tamsweg", "Zell am See"] },
    { id: 'steiermark', name: 'Steiermark', subRegions: ["Graz", "Deutschlandsberg", "Graz-Umgebung", "Hartberg-Fürstenfeld", "Leibnitz", "Leoben", "Liezen", "Murau", "Murtal", "Südoststeiermark", "Voitsberg", "Weiz"] },
    { id: 'tirol', name: 'Tirol', subRegions: ["Innsbruck", "Imst", "Innsbruck-Land", "Kitzbühel", "Kufstein", "Landeck", "Lienz", "Reutte", "Schwaz"] },
    { id: 'vorarlberg', name: 'Vorarlberg', subRegions: ["Bregenz", "Dornbirn", "Feldkirch", "Bludenz"] },
    { id: 'wien', name: 'Wien', subRegions: ["Wien (Stadtbezirke 1-23)"] }
  ],
  [Country.LITHUANIA]: [
    { id: 'alytaus', name: 'Alytaus', subRegions: ["Alytus miestas", "Alytaus rajonas", "Druskininkai", "Lazdijai", "Varėna"] },
    { id: 'kauno', name: 'Kauno', subRegions: ["Kaunas miestas", "Kauno rajonas", "Birštonas", "Jonava", "Kaišiadorys", "Kėdainiai", "Prienai", "Raseiniai"] },
    { id: 'klaipedos', name: 'Klaipėdos', subRegions: ["Klaipėda miestas", "Klaipėdos rajonas", "Neringa", "Palanga", "Skuodas", "Śilutė", "Kretinga"] },
    { id: 'marijampoles', name: 'Marijampolės', subRegions: ["Marijampolė", "Vilkaviškis", "Kalvarija", "Kazlų Rūda", "Śakiai"] },
    { id: 'panevezio', name: 'Panevėžio', subRegions: ["Panevėżys miestas", "Panevėżio rajonas", "Birżai", "Kupiškis", "Pasvalys", "Rokiśkis"] },
    { id: 'siauliu', name: 'Śiaulių', subRegions: ["Śiauliai miestas", "Śiaulių rajonas", "Akmenė", "Joniśkis", "Kelmė", "Pakruojis", "Radviliśkis"] },
    { id: 'taurages', name: 'Tauragės', subRegions: ["Tauragė", "Jurbarkas", "Pagėgiai", "Śilalė"] },
    { id: 'telsiu', name: 'Telśių', subRegions: ["Telśiai", "Mażeikiai", "Plungė", "Rietavas"] },
    { id: 'utenos', name: 'Utenos', subRegions: ["Utena", "Anykśčiai", "Ignalina", "Molėtai", "Zarasai", "Visaginas"] },
    { id: 'vilniaus', name: 'Vilniaus', subRegions: ["Vilnius miestas", "Vilniaus rajonas", "Elektrėnai", "Śalčininkai", "Śirvintos", "Śvenčionys", "Trakai", "Ukmergė"] }
  ],
  [Country.LATVIA]: [
    { id: 'latvia-cities', name: 'Miasta Wydzielone', subRegions: ["Rīga", "Daugavpils", "Jelgava", "Jūrmala", "Liepāja", "Rēzekne", "Ventspils"] },
    { id: 'latvia-novadi', name: 'Municypia (Novadi)', subRegions: ["Aizkraukles", "Alūksnes", "Augśdaugavas", "Ādažu", "Balvu", "Bauskas", "Cēsu", "Dienvidkurzemes", "Dobeles", "Gulbenes", "Jelgavas", "Jēkabpils", "Ķekavas", "Krāslavas", "Kuldīgas", "Limbažu", "Līvānu", "Ludzas", "Madonas", "Mārupes", "Ogres", "Olaines", "Preiļu", "Rēzeknes", "Ropažu", "Salaspils", "Saldus", "Saulkrastu", "Siguldas", "Smiltenes", "Talsu", "Tukuma", "Valkas", "Valmieras", "Varakļānu", "Ventspils"] }
  ],
  [Country.CZECH_REPUBLIC]: [
    { id: 'praha', name: 'Praha', subRegions: ["Praha"] },
    { id: 'stredocesky', name: 'Středočeský kraj', subRegions: ["Benešov", "Beroun", "Kladno", "Kolín", "Kutná Hora", "Mělník", "Mladá Boleslav", "Nymburk", "Praha-východ", "Praha-západ", "Příbram", "Rakovník"] },
    { id: 'jihocesky', name: 'Jihočeský kraj', subRegions: ["České Budějovice", "Český Krumlov", "Jindřichův Hradec", "Písek", "Prachatice", "Strakonice", "Tábor"] },
    { id: 'plzensky', name: 'Plzeňský kraj', subRegions: ["Domažlice", "Klatovy", "Plzeň-město", "Plzeň-jih", "Plzeň-sever", "Rokycany", "Tachov"] },
    { id: 'karlovarsky', name: 'Karlovarský kraj', subRegions: ["Cheb", "Karlovy Vary", "Sokolov"] },
    { id: 'ustecky', name: 'Ústecký kraj', subRegions: ["Děčín", "Chomutov", "Litoměřice", "Louny", "Most", "Teplice", "Ústí nad Labem"] },
    { id: 'liberecky', name: 'Liberecký kraj', subRegions: ["Česká Lípa", "Jablonec nad Nisou", "Liberec", "Semily"] },
    { id: 'kralovehradecky', name: 'Královéhradecký kraj', subRegions: ["Hradec Králové", "Jičín", "Náchod", "Rychnov nad Knężnou", "Trutnov"] },
    { id: 'pardubicky', name: 'Pardubický kraj', subRegions: ["Chrudim", "Pardubice", "Svitavy", "Ústí nad Orlicí"] },
    { id: 'vysocina', name: 'Kraj Vysočina', subRegions: ["Havlíčkův Brod", "Jihlava", "Pelhřimov", "Třebíč", "Žďár nad Sázavou"] },
    { id: 'jihomoravsky', name: 'Jihomoravský kraj', subRegions: ["Blansko", "Brno-město", "Brno-venkov", "Břeclav", "Hodonín", "Vyškov", "Znojmo"] },
    { id: 'olomoucky', name: 'Olomoucký kraj', subRegions: ["Jeseník", "Olomouc", "Prostějov", "Přerov", "Šumperk"] },
    { id: 'moravskoslezsky', name: 'Moravskoslezský kraj', subRegions: ["Bruntál", "Frýdek-Místek", "Karviná", "Nový Jičín", "Opava", "Ostrava-město"] },
    { id: 'zlinsky', name: 'Zlínský kraj', subRegions: ["Kroměříż", "Uherské Hradiště", "Vsetín", "Zlín"] }
  ],
  [Country.HUNGARY]: [
    { id: 'budapest', name: 'Budapest', subRegions: ["Budapest"] },
    { id: 'bacs-kiskun', name: 'Bács-Kiskun', subRegions: ["Kecskemét", "Baja", "Kiskunfélegyháza", "Kalocsa", "Kiskőrös"] },
    { id: 'baranya', name: 'Baranya', subRegions: ["Pécs", "Komló", "Mohács", "Szigetvár", "Siklós"] },
    { id: 'bekes', name: 'Békés', subRegions: ["Békéscsaba", "Gyula", "Orosháza", "Szarvas", "Mezőberény"] },
    { id: 'borsod-abauj-zemplen', name: 'Borsod-Abaúj-Zemplén', subRegions: ["Miskolc", "Ózd", "Kazincbarcika", "Mezőkövesd", "Szerencs"] },
    { id: 'csongrad-csanad', name: 'Csongrád-Csanád', subRegions: ["Szeged", "Hódmezővásárhely", "Szentes", "Makó", "Csongrád"] },
    { id: 'fejer', name: 'Fejér', subRegions: ["Székesfehérvár", "Dunaújváros", "Mór", "Bicske", "Sárbogárd"] },
    { id: 'gyor-moson-sopron', name: 'Győr-Moson-Sopron', subRegions: ["Győr", "Sopron", "Mosonmagyaróvár", "Csorna", "Kapuvár"] },
    { id: 'hajdu-bihar', name: 'Hajdú-Bihar', subRegions: ["Debrecen", "Hajdúböszörmény", "Hajdúszoboszló", "Balmazújváros", "Berettyóújfalu"] },
    { id: 'heves', name: 'Heves', subRegions: ["Eger", "Gyöngyös", "Hatvan", "Heves", "Füzesabony"] },
    { id: 'jasz-nagykun-solnok', name: 'Jász-Nagykun-Szolnok', subRegions: ["Szolnok", "Jászberény", "Törökszentmiklós", "Karcag", "Mezőtúr"] },
    { id: 'komarom-esztergom', name: 'Komárom-Esztergom', subRegions: ["Tatabánya", "Esztergom", "Tata", "Komárom", "Oroszlány"] },
    { id: 'nograd', name: 'Nógrád', subRegions: ["Salgótarján", "Balassagyarmat", "Bátonyterenye", "Pásztó"] },
    { id: 'pest', name: 'Pest', subRegions: ["Érd", "Cegléd", "Vác", "Gödöllő", "Dunakeszi", "Szigetszentmiklós", "Nagykőrös"] },
    { id: 'somogy', name: 'Somogy', subRegions: ["Kaposvár", "Siófok", "Marcali", "Barcs", "Nagyatád"] },
    { id: 'szabolcs-szatmar-bereg', name: 'Szabolcs-Szatmár-Bereg', subRegions: ["Nyíregyháza", "Mátészalka", "Kisvárda", "Tiszavasvári", "Nyírbátor"] },
    { id: 'tolna', name: 'Tolna', subRegions: ["Szekszárd", "Paks", "Dombóvár", "Bonyhád", "Tolna"] },
    { id: 'vas', name: 'Vas', subRegions: ["Szombathely", "Sárvár", "Körmend", "Kőszeg", "Celldömölk"] },
    { id: 'veszprem', name: 'Veszprém', subRegions: ["Veszprém", "Pápa", "Ajka", "Várpalota", "Tapolca", "Balatonfüred"] },
    { id: 'zala', name: 'Zala', subRegions: ["Zalaegerszeg", "Nagykanizsa", "Keszthely", "Lenti"] }
  ],
  [Country.SLOVAKIA]: [
    { id: 'bratislavsky-kraj', name: 'Bratislavský kraj', subRegions: ["Bratislava I-V", "Malacky", "Pezinok", "Senec"] },
    { id: 'trnavsky-kraj', name: 'Trnavský kraj', subRegions: ["Dunajská Streda", "Galanta", "Hlohovec", "Piešťany", "Senica", "Skalica", "Trnava"] },
    { id: 'trenciansky-kraj', name: 'Trenčiansky kraj', subRegions: ["Bánovce nad Bebravou", "Ilava", "Myjava", "Nové Mesto nad Váhom", "Partizánske", "Považská Bystrica", "Prievidza", "Púchov", "Trenčín"] },
    { id: 'nitriansky-kraj', name: 'Nitriansky kraj', subRegions: ["Komárno", "Levice", "Nitra", "Nové Zámky", "Šaľa", "Topoľčany", "Zlaté Moravce"] },
    { id: 'zilinsky-kraj', name: 'Žilinský kraj', subRegions: ["Bytča", "Čadca", "Dolný Kubín", "Kysucké Nové Mesto", "Liptovský Mikuláš", "Martin", "Námestovo", "Ružomberok", "Turčianske Teplice", "Tvrdośín", "Žilina"] },
    { id: 'banskobystricky-kraj', name: 'Banskobystrický kraj', subRegions: ["Banská Bystrica", "Banská Štiavnica", "Brezno", "Detva", "Krupina", "Lučenec", "Poltár", "Revúca", "Rimavská Sobota", "Veľký Krtíš", "Zvolen", "Žarnovica", "Žiar nad Hronom"] },
    { id: 'presovsky-kraj', name: 'Prešovský kraj', subRegions: ["Bardejov", "Humenné", "Kežmarok", "Levoča", "Medzilaborce", "Poprad", "Preśov", "Sabinov", "Snina", "Stará Ľubovňa", "Stropkov", "Svidník", "Vranov nad Topľou"] },
    { id: 'kosicky-kraj', name: 'Košický kraj', subRegions: ["Gelnica", "Košice I-IV", "Košice-okolie", "Michalovce", "Rožňava", "Sobrance", "Spišská Nová Ves", "Trebišov"] }
  ],
  [Country.ITALY]: [
    { id: 'abruzzo', name: 'Abruzzo', subRegions: ["L'Aquila", "Chieti", "Pescara", "Teramo"] },
    { id: 'basilicata', name: 'Basilicata', subRegions: ["Potenza", "Matera"] },
    { id: 'calabria', name: 'Calabria', subRegions: ["Catanzaro", "Cosenza", "Crotone", "Reggio Calabria", "Vibo Valentia"] },
    { id: 'campania', name: 'Campania', subRegions: ["Napoli", "Avellino", "Benevento", "Caserta", "Salerno"] },
    { id: 'emilia-romagna', name: 'Emilia-Romagna', subRegions: ["Bologna", "Ferrara", "Forlì-Cesena", "Modena", "Parma", "Piacenza", "Ravenna", "Reggio Emilia", "Rimini"] },
    { id: 'friuli-venezia-giulia', name: 'Friuli-Venezia Giulia', subRegions: ["Trieste", "Gorizia", "Pordenone", "Udine"] },
    { id: 'lazio', name: 'Lazio', subRegions: ["Roma", "Frosinone", "Latina", "Rieti", "Viterbo"] },
    { id: 'liguria', name: 'Liguria', subRegions: ["Genova", "Imperia", "La Spezia", "Savona"] },
    { id: 'lombardia', name: 'Lombardia', subRegions: ["Milano", "Bergamo", "Brescia", "Como", "Cremona", "Lecco", "Lodi", "Mantova", "Monza e della Brianza", "Pavia", "Sondrio", "Varese"] },
    { id: 'marche', name: 'Marche', subRegions: ["Ancona", "Ascoli Piceno", "Fermo", "Macerata", "Pesaro e Urbino"] },
    { id: 'molise', name: 'Molise', subRegions: ["Campobasso", "Isernia"] },
    { id: 'piemonte', name: 'Piemonte', subRegions: ["Torino", "Alessandria", "Asti", "Biella", "Cuneo", "Novara", "Verbano-Cusio-Ossola", "Vercelli"] },
    { id: 'puglia', name: 'Puglia', subRegions: ["Bari", "Barletta-Andria-Trani", "Brindisi", "Foggia", "Lecce", "Taranto"] },
    { id: 'sardegna', name: 'Sardegna', subRegions: ["Cagliari", "Nuoro", "Oristano", "Sassari", "Sud Sardegna"] },
    { id: 'sicilia', name: 'Sicilia', subRegions: ["Palermo", "Agrigento", "Caltanissetta", "Catania", "Enna", "Messina", "Ragusa", "Siracusa", "Trapani"] },
    { id: 'toscana', name: 'Toscana', subRegions: ["Firenze", "Arezzo", "Grosseto", "Livorno", "Lucca", "Massa-Carrara", "Pisa", "Pistoia", "Prato", "Siena"] },
    { id: 'trentino-alto-adige', name: 'Trentino-Alto Adige', subRegions: ["Bolzano", "Trento"] },
    { id: 'umbria', name: 'Umbria', subRegions: ["Perugia", "Terni"] },
    { id: 'valle-daosta', name: 'Valle d\'Aosta', subRegions: ["Aosta"] },
    { id: 'veneto', name: 'Veneto', subRegions: ["Venezia", "Belluno", "Padova", "Rovigo", "Treviso", "Verona", "Vicenza"] }
  ],
  [Country.NETHERLANDS]: [
    {
      id: 'holland-provinces',
      name: 'Prowincje',
      subRegions: [
        "Drenthe",
        "Flevoland",
        "Friesland",
        "Gelderland",
        "Groningen",
        "Limburg",
        "Noord-Brabant",
        "Noord-Holland",
        "Overijssel",
        "Utrecht",
        "Zeeland",
        "Zuid-Holland"
      ]
    }
  ],
  [Country.BELGIUM]: [
    {
      id: 'vlaanderen',
      name: 'Vlaanderen (Flandria)',
      subRegions: ["Antwerpen", "Limburg", "Oost-Vlaanderen", "Vlaams-Brabant", "West-Vlaanderen"]
    },
    {
      id: 'wallonie',
      name: 'Wallonie (Walonia)',
      subRegions: ["Brabant Wallon", "Hainaut", "Liège", "Luxembourg", "Namur"]
    },
    {
      id: 'bruxelles',
      name: 'Bruxelles',
      subRegions: ["Region Stołeczny Brukseli"]
    }
  ],
  [Country.FINLAND]: [
    { id: 'uusimaa', name: 'Uusimaa', subRegions: ["Helsinki", "Loviisa", "Porvoo", "Raasepori"] },
    { id: 'varsinais-suomi', name: 'Varsinais-Suomi', subRegions: ["Loimaa", "Salo", "Turku", "Vakka-Suomi", "Åboland-Turunmaa"] },
    { id: 'satakunta', name: 'Satakunta', subRegions: ["Pohjois-Satakunta", "Rauma", "Pori"] },
    { id: 'kanta-hame', name: 'Kanta-Häme', subRegions: ["Forssa", "Hämeenlinna", "Riihimäki"] },
    { id: 'pirkanmaa', name: 'Pirkanmaa', subRegions: ["Etelä-Pirkanmaa", "Lounais-Pirkanmaa", "Luoteis-Pirkanmaa", "Tampere", "Ylä-Pirkanmaa"] },
    { id: 'paijat-hame', name: 'Päijät-Häme', subRegions: ["Lahti"] },
    { id: 'kymenlaakso', name: 'Kymenlaakso', subRegions: ["Kotka-Hamina", "Kouvola"] },
    { id: 'etela-karjala', name: 'Etelä-Karjala', subRegions: ["Imatra", "Lappeenranta"] },
    { id: 'etela-savo', name: 'Etelä-Savo', subRegions: ["Mikkeli", "Pieksämäki", "Savonlinna"] },
    { id: 'pohjois-savo', name: 'Pohjois-Savo', subRegions: ["Koillis-Savo", "Kuopio", "Sisä-Savo", "Varkaus", "Ylä-Savo"] },
    { id: 'pohjois-karjala', name: 'Pohjois-Karjala', subRegions: ["Joensuu", "Keski-Karjala", "Pielisen Karjala"] },
    { id: 'keski-suomi', name: 'Keski-Suomi', subRegions: ["Joutsa", "Jyväskylä", "Jämsä", "Keuruu", "Saarijärvi-Viitasaari", "Äänekoski"] },
    { id: 'etela-pohjanmaa', name: 'Etelä-Pohjanmaa', subRegions: ["Järviseutu", "Kuusiokunnat", "Seinäjoki", "Suupohja"] },
    { id: 'pohjanmaa', name: 'Pohjanmaa', subRegions: ["Pietarsaari", "Suupohjan rannikkoseutu", "Vaasa", "Kyrönmaa"] },
    { id: 'keski-pohjanmaa', name: 'Keski-Pohjanmaa', subRegions: ["Kaustinen", "Kokkola"] },
    { id: 'pohjois-pohjanmaa', name: 'Pohjois-Pohjanmaa', subRegions: ["Haapavesi-Siikalatva", "Koillismaa", "Nivala-Haapajärvi", "Oulu", "Oulunkaari", "Raahe", "Siikalatva"] },
    { id: 'kainuu', name: 'Kainuu', subRegions: ["Kajaani", "Kehys-Kainuu"] },
    { id: 'lappi', name: 'Lappi', subRegions: ["Itä-Lappi", "Kemi-Tornio", "Pohjois-Lappi", "Rovaniemi", "Torniolaakso", "Tunturi-Lappi"] },
    { id: 'ahvenanmaa', name: 'Ahvenanmaa', subRegions: ["Ålands landsbygd", "Ålands skärgård", "Mariehamn"] }
  ],
  [Country.FRANCE]: [
    { id: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', subRegions: ["Ain", "Allier", "Ardèche", "Cantal", "Drôme", "Isère", "Loire", "Haute-Loire", "Puy-de-Dôme", "Rhône", "Savoie", "Haute-Savoie"] },
    { id: 'bourgogne-franche-comte', name: 'Bourgogne-Franche-Comté', subRegions: ["Côte-d'Or", "Doubs", "Jura", "Nièvre", "Haute-Saône", "Saône-et-Loire", "Yonne", "Territoire de Belfort"] },
    { id: 'bretagne', name: 'Bretagne', subRegions: ["Côtes-d'Armor", "Finistère", "Ille-et-Vilaine", "Morbihan"] },
    { id: 'centre-val-de-loire', name: 'Centre-Val de Loire', subRegions: ["Cher", "Eure-et-Loir", "Indre", "Indre-et-Loire", "Loir-et-Cher", "Loiret"] },
    { id: 'grand-est', name: 'Grand Est', subRegions: ["Ardennes", "Aube", "Marne", "Haute-Marne", "Meurthe-et-Moselle", "Meuse", "Moselle", "Bas-Rhin", "Haut-Rhin", "Vosges"] },
    { id: 'hauts-de-france', name: 'Hauts-de-France', subRegions: ["Aisne", "Nord", "Oise", "Pas-de-Calais", "Somme"] },
    { id: 'ile-de-france', name: 'Île-de-France', subRegions: ["Paris", "Seine-et-Marne", "Yvelines", "Essonne", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne", "Val-d'Oise"] },
    { id: 'normandie', name: 'Normandie', subRegions: ["Calvados", "Eure", "Manche", "Orne", "Seine-Maritime"] },
    { id: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', subRegions: ["Charente", "Charente-Maritime", "Corrèze", "Creuse", "Dordogne", "Gironde", "Landes", "Lot-et-Garonne", "Pyrénées-Atlantiques", "Deux-Sèvres", "Vienne", "Haute-Vienne"] },
    { id: 'occitanie', name: 'Occitanie', subRegions: ["Ariège", "Aude", "Aveyron", "Gard", "Haute-Garonne", "Gers", "Hérault", "Lot", "Lozère", "Hautes-Pyrénées", "Pyrénées-Orientales", "Tarn", "Tarn-et-Garonne"] },
    { id: 'pays-de-la-loire', name: 'Pays de la Loire', subRegions: ["Loire-Atlantique", "Maine-et-Loire", "Mayenne", "Sarthe", "Vendée"] },
    { id: 'provence-alpes-cote-d-azur', name: 'Provence-Alpes-Côte d\'Azur', subRegions: ["Alpes-de-Haute-Provence", "Hautes-Alpes", "Alpes-Maritimes", "Bouches-du-Rhône", "Var", "Vaucluse"] },
    { id: 'corse', name: 'Corse', subRegions: ["Corse-du-Sud", "Haute-Corse"] }
  ]
};