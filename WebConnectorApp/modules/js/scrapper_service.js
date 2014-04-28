
// callback function for scrapper service 
var getAboutUsDetailsCb = function(status, resultObj) {
	if(status == 400){
	    if (resultObj["opstatus"] == 0) {
	    	var response = null;
	    	if("aboutUs" in resultObj){
	    		response = resultObj["aboutUs"];
	    	}else{
	    		showAlert("unable to reach host.")
	    		return;
	    	}
	    	if(response.length < 1) {
	    		showAlert("Response object is empty.")
	    		return;
	    	}
	    	
	        kony.print("Response: " + JSON.stringify(response[0].header));

			var tabhd1 = null;
			for(var i = 0; i < response.length; i++)
			{
				tabhd1 = createBox("tab"+i);
				frmAboutUs.tabPaneAu.addTab("tab"+i, response[i].header, null, tabhd1, null);
				frmAboutUs.tabPaneAu["imgtab"+i].src = response[i].img;
				frmAboutUs.tabPaneAu["richtxttab"+i].text = response[i].content;
			}
	        kony.application.dismissLoadingScreen();
	     }
	     else{
			showAlert(resultObj["opstatus"]+ "-" + "Unable to reach host.Please check network connectivity.");
	     	return;
	     }
	     
	}
}

// Invoking the scrapper service 
function invokeScrapperService(eventobject){
	 kony.application.showLoadingScreen("loadingSkin", "Loading...",  null, false ,true,null)
	 frmAboutUs.lblStatus.setVisibility(false);
	 var inputparam = {};
	 inputparam["serviceID"] = "getAboutUsDetails";
	 inputparam["httpheaders"] = {};
	 inputparam["httpconfig"] = {};
	 var getAboutUsDetails = appmiddlewareinvokerasync(inputparam, getAboutUsDetailsCb);
}


// alert utility function
function showAlert(txt){
 	alert(txt);
 	frmAboutUs.lblStatus.setVisibility(true);
 	frmAboutUs.lblStatus.text = txt;
 	kony.application.dismissLoadingScreen();
}

// container box for tabpane widget
function createBox(tabID){

    var tabhd1 = new kony.ui.Box({
        "id": ""+tabID,
        "tabName": "Tab",
        "spacing": 1,
        "widgetDirection": 1,
		"skin": "sknTab",
        "isVisible": true,
        "orientation": constants.BOX_LAYOUT_VERTICAL
    }, {
        "margin": [0, 1, 0, 1],
        "padding": [0, 0, 0, 0],
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 7,
        "layoutType": constants.CONTAINER_LAYOUT_BOX
    }, {
        "image": null
    });
    var img1 = new kony.ui.Image2({
        "id": "img"+tabID,
        "isVisible": true,
        "src": null,
        "imageWhenFailed": null,
        "imageWhileDownloading": null
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "margin": [0, 0, 0, 0],
        "padding": [0, 0, 0, 0],
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "referenceWidth": null,
        "referenceHeight": null,
        "marginInPixel": false,
        "paddingInPixel": false,
        "containerWeight": 43
    }, {
        "glossyEffect": constants.IMAGE_GLOSSY_EFFECT_DEFAULT
    });
    var richtxt1 = new kony.ui.RichText({
        "id": "richtxt"+tabID,
        "isVisible": true,
        "text": null,
        "skin": "sknRichKonyThemeNormal"
    }, {
        "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
        "vExpand": false,
        "hExpand": true,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "marginInPixel": true,
        "paddingInPixel": false,
        "containerWeight": 32
    }, {
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
    });
    var vbox158839527047175 = new kony.ui.Box({
        "id": "vbox158839527047175",
        "isVisible": true,
        "orientation": constants.BOX_LAYOUT_VERTICAL
    }, {
        "containerWeight": 100,
        "margin": [0, 0, 0, 0],
        "padding": [0, 0, 0, 0],
        "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
        "marginInPixel": false,
        "paddingInPixel": false,
        "vExpand": false,
        "hExpand": true,
        "layoutType": constants.CONTAINER_LAYOUT_BOX
    }, {});
    vbox158839527047175.add(
    img1, richtxt1);
    var hbox158839527047173 = new kony.ui.Box({
        "id": "hbox158839527047173",
        "isVisible": true,
        "position": constants.BOX_POSITION_AS_NORMAL,
        "orientation": constants.BOX_LAYOUT_HORIZONTAL
    }, {
        "containerWeight": 76,
        "percent": true,
        "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
        "margin": [4, 4, 4, 4],
        "padding": [0, 0, 0, 0],
        "vExpand": false,
        "marginInPixel": false,
        "paddingInPixel": false,
        "layoutType": constants.CONTAINER_LAYOUT_BOX
    }, {});
    hbox158839527047173.add(
    vbox158839527047175);
    tabhd1.add(
    hbox158839527047173);
	return tabhd1;
}


/// remove tabpane 
function onClickBack(){
	frmAboutUs.destroy();
	frmHome.show();
}