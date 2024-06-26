require(
    [
        "esri/config",
        "esri/WebMap",
        "esri/views/MapView",
        "esri/widgets/Home",
        "esri/widgets/LayerList",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Directions",
        "esri/layers/RouteLayer",
        "esri/widgets/ScaleBar",
        "esri/widgets/Search",
    ],

    function (
        esriConfig,
        WebMap,
        MapView,
        Home,
        LayerList,
        BasemapGallery,
        Directions,
        RouteLayer,
        ScaleBar,
        Search
    ) {
        esriConfig.apiKey = "AAPKc0d231b3177f4c7aa4f8fd4cc33d408eFr2xfZB6UcOjXi_RSt5Wf0akFMAjpgs38v03BbLMmZ6YAhkj3X7qwjsqhe6tv9sN";

        const routeLayer = new RouteLayer();

        const webmap = new WebMap({
            portalItem: {
                id: "232b4d297d054b2a831a3ce629ac8495"
            }
        });

        webmap.layers.add(routeLayer);

        const view = new MapView({
            container: "viewDiv",
            map: webmap
        });

        const directionWidget = new Directions({
            layer: routeLayer,
            apiKey: esriConfig.apiKey,
            view

        });

        view.ui.add("directions-button", "bottom-left");
        view.ui.add(directionWidget, "bottom-left");
        

        function search(query) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (query.trim() === '') {
                resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
                return;
            }

            const results = [
                'Search result 1 for ' + query,
                'Search result 2 for ' + query,
                'Search result 3 for ' + query,
            ];

            if (results.length === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            } else {
                const ul = document.createElement('ul');
                results.forEach(result => {
                    const li = document.createElement('li');
                    li.textContent = result;
                    ul.appendChild(li);
                });
                resultsContainer.appendChild(ul);
            }
        }

        const scaleBar = new ScaleBar({
            view
        });

        view.ui.add(scaleBar, {
            position: "bottom-right"
        });

        const homeBtn = new Home({
            view
        });

        view.ui.add(homeBtn, { position: "top-left" });

        const layerlist = new LayerList({
            view,
        });

        view.ui.add("layer-list-btn", "top-right");
        view.ui.add(layerlist, "top-right");

        const basemapGalery = new BasemapGallery({
            view
        });

        view.ui.add("basemap-gallery-btn", "top-right");
        view.ui.add(basemapGalery, "top-right");

        //Search Widget

        const searchWidget = new Search({
            view: view,
            apiKey: esriConfig.apiKey

        });

        view.ui.add(searchWidget, "top-right");
        view.ui.add("search-button", "top-right")

        document.getElementById("layer-list-btn").addEventListener('click', () => {
            toggleButton('layerList');
        });

        document.getElementById("directions-button").addEventListener('click', () => {
            toggleButton("directions");
        });

        document.getElementById("basemap-gallery-btn").addEventListener('click', () => {
            toggleButton("gallery");
        });

        document.getElementById("search-button").addEventListener('click', () => {
            toggleButton("search");
        });

        

        function toggleButton (element) {

            if (element == 'layerList') {
                const layerListWidget = document.getElementsByClassName("esri-layer-list")[0];
                const currentProp = layerListWidget.style.getPropertyValue("display");
                layerListWidget.style.setProperty("display", currentProp == "none" ? "block" : "none" )

            } else if (element == 'gallery') {
                const galleryWidget = document.getElementsByClassName("esri-basemap-gallery")[0];
                const currentProp = galleryWidget.style.getPropertyValue("display");
                galleryWidget.style.setProperty("display", currentProp == "none" ? "block" : "none" )

            } else if (element == 'directions') {
                const directionsWidget = document.getElementsByClassName("esri-icon-directions")[0];
                const currentProp = directionsWidget.style.getPropertyValue("display");
                directionsWidget.style.setProperty("display", currentProp == "none" ? "block" : "none" )

            } else if (element == 'search') {
                const searchWidget = document.getElementsByClassName("esri-icon-search")[0];
                const currentProp = searchWidget.style.getPropertyValue("display");
                searchWidget.style.setProperty("display", currentProp == "none" ? "block" : "none" )
            }
        }

    });