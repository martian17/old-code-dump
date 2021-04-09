var findPath = function(g,stt,dst){
    var candids = new priorityQueue();
    var tree = [];
    tree[stt] = [0,g[stt]];
    candids.add([0,g[stt]]);

}




CityData[{All, "Japan"}]
CityData["Tokyo", "Population"]


Sort[{CityData[#, "Population"], #} & /@
  CityData[{All, "Japan"}], #1[[1]] > #2[[1]] &][[0;;9]]




DeleteCases[Flattern[Table[{Part[#,i],Part[#,j]},{i,Length[#]},{j,Length[#]}]],{x_,x_}] & /@
{Part[#, 2], CityData[Part[#, 2], "Coordinates"]} & /@
 Take[Sort[{CityData[#, "Population"], #} & /@
    CityData[{All, "Japan"}], #1[[1]] > #2[[1]] &], 10]




      {{Entity["City", {"Tokyo", "Tokyo", "Japan"}], {35.67, 139.77}},
         {Entity[
         "City", {"Yokohama", "Kanagawa", "Japan"}], {35.47,          139.62}},
         {Entity["City", {"Osaka", "Osaka", "Japan"}], {34.68,          135.5}},
         {Entity["City", {"Nagoya", "Aichi", "Japan"}], {35.15,          136.91}},
         {Entity[
         "City", {"Sapporo", "Hokkaido", "Japan"}], {43.06,          141.34}},
         {Entity["City", {"Kobe", "Hyogo", "Japan"}], {34.68,          135.17}},
         {Entity["City", {"Kyoto", "Kyoto", "Japan"}], {35.01,          135.75}},
         {Entity["City", {"Fukuoka", "Fukuoka", "Japan"}], {33.59,          130.41}},
          {Entity[
         "City", {"Kawasaki", "Kanagawa", "Japan"}], {35.53,          139.7}},
         {Entity["City", {"Saitama", "Saitama", "Japan"}], {35.87,          139.64}}}



