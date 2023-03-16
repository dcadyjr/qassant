

const PsmGridMap = (check) => {
    
    let columns = [];
    let rows = [];

    //check 1 or 3 or 4 or 15
    if(check.name === '1: Confirm all pages have ads (not just a partial site)' || check.name === '3: Ads on Desktop'||check.name ==='4: Ads on Mobile' ||check.name === '15: Site loads correctly on multiple browsers'){
        
        let {gamAdUnitsOnPage} = check.data
        rows = gamAdUnitsOnPage.map(function(adUnit){
            return {
                adUnitPath: adUnit.adUnitPath,
                placementName: adUnit.placementName,
                sizes: adUnit.sizes,
                id: adUnit.placementName
            } 
        })
        columns = [{field: 'adUnitPath', headerName: 'Ad Unit', width: 90},
                        {field: 'placementName', headerName: 'Placement', width: 90},
                        {field: 'sizes', headerName: 'Sizes', width: 300}]                     
        }
//check 2    Create columns for each product (superflex, sidewalls etc.)
    if(check.name === '2: (M) Confirm all placements have been implemented'){
        var displayPlacement = Object.keys(check.data.displayPlacements);// grabs the name of each unit puts in an array

        displayPlacement.forEach(function(placement){
            var placementInfo = check.data.displayPlacements[placement]
            var mobileSizes = placementInfo.hasOwnProperty('recommendedMobileSizes') ? placementInfo.recommendedMobileSizes : [] ;
            var desktopSizes = placementInfo.hasOwnProperty('recommendedDesktopSizes') ? placementInfo.recommendedDesktopSizes : [];
            var products =  placementInfo.products
            var productType = Object.keys(placementInfo.products);
            //console.log(products);
            //console.log(productType[0]);
            for (var product in products){
                //console.log('key',productType);
                //console.log('value',products[product]);
            }
           //console.log(placement,products);
            rows=[{id:placement, 
                adUnitName: placement,
                recommendedMobileSizes:mobileSizes,
                recommendedDesktopSizes:desktopSizes}]
        })
        
     columns=[{field: 'adUnitName', headerName: 'placement', width: 300},
     {field: 'recommendedMobileSizes', headerName: 'Recommended Mobile Sizes', width: 300},
     {field: 'recommendedDesktopSizes', headerName: 'Recommended Desktop Sizes', width: 300},
     {field: 'products', headerName: 'Products', width: 90},
     {field: 'allViewports', headerName: 'All Viewports', width: 90}]
  }
  //check 5 
    if(check.name === '5: Old tags no longer implemented on the live site'){       
     rows= [{id: 1, gamIds: check.data.gamIds }]
     columns= [{field: 'gamIds', headerName: 'GAM Ids', width: 200}]
  }
  //check 6
     if(check.name === '6: Make sure Child GAM (DFP) ID is entered into FAD'){
        columns=[{field: 'childIds', headerName: 'Child IDs', width: 90}]
        rows=[{id:1, childIds: check.data.childIds}]
      
}
    //check 7  or 8  or 11 or 18
    if(check.name === '7: (M) * Check networks in dashboard against Demand tab, enable newly approved demand, report discrepancy to OB' ||check.name === '8: Confirm the network IDs belong to the correct blocklist on all partners'|| check.name ==='11: Added Networks Functioning in Extension' ||check.name === '18: Pub-Owned Demand setup (if applicable)'){
        //console.log(check.data.siteLevelBidders);
        rows= []
            for(var bidder in check.data.siteLevelBidders){
                var detail = check.data.siteLevelBidders[bidder];
                    // console.log('bidder',bidder)
                    // console.log('detail',detail)
                detail.map(function(info,index){

                    //    console.log('info params', info.params);
                    //    console.log('info sizes', info.sizes);

                rows.push({id: `${bidder}${index}`, bidder:bidder, sizes:info.sizes, params:Object.values(info.params) })
                })
            }
       
        
        columns= [{field: 'bidder', headerName: 'Bidder', width: 90},
                    {field: 'params', headerName: 'Params', width: 300},
                    {field: 'sizes', headerName: 'Sizes', width: 90}]
            
    
  }
    if(check.name === '9: (M) Confirm Default FAD Features are Setup'){
      console.log(check.data.adQuality);
      var adQuality = Object.keys(check.data.adQuality);
      console.log(adQuality);
        
        rows=[{id: 1, admiral: check.data.admiral, comscore: check.data.comscore }]

        columns=[{field: 'identity', headerName: 'Identity', width: 90},
                {field: 'adQuality', headerName: 'Ad Quality', width: 90},
                {field: 'admiral', headerName: 'Admiral', width: 90},
                {field: 'comscore', headerName: 'Comscore', width: 90}
            ]
 
}
    if(check.name === '13: Freestar Products and CMP (if applicable)'){
        //console.log(check.data.cmp);
        var mappingInfo = Object.keys(check.data.mappingInfo);

        mappingInfo.forEach(function(placement){
            var placementInfo = check.data.mappingInfo[placement];
            //console.log(placementInfo);
            var mobileSizes = placementInfo.hasOwnProperty('recommendedMobileSizes') ? placementInfo.recommendedMobileSizes : [] ;
            var desktopSizes = placementInfo.hasOwnProperty('recommendedDesktopSizes') ? placementInfo.recommendedDesktopSizes : [];
            //console.log(mobileSizes);
            //console.log(desktopSizes);
            var products =  placementInfo.products
             var productType = Object.keys(placementInfo.products);
             //console.log(products);
             //console.log(productType[0]);
            for (var product in products){
                 //console.log('key',productType);                 
                 //console.log('value',products[product]);
            }
            
        })

        columns=[{field: 'adUnitName', headerName: 'placement', width: 90},
        {field: 'recommendedMobileSizes', headerName: 'Recommended Mobile Sizes', width: 90},
        {field: 'recommendedDesktopSizes', headerName: 'Recommended Desktop Sizes', width: 90},
        {field: 'products', headerName: 'Products', width: 90},
        {field: 'allViewports', headerName: 'All Viewports', width: 90},
        {field: 'cmp', headerName: 'CMP', width: 90}]
        rows=[{id: 1, cmp: check.data.cmp}]//there is only 1 entry for cmp, but multiple rows for everything else

}  
//check 10 or 19 or 20 (data is setup different than check #1)
    if(check.name === '19: Pub-Owned GAM - All ad units mapped properly' ||check.name === '20: Pub-Owned GAM - All ad sizes setup correctly'||check.name === '10: Confirm Ad Units in GAM Account' ){
        
        let {fadAdUnits} = check.data
        columns = [
            { field: "adUnitPath", headerName: "Ad Unit Path" },
            { field: "placementName", headerName: "Placement Name" },
        ];
    
        const sizes = fadAdUnits.reduce((acc, curr) => {
            for (let key in curr.sizes) {
                if (acc[key] === undefined) {
                    acc[key] = { field: key, headerName: key };
                    columns.push(acc[key]);
                }
            }
            return acc;
        }, {});
    
        rows = fadAdUnits.map((item) => {
            const row = { id: item.placementName, adUnitPath: item.adUnitPath, placementName: item.placementName };
            for (let key in sizes) {
                row[key] = item.sizes[key];
            }
            return row;
        });
 }
return {
    columns: columns,
    rows: rows
}
}


export default PsmGridMap;